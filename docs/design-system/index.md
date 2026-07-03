# Design System

## Principles

1. **Consistency** — Reusable design tokens and components
2. **Accessibility** — WCAG AA compliance as a baseline
3. **Performance** — Minimal CSS footprint, utility-first approach
4. **Responsive** — Mobile-first, all breakpoints supported

## Design Tokens

Design tokens are defined in `src/config/` and consumed via Tailwind CSS.

### Colour Palette

TBD — Will be defined as design progresses.

### Typography

- Font stack TBD
- Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72

### Spacing

Based on 4px grid: 0 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128

### Shadows

TBD — Will use Tailwind's built-in shadow scale with custom extensions.

## Component Architecture

```
src/components/
├── ui/            # Primitive components (Button, Input, Modal, etc.)
└── shared/        # Domain-specific shared components
```

## Styling Approach

- Tailwind CSS v4 for utility-first styling
- No inline styles (`style` prop is forbidden)
- Component variants via `cva` or Tailwind merge utilities
- Dark mode via Tailwind's `dark:` variant (class-based)
