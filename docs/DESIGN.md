---
name: Pulsewatch Design System
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#b090ff'
  on-tertiary-container: '#4600a7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-serif-lg:
    fontFamily: 'Fraunces'
    fontSize: 56px
    fontWeight: '500'
    lineHeight: '1.05'
    letterSpacing: -0.01em
    note: 'Editorial display serif. Reserve the italic cut for the one accented phrase per headline — never whole lines.'
  display-serif-md:
    fontFamily: 'Fraunces'
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.005em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  eyebrow-mono:
    fontFamily: 'JetBrains Mono'
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.08em
    textTransform: uppercase
    note: 'Used for kicker labels, meta rows, and card index tags. Segments joined with a middot ( · ), never a pipe.'
  index-numeral:
    fontFamily: 'Fraunces'
    fontSize: 34px
    fontWeight: '400'
    fontStyle: italic
    lineHeight: '1'
    note: 'Big stat numerals and section index digits (01, 02…). Pair with an eyebrow-mono caption underneath.'
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a high-performance uptime and status monitoring platform. The brand personality is **vigilant, technical, and premium** — but the expression is **editorial**, not cockpit-glass. Pulsewatch reads like a well-typeset engineering journal: hairline-bordered panels, generous margins, a serif display face for authored moments, and monospace for anything measured.

The visual style is **Structured Editorial**. Depth comes from thin 1px borders and tonal steps between surfaces, not from blur or glow. Every panel is a defined rectangle you could trace with a pencil. Numerals do real work: section index digits, big stat figures, and per-card tags (`T-01`, `01`, `02`…) give the page a sense of catalogued, versioned precision — this is a system that counts things.

Color is treated as **signal, not atmosphere**. The obsidian base and quiet neutrals hold the page together; primary green and secondary blue only appear where they mean something — a status, a link, an accent italic in a headline. Nothing pulses or glows just to look alive; motion and color are reserved for real state.

## Colors

The palette is unchanged from the platform's core tokens — only how it's _applied_ changes with this style.

- **Primary (Uptime Green):** `#10B981` / bright variant `#4EDEA3` — used for "Healthy" status, primary buttons, the italic accent word in headlines, and index numerals that need emphasis.
- **Secondary (Monitoring Blue):** `#3B82F6`-family (`secondary` `#ADC6FF` on dark) — data links, focus rings, configuration affordances.
- **Surface Tones:** Base floor `#0A0A0B` / `surface` `#131314`. Panels step up through `surface-container` (`#201F20`) and `surface-container-high` (`#2A2A2B`) — flat fills, no transparency, no blur.
- **Borders carry the hierarchy:** `outline-variant` (`#3C4A42`, ~1px, low-contrast) frames resting panels; `outline` (`#86948A`) marks hover/focus or emphasized dividers.
- **Contrast Accents:** Reserve saturated green/blue for status dots, active links, and CTA fills. Everything else stays neutral so those signals read instantly.

## Typography

**Fraunces** (or an equivalent high-contrast editorial serif) is the display voice — used sparingly, for hero headlines, section titles, big stat numerals, and card index numbers. Set it at a generous size with tight leading; use the italic cut for exactly one emphasized phrase per headline (e.g. "you can trust." in italic green), never for full lines or body copy.

**Inter** remains the workhorse for body copy, UI labels, buttons, and headings below the display tier — neutral and legible at data-dense sizes.

**JetBrains Mono** is elevated to a structural role, not just a data font: it sets every eyebrow/kicker label, section number (`01 DIAGRAM TYPES`), card meta row, and keyboard-shortcut list. Mono labels are always uppercase, letter-spaced (~0.08em), and segments are separated with a middot `·`, e.g. `AGENT SKILL · DEVELOPMENT · V2.16.0`.

Hierarchy order on a page: eyebrow-mono → display-serif headline (with one italic accent) → body-md description → mono meta / tags.

## Layout & Spacing

Layout logic is unchanged (12-column fluid grid, 4px baseline, 24px desktop gutters) but panels are now **bordered grids of rectangles** rather than floating glass cards over a blurred background.

