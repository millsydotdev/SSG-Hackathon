-- Planning: the parent context for all hackathon planning data
-- All tables belong to the active hackathon

-- Objectives
create table if not exists public.objectives (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('critical','high','medium','low')),
  status text not null default 'draft' check (status in ('draft','active','completed','cancelled')),
  owner text,
  target_date timestamptz,
  tags text[],
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Milestones
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  description text,
  due_date timestamptz,
  status text not null default 'pending' check (status in ('pending','in_progress','completed','delayed','cancelled')),
  completion_pct integer not null default 0 check (completion_pct between 0 and 100),
  dependencies text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Deliverables
create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'pending' check (status in ('pending','in_progress','completed','cancelled')),
  owner text,
  notes text,
  deadline timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Requirements
create table if not exists public.requirements (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  description text,
  category text,
  priority text not null default 'medium' check (priority in ('critical','high','medium','low')),
  source text,
  status text not null default 'draft' check (status in ('draft','approved','in_progress','completed','cancelled')),
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Risks
create table if not exists public.risks (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  risk text not null,
  likelihood text not null default 'medium' check (likelihood in ('low','medium','high')),
  impact text not null default 'medium' check (impact in ('low','medium','high')),
  mitigation text,
  owner text,
  status text not null default 'identified' check (status in ('identified','mitigated','accepted','resolved')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Decisions (ADR)
create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  decision text,
  reasoning text,
  alternatives text,
  author text,
  status text not null default 'proposed' check (status in ('proposed','accepted','deprecated','superseded')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Checklist templates and items
create table if not exists public.checklist_templates (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.checklist_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.checklist_templates(id) on delete cascade,
  label text not null,
  checked boolean not null default false,
  assigned_to text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Planning notes (shared team notes)
create table if not exists public.planning_notes (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null default 'Untitled',
  content text,
  created_by uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_objectives_hackathon on public.objectives (hackathon_id);
create index if not exists idx_objectives_status on public.objectives (status);
create index if not exists idx_milestones_hackathon on public.milestones (hackathon_id);
create index if not exists idx_deliverables_hackathon on public.deliverables (hackathon_id);
create index if not exists idx_requirements_hackathon on public.requirements (hackathon_id);
create index if not exists idx_risks_hackathon on public.risks (hackathon_id);
create index if not exists idx_decisions_hackathon on public.decisions (hackathon_id);
create index if not exists idx_checklist_templates_hackathon on public.checklist_templates (hackathon_id);
create index if not exists idx_planning_notes_hackathon on public.planning_notes (hackathon_id);

-- RLS
alter table public.objectives enable row level security;
alter table public.milestones enable row level security;
alter table public.deliverables enable row level security;
alter table public.requirements enable row level security;
alter table public.risks enable row level security;
alter table public.decisions enable row level security;
alter table public.checklist_templates enable row level security;
alter table public.checklist_items enable row level security;
alter table public.planning_notes enable row level security;

do $$ begin
  perform 'authenticated'::text;
exception when others then null; end $$;

create policy "Auth users read objectives" on public.objectives for select using (auth.role() = 'authenticated');
create policy "Auth users insert objectives" on public.objectives for insert with check (auth.role() = 'authenticated');
create policy "Auth users update objectives" on public.objectives for update using (auth.role() = 'authenticated');
create policy "Auth users delete objectives" on public.objectives for delete using (auth.role() = 'authenticated');

create policy "Auth users read milestones" on public.milestones for select using (auth.role() = 'authenticated');
create policy "Auth users insert milestones" on public.milestones for insert with check (auth.role() = 'authenticated');
create policy "Auth users update milestones" on public.milestones for update using (auth.role() = 'authenticated');
create policy "Auth users delete milestones" on public.milestones for delete using (auth.role() = 'authenticated');

create policy "Auth users read deliverables" on public.deliverables for select using (auth.role() = 'authenticated');
create policy "Auth users insert deliverables" on public.deliverables for insert with check (auth.role() = 'authenticated');
create policy "Auth users update deliverables" on public.deliverables for update using (auth.role() = 'authenticated');
create policy "Auth users delete deliverables" on public.deliverables for delete using (auth.role() = 'authenticated');

create policy "Auth users read requirements" on public.requirements for select using (auth.role() = 'authenticated');
create policy "Auth users insert requirements" on public.requirements for insert with check (auth.role() = 'authenticated');
create policy "Auth users update requirements" on public.requirements for update using (auth.role() = 'authenticated');
create policy "Auth users delete requirements" on public.requirements for delete using (auth.role() = 'authenticated');

create policy "Auth users read risks" on public.risks for select using (auth.role() = 'authenticated');
create policy "Auth users insert risks" on public.risks for insert with check (auth.role() = 'authenticated');
create policy "Auth users update risks" on public.risks for update using (auth.role() = 'authenticated');
create policy "Auth users delete risks" on public.risks for delete using (auth.role() = 'authenticated');

create policy "Auth users read decisions" on public.decisions for select using (auth.role() = 'authenticated');
create policy "Auth users insert decisions" on public.decisions for insert with check (auth.role() = 'authenticated');
create policy "Auth users update decisions" on public.decisions for update using (auth.role() = 'authenticated');
create policy "Auth users delete decisions" on public.decisions for delete using (auth.role() = 'authenticated');

create policy "Auth users read checklist_templates" on public.checklist_templates for select using (auth.role() = 'authenticated');
create policy "Auth users insert checklist_templates" on public.checklist_templates for insert with check (auth.role() = 'authenticated');
create policy "Auth users update checklist_templates" on public.checklist_templates for update using (auth.role() = 'authenticated');
create policy "Auth users delete checklist_templates" on public.checklist_templates for delete using (auth.role() = 'authenticated');

create policy "Auth users read checklist_items" on public.checklist_items for select using (auth.role() = 'authenticated');
create policy "Auth users insert checklist_items" on public.checklist_items for insert with check (auth.role() = 'authenticated');
create policy "Auth users update checklist_items" on public.checklist_items for update using (auth.role() = 'authenticated');
create policy "Auth users delete checklist_items" on public.checklist_items for delete using (auth.role() = 'authenticated');

create policy "Auth users read planning_notes" on public.planning_notes for select using (auth.role() = 'authenticated');
create policy "Auth users insert planning_notes" on public.planning_notes for insert with check (auth.role() = 'authenticated');
create policy "Auth users update planning_notes" on public.planning_notes for update using (auth.role() = 'authenticated');
create policy "Auth users delete planning_notes" on public.planning_notes for delete using (auth.role() = 'authenticated');
