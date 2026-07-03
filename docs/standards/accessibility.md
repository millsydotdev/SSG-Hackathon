# Accessibility Standards

## Target Level

**WCAG 2.2 AA** — All new features and components must meet this standard.

## Principles

1. **Perceivable** — Information must be presented to users in ways they can perceive
2. **Operable** — UI components and navigation must be operable
3. **Understandable** — Information and operation must be understandable
4. **Robust** — Content must be robust enough to be interpreted by assistive technologies

## Requirements

### Semantic HTML

- Use native HTML elements (`<button>`, `<nav>`, `<main>`, `<header>`, etc.)
- Use heading hierarchy correctly (`h1` → `h6`)
- Use `<ul>` / `<ol>` for lists
- Use `<table>` for tabular data

### Keyboard Navigation

- All interactive elements must be reachable via Tab
- Custom components must support keyboard interaction (Enter, Space, Escape, Arrow keys)
- Visible focus indicators on all interactive elements
- Logical tab order that matches visual order
- No keyboard traps

### ARIA

- Use ARIA roles, states, and properties when native semantics are insufficient
- Do not override native semantics unnecessarily
- Use `aria-label` or `aria-labelledby` for elements without visible labels
- Use `aria-describedby` for additional descriptions
- Use `aria-live` regions for dynamic content updates
- Use `aria-expanded` for expandable elements
- Use `aria-current` for current page in navigation

### Focus Management

- Manage focus when content changes dynamically
- Focus must move to new content after navigation or action
- Trap focus in modals and dialogs
- Restore focus when closing overlays
- Skip-to-content link at the top of every page

### Colour and Contrast

- Text contrast ratio of at least 4.5:1 (AA)
- Large text (18px+ or 14px+ bold) requires 3:1 contrast ratio
- Non-text elements require 3:1 contrast ratio
- Do not use colour alone to convey information

### Screen Readers

- All images must have meaningful `alt` text (or `alt=""` for decorative)
- Form inputs must have associated `<label>` elements
- Error messages must be announced by screen readers
- Use `sr-only` utility for visually hidden but screen-reader-accessible content
- Use `role="alert"` for important, time-sensitive messages

### Forms

- All inputs must have visible labels
- Error messages must be programmatically associated with inputs
- Required fields must be indicated
- Validation must not rely solely on colour

### Motion and Animation

- Respect `prefers-reduced-motion` — reduce or remove animations
- No flashing or blinking content (epilepsy risk)
- Animations must be subtle and purposeful

## Testing

- Automated: axe-core via Playwright / Vitest
- Manual: Tab through every interactive element
- Manual: Test with screen reader (VoiceOver, NVDA, JAWS)
- Manual: Zoom to 200% — content must not break
- Manual: Prefers-reduced-motion — animations must respect the setting

## Exceptions

Any accessibility exception must be documented with:

1. The WCAG criterion it violates
2. The reason it cannot be met
3. A plan for remediation with a timeline
