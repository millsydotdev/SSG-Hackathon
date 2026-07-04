-- Production initialisation model
-- Removes auto-insert from migration 00031 (fails on fresh DB with no users)
-- Adds fields needed for first-run setup

-- Extend platform_config for setup workflow
alter table public.platform_config
  add column if not exists description text,
  add column if not exists default_locale text not null default 'en-US',
  add column if not exists schema_version integer not null default 1,
  add column if not exists initialised_at timestamptz;

-- Change default: new deployments start uninitialised
alter table public.platform_config
  alter column initialized set default false;

-- Remove the auto-insert that fails on fresh deployments
-- (done by altering the default instead)

-- Allow system to insert platform config during setup
drop policy if exists "Platform owner can read platform config" on public.platform_config;
drop policy if exists "Platform owner can update platform config" on public.platform_config;

create policy "Anyone can read platform config"
  on public.platform_config for select
  using (true);

create policy "System can insert platform config"
  on public.platform_config for insert
  with check (true);

create policy "Platform owner can update platform config"
  on public.platform_config for update
  using (auth.uid() = (select owner_id from public.platform_config limit 1));

-- Helper: check if platform is initialised
create or replace function public.is_platform_initialised()
returns boolean
language sql
security definer
set search_path = 'public'
as $$
  select coalesce((select initialized from public.platform_config limit 1), false);
$$;
