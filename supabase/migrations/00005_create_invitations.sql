-- Generate a cryptographically secure human-friendly invite code
create or replace function generate_invite_code()
returns text
language sql
as $$
  select upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12));
$$;

-- Create extension for gen_random_bytes if not in extensions schema
create extension if not exists pgcrypto with schema extensions;

-- Invitations table
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  token text not null unique default encode(extensions.gen_random_bytes(32), 'hex'),
  code text not null unique default generate_invite_code(),
  role text not null default 'member' check (role in ('lead', 'member', 'guest')),
  status text not null default 'pending' check (status in ('pending', 'active', 'used', 'expired', 'revoked', 'disabled')),
  max_uses integer not null default 1 check (max_uses >= 1),
  current_uses integer not null default 0,
  expires_at timestamptz,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoked_by uuid,
  last_used_at timestamptz,
  notes text,
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_invitations_hackathon on public.invitations (hackathon_id);
create index if not exists idx_invitations_token on public.invitations (token);
create index if not exists idx_invitations_code on public.invitations (code);
create index if not exists idx_invitations_status on public.invitations (status);
create index if not exists idx_invitations_created_at on public.invitations (created_at desc);

-- RLS
alter table public.invitations enable row level security;

-- Owner can read all invitations for their hackathon
create policy "Owner can read invitations"
  on public.invitations for select
  using (auth.role() = 'authenticated');

-- Owner can create invitations
create policy "Owner can create invitations"
  on public.invitations for insert
  with check (auth.role() = 'authenticated');

-- Owner can update invitations
create policy "Owner can update invitations"
  on public.invitations for update
  using (auth.role() = 'authenticated');

-- Owner can delete invitations
create policy "Owner can delete invitations"
  on public.invitations for delete
  using (auth.role() = 'authenticated');
