create table if not exists public.analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  snapshot_type text not null default 'hourly',
  data jsonb not null default '{}',
  summary jsonb not null default '{}',
  period_start timestamptz not null,
  period_end timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_snapshots_hackathon
  on public.analytics_snapshots (hackathon_id, created_at desc);
create index if not exists idx_analytics_snapshots_type
  on public.analytics_snapshots (snapshot_type);

create table if not exists public.report_exports (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  report_type text not null,
  format text not null default 'pdf',
  data jsonb not null default '{}',
  file_url text,
  status text not null default 'pending',
  created_by uuid not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_report_exports_hackathon
  on public.report_exports (hackathon_id, created_at desc);

alter table public.analytics_snapshots enable row level security;
alter table public.report_exports enable row level security;

create policy "Team members can read analytics snapshots"
  on public.analytics_snapshots for select
  using (
    exists (
      select 1 from public.team_members
      where hackathon_id = analytics_snapshots.hackathon_id
        and profile_id = auth.uid()
        and deactivated_at is null
    )
  );

create policy "Team members can read report exports"
  on public.report_exports for select
  using (
    exists (
      select 1 from public.team_members
      where hackathon_id = report_exports.hackathon_id
        and profile_id = auth.uid()
        and deactivated_at is null
    )
  );

create policy "Users can create report exports"
  on public.report_exports for insert
  with check (created_by = auth.uid());

create policy "Users can update their own report exports"
  on public.report_exports for update
  using (created_by = auth.uid());
