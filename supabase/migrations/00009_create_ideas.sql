-- Ideas workspace
create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  description text,
  summary text,
  category text not null default 'general' check (category in (
    'feature','technical','design','ui','ux','backend','frontend',
    'infrastructure','devops','research','business','general'
  )),
  custom_category text,
  status text not null default 'open' check (status in (
    'draft','open','in_discussion','approved','rejected','archived','implemented'
  )),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  author text,
  owner text,
  tags text[],
  colour text,
  pinned boolean not null default false,
  archived boolean not null default false,
  vote_count integer not null default 0,
  referenced_objective_id uuid,
  referenced_requirement_id uuid,
  referenced_milestone_id uuid,
  converted_to_task boolean not null default false,
  converted_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Idea votes (one vote per user per idea)
create table if not exists public.idea_votes (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  user_id uuid not null,
  created_at timestamptz not null default now(),
  unique (idea_id, user_id)
);

-- Indexes
create index if not exists idx_ideas_hackathon on public.ideas (hackathon_id);
create index if not exists idx_ideas_status on public.ideas (status);
create index if not exists idx_ideas_category on public.ideas (category);
create index if not exists idx_ideas_pinned on public.ideas (hackathon_id, pinned) where pinned = true;
create index if not exists idx_ideas_created on public.ideas (created_at desc);
create index if not exists idx_idea_votes_idea on public.idea_votes (idea_id);
create index if not exists idx_idea_votes_user on public.idea_votes (user_id);

-- RLS
alter table public.ideas enable row level security;
alter table public.idea_votes enable row level security;

create policy "Auth read ideas" on public.ideas for select using (auth.role() = 'authenticated');
create policy "Auth insert ideas" on public.ideas for insert with check (auth.role() = 'authenticated');
create policy "Auth update ideas" on public.ideas for update using (auth.role() = 'authenticated');
create policy "Auth delete ideas" on public.ideas for delete using (auth.role() = 'authenticated');

create policy "Auth read votes" on public.idea_votes for select using (auth.role() = 'authenticated');
create policy "Auth insert votes" on public.idea_votes for insert with check (auth.role() = 'authenticated');
create policy "Auth delete votes" on public.idea_votes for delete using (auth.role() = 'authenticated');
