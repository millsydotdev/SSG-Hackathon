create table if not exists public.workspace_archive (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  slug text not null unique,
  organizer text not null,
  status text not null check (status in ('completed','cancelled','abandoned','imported')),
  result text check (result in ('won','placed','participated','withdrew','none')),
  placement text,
  prize text,
  banner_url text,
  logo_url text,
  start_date timestamptz,
  end_date timestamptz,
  submission_deadline timestamptz,
  member_count integer default 0,
  completion_pct integer default 0,
  submission_status text,
  technology text,
  category text,
  template_origin text,
  notes text,
  metadata jsonb default '{}',
  archived_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_workspace_archive_hackathon on public.workspace_archive (hackathon_id);
create index if not exists idx_workspace_archive_status on public.workspace_archive (status, archived_at desc);
create index if not exists idx_workspace_archive_dates on public.workspace_archive (start_date, end_date);
create index if not exists idx_workspace_archive_organizer on public.workspace_archive (organizer);

create table if not exists public.workspace_snapshots (
  id uuid primary key default gen_random_uuid(),
  archive_id uuid not null references public.workspace_archive(id) on delete cascade,
  snapshot_type text not null,
  data jsonb not null default '{}',
  captured_at timestamptz not null default now()
);

create index if not exists idx_workspace_snapshots_archive on public.workspace_snapshots (archive_id, snapshot_type);

create table if not exists public.retrospectives (
  id uuid primary key default gen_random_uuid(),
  archive_id uuid not null references public.workspace_archive(id) on delete cascade,
  went_well text[] default '{}',
  went_badly text[] default '{}',
  problems text[] default '{}',
  successes text[] default '{}',
  improvements text[] default '{}',
  team_feedback text,
  technical_feedback text,
  planning_feedback text,
  submission_feedback text,
  overall_score integer check (overall_score >= 1 and overall_score <= 10),
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_retrospectives_archive on public.retrospectives (archive_id);

create table if not exists public.lessons_learned (
  id uuid primary key default gen_random_uuid(),
  archive_id uuid not null references public.workspace_archive(id) on delete cascade,
  title text not null,
  content text not null,
  category text not null default 'general',
  severity text not null default 'insight' check (severity in ('critical','important','insight','tip')),
  tags text[] default '{}',
  pinned boolean default false,
  favourite boolean default false,
  references_module text,
  references_id uuid,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lessons_archive on public.lessons_learned (archive_id, pinned desc, created_at desc);
create index if not exists idx_lessons_tags on public.lessons_learned using gin (tags);

create table if not exists public.archive_tags (
  id uuid primary key default gen_random_uuid(),
  archive_id uuid not null references public.workspace_archive(id) on delete cascade,
  tag text not null,
  category text default 'general',
  created_at timestamptz not null default now(),
  unique (archive_id, tag)
);

create index if not exists idx_archive_tags_tag on public.archive_tags (tag);
create index if not exists idx_archive_tags_archive on public.archive_tags (archive_id);

alter table public.workspace_archive enable row level security;
alter table public.workspace_snapshots enable row level security;
alter table public.retrospectives enable row level security;
alter table public.lessons_learned enable row level security;
alter table public.archive_tags enable row level security;

create policy "Team members can read workspace archive"
  on public.workspace_archive for select
  using (true);

create policy "Team members can read workspace snapshots"
  on public.workspace_snapshots for select
  using (true);

create policy "Team members can read retrospectives"
  on public.retrospectives for select
  using (true);

create policy "Team members can create retrospectives"
  on public.retrospectives for insert
  with check (auth.uid() is not null);

create policy "Team members can update retrospectives"
  on public.retrospectives for update
  using (auth.uid() is not null);

create policy "Team members can read lessons"
  on public.lessons_learned for select
  using (true);

create policy "Team members can create lessons"
  on public.lessons_learned for insert
  with check (auth.uid() is not null);

create policy "Team members can update lessons"
  on public.lessons_learned for update
  using (auth.uid() is not null);

create policy "Team members can delete lessons"
  on public.lessons_learned for delete
  using (auth.uid() is not null);

create policy "Team members can read archive tags"
  on public.archive_tags for select
  using (true);

create policy "Team members can create archive tags"
  on public.archive_tags for insert
  with check (auth.uid() is not null);
