# Local Development

## Prerequisites

- Node.js 20+
- Docker Desktop (for local Supabase)
- Supabase CLI
- Vercel CLI

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in SUPABASE_URL and SUPABASE_ANON_KEY from your linked project

# Start local Supabase (requires Docker)
supabase start

# Generate types
supabase gen types typescript --linked > src/types/supabase.ts

# Start development
npm run dev
```

## Commands

| Command             | Purpose           |
| ------------------- | ----------------- |
| `npm run dev`       | Start dev server  |
| `npm run build`     | Production build  |
| `npm run lint`      | ESLint check      |
| `npm run typecheck` | TypeScript check  |
| `npm run test`      | Run tests         |
| `npm run ci`        | Full quality gate |

## Supabase

```bash
supabase start          # Start local services
supabase stop           # Stop local services
supabase db push        # Push migrations
supabase db pull        # Pull schema changes
supabase gen types      # Generate TypeScript types
```

## Vercel

```bash
vercel dev              # Run with Vercel environment
vercel deploy           # Deploy preview
vercel deploy --prod    # Deploy production
```
