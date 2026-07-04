-- Encryption key storage and PAT encryption wiring
-- Also cleans up legacy patterns

-- Store encryption key in a dedicated table (one row, server-side only)
create table if not exists public.app_secrets (
  key text primary key,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.app_secrets enable row level security;

-- Block all direct access to secrets (only accessible via security definer functions)
create policy "No direct access to secrets"
  on public.app_secrets for all
  using (false);

-- Insert a default encryption key on first run
insert into public.app_secrets (key, value)
values ('encryption_key', encode(gen_random_bytes(32), 'hex'))
on conflict (key) do nothing;

-- Update encrypt_token to use the table-based key
create or replace function public.encrypt_token(plaintext text)
returns text
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  key text;
begin
  select value into key from public.app_secrets where key = 'encryption_key';
  if key is null then
    raise exception 'encryption_key not configured';
  end if;
  return encode(pgp_sym_encrypt(plaintext, key), 'base64');
end;
$$;

create or replace function public.decrypt_token(ciphertext text)
returns text
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  key text;
begin
  select value into key from public.app_secrets where key = 'encryption_key';
  if key is null then
    raise exception 'encryption_key not configured';
  end if;
  return pgp_sym_decrypt(decode(ciphertext, 'base64'), key);
end;
$$;

-- Grant authenticated users access to encrypt/decrypt RPCs
grant execute on function public.encrypt_token(text) to authenticated;
grant execute on function public.decrypt_token(text) to authenticated;

-- Add encrypted token column to github_connections
alter table public.github_connections add column if not exists encrypted_token text;

-- Migrate existing plaintext tokens to encrypted
-- This runs once: encrypts any existing plaintext tokens and blanks the raw column
do $$
declare
  rec record;
  encrypted text;
begin
  for rec in select id, access_token from public.github_connections
    where auth_type = 'pat' and access_token != '' and (encrypted_token is null or encrypted_token = '')
  loop
    begin
      encrypted := public.encrypt_token(rec.access_token);
      update public.github_connections
      set encrypted_token = encrypted,
          access_token = ''
      where id = rec.id;
    exception when others then
      -- If encryption fails (e.g., on read-only replicas), skip
      null;
    end;
  end loop;
end;
$$;
