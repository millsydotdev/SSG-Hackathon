create table if not exists public.folders (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  parent_id uuid references public.folders(id) on delete cascade,
  created_by uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  folder_id uuid references public.folders(id) on delete set null,
  name text not null,
  original_name text not null,
  description text,
  category text not null default 'other' check (category in (
    'image','video','audio','pdf','word','excel','powerpoint','markdown',
    'archive','code','json','csv','text','binary','other'
  )),
  mime_type text not null,
  file_size bigint not null,
  storage_path text not null,
  checksum text,
  thumbnail_url text,
  tags text[],
  uploader text,
  pinned boolean not null default false,
  archived boolean not null default false,
  favourite boolean not null default false,
  version integer not null default 1,
  sort_order integer not null default 0,
  referenced_objective_id uuid,
  referenced_requirement_id uuid,
  referenced_idea_id uuid,
  referenced_research_id uuid,
  referenced_task_id uuid,
  referenced_note_id uuid,
  referenced_deliverable_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_folders_hackathon on public.folders (hackathon_id);
create index if not exists idx_folders_parent on public.folders (parent_id);
create index if not exists idx_files_hackathon on public.files (hackathon_id);
create index if not exists idx_files_folder on public.files (folder_id);
create index if not exists idx_files_category on public.files (category);
create index if not exists idx_files_created on public.files (created_at desc);

-- RLS
alter table public.folders enable row level security;
alter table public.files enable row level security;

create policy "Auth read folders" on public.folders for select using (auth.role() = 'authenticated');
create policy "Auth insert folders" on public.folders for insert with check (auth.role() = 'authenticated');
create policy "Auth update folders" on public.folders for update using (auth.role() = 'authenticated');
create policy "Auth delete folders" on public.folders for delete using (auth.role() = 'authenticated');

create policy "Auth read files" on public.files for select using (auth.role() = 'authenticated');
create policy "Auth insert files" on public.files for insert with check (auth.role() = 'authenticated');
create policy "Auth update files" on public.files for update using (auth.role() = 'authenticated');
create policy "Auth delete files" on public.files for delete using (auth.role() = 'authenticated');
