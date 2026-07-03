# Coding Standards

## TypeScript

- **Strict mode** enabled — no exceptions
- **No `any`** — use `unknown` if type is truly unknown
- **No implicit `any`** — always type function parameters
- **Path aliases** — use `@/` for all imports from `src/`
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- Enable `noUnusedLocals` and `noUnusedParameters`

## React / Next.js

- **Server Components by default** — only add `"use client"` when interactivity is needed
- **No inline styles** — use Tailwind classes with `cn()` utility
- **No duplicated components** — extract and reuse
- All data fetching in Server Components where possible
- Use `generateMetadata` for page metadata and SEO

## Naming Conventions

```
components/   → PascalCase (Button.tsx, UserAvatar.tsx)
hooks/        → use* (useAuth.ts, useDebounce.ts)
services/     → camelCase (auth.ts, hackathon.ts)
lib/utils/    → camelCase (cn.ts, formatDate.ts)
types/        → PascalCase (User.ts, Hackathon.ts)
config/       → camelCase (index.ts)
```

## Imports Order

1. React / Next.js
2. Third-party libraries
3. `@/` internal modules
4. Local imports (same-directory)
5. CSS / assets

Groups separated by a blank line.

## Code Quality

- No `console.log` in production code (use `console.warn`/`console.error`)
- No commented-out code
- No disabled lint rules
- No unused imports or variables
- No magic numbers — use named constants
- No hardcoded colours or spacing values
- Small, focused modules (one primary export per file)

## Git

- Conventional Commits format
- Feature branches from `develop`
- Squash merge to `main`
- Keep commits atomic and focused
