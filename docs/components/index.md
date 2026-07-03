# Components

## Architecture

Components follow a layered structure:

```
src/components/
├── ui/         # Primitive, reusable UI components
└── shared/     # Domain-specific shared components
```

## Component Guidelines

### UI Components

- Atomic, reusable building blocks
- Accept standard HTML attributes via props
- Support `className` for custom styling using `cn()` utility
- Fully accessible (semantic HTML, ARIA, keyboard navigation)
- No side effects, no data fetching
- Pure presentational

### Shared Components

- Compose UI primitives into domain patterns
- May use hooks and services
- Feature-agnostic (usable across multiple features)
- Should not fetch data directly (receive via props)

## Rules

1. No inline styles — use Tailwind classes
2. No hardcoded colours — use design tokens via Tailwind
3. No hardcoded spacing — use spacing scale
4. All interactive elements must be keyboard accessible
5. All images must have `alt` text
6. Components must accept `className` and spread remaining props
