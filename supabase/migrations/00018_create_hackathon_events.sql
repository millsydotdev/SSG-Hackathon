-- Hackathon events (discovery)
create table if not exists public.hackathon_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  organizer text not null,
  description text,
  banner_url text,
  logo_url text,
  website_url text,
  registration_url text,
  location text,
  country text,
  event_type text not null default 'online' check (event_type in ('online','in_person','hybrid')),
  difficulty text not null default 'all' check (difficulty in ('beginner','intermediate','advanced','all')),
  prize_pool text,
  max_team_size integer,
  min_team_size integer default 1,
  timezone text not null default 'UTC',
  start_date timestamptz,
  end_date timestamptz,
  registration_open timestamptz,
  registration_close timestamptz,
  submission_deadline timestamptz,
  tracks text[],
  technologies text[],
  rules text,
  eligibility text,
  judging_criteria text,
  sponsors text,
  faq jsonb,
  resources text,
  status text not null default 'upcoming' check (status in ('upcoming','registration_open','registration_closed','active','judging','completed','cancelled')),
  featured boolean not null default false,
  tags text[],
  owner_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Event pipeline tracking
create table if not exists public.event_pipeline (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.hackathon_events(id) on delete cascade,
  user_id uuid,
  status text not null default 'discovered' check (status in (
    'discovered','watching','interested','applied','accepted','rejected','withdrawn',
    'workspace_created','active','submitted','judging','completed','archived'
  )),
  application_url text,
  confirmation_number text,
  decision_date timestamptz,
  application_date timestamptz,
  owner_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, user_id)
);

-- Event timeline entries
create table if not exists public.event_timeline (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.hackathon_events(id) on delete cascade,
  label text not null,
  date timestamptz not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_events_status on public.hackathon_events (status);
create index if not exists idx_events_featured on public.hackathon_events (featured) where featured = true;
create index if not exists idx_events_dates on public.hackathon_events (start_date);
create index if not exists idx_events_type on public.hackathon_events (event_type);
create index if not exists idx_pipeline_user on public.event_pipeline (user_id);
create index if not exists idx_pipeline_event on public.event_pipeline (event_id);
create index if not exists idx_pipeline_status on public.event_pipeline (status);
create index if not exists idx_timeline_event on public.event_timeline (event_id);

-- RLS
alter table public.hackathon_events enable row level security;
alter table public.event_pipeline enable row level security;
alter table public.event_timeline enable row level security;

create policy "Auth read events" on public.hackathon_events for select using (auth.role() = 'authenticated');
create policy "Auth read pipeline" on public.event_pipeline for select using (auth.role() = 'authenticated');
create policy "Auth manage pipeline" on public.event_pipeline for insert with check (auth.role() = 'authenticated');
create policy "Auth update pipeline" on public.event_pipeline for update using (auth.role() = 'authenticated');
create policy "Auth read timeline" on public.event_timeline for select using (auth.role() = 'authenticated');
