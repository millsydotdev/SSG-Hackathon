-- Fix remaining auth_rls_initplan warnings
-- Only targets policies with unwrapped auth.uid() calls
-- Uses position() check to avoid double-wrapping

do $$
declare
  pol record;
  new_using text;
  new_check text;
  cmd_text text;
  need_fix boolean;
begin
  for pol in (
    select
      p.polname,
      c.relname as tablename,
      n.nspname as schemaname,
      p.polcmd,
      pg_get_expr(p.polqual, p.polrelid) as using_expr,
      pg_get_expr(p.polwithcheck, p.polrelid) as check_expr
    from pg_policy p
    join pg_class c on p.polrelid = c.oid
    join pg_namespace n on c.relnamespace = n.oid
    where n.nspname = 'public'
  ) loop
    need_fix := false;
    new_using := pol.using_expr;
    new_check := pol.check_expr;

    -- Only fix auth.uid() when NOT already inside (select ...)
    if new_using is not null and position('auth.uid()' in new_using) > 0
       and position('select auth.uid()' in new_using) = 0 then
      new_using := replace(new_using, 'auth.uid()', '(select auth.uid())');
      need_fix := true;
    end if;

    if new_check is not null and position('auth.uid()' in new_check) > 0
       and position('select auth.uid()' in new_check) = 0 then
      new_check := replace(new_check, 'auth.uid()', '(select auth.uid())');
      need_fix := true;
    end if;

    -- Also fix auth.role() that might have been missed
    if new_using is not null and position('auth.role()' in new_using) > 0
       and position('select auth.role()' in new_using) = 0 then
      new_using := replace(new_using, 'auth.role()', '(select auth.role())');
      need_fix := true;
    end if;

    if new_check is not null and position('auth.role()' in new_check) > 0
       and position('select auth.role()' in new_check) = 0 then
      new_check := replace(new_check, 'auth.role()', '(select auth.role())');
      need_fix := true;
    end if;

    if need_fix then
      cmd_text := case pol.polcmd
        when 'r' then 'for select'
        when 'a' then 'for insert'
        when 'w' then 'for update'
        when 'd' then 'for delete'
        else 'for all'
      end;

      execute format('drop policy if exists %I on %I.%I', pol.polname, pol.schemaname, pol.tablename);

      begin
        if new_using is not null and new_check is not null then
          execute format('create policy %I on %I.%I %s using (%s) with check (%s)',
            pol.polname, pol.schemaname, pol.tablename, cmd_text, new_using, new_check);
        elsif new_using is not null then
          execute format('create policy %I on %I.%I %s using (%s)',
            pol.polname, pol.schemaname, pol.tablename, cmd_text, new_using);
        end if;
        raise notice 'Fixed: %.%', pol.tablename, pol.polname;
      exception when others then
        raise notice 'FAILED: %.%: %', pol.tablename, pol.polname, sqlerrm;
      end;
    end if;
  end loop;
end;
$$;
