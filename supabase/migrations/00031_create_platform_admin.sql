-- Platform administration tables
-- Owner Control Centre & admin audit trail

create table if not exists public.platform_config (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  platform_name text not null default 'SSG-Hackathon',
  version text not null default '1.0.0',
  deployed_at timestamptz not null default now(),
  initialized boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.platform_config (owner_id)
select id from auth.users order by created_at asc limit 1;

create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  module text not null,
  details jsonb default '{}',
  severity text not null default 'info' check (severity in ('info','warning','error','success')),
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_logs_admin on public.admin_logs (admin_id, created_at desc);
create index if not exists idx_admin_logs_action on public.admin_logs (action);
create index if not exists idx_admin_logs_module on public.admin_logs (module);
create index if not exists idx_admin_logs_severity on public.admin_logs (severity);
create index if not exists idx_admin_logs_created on public.admin_logs (created_at desc);

-- Helper: check if a user is the platform owner
create or replace function public.is_platform_owner(user_id uuid)
returns boolean
language sql
security definer
set search_path = 'public'
as $$
  select exists (
    select 1 from public.platform_config where owner_id = user_id
  );
$$;

-- Helper: log an admin action
create or replace function public.log_admin_action(
  p_admin_id uuid,
  p_action text,
  p_module text,
  p_details jsonb default '{}',
  p_severity text default 'info'
)
returns uuid
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  v_id uuid;
begin
  insert into public.admin_logs (admin_id, action, module, details, severity)
  values (p_admin_id, p_action, p_module, p_details, p_severity)
  returning id into v_id;
  return v_id;
end;
$$;

-- RLS
alter table public.platform_config enable row level security;
alter table public.admin_logs enable row level security;

create policy "Platform owner can read platform config"
  on public.platform_config for select
  using (is_platform_owner(auth.uid()));

create policy "Platform owner can update platform config"
  on public.platform_config for update
  using (is_platform_owner(auth.uid()));

create policy "Platform owner can read admin logs"
  on public.admin_logs for select
  using (is_platform_owner(auth.uid()));

create policy "System can insert admin logs"
  on public.admin_logs for insert
  with check (true);
