---
name: ProjectHQ Enterprise
colors:
  surface: "#121414"
  surface-dim: "#121414"
  surface-bright: "#383939"
  surface-container-lowest: "#0d0e0f"
  surface-container-low: "#1b1c1c"
  surface-container: "#1f2020"
  surface-container-high: "#292a2a"
  surface-container-highest: "#343535"
  on-surface: "#e3e2e2"
  on-surface-variant: "#e6bdba"
  inverse-surface: "#e3e2e2"
  inverse-on-surface: "#303031"
  outline: "#ad8885"
  outline-variant: "#5d3f3d"
  surface-tint: "#ffb3ae"
  primary: "#ffb3ae"
  on-primary: "#68000c"
  primary-container: "#e01e2e"
  on-primary-container: "#fff8f7"
  inverse-primary: "#c0001f"
  secondary: "#c6c6c6"
  on-secondary: "#303030"
  secondary-container: "#474747"
  on-secondary-container: "#b5b5b5"
  tertiary: "#c8c6c5"
  on-tertiary: "#313030"
  tertiary-container: "#737272"
  on-tertiary-container: "#fbf8f7"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdad7"
  primary-fixed-dim: "#ffb3ae"
  on-primary-fixed: "#410004"
  on-primary-fixed-variant: "#930015"
  secondary-fixed: "#e2e2e2"
  secondary-fixed-dim: "#c6c6c6"
  on-secondary-fixed: "#1b1b1b"
  on-secondary-fixed-variant: "#474747"
  tertiary-fixed: "#e5e2e1"
  tertiary-fixed-dim: "#c8c6c5"
  on-tertiary-fixed: "#1c1b1b"
  on-tertiary-fixed-variant: "#474746"
  background: "#121414"
  on-background: "#e3e2e2"
  surface-variant: "#343535"
typography:
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 18px
  meta-mono:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: "700"
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  container-margin: 16px
  gutter: 1px
---

## Brand & Style

The design system is engineered for high-performance enterprise environments where information density and clarity are paramount. Inspired by the utilitarian elegance of advanced developer tools, it prioritizes a "UI as a Frame" philosophy—where the interface recedes to let the user's data take center stage.

The aesthetic is **Modern-Industrial Minimalism**. It leans heavily into a "Dark Mode by Default" architecture, utilizing high-contrast outlines and a strict monochromatic foundation punctuated by surgical applications of deep crimson. The emotional response is one of precision, authority, and relentless focus. There are no soft gradients, no decorative blurs, and no extraneous "consumer-grade" flourishes. Every pixel serves a functional purpose.

## Colors

This design system utilizes a "Void" foundation. The primary background is true black (`#000000`), ensuring that OLED screens and high-end monitors provide absolute separation between the hardware and the software.

- **Primary Reds:** Used exclusively for high-priority actions, critical status indicators, and subtle focus states. It is a "Signal Red" that demands attention without fatiguing the eye.
- **Greyscale:** A strictly neutral scale. Surface levels are defined by slight increases in luminosity rather than shadows.
- **Functional Contrast:** Text roles are strictly enforced. Pure white is reserved for headers and active states; secondary text uses a desaturated grey to maintain visual hierarchy in dense views.

## Typography

The typography strategy is built on the interplay between the functional sans-serif **Inter** and the technical monospace **JetBrains Mono**.

- **Inter** handles all primary interface elements, providing high legibility at small sizes.
- **JetBrains Mono** is reserved for metadata, IDs, timestamps, and system status. This creates a clear visual distinction between user-generated content and system-generated technical data.
- **Density over Size:** Font sizes are kept small (averaging 13px-14px) to maximize information density. Hierarchy is established through weight and color rather than drastic scale changes.

## Layout & Spacing

The layout follows a **Strict IDE-Grid** model. All spacing is derived from a 4px base unit, favoring tight, compact arrangements that reduce eye travel.

- **Grid:** A 12-column system is used for main dashboard layouts, but secondary navigation and sidebars utilize fixed-width panels (typically 240px or 320px).
- **Separation:** Instead of wide gutters, elements are separated by 1px borders (`#ffffff10`). This creates a "nested box" aesthetic similar to code editors.
- **Density:** Padding within components is kept to a minimum (e.g., 8px vertical padding for list items) to ensure the maximum amount of data is visible above the fold.

## Elevation & Depth

This design system rejects ambient shadows. Depth is communicated through **Tonal Stepping** and **Border Luminosity**.

- **Layering:** Elements "higher" in the hierarchy (like popovers or modals) do not cast shadows. Instead, they use a slightly lighter surface color (`#161616`) and a more prominent border color (`rgba(255, 255, 255, 0.2)`).
- **Occlusion:** Modals and overlays use a dark, semi-transparent backdrop (70% opacity black) to dim the background, maintaining focus on the foreground task.
- **Interaction:** Focus is indicated by changing border color to the Primary Red or White, never by "lifting" the element.

## Shapes

The shape language is severe and geometric. All standard components (buttons, inputs, cards) use a **4px (0.25rem)** corner radius.

Larger containers like side panels or main content areas should have **0px (Sharp)** corners where they meet the edge of the browser or adjacent panels. The goal is to create a seamless, integrated environment where the UI feels like a single, solid machine.

## Components

### Buttons

- **Primary:** Solid Primary Red background, white text. No gradient.
- **Secondary:** Black background with a 1px white/grey border.
- **Ghost:** No background or border until hover. Used for low-priority toolbar actions.

### Inputs

- Background is always true black.
- 1px border using `border-default`.
- On focus, the border changes to Primary Red, and the text cursor is the same red.

### Chips & Tags

- Monospace font (JetBrains Mono).
- Rectangular with a 2px radius.
- Low-contrast backgrounds (e.g., `#1A1A1A`) with subtle grey text.

### Cards & Lists

- List items use a subtle hover state (`#ffffff05`).
- Active items in a list are marked by a 2px vertical Primary Red "indicator bar" on the far left edge.
- Cards are defined by borders, not shadows.

### Status Indicators

- Small 6px circles.
- Colors: Red (Critical/Error), White (Neutral/Inactive), Grey (Archived).
- No glowing effects; solid flat colors only.
