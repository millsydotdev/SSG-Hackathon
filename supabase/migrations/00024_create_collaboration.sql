create table if not exists public.comment_threads (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  module text not null,
  module_id uuid not null,
  title text,
  pinned boolean default false,
  resolved boolean default false,
  resolved_by uuid,
  resolved_at timestamptz,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_comment_threads_module on public.comment_threads (module, module_id, created_at desc);
create index if not exists idx_comment_threads_hackathon on public.comment_threads (hackathon_id);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.comment_threads(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  content text not null,
  created_by uuid not null,
  edited boolean default false,
  edited_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_comments_thread on public.comments (thread_id, created_at);
create index if not exists idx_comments_parent on public.comments (parent_id);

create table if not exists public.mentions (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.comments(id) on delete cascade,
  mentioned_user_id uuid not null,
  mentioned_username text not null,
  read boolean default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_mentions_user on public.mentions (mentioned_user_id, read, created_at desc);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  module text not null,
  module_id uuid not null,
  status text not null default 'pending' check (status in ('pending','changes_requested','approved','rejected','completed')),
  reviewer_id uuid not null,
  author_id uuid not null,
  title text not null,
  feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_reviews_module on public.reviews (module, module_id);
create index if not exists idx_reviews_reviewer on public.reviews (reviewer_id, status);
create index if not exists idx_reviews_author on public.reviews (author_id, status);

create table if not exists public.review_requests (
  id uuid primary key default gen_random_uuid(),
  review_id uuid references public.reviews(id) on delete set null,
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  module text not null,
  module_id uuid not null,
  requested_by uuid not null,
  requested_reviewer_id uuid not null,
  status text not null default 'pending' check (status in ('pending','accepted','declined','completed')),
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_review_requests_reviewer on public.review_requests (requested_reviewer_id, status);

alter table public.comment_threads enable row level security;
alter table public.comments enable row level security;
alter table public.mentions enable row level security;
alter table public.reviews enable row level security;
alter table public.review_requests enable row level security;

create policy "Team members can read threads"
  on public.comment_threads for select
  using (true);

create policy "Team members can create threads"
  on public.comment_threads for insert
  with check (auth.uid() is not null);

create policy "Thread creators can update threads"
  on public.comment_threads for update
  using (created_by = auth.uid());

create policy "Team members can read comments"
  on public.comments for select
  using (true);

create policy "Team members can create comments"
  on public.comments for insert
  with check (auth.uid() is not null);

create policy "Comment creators can edit own comments"
  on public.comments for update
  using (created_by = auth.uid());

create policy "Comment creators can delete own comments"
  on public.comments for delete
  using (created_by = auth.uid());

create policy "Users can read own mentions"
  on public.mentions for select
  using (mentioned_user_id = auth.uid());

create policy "Users can update own mention read status"
  on public.mentions for update
  using (mentioned_user_id = auth.uid());

create policy "Team members can read reviews"
  on public.reviews for select
  using (true);

create policy "Reviewers can update reviews"
  on public.reviews for update
  using (reviewer_id = auth.uid());

create policy "Review authors can read own reviews"
  on public.reviews for insert
  with check (auth.uid() is not null);

create policy "Team members can read review requests"
  on public.review_requests for select
  using (true);

create policy "Users can create review requests"
  on public.review_requests for insert
  with check (auth.uid() is not null);

create policy "Reviewers can update review requests"
  on public.review_requests for update
  using (requested_reviewer_id = auth.uid());
