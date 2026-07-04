# Developer Guide

This guide covers the SSG-Hackathon development workflow.

## Prerequisites

- Node.js 20+
- npm
- Supabase CLI (for db operations)

## Setup

```bash
git clone <repo>
cd ssg-hackathon
npm install
cp .env.example .env.local
# Fill in Supabase credentials
npm run dev
```

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (webpack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint check (--max-warnings 0) |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Run Vitest tests |
| `npm run format` | Prettier formatting |
| `npm run ci` | Full quality gate (lint → typecheck → test → build) |

## Architecture

See `docs/architecture/core-architecture.md` for the full architecture overview.

## Key Conventions

- Feature modules in `src/core/<name>/` with `service.ts`, `types.ts`, `index.ts`
- Factory pattern: `createXxxService()` returning an object of async functions
- Row mapper pattern: `mapXxxRow()` for snake_case → camelCase conversion
- All services use `getSupabaseServerClient()` (service role key, bypasses RLS)
- Type imports via `@/` alias (maps to `src/`)
- Conventional commits (`feat:`, `fix:`, `chore:`, etc.)

## Migration Workflow

```bash
# Create a new migration
supabase migration new <name>
# Write SQL in supabase/migrations/<timestamp>_<name>.sql
# Apply to local/remote
supabase db push
```
