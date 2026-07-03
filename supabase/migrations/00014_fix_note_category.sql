alter table public.notes drop constraint if exists notes_category_check;
alter table public.notes add constraint notes_category_check
  check (category in ('general','shared','personal','meeting','decision','checklist','quick_note','documentation','reference'));
