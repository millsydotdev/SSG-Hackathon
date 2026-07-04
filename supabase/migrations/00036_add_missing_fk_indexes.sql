-- Add missing indexes on foreign key columns
-- Detected by Supabase linter: unindexed_foreign_keys

create index if not exists idx_automation_logs_run_id on public.automation_logs (run_id);
create index if not exists idx_checklist_items_template_id on public.checklist_items (template_id);
create index if not exists idx_github_sync_history_repository_id on public.github_sync_history (repository_id);
create index if not exists idx_mentions_comment_id on public.mentions (comment_id);
create index if not exists idx_note_folders_hackathon_id on public.note_folders (hackathon_id);
create index if not exists idx_notifications_hackathon_id on public.notifications (hackathon_id);
create index if not exists idx_platform_config_owner_id on public.platform_config (owner_id);
create index if not exists idx_review_requests_hackathon_id on public.review_requests (hackathon_id);
create index if not exists idx_review_requests_review_id on public.review_requests (review_id);
create index if not exists idx_reviews_hackathon_id on public.reviews (hackathon_id);
