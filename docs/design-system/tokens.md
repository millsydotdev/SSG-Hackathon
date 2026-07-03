# Design Tokens

## Colour Palette

Extracted from Stitch-Design prototype. Dark theme only.

### Surface System

| Token                       | Value     | Usage             |
| --------------------------- | --------- | ----------------- |
| `surface`                   | `#121414` | Base surface      |
| `surface-dim`               | `#121414` | Dim variant       |
| `surface-bright`            | `#383939` | Bright variant    |
| `surface-container-lowest`  | `#0d0e0f` | Deepest layer     |
| `surface-container-low`     | `#1b1c1c` | Low container     |
| `surface-container`         | `#1f2020` | Default container |
| `surface-container-high`    | `#292a2a` | High container    |
| `surface-container-highest` | `#343535` | Highest container |
| `on-surface`                | `#ffffff` | Text on surface   |
| `on-surface-variant`        | `#b5b5b5` | Secondary text    |

### Brand / Primary

| Token                  | Value     | Usage                    |
| ---------------------- | --------- | ------------------------ |
| `primary`              | `#e01e2e` | Brand red, active states |
| `on-primary`           | `#ffffff` | Text on primary          |
| `primary-container`    | `#e01e2e` | Container variant        |
| `on-primary-container` | `#ffffff` | Text on container        |
| `primary-fixed`        | `#ffdad7` | Light variant            |

### Neutral / Secondary

| Token                    | Value     | Usage             |
| ------------------------ | --------- | ----------------- |
| `secondary`              | `#c6c6c6` | Neutral elements  |
| `secondary-container`    | `#474747` | Neutral container |
| `on-secondary-container` | `#b5b5b5` | Text on neutral   |

### Tertiary / Muted

| Token                | Value     | Usage           |
| -------------------- | --------- | --------------- |
| `tertiary`           | `#c8c6c5` | Muted text      |
| `tertiary-container` | `#737272` | Muted container |

### State / Feedback

| Token             | Value     | Usage            |
| ----------------- | --------- | ---------------- |
| `error`           | `#ffb4ab` | Error text       |
| `error-container` | `#93000a` | Error background |
| `on-error`        | `#690005` | Text on error    |
| `outline`         | `#ad8885` | Borders          |
| `outline-variant` | `#5d3f3d` | Subtle borders   |
| `background`      | `#121414` | Page background  |

## Typography

| Token        | Size | Weight | Line Height | Font                    |
| ------------ | ---- | ------ | ----------- | ----------------------- |
| `h1`         | 24px | 600    | 32px        | Inter                   |
| `h2`         | 18px | 600    | 24px        | Inter                   |
| `body-lg`    | 14px | 400    | 20px        | Inter                   |
| `body-sm`    | 13px | 400    | 18px        | Inter                   |
| `label-caps` | 10px | 700    | 12px        | Inter (0.06em)          |
| `meta-mono`  | 11px | 500    | 16px        | JetBrains Mono (0.02em) |

## Spacing

Base unit: **4px**

| Token | Value |
| ----- | ----- |
| `xs`  | 4px   |
| `sm`  | 8px   |
| `md`  | 12px  |
| `lg`  | 16px  |
| `xl`  | 24px  |

## Border Radius

| Token     | Value |
| --------- | ----- |
| `DEFAULT` | 2px   |
| `lg`      | 4px   |
| `xl`      | 8px   |
| `full`    | 12px  |

## Elevation

No shadows. Depth is communicated through surface colour stepping and border luminosity (outline-variant).

## Motion

- Default transition: `150ms`
- Hover states: colour/background shifts
- Focus: border colour change to primary
- Respect `prefers-reduced-motion`
