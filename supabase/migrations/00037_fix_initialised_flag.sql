-- Fix is_platform_initialised: migration 00031 auto-inserted a row with
-- initialized=true, but the platform hasn't actually been set up via the wizard.
-- Now that 00032 changed the default to false, fix existing rows.

-- Set initialized=false if the owner doesn't have a completed profile
-- (setup wizard creates the profile and marks onboarded=true)
update public.platform_config
set initialized = false
where initialized = true
  and not exists (
    select 1 from public.profiles
    where profiles.id = platform_config.owner_id
      and profiles.onboarded = true
  );

-- Also handle the case where no profiles exist at all (fresh DB with only auto-insert)
update public.platform_config
set initialized = false
where initialized = true
  and (select count(*) from public.profiles) = 0;
