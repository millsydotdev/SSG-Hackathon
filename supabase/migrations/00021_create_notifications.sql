create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid references public.hackathons(id) on delete cascade,
  user_id uuid not null,
  type text not null,
  title text not null,
  message text,
  module text,
  link text,
  read boolean not null default false,
  archived boolean not null default false,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  preferences jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_notifications_user on public.notifications (user_id, created_at desc);
create index if not exists idx_notifications_unread on public.notifications (user_id, read) where read = false;
create index if not exists idx_notifications_type on public.notifications (type);

alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;

create policy "Users read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users insert own notifications" on public.notifications for insert with check (auth.role() = 'authenticated');
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = user_id);
create policy "Users delete own notifications" on public.notifications for delete using (auth.uid() = user_id);

create policy "Users read own preferences" on public.notification_preferences for select using (auth.uid() = user_id);
create policy "Users upsert preferences" on public.notification_preferences for insert with check (auth.uid() = user_id);
create policy "Users update preferences" on public.notification_preferences for update using (auth.uid() = user_id);
