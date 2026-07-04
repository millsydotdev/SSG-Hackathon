# SSG-Hackathon

Invite-only collaborative workstation for hackathon teams. Next.js 16 + Supabase + Tailwind v4.

## Commands

- `npm run dev` — dev server with webpack
- `npm run ci` — **mandatory before push**: lint → typecheck → test → build
- `npm run lint` — ESLint with `--max-warnings 0`
- `npm run typecheck` — `tsc --noEmit`
- `npm run test` — `vitest run`
- `npm run format` — Prettier
- `supabase db push` — apply pending migrations (run before Vercel deploy)
- `vercel deploy --prod --yes` — deploy from CLI

## Architecture

- **Feature modules** under `src/core/<name>/`: `service.ts`, `types.ts`, `index.ts`
- **Service pattern**: `createXxxService()` factory returning an object of async functions. Most use `getSupabaseServerClient()` (service role key, bypasses RLS).
- **Row mapper pattern**: each service has `mapXxxRow()` functions converting `snake_case` DB columns to `camelCase` TS properties.
- **Type imports** via `@/` alias (maps to `src/`). Also `@ui/`, `@hooks/`, `@utils/`, `@layouts/`.
- **Navigation**: flat list in `src/config/navigation.ts`. `sidebarNav` (main) + `secondaryNav` (Admin, Settings). Admin link conditionally visible to platform owner only.
- **Auth**: Supabase SSR via `@supabase/ssr`. `ProtectedRoute` wrapper at layout level. `useAuth()` hook returns session/user. GitHub OAuth via `signInWithOAuth({ provider: 'github' })`.
- **Provider tree**: `ThemeProvider → FeatureFlags → Identity → Permission → Hackathon → Notification → CommandPalette → Toast`
- **Admin centre**: `/app/admin` — owner-only access. Checked via `isPlatformOwner()` from `platform_config.owner_id` (first auth user).

## Service Layer Pitfalls

- `as never` casts are used on all insert/update operations — TypeScript is bypassed there.
- Do NOT add `.catch(() => {})` — use try/catch with error toast pattern instead.
- Server/client boundary: `getSupabaseServerClient()` reads `SUPABASE_SERVICE_ROLE_KEY`. If called from a `"use client"` component via an import chain, the key path ends up in the client bundle at build time (undefined at runtime). Mark server-only services with `"use server"` or restructure callers to use API routes.
- Only `src/core/files/service.ts` mixes server and browser clients.

## Database

- 31 migrations at `supabase/migrations/`, numbered `00001_` through `00031_`.
- 60 tables. Core ones: `hackathons`, `profiles`, `team_members`, `invitations`.
- Planning module (00008): `objectives`, `milestones`, `deliverables`, `requirements`, `risks`, `decisions`, `checklist_templates`, `checklist_items`, `planning_notes`.
- Archive module (00023): `workspace_archive`, `workspace_snapshots`, `retrospectives`, `lessons_learned`, `archive_tags`.
- Collaboration (00024): `comment_threads`, `comments`, `mentions`, `reviews`, `review_requests`.
- Integration framework (00028): `integration_connections`, `integration_health`, `integration_logs`, `integration_validations`.
- Automation (00030): `automation_rules`, `automation_templates`, `automation_runs`, `automation_logs`.
- Admin (00031): `platform_config`, `admin_logs`.
- Setup (00032): extends `platform_config` for first-run, adds `is_platform_initialised` RPC.
- RLS is permissive — most tables allow any authenticated user to read/write. Only `platform_config`, `admin_logs`, `app_secrets` have restricted access.
- PAT encryption via `pgp_sym_encrypt` in RPC functions `encrypt_token`/`decrypt_token`.
- Migration `00029` migrates `github_connections.access_token` to `encrypted_token`.

## Style

- Double quotes, semicolons, trailing commas, 80 print width.
- Prettier + ESLint enforced via husky pre-commit (lint-staged).
- Tailwind classes: `bg-surface-*`, `text-on-surface*`, `border-outline-variant`, `font-mono text-[9px]` for labels.
- Commit convention: conventional commits (`feat:`, `fix:`, `chore:`, etc.).

## Key Known Gaps (from Phase 37 Audit)

- 33 pages use `.catch(() => {})` — errors are silently swallowed.
- No `middleware.ts` — all auth is client-side only; no server-side route protection.
- Missing return types on 16 services.
- ~45 columns lack FK constraints.
- Many pages missing breadcrumbs, loading states, or error states.

## Config Files

- `.env.example` — documents all env vars. `SUPABASE_SERVICE_ROLE_KEY` needed for server client.
- `eslint.config.mjs` — `no-unused-vars` as error (prefix with `_` to ignore), `require-await` as error.
- `commitlint.config.js` — conventional commits.
- CI in `.github/workflows/ci.yml`: format:check → lint → typecheck → build (no test step in CI currently).
