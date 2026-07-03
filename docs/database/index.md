# Database Documentation

## Platform

SSG-Hackathon uses **Supabase** (PostgreSQL) as the database platform.

## Schema Design Principles

1. **Normalised** — 3NF with denormalisation only for performance
2. **Row-Level Security** — All tables have RLS policies
3. **UUID primary keys** — Consistent across all tables
4. **Timestamps** — All tables have `created_at` and `updated_at`
5. **Soft deletes** — Prefer `deleted_at` over hard deletes

## Core Tables (Planned)

- `profiles` — Extended user profile data
- `hackathons` — Hackathon events
- `teams` — Hackathon teams
- `team_members` — Team membership with roles
- `submissions` — Project submissions
- `judging_criteria` — Rubric definitions
- `judging_scores` — Judge-assigned scores
- `ideas` — Brainstormed ideas
- `tasks` — Delegated tasks
- `resources` — Shared links and files

## RLS Strategy

- Public: Read-only access to published hackathons
- Participant: Read/write within own team context
- Judge: Read submissions, write scores
- Admin: Full access

## Migrations

- Managed via Supabase CLI
- All migrations reviewed in PRs
- Rollback plans required for destructive changes
