-- Fix lint warnings: add search_path to all functions, restrict anon access

-- 1. generate_invite_code (sql function)
create or replace function public.generate_invite_code()
returns text
language sql
security definer
set search_path = 'public'
as $$
  select upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12));
$$;

-- 2. activate_hackathon
create or replace function public.activate_hackathon(hackathon_id uuid)
returns void
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  update public.hackathons
  set status = 'completed'
  where status = 'active';

  update public.hackathons
  set status = 'active'
  where id = hackathon_id;
end;
$$;

-- 3. consume_invitation
create or replace function public.consume_invitation(invitation_id uuid)
returns void
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  inv record;
begin
  select * into inv from public.invitations where id = invitation_id;

  if not found then
    raise exception 'Invitation not found';
  end if;

  if inv.status = 'revoked' then
    raise exception 'Invitation has been revoked';
  end if;

  if inv.expires_at is not null and inv.expires_at < now() then
    update public.invitations set status = 'expired' where id = invitation_id;
    raise exception 'Invitation has expired';
  end if;

  update public.invitations
  set
    current_uses = current_uses + 1,
    last_used_at = now(),
    status = case
      when current_uses + 1 >= max_uses then 'used'
      else status
    end
  where id = invitation_id;
end;
$$;

-- 4. increment_idea_votes
create or replace function public.increment_idea_votes(idea_id uuid)
returns void
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  update public.ideas set vote_count = vote_count + 1 where id = idea_id;
end;
$$;

-- 5. decrement_idea_votes
create or replace function public.decrement_idea_votes(idea_id uuid)
returns void
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  update public.ideas set vote_count = greatest(0, vote_count - 1) where id = idea_id;
end;
$$;

-- 6. handle_new_user (trigger function)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  insert into public.profiles (id, display_name, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

-- Revoke EXECUTE from anon for functions that should not be public
revoke execute on function public.activate_hackathon(uuid) from anon;
revoke execute on function public.consume_invitation(uuid) from anon;
revoke execute on function public.increment_idea_votes(uuid) from anon;
revoke execute on function public.decrement_idea_votes(uuid) from anon;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;
