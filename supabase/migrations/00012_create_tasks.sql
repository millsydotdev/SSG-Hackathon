create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'backlog' check (status in (
    'backlog','todo','in_progress','blocked','review','testing','done','archived'
  )),
  priority text not null default 'medium' check (priority in ('critical','high','medium','low')),
  severity text not null default 'medium' check (severity in ('critical','high','medium','low','trivial')),
  difficulty integer check (difficulty between 1 and 5),
  estimated_hours numeric(6,1),
  actual_hours numeric(6,1),
  owner text,
  assignees text[],
  reviewer text,
  created_by text,
  due_date timestamptz,
  start_date timestamptz,
  completed_date timestamptz,
  labels text[],
  tags text[],
  blocked boolean not null default false,
  archived boolean not null default false,
  parent_task_id uuid references public.tasks(id),
  sort_order integer not null default 0,
  referenced_objective_id uuid,
  referenced_requirement_id uuid,
  referenced_milestone_id uuid,
  referenced_deliverable_id uuid,
  referenced_idea_id uuid,
  referenced_research_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Task checklist items
create table if not exists public.task_checklist_items (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  label text not null,
  checked boolean not null default false,
  assigned_to text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_tasks_hackathon on public.tasks (hackathon_id);
create index if not exists idx_tasks_status on public.tasks (status);
create index if not exists idx_tasks_priority on public.tasks (priority);
create index if not exists idx_tasks_assignees on public.tasks using gin (assignees);
create index if not exists idx_tasks_parent on public.tasks (parent_task_id);
create index if not exists idx_tasks_created on public.tasks (created_at desc);
create index if not exists idx_task_checklist_task on public.task_checklist_items (task_id);

-- RLS
alter table public.tasks enable row level security;
alter table public.task_checklist_items enable row level security;

create policy "Auth read tasks" on public.tasks for select using (auth.role() = 'authenticated');
create policy "Auth insert tasks" on public.tasks for insert with check (auth.role() = 'authenticated');
create policy "Auth update tasks" on public.tasks for update using (auth.role() = 'authenticated');
create policy "Auth delete tasks" on public.tasks for delete using (auth.role() = 'authenticated');

create policy "Auth read checklist" on public.task_checklist_items for select using (auth.role() = 'authenticated');
create policy "Auth insert checklist" on public.task_checklist_items for insert with check (auth.role() = 'authenticated');
create policy "Auth update checklist" on public.task_checklist_items for update using (auth.role() = 'authenticated');
create policy "Auth delete checklist" on public.task_checklist_items for delete using (auth.role() = 'authenticated');
