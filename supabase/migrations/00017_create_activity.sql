create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid references public.hackathons(id) on delete cascade,
  event_type text not null,
  module text not null,
  title text not null,
  description text,
  actor text,
  target_type text,
  target_id uuid,
  metadata jsonb,
  severity text not null default 'info' check (severity in ('info','warning','error','success')),
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_hackathon on public.activity_events (hackathon_id);
create index if not exists idx_activity_module on public.activity_events (module);
create index if not exists idx_activity_actor on public.activity_events (actor);
create index if not exists idx_activity_created on public.activity_events (created_at desc);

alter table public.activity_events enable row level security;
create policy "Auth read activity" on public.activity_events for select using (auth.role() = 'authenticated');
create policy "Auth insert activity" on public.activity_events for insert with check (auth.role() = 'authenticated');
