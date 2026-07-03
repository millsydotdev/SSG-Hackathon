# Architecture

## Overview

SSG-Hackathon follows a modern web application architecture using Next.js 16 with the App Router pattern, server-side rendering, and Supabase for backend services.

## Principles

1. **Feature-First** — Code is organized by feature domain, not by technical concern
2. **Separation of Concerns** — Clear boundaries between UI, business logic, data access, and infrastructure
3. **Server Components by Default** — Minimise client-side JavaScript; use server components for data fetching and rendering
4. **Type Safety** — End-to-end TypeScript with strict mode, shared types between frontend and Supabase
5. **Composability** — Small, focused, reusable components and utilities

## Layer Architecture

```
┌─────────────────────────────────────┐
│          Pages / Routes             │  src/app/
├─────────────────────────────────────┤
│         UI Components               │  src/components/
├─────────────────────────────────────┤
│      Custom Hooks / State           │  src/hooks/
├─────────────────────────────────────┤
│         Services                    │  src/services/
├─────────────────────────────────────┤
│  lib/ (utils, validators, clients)  │  src/lib/
├─────────────────────────────────────┤
│      Supabase / Database            │  External
├─────────────────────────────────────┤
│         Vercel / Infrastructure     │  External
└─────────────────────────────────────┘
```

## Route Design

- `(marketing)` — Public landing pages, about, legal
- `(dashboard)` — Authenticated application pages
- `api/` — Next.js API routes (when needed)
- All routes use the App Router with nested layouts

## Data Flow

1. Server Components fetch data from Supabase directly
2. Client Components use React hooks via `src/hooks/`
3. Mutations go through service layer in `src/services/`
4. Supabase Row-Level Security (RLS) enforces authorization at the database level
