create table if not exists public.workspace_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category text not null default 'general' check (category in (
    'general','ai','web','game_jam','open_source','security','mobile','iot','university','startup'
  )),
  tags text[],
  featured boolean not null default false,
  built_in boolean not null default false,
  config jsonb not null default '{}',
  created_by uuid,
  usage_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_templates_category on public.workspace_templates (category);
create index if not exists idx_templates_featured on public.workspace_templates (featured) where featured = true;

alter table public.workspace_templates enable row level security;
create policy "Auth read templates" on public.workspace_templates for select using (auth.role() = 'authenticated');
create policy "Auth insert templates" on public.workspace_templates for insert with check (auth.role() = 'authenticated');
create policy "Auth update templates" on public.workspace_templates for update using (auth.role() = 'authenticated');
create policy "Auth delete templates" on public.workspace_templates for delete using (auth.role() = 'authenticated');
