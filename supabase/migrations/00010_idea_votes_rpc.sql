create or replace function increment_idea_votes(idea_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ideas set vote_count = vote_count + 1 where id = idea_id;
end;
$$;

create or replace function decrement_idea_votes(idea_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ideas set vote_count = greatest(0, vote_count - 1) where id = idea_id;
end;
$$;
