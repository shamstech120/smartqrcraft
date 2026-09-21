---
name: Modern Dynamic QR Studio
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#005e6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00788c'
  on-tertiary-container: '#d7f6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a modern, precise, and high-utility SaaS experience tailored for digital marketers, product managers, and enterprise operations teams. The aesthetic balances engineering precision with frictionless product utility, instilling immediate trust in high-stakes scannability, dynamic link management, and custom code generation.

The design movement is **Corporate / Modern SaaS with Crisp Tactile Precision**. It combines a clean slate canvas (`#F8FAFC`) and layered card surfaces (`#FFFFFF`) with structured borders (`#E2E8F0`), micro-interactions, and controlled pops of electric blue and indigo. A subtle linear gradient is reserved strictly for high-impact hero headings and primary banners to communicate modern craftsmanship without degrading UI clarity. The overall emotional tone is authoritative, highly responsive, and reliable.

## Colors

The color architecture is built around functional hierarchy, distinct state changes, and contrast compliance.

### Primary & Functional Roles
- **Primary Blue (`#2563EB`)**: Serves as the key brand anchor for primary calls-to-action, primary icons, progress meters, active pagination, and high-priority states.
- **Primary Dark (`#1D4ED8`)**: Used for hover and pressed states on primary buttons, active interactive indicators, and high-emphasis focus rings.
- **Secondary Indigo (`#4F46E5`)**: Highlights specialized features, active segment tabs, selected pill states, and feature badges.
- **Accent Cyan (`#06B6D4`)**: Used selectively for small notification pings, live status dots, analytic change indicators, and high-visibility micro-tags.
- **Success (`#16A34A`)**: Indicates verified scan tests, active URL routing, validated inputs, and positive telemetry deltas.

### Canvas, Surfaces, and Neutral Tiers
- **Page Background (`#F8FAFC`)**: A cool, clean slate foundation that minimizes eye fatigue across data-heavy configuration tables and builders.
- **Card Background (`#FFFFFF`)**: Pure white containers providing crisp contrast against the slate canvas.
- **Border (`#E2E8F0`)**: Low-contrast boundary strokes applied uniformly to define surfaces without visual noise.
- **Main Text (`#0F172A`)**: Deep navy-slate providing maximum legibility for headlines, labels, and QR matrix components.
- **Secondary Text (`#475569`)**: Balanced slate for body prose, secondary metadata, tooltips, and helper labels.

### QR High-Scannability Rule
All QR matrix rendering must adhere to high-contrast execution: `#0F172A` data modules over a pure `#FFFFFF` quiet-zone background to ensure camera sensor contrast across diverse hardware environments.

## Typography

The type scale combines **Plus Jakarta Sans** for structural brand headlines with **Inter** for data-dense tables, configuration forms, and operational labels.

- **Plus Jakarta Sans (Headlines)**: Delivers rounded geometric precision, conveying approachable modern engineering. Headings feature subtle negative tracking (`-0.01em` to `-0.03em`) for crisp display presentation.
- **Inter (Body & Controls)**: Optimized for screen legibility at neutral reading distances. Its tall x-height and consistent numeral design preserve tabular integrity across QR telemetry, scan metrics, and dense multi-step configuration panels.
- **Hero Title Accent**: In hero surfaces, headline text may leverage a subtle linear gradient spanning from `#0F172A` to `#2563EB` (or `#2563EB` to `#4F46E5`) at a 135-degree angle. This treatment is strictly limited to landing hero views.

## Layout & Spacing

This design system uses an **8px base grid unit** with standard scale points at 4px (`space-xs`), 8px (`space-sm`), 16px (`space-md`), 24px (`space-lg`), and 32px (`space-xl`).

### Layout Breakpoints & Rules
- **Desktop (>= 1280px)**: 12-column fluid grid, max container width 1280px, 32px (`gutter-lg`) gutters, 64px (`margin-lg`) page margins.
- **Tablet (768px – 1279px)**: 8-column responsive grid, 24px (`gutter`) gutters, 32px (`margin`) page margins. QR generator tools reflow from split-pane layout to stacked preview blocks.
- **Mobile (< 768px)**: 4-column fluid layout, 16px (`gutter-sm`) gutters, 16px (`margin-sm`) margins. Form fields, CTA controls, and QR code downloads span full available column width.