- Sections are numbered and labelled: a small `0N` eyebrow with a hairline rule extending to the section's full width precedes every major section heading.
- Large decorative index numerals (e.g. a faint oversized "01") may sit in the margin as a watermark — low opacity (~6–8%), display serif, never competing with real content.
- Feature/monitor grids use a **shared-border grid**: adjacent cards touch and share a single 1px border rather than each card having its own margin + individual border, reinforcing the "spec sheet" feel. Use `gap: 0` with `border-collapse`-style adjacency, or a 1px gap in `outline-variant` color simulating a table.
- Dark "statement" sections (CTA banners, hero proof panels) invert to a near-black fill with the same border logic, used as full-bleed punctuation between editorial sections — not as the default surface.

## Elevation & Depth

Depth is communicated through **borders and flat tonal steps**, not shadows or backdrop blur.

1.  **Level 0 (Floor):** `surface` / `#131314`, no border.
2.  **Level 1 (Panel):** `surface-container` fill, 1px solid `outline-variant` border, sharp-to-slightly-rounded corners (`rounded` / `rounded-md`). No blur, no gradient overlay.
3.  **Level 2 (Modal/Popover/Emphasized):** `surface-container-high` fill, 1px solid `outline` border (higher contrast than Level 1). Optional 1px inset highlight line at the top edge only, in `on-surface` at 6% opacity — a printed-edge cue, not a glow.
4.  **Inverse (Statement block):** `surface-container-lowest` / near-black fill, `on-surface` text, primary-colored accents only — used for hero proof panels and closing CTA bands.

Hover/focus states shift the _border_ (outline-variant → outline, or → primary/secondary) rather than adding elevation or glow.

## Shapes

Corners tighten up considerably to support the spec-sheet feel:

- **Standard Panels/Cards:** `0.25rem`–`0.375rem` (4–6px) corner radius — just enough to soften, still reads as a drafted rectangle.
- **Buttons & Inputs:** `0.25rem` (4px), or a true pill (`full`) for the primary CTA only.
- **Status Chips:** Full pill-shape (999px), unchanged — the one shape allowed to stay fully round, so status always reads as a distinct token against square panels.
- **Index/tag badges:** `0.125rem` (2px) — almost square, monospace label, like a stamped part number.

## Components

### Buttons

Primary CTA: solid fill (`primary` / near-black on light contexts, or `on-surface`-on-`primary` on dark), 4px radius by default, or a full pill when used as a standalone hero CTA. No glow on hover — background lightens one step and the border (if any) sharpens. Secondary buttons are outline-only: 1px `outline-variant` border, transparent fill, border strengthens to `outline` on hover. No ghost blur states.

### Status Indicators

Unchanged from the base system: an 8px dot inside a pill chip, mono label. The dot still pulses gently for "Healthy"/live states — this is the one element allowed a soft animated glow, since it represents a genuinely live signal, not decorative atmosphere.

### Panels (formerly "Glass Cards")

Replace glass cards with **bordered panels**: flat `surface-container` fill, 1px `outline-variant` border, no blur, no gradient sheen. A title row is separated from the body by a single 1px `outline-variant` rule. Where cards sit in a grid, prefer adjacent shared borders over per-card gaps so the grid reads as one drafted table.

Each panel may carry a small top-right or top-left **mono tag** (`T-01`, `01/05`, a version string) — this is the signature device replacing the old "beveled glass" stroke.

### Inputs

Unchanged in mechanics — recessed `rgba(0,0,0,0.2)` background, 1px border, focus ring in secondary blue — but radius drops to 4px to match the tighter shape language, and the focus glow shrinks to a crisp 2px ring rather than a soft 4px halo.

### Uptime Graphs

Unchanged: stepped interpolation, subtle vertical gradient fill in primary green below the line. Sits inside a bordered panel with a mono meta row (`LAST 24H`, endpoint, interval) above it, echoing the spec-sheet framing used everywhere else.

### Eyebrows & Meta Rows

New component class formalizing the mono-label pattern seen throughout: a small uppercase JetBrains Mono row, segments separated by `·`, optionally prefixed with a colored dot or index number. Used above headlines, inside card headers, and in footers/keyboard-shortcut lists.
