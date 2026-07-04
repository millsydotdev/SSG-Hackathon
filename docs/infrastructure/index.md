# Infrastructure Overview

## Services

| Service           | Status    | Purpose                           |
| ----------------- | --------- | --------------------------------- |
| **Supabase**      | Connected | Database, Auth, Storage, Realtime |
| **Vercel**        | Connected | Hosting, CDN, preview deployments |
| **GitHub**        | Connected | Repository, CI/CD, Actions        |

## Architecture

```
Browser → Vercel Edge (CDN + Proxy)
           ↓
         Next.js
           ↓
         Supabase
     (Database, Auth, Storage)
```

## Environment Variables

Validation runs at build time. Configured in Vercel per environment:

| Variable                        | Required          | Environments       |
| ------------------------------- | ----------------- | ------------------ |
| `NEXT_PUBLIC_APP_URL`           | Yes               | All                |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes               | All                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes               | All                |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server            | Production/Preview |
| `PLATFORM_SETUP_KEY`           | Server            | Production only    |

## Health Check

Endpoint: `GET /api/health`

Returns:

```json
{
  "status": "healthy",
  "timestamp": "...",
  "version": "0.1.0",
  "environment": "production",
  "checks": {
    "env": { "healthy": true, "missing": 0, "warnings": 0 },
    "supabase": { "healthy": true }
  }
}
```

## Storage Buckets

| Bucket        | Public | Max Size | Purpose                     |
| ------------- | ------ | -------- | --------------------------- |
| `avatars`     | Yes    | 2 MB     | User profile pictures       |
| `attachments` | No     | 10 MB    | Task/project attachments    |
| `resources`   | No     | 50 MB    | Shared team resources       |
| `submissions` | No     | 100 MB   | Hackathon submissions       |
| `exports`     | No     | 100 MB   | Data exports                |
| `temporary`   | No     | 10 MB    | Temp uploads (auto-cleaned) |

## Database

- PostgreSQL 15 with UUID, pgcrypto, pgjwt extensions
- RLS enabled (policies configured per-table)
- UTC timezone
- Migrations in `supabase/migrations/`
