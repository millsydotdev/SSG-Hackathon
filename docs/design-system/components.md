# Component Architecture

## Principles

1. **Every component is reusable** — no single-use components in the UI library
2. **Composition over configuration** — small primitives compose into complex patterns
3. **Accessible by default** — WCAG AA is the minimum bar
4. **Dark-Theme Optimised** — no light theme variants (enterprise tool convention)
5. **Keyboard-first** — all interactive elements navigable via keyboard

## File Structure

```
src/components/
├── ui/           # Primitive, reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   └── ...
└── shell/        # Application layout components
    ├── sidebar.tsx
    ├── topnav.tsx
    └── workspace-layout.tsx
```

## Component Conventions

Every component must:

1. Accept `className` for custom styling
2. Accept `...props` for native HTML attributes
3. Use semantic HTML elements
4. Support `aria-*` attributes
5. Have visible focus states
6. Be TypeScript strict
7. Be pre-built with the design system (no consumer styling needed beyond className)

## Composition Example

```tsx
<Card>
  <Card.Header>
    <Card.Title>Active Events</Card.Title>
  </Card.Header>
  <Card.Body>
    <Button variant="primary">New Event</Button>
  </Card.Body>
</Card>
```
