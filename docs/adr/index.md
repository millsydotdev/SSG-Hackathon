# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for SSG-Hackathon.

## What is an ADR?

An Architecture Decision Record is a short document capturing an important architectural decision made along with its context and consequences.

## ADR Process

1. Identify a significant architectural decision
2. Create a new ADR using the template below
3. Number sequentially
4. Get team consensus
5. Keep it updated if the decision changes

## Active ADRs

| ID  | Title                                                                   | Status   |
| --- | ----------------------------------------------------------------------- | -------- |
| 001 | [Next.js App Router with Server Components](./001-nextjs-app-router.md) | Accepted |
| 002 | [Supabase for Backend Services](./002-supabase-backend.md)              | Accepted |
| 003 | [Feature-Based Project Structure](./003-feature-based-structure.md)     | Accepted |
| 004 | [Design System Tokens](./004-design-system-tokens.md)                   | Accepted |

## Template

```markdown
# ADR-XXX: Title

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?
```
