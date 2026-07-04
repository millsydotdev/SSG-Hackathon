create table if not exists public.relationships (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid references public.hackathons(id) on delete cascade,
  source_module text not null,
  source_id uuid not null,
  target_module text not null,
  target_id uuid not null,
  relationship_type text not null default 'related' check (relationship_type in (
    'related','depends_on','implements','validates','references','generated_from',
    'blocks','duplicate_of','parent','child','supports','documents','attachment'
  )),
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (source_module, source_id, target_module, target_id, relationship_type)
);

create index if not exists idx_relationships_source on public.relationships (source_module, source_id);
create index if not exists idx_relationships_target on public.relationships (target_module, target_id);
create index if not exists idx_relationships_hackathon on public.relationships (hackathon_id);
create index if not exists idx_relationships_type on public.relationships (relationship_type);

alter table public.relationships enable row level security;
create policy "Auth read relationships" on public.relationships for select using (auth.role() = 'authenticated');
create policy "Auth insert relationships" on public.relationships for insert with check (auth.role() = 'authenticated');
create policy "Auth delete relationships" on public.relationships for delete using (auth.role() = 'authenticated');
