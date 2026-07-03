# ADR-002: Supabase for Backend Services

## Status

Accepted

## Context

SSG-Hackathon requires authentication, a relational database, file storage, and real-time capabilities. We evaluated:

- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Firebase (Firestore + Auth + Storage)
- Custom backend (Node.js + PostgreSQL)

## Decision

Use Supabase as the primary backend platform.

## Consequences

### Positive

- PostgreSQL with Row-Level Security (RLS)
- Built-in authentication with multiple providers
- File storage with integrated permissions
- Real-time subscriptions via WebSockets
- Type-safe client with TypeScript generation
- Reduces backend development time significantly

### Negative

- Vendor lock-in for some services (Auth, Storage)
- RLS can become complex with permission hierarchies
- Real-time features have connection limits on lower tiers
- Self-hosting Supabase is more complex than using managed service
