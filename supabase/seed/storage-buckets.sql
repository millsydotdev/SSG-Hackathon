-- Storage bucket architecture
-- Policies will be added in the authentication phase

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 2097152, array['image/png', 'image/jpeg', 'image/webp']),
  ('attachments', 'attachments', false, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/plain', 'application/zip']),
  ('resources', 'resources', false, 52428800, null),
  ('submissions', 'submissions', false, 104857600, null),
  ('exports', 'exports', false, 104857600, array['application/zip', 'application/json', 'text/csv']),
  ('temporary', 'temporary', false, 10485760, null)
on conflict (id) do nothing;
