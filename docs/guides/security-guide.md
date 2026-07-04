# Security Guide

## Authentication

- Supabase Auth with SSR session management
- GitHub OAuth via `signInWithOAuth({ provider: "github" })`
- PAT fallback with `pgp_sym_encrypt` encryption
- Password changes via Supabase Auth API

## Authorization

- Page-level: `ProtectedRoute` wrapper, `GuestRoute` for public pages
- Admin-level: `isPlatformOwner()` check with `platform_config.owner_id`
- Role-level: workspace roles (owner/lead/member/guest) via `team_members` table
- API routes validate sessions via Supabase cookies

## Data Protection

- PAT tokens encrypted via `encrypt_token` / `decrypt_token` RPCs
- Service role key never shared with the client
- Environment variables manage all secrets

## Key Security Properties

- The owner cannot delete or demote themselves
- API routes (`/api/activity`, `/api/health`) are unauthenticated by design for health monitoring
- `/api/validate-setup-key` validates setup key server-side only
- CORS, CSP, HSTS headers configured in `next.config.ts`
