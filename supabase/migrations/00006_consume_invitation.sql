-- Consume an invitation (increment usage, update status if max reached)
create or replace function consume_invitation(invitation_id uuid)
returns void
language plpgsql
security definer
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
