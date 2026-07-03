create table if not exists public.hackathons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  organizer text not null,
  location text,
  start_date timestamptz,
  end_date timestamptz,
  submission_deadline timestamptz,
  timezone text not null default 'UTC',
  website text,
  devpost_url text,
  description text,
  logo_url text,
  banner_url text,
  status text not null default 'draft' check (status in ('draft','upcoming','active','submission','judging','completed','archived')),
  rules text,
  prizes text,
  tracks text,
  sponsors text,
  submission_requirements text,
  important_links text,
  resources text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Only one hackathon can be active at a time
create unique index if not exists idx_hackathons_single_active
  on public.hackathons ((true))
  where status = 'active';

-- Indexes for common queries
create index if not exists idx_hackathons_status on public.hackathons (status);
create index if not exists idx_hackathons_created_at on public.hackathons (created_at desc);

-- Enable Row Level Security
alter table public.hackathons enable row level security;

-- RLS: only authenticated users can read hackathons
create policy "Authenticated users can read hackathons"
  on public.hackathons for select
  using (auth.role() = 'authenticated');

-- RLS: only authenticated users can insert
create policy "Authenticated users can create hackathons"
  on public.hackathons for insert
  with check (auth.role() = 'authenticated');

-- RLS: only authenticated users can update
create policy "Authenticated users can update hackathons"
  on public.hackathons for update
  using (auth.role() = 'authenticated');

-- RLS: only authenticated users can delete (archive)
create policy "Authenticated users can delete hackathons"
  on public.hackathons for delete
  using (auth.role() = 'authenticated');
