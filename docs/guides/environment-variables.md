# Environment Variables Guide

## Required

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Public URL of the deployed application |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (client-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `PLATFORM_SETUP_KEY` | Strong random value for first-run setup (server only) |

## Optional

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_NAME` | Application name (default: SSG-Hackathon) |
| `NEXT_PUBLIC_ENABLE_SUBMISSIONS` | Enable submission features (default: true) |
| `NEXT_PUBLIC_ENABLE_JUDGING` | Enable judging features (default: true) |

## Security Notes

- `NEXT_PUBLIC_*` variables are exposed to the client bundle
- Non-prefixed variables (`SUPABASE_SERVICE_ROLE_KEY`, `PLATFORM_SETUP_KEY`) are server-only
- Never commit `.env.local` to the repository
- Generate a strong random value for `PLATFORM_SETUP_KEY` (e.g., `openssl rand -hex 32`)
