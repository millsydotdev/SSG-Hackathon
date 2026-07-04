-- Automation Engine

create table if not exists public.automation_rules (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  name text not null,
  description text,
  trigger_type text not null,
  trigger_config jsonb default '{}',
  action_type text not null,
  action_config jsonb default '{}',
  enabled boolean default true,
  mode text default 'automatic' check (mode in ('automatic','manual')),
  run_count integer default 0,
  last_run_at timestamptz,
  sort_order integer default 0,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_automation_rules_hackathon on public.automation_rules (hackathon_id, enabled);
create index if not exists idx_automation_rules_trigger on public.automation_rules (trigger_type);

create table if not exists public.automation_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  trigger_type text not null,
  trigger_config jsonb default '{}',
  action_type text not null,
  action_config jsonb default '{}',
  category text default 'general',
  built_in boolean default false,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.automation_runs (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references public.automation_rules(id) on delete cascade,
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  trigger_type text not null,
  action_type text not null,
  status text not null default 'pending' check (status in ('pending','running','completed','failed','skipped')),
  trigger_data jsonb,
  result jsonb,
  error_message text,
  started_at timestamptz,
  completed_at timestamptz,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_automation_runs_rule on public.automation_runs (rule_id, created_at desc);
create index if not exists idx_automation_runs_hackathon on public.automation_runs (hackathon_id, created_at desc);

create table if not exists public.automation_logs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.automation_runs(id) on delete cascade,
  rule_id uuid not null references public.automation_rules(id) on delete cascade,
  level text not null check (level in ('info','warning','error','debug')),
  message text not null,
  details jsonb default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_automation_logs_rule on public.automation_logs (rule_id, created_at desc);
create index if not exists idx_automation_logs_level on public.automation_logs (level);

-- Built-in templates
insert into public.automation_templates (name, description, trigger_type, action_type, category, built_in, sort_order) values
  ('Task Completed Notification', 'Send a notification when a task is marked as done.', 'task_completed', 'create_notification', 'tasks', true, 1),
  ('Task Overdue Alert', 'Notify the assignee when a task passes its due date.', 'task_overdue', 'create_notification', 'tasks', true, 2),
  ('Idea Approved', 'Create a task when an idea is approved.', 'idea_approved', 'create_task', 'ideas', true, 3),
  ('Submission Ready', 'Notify the team when submission reaches 100% readiness.', 'submission_ready', 'create_notification', 'submission', true, 4),
  ('Workspace Archived', 'Create a retrospective reminder when a workspace is archived.', 'workspace_archived', 'create_task', 'workspace', true, 5),
  ('Member Joined', 'Generate an onboarding checklist when a new member joins.', 'member_joined', 'create_task', 'team', true, 6),
  ('Milestone Completed', 'Log an activity when a milestone is completed.', 'milestone_completed', 'create_activity', 'planning', true, 7),
  ('Integration Failed', 'Notify the team when an integration encounters an error.', 'integration_failed', 'create_notification', 'integrations', true, 8);

alter table public.automation_rules enable row level security;
alter table public.automation_templates enable row level security;
alter table public.automation_runs enable row level security;
alter table public.automation_logs enable row level security;

create policy "Team members can read automation rules"
  on public.automation_rules for select
  using (true);

create policy "Users can manage automation rules"
  on public.automation_rules for insert
  with check (auth.uid() is not null);

create policy "Users can update automation rules"
  on public.automation_rules for update
  using (auth.uid() is not null);

create policy "Users can delete automation rules"
  on public.automation_rules for delete
  using (auth.uid() is not null);

create policy "Team members can read automation templates"
  on public.automation_templates for select
  using (true);

create policy "Team members can read automation runs"
  on public.automation_runs for select
  using (true);

create policy "Users can create automation runs"
  on public.automation_runs for insert
  with check (auth.uid() is not null);

create policy "Team members can read automation logs"
  on public.automation_logs for select
  using (true);

create policy "Users can create automation logs"
  on public.automation_logs for insert
  with check (auth.uid() is not null);
