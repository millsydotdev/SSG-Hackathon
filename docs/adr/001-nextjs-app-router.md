# ADR-001: Next.js App Router with Server Components

## Status

Accepted

## Context

We need to choose a frontend framework and routing architecture for SSG-Hackathon. The platform requires a mix of public pages, authenticated dashboards, and real-time collaboration features.

Options considered:

- Next.js Pages Router (legacy)
- Next.js App Router (current)
- Remix
- Vite + React Router

## Decision

Use Next.js 16 with the App Router pattern, Server Components by default, and client components only where interactivity is needed.

## Consequences

### Positive

- Server Components reduce client-side JavaScript
- Nested layouts for marketing and dashboard sections
- Built-in loading, error, and not-found boundaries
- Native streaming and Suspense support
- Long-term support from Vercel

### Negative

- Learning curve for Server/Client Component model
- Some third-party libraries require client component wrappers
- State management patterns differ from traditional React
