# DESIGN.md

> Impeccable design contract for the Bucks Church meeting-notes rebuild. Read together with PRODUCT.md. All values are tokens, owned by `src/index.css`. Hard-coding any value below in a component is drift.

## Physical scene

A church administrator sits at a south-facing desk on Tuesday afternoon. Warm winter light through the blinds. Browser open. They are not in a hurry, but the meeting is tomorrow. They want the tool to recede so they can think about the people the notes describe.

This sentence forces the answer: light theme, warm not cool, calm not crisp, journal not dashboard.

## Aesthetic direction

**Field-notebook editorial.** Closer to a reporter's notebook or a parish ledger than to any productivity SaaS. Two surfaces side by side: on the left, an open ruled notebook the user writes in; on the right, the page that will land in the staff's inbox tomorrow.

This direction was chosen as the third-order rejection: faith-tech (first reflex), neutral-gray Notion (second reflex), and warm-cream serif book (also second reflex) are all explicitly avoided. Field-notebook holds the gravity of pastoral work without theming faith, and earns its layout from the actual artifact (a weekly meeting agenda).

## Color tokens

OKLCH first. Every neutral is tinted toward the brand hue. No `#000`, no `#fff`.

| Token | OKLCH | Role |
|---|---|---|
| `--paper` | `oklch(0.985 0.005 85)` | Page background. Warm warm-white, not cream, not gray. |
| `--paper-rule` | `oklch(0.92 0.012 85)` | Hairline rules between sections, ruled-paper guide lines. |
| `--ink` | `oklch(0.20 0.018 245)` | Primary text. Deep ink with a faint blue undertone, never pure black. |
| `--ink-soft` | `oklch(0.42 0.018 245)` | Secondary text, labels, metadata. |
| `--ink-faint` | `oklch(0.58 0.014 245)` | Placeholder text, disabled states. |
| `--accent` | `oklch(0.45 0.13 25)` | Single accent, the only saturated color in the system. Oxblood / iron-oxide; reads as ink-on-paper notation, not as a brand mark. |
| `--accent-soft` | `oklch(0.94 0.025 25)` | Tinted background for the active section indicator. |
| `--surface-aged` | `oklch(0.965 0.012 80)` | Secondary surface for the document preview, very slightly warmer than `--paper`. |
| `--success` | `oklch(0.55 0.10 155)` | Saved-state confirmations only. Never decorative. |
| `--danger` | `oklch(0.50 0.16 25)` | Destructive confirmation only (clear all). |
| `--focus-ring` | `oklch(0.55 0.16 245)` | 2px ring on keyboard focus. Distinct from accent so it never reads as a state. |

**Color strategy: Restrained.** Tinted neutrals plus a single accent under 10% of any surface. The accent appears on the active category marker, the primary action, and the destructive confirmation; nowhere else.

## Typography

Three families, each earning its place. No Inter.

| Family | Weights | Role |
|---|---|---|
| **Geist Sans** | 400, 500, 600 | UI body, form inputs, labels, buttons. Modern grotesque, neutral but distinctive, not a category cliche. |
| **Geist Mono** | 500 | Category labels, item numbering, draft-status metadata. Reads as marginalia, anchors the notebook metaphor. |
| **Newsreader** | 400, 500 italic, 600 | Document preview only. Variable serif designed for screen reading; gives the output the feel of a printed page rather than a UI panel. |

**Type scale (rem, ratio 1.2):**

```
--text-2xs:   0.6875rem  /* 11px - mono labels, draft timestamp */
--text-xs:    0.8125rem  /* 13px - helper copy, hints           */
--text-sm:    0.9375rem  /* 15px - default body                  */
--text-base:  1.0625rem  /* 17px - input text, output body       */
--text-lg:    1.25rem    /* 20px - section headings              */
--text-xl:    1.5rem     /* 24px - page meta in preview          */
--text-2xl:   2rem       /* 32px - document title in preview     */
```

Body line length capped at 68ch in the preview, 56ch in editor inputs. Mono labels stay at all-caps tracking 0.04em.

## Spacing

