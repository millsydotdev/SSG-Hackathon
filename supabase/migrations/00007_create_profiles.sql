-- Team member profiles
create table if not exists public.profiles (
  id uuid primary key,
  display_name text not null,
  username text not null unique,
  email text not null,
  avatar_url text,
  bio text,
  timezone text not null default 'UTC',
  country text,
  pronouns text,
  github_username text,
  discord_username text,
  website text,
  experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  status text not null default 'offline' check (status in ('online', 'away', 'offline')),
  last_active_at timestamptz,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Team members (links profiles to hackathons)
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'lead', 'member', 'guest')),
  invited_by uuid,
  joined_at timestamptz not null default now(),
  deactivated_at timestamptz,
  unique (hackathon_id, profile_id)
);

-- Indexes
create index if not exists idx_profiles_username on public.profiles (username);
create index if not exists idx_profiles_status on public.profiles (status);
create index if not exists idx_team_members_hackathon on public.team_members (hackathon_id);
create index if not exists idx_team_members_profile on public.team_members (profile_id);
create index if not exists idx_team_members_role on public.team_members (role);

-- RLS
alter table public.profiles enable row level security;
alter table public.team_members enable row level security;

-- Authenticated users can read profiles
create policy "Anyone can read profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Authenticated users can read team members
create policy "Anyone can read team members"
  on public.team_members for select
  using (auth.role() = 'authenticated');

-- Only owners can manage team members
create policy "Owners can manage team members"
  on public.team_members for insert
  with check (auth.role() = 'authenticated');

create policy "Owners can update team members"
  on public.team_members for update
  using (auth.role() = 'authenticated');
