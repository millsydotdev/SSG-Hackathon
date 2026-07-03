create table if not exists public.research_items (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  summary text,
  description text,
  category text not null default 'general' check (category in (
    'frontend','backend','infrastructure','authentication','database','devops',
    'ui','ux','design','api','ai','machine_learning','security','testing',
    'deployment','general'
  )),
  source_type text not null default 'general' check (source_type in (
    'website','documentation','api','github','package','library','video','course',
    'article','pdf','research_paper','blog','tool','service','dataset','image',
    'example','general'
  )),
  url text,
  author text,
  added_by text,
  tags text[],
  pinned boolean not null default false,
  archived boolean not null default false,
  verified boolean not null default false,
  favourite boolean not null default false,
  verification_status text not null default 'needs_review' check (verification_status in ('verified','needs_review','deprecated')),
  rating integer check (rating between 1 and 5),
  notes text,
  referenced_idea_id uuid,
  referenced_objective_id uuid,
  referenced_requirement_id uuid,
  referenced_milestone_id uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_research_hackathon on public.research_items (hackathon_id);
create index if not exists idx_research_category on public.research_items (category);
create index if not exists idx_research_source on public.research_items (source_type);
create index if not exists idx_research_verified on public.research_items (hackathon_id, verified);
create index if not exists idx_research_pinned on public.research_items (hackathon_id, pinned) where pinned = true;
create index if not exists idx_research_created on public.research_items (created_at desc);

alter table public.research_items enable row level security;

create policy "Auth read research" on public.research_items for select using (auth.role() = 'authenticated');
create policy "Auth insert research" on public.research_items for insert with check (auth.role() = 'authenticated');
create policy "Auth update research" on public.research_items for update using (auth.role() = 'authenticated');
create policy "Auth delete research" on public.research_items for delete using (auth.role() = 'authenticated');