Vertical rhythm adheres strictly to multiples of 8px. Form field inputs, buttons, and toolbar toggles observe 40px or 48px standard touch heights.

## Elevation & Depth

Visual hierarchy is maintained through subtle ambient shadowing paired with crisp 1px `#E2E8F0` structural outlines. Deep drop shadows are avoided to maintain SaaS clarity.

- **Canvas Tier (0dp)**: `#F8FAFC` flat surface.
- **Card Tier 1 (Resting)**: `#FFFFFF` fill, 1px solid `#E2E8F0`, shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Card Tier 2 (Hover / Active Panels)**: `#FFFFFF` fill, 1px solid `#CBD5E1`, shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Elevated Modals & Popovers Tier 3**: `#FFFFFF` fill, 1px solid `#E2E8F0`, shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.
- **Active Focus Depth**: Components gain an exterior ring via `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18)` without altering component dimensions.

## Shapes

The shape system utilizes deliberate curvature to soften technical SaaS density while maintaining geometric precision.

- **Standard Elements (`0.5rem` / 8px)**: Inputs, interactive buttons, tooltips, segmented control tabs, and dropdown menus.
- **Large Containers (`rounded-lg` - `1rem` / 16px)**: Standard cards, analytical preview panels, QR customization blocks, and dialog boxes.
- **Hero & Key Feature Containers (`rounded-xl` - `1.5rem` / 24px)**: Hero visual showcases, marketing callouts, and live code preview frames.
- **Capsule / Pill (`9999px`)**: Status pills, count badges, live indicators, and tag filters.

## Components

### Buttons
- **Primary**: Background `#2563EB`, text `#FFFFFF`, radius 8px, 1px solid `#2563EB`. Hover: `#1D4ED8`. Active: `#1E40AF`. Focus: 3px outer ring of `rgba(37, 99, 235, 0.25)`.
- **Secondary / Subtle**: Background `#FFFFFF`, text `#0F172A`, 1px solid `#E2E8F0`. Hover: background `#F1F5F9`, border `#CBD5E1`.
- **Ghost**: Background transparent, text `#475569`. Hover: background `#F1F5F9`, text `#0F172A`.

### Chips & Badges
- **Selected Filter Badge**: Background `rgba(79, 70, 229, 0.08)`, border 1px solid `rgba(79, 70, 229, 0.2)`, text `#4F46E5`, font `label-sm`, rounded full (`9999px`).
- **Telemetry / Live Badge**: Background `rgba(6, 182, 212, 0.1)`, text `#0891B2`, with a 6px circular dot `#06B6D4`.
- **Success Status**: Background `rgba(22, 163, 74, 0.1)`, text `#15803D`.

### Form Inputs & Selectors
- **Text & URL Inputs**: Background `#FFFFFF`, height 42px, radius 8px, border 1px solid `#E2E8F0`, typography `body-md`, placeholder color `#94A3B8`. Focus state: border `#2563EB` with `0 0 0 3px rgba(37, 99, 235, 0.15)`.
- **Validation State**: Success indicators leverage a checkmark icon in `#16A34A` and border `#16A34A`.

### Checkboxes & Radios
- **Unchecked**: 18px square (or circle for radio), 1.5px solid `#CBD5E1`, background `#FFFFFF`.
- **Checked**: Background `#2563EB`, border `#2563EB`, white glyph. Transition duration: 150ms ease.

### Cards & Configuration Panels
- Composed of `#FFFFFF` fill, 1px `#E2E8F0` border, `rounded-lg` (16px) or `rounded-xl` (24px). Internal padding follows `space-lg` (24px).

### QR Live Preview Canvas (Product Specific)
- Contained within a `rounded-lg` white surface bordered with `#E2E8F0`. Features a centered white viewport with generous safe margin (32px) around the QR matrix. Supports an optional subtle checkerboard background (`#F1F5F9` and `#FFFFFF`) outside the QR quiet zone to verify transparent export formats (PNG, SVG, EPS).