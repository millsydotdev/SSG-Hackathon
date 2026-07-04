create table if not exists public.github_connections (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  auth_type text not null check (auth_type in ('oauth','pat')),
  access_token text not null,
  token_owner text,
  scopes text,
  connected_at timestamptz not null default now(),
  last_validated_at timestamptz,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_github_connections_hackathon on public.github_connections (hackathon_id);

create table if not exists public.github_repositories (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.github_connections(id) on delete cascade,
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  full_name text not null,
  owner text not null,
  name text not null,
  description text,
  visibility text,
  default_branch text default 'main',
  primary_language text,
  license_info text,
  fork boolean default false,
  stars integer default 0,
  forks integer default 0,
  open_issues_count integer default 0,
  latest_release_tag text,
  latest_release_url text,
  topics text[] default '{}',
  homepage text,
  archived boolean default false,
  disabled boolean default false,
  is_active boolean default true,
  metadata jsonb default '{}',
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (connection_id, full_name)
);

create index if not exists idx_github_repos_connection on public.github_repositories (connection_id);
create index if not exists idx_github_repos_hackathon on public.github_repositories (hackathon_id);

create table if not exists public.github_sync_history (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.github_connections(id) on delete cascade,
  repository_id uuid references public.github_repositories(id) on delete set null,
  sync_type text not null,
  status text not null default 'running' check (status in ('running','completed','failed')),
  items_processed integer default 0,
  error_message text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_github_sync_connection on public.github_sync_history (connection_id, started_at desc);

alter table public.github_connections enable row level security;
alter table public.github_repositories enable row level security;
alter table public.github_sync_history enable row level security;

create policy "Team members can read connections"
  on public.github_connections for select
  using (true);

create policy "Users can create connections"
  on public.github_connections for insert
  with check (auth.uid() is not null);

create policy "Creators can update connections"
  on public.github_connections for update
  using (created_by = auth.uid());

create policy "Creators can delete connections"
  on public.github_connections for delete
  using (created_by = auth.uid());

create policy "Team members can read repositories"
  on public.github_repositories for select
  using (true);

create policy "Team members can update repositories"
  on public.github_repositories for insert
  with check (auth.uid() is not null);

create policy "Team members can read sync history"
  on public.github_sync_history for select
  using (true);

create policy "Users can create sync history"
  on public.github_sync_history for insert
  with check (auth.uid() is not null);
