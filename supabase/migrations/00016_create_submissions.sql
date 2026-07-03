-- Submission Centre
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  hackathon_id uuid not null references public.hackathons(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft','ready','submitted','accepted','rejected')),
  title text not null,
  description text,
  submission_url text,
  devpost_url text,
  github_repo text,
  live_demo_url text,
  video_url text,
  presentation_url text,
  documentation_url text,
  additional_links jsonb,
  notes text,
  locked boolean not null default false,
  submitted_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Submission deliverables checklist
create table if not exists public.submission_deliverables (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'incomplete' check (status in ('incomplete','in_progress','complete','blocked','not_required')),
  owner text,
  notes text,
  file_id uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Submission checklist items
create table if not exists public.submission_checklist (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  label text not null,
  checked boolean not null default false,
  blocked boolean not null default false,
  not_required boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_submissions_hackathon on public.submissions (hackathon_id);
create index if not exists idx_submissions_status on public.submissions (status);
create index if not exists idx_sub_deliverables_submission on public.submission_deliverables (submission_id);
create index if not exists idx_sub_checklist_submission on public.submission_checklist (submission_id);

alter table public.submissions enable row level security;
alter table public.submission_deliverables enable row level security;
alter table public.submission_checklist enable row level security;

create policy "Auth read submissions" on public.submissions for select using (auth.role() = 'authenticated');
create policy "Auth insert submissions" on public.submissions for insert with check (auth.role() = 'authenticated');
create policy "Auth update submissions" on public.submissions for update using (auth.role() = 'authenticated');
create policy "Auth delete submissions" on public.submissions for delete using (auth.role() = 'authenticated');

create policy "Auth read deliverables" on public.submission_deliverables for select using (auth.role() = 'authenticated');
create policy "Auth insert deliverables" on public.submission_deliverables for insert with check (auth.role() = 'authenticated');
create policy "Auth update deliverables" on public.submission_deliverables for update using (auth.role() = 'authenticated');

create policy "Auth read checklist" on public.submission_checklist for select using (auth.role() = 'authenticated');
create policy "Auth insert checklist" on public.submission_checklist for insert with check (auth.role() = 'authenticated');
create policy "Auth update checklist" on public.submission_checklist for update using (auth.role() = 'authenticated');
