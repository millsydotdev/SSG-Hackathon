# Supabase Setup Guide

This guide covers setting up Supabase for SSG-Hackathon.

## Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note the Project URL, Anon Key, and Service Role Key
3. These go into your `.env.local` file

## Apply Migrations

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

This applies all migrations from `supabase/migrations/` (numbered 00001–00032).

## Authentication Settings

- Enable email/password sign-up (disable email confirmation for private invite-only)
- Enable GitHub OAuth provider (see GitHub OAuth Setup Guide)
- Set site URL to your application URL

## Storage Buckets

Migrations create these buckets:

| Bucket | Public | Size Limit | Use |
|--------|--------|------------|-----|
| avatars | Yes | 2 MB | User avatars |
| attachments | No | 10 MB | File attachments |
| resources | No | 50 MB | Research resources |
| submissions | No | 100 MB | Submission files |
| exports | No | 100 MB | Report exports |
| temporary | No | 10 MB | Temporary uploads |

## Required Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```
