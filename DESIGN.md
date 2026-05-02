---
name: Bucks Church Meeting Notes
description: A calm static workbench for preparing weekly staff meeting notes.
colors:
  paper: "oklch(0.985 0.006 84)"
  surface: "oklch(0.965 0.008 84)"
  surface-raised: "oklch(0.995 0.004 84)"
  rule: "oklch(0.84 0.012 84)"
  ink: "oklch(0.22 0.018 245)"
  ink-muted: "oklch(0.43 0.015 245)"
  ink-faint: "oklch(0.56 0.012 245)"
  accent: "oklch(0.43 0.105 32)"
  accent-soft: "oklch(0.93 0.026 32)"
  success: "oklch(0.48 0.095 154)"
  danger: "oklch(0.47 0.135 25)"
  warning: "oklch(0.55 0.09 72)"
  focus: "oklch(0.53 0.13 250)"
typography:
  display:
    fontFamily: "Georgia, Cambria, 'Times New Roman', serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0"
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Bucks Church Meeting Notes

## 1. Overview

**Creative North Star: "The Staff Notebook"**

The interface should feel like a focused workbench for turning weekly fragments into a finished agenda. It uses a light, restrained palette, clear section rhythm, and native form patterns so the user can move quickly without learning a new system.

The design rejects decorative faith imagery, generic SaaS gloss, nested cards, and animation that does not explain state. The page should look intentional but not theatrical.

**Key Characteristics:**

- Single-file static frontend with no new framework.
- Two-pane workbench on larger screens, stacked flow on smaller screens.
- Warm tinted neutrals, one oxblood accent, and clear semantic colors.
- Large touch targets, visible focus, and plain feedback messages.

## 2. Colors

The palette is restrained: warm paper surfaces, blue-tinted ink, and one oxblood accent used only for primary actions and key state.

### Primary

- **Oxblood Notation** (`oklch(0.43 0.105 32)`): Primary action hover, current emphasis, and selective active state.

### Neutral

- **Warm Paper** (`oklch(0.985 0.006 84)`): Page background.
- **Desk Surface** (`oklch(0.965 0.008 84)`): Secondary panels and output surround.
- **Clean Sheet** (`oklch(0.995 0.004 84)`): Editable surfaces and dialog body.
- **Faint Rule** (`oklch(0.84 0.012 84)`): Borders and section dividers.
- **Blue Ink** (`oklch(0.22 0.018 245)`): Primary text.
- **Soft Ink** (`oklch(0.43 0.015 245)`): Secondary text and helper copy.

### Semantic

- **Kept Green** (`oklch(0.48 0.095 154)`): Save, load, and copy success.
- **Clear Red** (`oklch(0.47 0.135 25)`): Destructive clear confirmation.
- **Review Amber** (`oklch(0.55 0.09 72)`): Empty generate warning.
- **Keyboard Blue** (`oklch(0.53 0.13 250)`): Focus ring only.

### Named Rules

**The Rare Accent Rule.** Oxblood appears on primary action and selective state only. It is not decoration.

## 3. Typography

**Display Font:** Georgia, with Cambria and Times New Roman fallbacks
**Body Font:** system-ui, with platform sans fallbacks
**Label/Mono Font:** ui-monospace, with Consolas fallback

**Character:** Native, readable, and low-friction. The serif is reserved for the generated agenda so the output feels like a document, while the editor stays practical.

### Hierarchy

- **Display** (700, 2rem, 1.12): Page title and output title.
- **Title** (700, 1.125rem, 1.25): Category names and panel headings.
- **Body** (400, 1rem, 1.55): Inputs, helper text, and generated note body.
- **Label** (700, 0.75rem, 1.2, tracked caps): Category numbers, status labels, and utility metadata.

### Named Rules

**The Editor Is Sans Rule.** Serif type belongs to generated output, not buttons, labels, or form controls.

## 4. Elevation

This system uses hairline rules and tonal surface changes instead of visible card shadows. The only depth is the native modal backdrop, which separates destructive confirmation from the page.

### Named Rules

**The Flat Workbench Rule.** Surfaces are divided by spacing, borders, and color. Drop shadows are not part of the default vocabulary.

## 5. Components

### Buttons

- **Shape:** Low radius, 6px.
- **Primary:** Solid ink with paper text. Hover moves to oxblood.
- **Secondary:** Paper fill, faint rule border, ink text.
- **Quiet:** Text button with a small leading symbol, used for add/remove row actions.
- **Focus:** 2px blue ring with visible offset.

### Cards / Containers

- **Corner Style:** 8px maximum.
- **Background:** Paper or clean sheet.
- **Shadow Strategy:** None by default.
- **Border:** One faint rule, never a colored side stripe.
- **Internal Padding:** Responsive 16px to 24px.

### Inputs / Fields

- **Style:** Full visible labels, clear placeholder, light ruled background, and a stable 44px minimum target.
- **Focus:** Full border emphasis plus focus ring.
- **Error / Disabled:** Inline messages with semantic color and text.

### Dialog

- **Style:** Native `<dialog>` for clear-note confirmation.
- **Buttons:** Specific labels: "Clear notes" and "Keep notes".
- **Behavior:** Escape closes, backdrop click closes, and focus returns to the trigger.

## 6. Do's and Don'ts

Do keep the app static, readable, keyboard-friendly, and focused on producing the weekly agenda.

Do not add a framework, use side-stripe accents, use gradient text, use glassmorphism, create nested cards, add decorative motion, or replace the established generated output format.
