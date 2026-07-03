# ADR-004: Design System Tokens & Architecture

## Status

Accepted

## Context

We need a consistent, maintainable design system for SSG-Hackathon. The design language extracted from the Stitch prototype follows "Modern-Industrial Minimalism" — a high-contrast dark theme with crimson accent, dense information display, and IDE-like layout conventions.

## Decision

Use Tailwind CSS v4 CSS-first configuration with a centralized token file. Design tokens are defined once in the CSS and consumed by the `cn()` utility.

## Token Categories

- **Colour** — Material 3-inspired surface system with custom semantic tokens
- **Typography** — Inter (UI) + JetBrains Mono (code/data), 4-tier scale
- **Spacing** — 4px base unit, consistent across all components
- **Border Radius** — Sharp by default, minimal rounding
- **Elevation** — No shadows; depth via surface stepping and border luminosity
- **Motion** — 150ms transitions, respect prefers-reduced-motion
- **Icons** — Material Symbols Outlined (24px optical size)

## Consequences

### Positive

- Single source of truth for design values
- Tailwind's utility system means zero custom CSS for most components
- Dark-mode-only simplifies the design (no light theme variants needed)
- Easy to extend with new tokens

### Negative

- Dark-mode-only limits theme flexibility (acceptable for enterprise tool)
- Token changes require recompilation
