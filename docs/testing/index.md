# Testing Strategy

## Levels

1. **Unit Tests** — Individual functions, hooks, utilities
2. **Integration Tests** — Component interactions, data flow
3. **E2E Tests** — Critical user journeys

## Tools

| Level       | Tool                     |
| ----------- | ------------------------ |
| Unit        | Vitest + Testing Library |
| Integration | Vitest + Testing Library |
| E2E         | Playwright               |

## Coverage Targets

- Unit tests: 80%+ coverage on utilities and services
- Integration: Key user flows tested
- E2E: Critical paths (auth, submission, judging)

## Test File Placement

```
tests/
├── unit/
│   ├── lib/
│   ├── hooks/
│   └── services/
├── integration/
│   ├── components/
│   └── flows/
└── e2e/
    ├── auth.spec.ts
    ├── submission.spec.ts
    └── judging.spec.ts
```

Alternatively, co-locate with source:

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

Choose one convention and stick with it.

## Accessibility Testing

- `jest-axe` or `@axe-core/playwright` for automated checks
- Manual keyboard navigation testing
- Screen reader spot checks
