-- Generic integration framework tables
-- Every integration (GitHub, future ICS Calendar, etc.) uses these

create table if not exists public.integration_connections (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  integration_type text not null,
  label text not null,
  auth_method text not null default 'oauth' check (auth_method in ('oauth','pat','apikey','none')),
  status text not null default 'disconnected' check (status in ('disconnected','connecting','connected','error')),
  metadata jsonb default '{}',
  enabled_features jsonb default '{}',
  health_score integer default 0,
  last_validated_at timestamptz,
  last_synced_at timestamptz,
  version text default '1.0.0',
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (hackathon_id, integration_type)
);

create index if not exists idx_integration_connections_hackathon on public.integration_connections (hackathon_id);
create index if not exists idx_integration_connections_type on public.integration_connections (integration_type);

create table if not exists public.integration_health (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.integration_connections(id) on delete cascade,
  status text not null check (status in ('healthy','warning','error','unknown')),
  score integer not null default 0,
  checks jsonb default '{}',
  details jsonb default '{}',
  checked_at timestamptz not null default now()
);

create index if not exists idx_integration_health_connection on public.integration_health (connection_id, checked_at desc);

create table if not exists public.integration_logs (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.integration_connections(id) on delete cascade,
  level text not null check (level in ('info','warning','error','debug')),
  message text not null,
  details jsonb default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_integration_logs_connection on public.integration_logs (connection_id, created_at desc);
create index if not exists idx_integration_logs_level on public.integration_logs (level);

create table if not exists public.integration_validations (
  id uuid primary key default gen_random_uuid(),
  connection_id uuid not null references public.integration_connections(id) on delete cascade,
  validation_type text not null,
  result text not null check (result in ('passed','failed','warning','skipped')),
  message text,
  details jsonb default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_integration_validations_connection on public.integration_validations (connection_id, created_at desc);

-- Encrypt/decrypt PAT tokens using pgcrypto
-- Key is derived from the Supabase service role key (set as a DB parameter)
-- This runs server-side only, never exposed to the client

create or replace function public.encrypt_token(plaintext text)
returns text
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  return encode(
    pgp_sym_encrypt(plaintext, current_setting('app.encryption_key', true)),
    'base64'
  );
end;
$$;

create or replace function public.decrypt_token(ciphertext text)
returns text
language plpgsql
security definer
set search_path = 'public'
as $$
begin
  return pgp_sym_decrypt(
    decode(ciphertext, 'base64'),
    current_setting('app.encryption_key', true)
  );
end;
$$;

-- RLS
alter table public.integration_connections enable row level security;
alter table public.integration_health enable row level security;
alter table public.integration_logs enable row level security;
alter table public.integration_validations enable row level security;

create policy "Team members can read integration connections"
  on public.integration_connections for select
  using (true);

create policy "Users can create integration connections"
  on public.integration_connections for insert
  with check (auth.uid() is not null);

create policy "Creators can update integration connections"
  on public.integration_connections for update
  using (created_by = auth.uid());

create policy "Creators can delete integration connections"
  on public.integration_connections for delete
  using (created_by = auth.uid());

create policy "Team members can read integration health"
  on public.integration_health for select
  using (true);

create policy "Users can create integration health"
  on public.integration_health for insert
  with check (auth.uid() is not null);

create policy "Team members can read integration logs"
  on public.integration_logs for select
  using (true);

create policy "Users can create integration logs"
  on public.integration_logs for insert
  with check (auth.uid() is not null);

create policy "Team members can read integration validations"
  on public.integration_validations for select
  using (true);

create policy "Users can create integration validations"
  on public.integration_validations for insert
  with check (auth.uid() is not null);
