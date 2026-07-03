# ADR-003: Feature-Based Project Structure

## Status

Accepted

## Context

As the application grows, a flat or type-based folder structure becomes difficult to navigate. We need a structure that scales with the number of features.

We evaluated:

- Type-based (components/, pages/, utils/, etc.)
- Feature-based (teams/, hackathons/, judging/, etc.)
- Hybrid (feature modules inside a type-based shell)

## Decision

Use a hybrid approach: type-based at the top level (`components/`, `hooks/`, `services/`) with feature-based organisation within each type.

Example:

```
src/
├── components/
│   ├── ui/           # Shared primitive components
│   └── features/     # Feature-specific components
│       ├── hackathon/
│       └── team/
├── hooks/
│   ├── useAuth.ts    # Shared hooks
│   └── features/     # Feature-specific hooks
└── services/
    ├── auth.ts       # Shared services
    └── features/     # Feature-specific services
```

## Consequences

### Positive

- Clear separation between shared and feature-specific code
- Easy to locate code related to a specific feature
- New developers can understand the domain quickly
- Reduces merge conflicts (different teams work on different features)

### Negative

- Requires discipline to maintain boundaries
- Some utilities may need to be promoted from feature to shared
- Feature boundaries may shift during refactoring