8px base unit, modular but not monotone. Section gutters intentionally larger than within-section gaps to set rhythm.

```
--space-1:  0.25rem   /* 4px  */
--space-2:  0.5rem    /* 8px  */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.5rem    /* 24px */
--space-6:  2rem      /* 32px */
--space-8:  3rem      /* 48px */
--space-10: 4.5rem    /* 72px - section breaks in editor */
--space-12: 6rem      /* 96px - top of preview document  */
```

Padding within form rows is intentionally tight (`--space-3` vertical, `--space-4` horizontal) so a long category fits on screen without scrolling. Padding between categories is generous (`--space-10`) so the user always knows which section they are in.

## Layout

Two-pane split on desktop, stacked on mobile.

- **Desktop (>= 960px):** 60/40 split. Left pane is the editor (notebook). Right pane is the live document preview, sticky to the viewport top, scrolling internally.
- **Tablet (640&ndash;959px):** Single column. Preview collapses to a "Show preview" disclosure under the toolbar.
- **Mobile (< 640px):** Single column, preview always collapsed by default. Sticky bottom action bar (Generate, Save, Clear).

No card grid. The thirteen categories render as a continuous vertical document with hairline `--paper-rule` separators. Active category gets a left-aligned mono index marker (e.g. `04 / Last Sunday`); no side-stripe accents on the row itself.

## Components

Built from semantic HTML primitives. No component library. Every interactive element ships with default, hover, focus, active, disabled, and (where async) loading states.

- **Inputs** look like ruled lines. Border-bottom only at rest, full hairline border on focus, accent-color underline 1px on active edit. Placeholder uses `--ink-faint`.
- **Buttons** come in three weights:
  - `primary` (Generate): solid ink fill, paper text, no shadow. Hover: lifts to accent fill.
  - `secondary` (Save, Load): bordered, ink text, paper fill. Hover: surface-aged fill.
  - `quiet` (Add item, Add subpoint, row delete): text-only with a leading 1ch indicator. Hover: ink-soft.
- **Confirm dialog** uses the native `<dialog>` element with `showModal()` for free focus trap and Escape handling. Backdrop is a 12% ink wash; dialog itself is paper with a `--paper-rule` hairline border.
- **Toast** for autosave confirmation. Bottom-left, mono `--text-2xs`, fades after 1.4s. Never blocks the page.
- **Document preview** mimics a printed page: paper inset on `--surface-aged`, `--space-12` top padding, Newsreader body, no UI affordances inside the page itself.

## Motion

- Transitions: 180ms `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint). Never bounce, never elastic.
- Animated properties only: `opacity`, `transform`, `color`, `background-color`, `border-color`. Never `width`, `height`, `padding`, `margin`.
- Skeleton or spinner: not used. Every action in this app completes synchronously.
- `prefers-reduced-motion: reduce` cuts all transitions to 0ms via a media query at the bottom of `index.css`.

## Iconography

Lucide React, stroke 1.5, size 16px in line with text. Icons appear only on action buttons (Save, Load, Clear, Copy, Add) and as the `+` indicator on quiet-button affordances. Categories use no icons in the editor; the emoji from PRODUCT.md appears only in the preview and pasted output, where the staff already expects it.

## States that must exist

- Empty editor (first-run): every category renders with one empty row, placeholder text, no error.
- Draft restored: small mono toast confirms restore, no modal.
- Generate with no content: in-place hint above the toolbar, never an alert dialog.
- Copy success: button label flips to `Copied` for 1.4s, no toast.
- Clear all: native confirm dialog, danger-styled primary, focus returns to first input.

## What this design refuses

- Side-stripe colored borders on rows or sections (banned outright).
- Gradient text or gradient buttons (banned outright).
- Drop shadows on cards (the system uses hairline rules, not elevation).
- Any card nested in another card.
- Any modal that is not a confirmation of a destructive action.
- Emoji in the editor chrome (only the data emoji from PRODUCT.md surface, in the preview and the paste output).
- A dark mode toggle in this milestone. Light theme is the design; dark mode would be a separate, deliberate redesign.
