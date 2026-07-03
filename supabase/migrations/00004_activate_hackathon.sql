-- Function to safely activate a hackathon (deactivates any currently active one)
create or replace function activate_hackathon(hackathon_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  -- Deactivate currently active hackathon
  update public.hackathons
  set status = 'completed'
  where status = 'active';

  -- Activate the selected hackathon
  update public.hackathons
  set status = 'active'
  where id = hackathon_id;
end;
$$;
