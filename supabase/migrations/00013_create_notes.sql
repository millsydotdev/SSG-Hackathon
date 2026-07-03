-- Notes workspace
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid references public.hackathons(id) on delete cascade,
  user_id uuid,
  title text not null default 'Untitled',
  content text,
  category text not null default 'general' check (category in (
    'general','shared','personal','meeting','decision','checklist','quick_note','documentation','reference'
  )),
  note_type text not null default 'shared' check (note_type in ('shared','personal')),
  tags text[],
  colour text,
  pinned boolean not null default false,
  archived boolean not null default false,
  favourite boolean not null default false,
  author text,
  linked_objective_id uuid,
  linked_requirement_id uuid,
  linked_idea_id uuid,
  linked_research_id uuid,
  linked_task_id uuid,
  linked_deliverable_id uuid,
  word_count integer not null default 0,
  char_count integer not null default 0,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Note folders
create table if not exists public.note_folders (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid references public.hackathons(id) on delete cascade,
  user_id uuid,
  name text not null,
  colour text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Note links (cross-module references)
create table if not exists public.note_links (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.notes(id) on delete cascade,
  linked_module text not null,
  linked_entity_id uuid not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_notes_hackathon on public.notes (hackathon_id);
create index if not exists idx_notes_user on public.notes (user_id);
create index if not exists idx_notes_type on public.notes (note_type);
create index if not exists idx_notes_pinned on public.notes (hackathon_id, pinned) where pinned = true;
create index if not exists idx_notes_created on public.notes (created_at desc);
create index if not exists idx_note_folders_user on public.note_folders (user_id);
create index if not exists idx_note_links_note on public.note_links (note_id);

-- RLS
alter table public.notes enable row level security;
alter table public.note_folders enable row level security;
alter table public.note_links enable row level security;

create policy "Auth read notes" on public.notes for select using (auth.role() = 'authenticated');
create policy "Auth insert notes" on public.notes for insert with check (auth.role() = 'authenticated');
create policy "Auth update notes" on public.notes for update using (auth.role() = 'authenticated');
create policy "Auth delete notes" on public.notes for delete using (auth.role() = 'authenticated');

create policy "Auth read folders" on public.note_folders for select using (auth.role() = 'authenticated');
create policy "Auth insert folders" on public.note_folders for insert with check (auth.role() = 'authenticated');
create policy "Auth update folders" on public.note_folders for update using (auth.role() = 'authenticated');

create policy "Auth read links" on public.note_links for select using (auth.role() = 'authenticated');
create policy "Auth insert links" on public.note_links for insert with check (auth.role() = 'authenticated');
create policy "Auth delete links" on public.note_links for delete using (auth.role() = 'authenticated');
