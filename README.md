# Bucks Church &middot; Staff Meeting Notes

A weekly meeting notes generator for the Bucks Church staff. Capture updates across thirteen ministry areas, watch the agenda render live, copy a richly formatted version into the team's email or chat thread.

This is the v2 rebuild on the `claude/impeccable-modernize-rebuild` branch (Claude run of the Impeccable design plugin). The original single-file v1 lives in [`legacy/index.html`](legacy/index.html) for reference.

## Stack

- Vite 5 + React 18 + TypeScript (strict)
- Tailwind CSS 3 with OKLCH design tokens defined in [`src/index.css`](src/index.css)
- Lucide icons
- localStorage drafts with autosave (no backend, single device)

Design contract is in [`PRODUCT.md`](PRODUCT.md) and [`DESIGN.md`](DESIGN.md). Both are loaded by the Impeccable skill before any visual work.

## Local development

```bash
npm install
npm run dev      # Vite dev server, default http://localhost:5173
npm run build    # Type check then production bundle into dist/
npm run preview  # Serve the production bundle locally
npm run typecheck
```

Node 20 or newer recommended.

## Project layout

```
index.html                 Vite entry
public/                    Static assets (favicon)
src/
  main.tsx                 React entry
  App.tsx                  Top-level state and orchestration
  index.css                Design tokens + Tailwind layers
  config/
    categories.ts          The thirteen meeting categories
  hooks/
    useNotebook.ts         Reducer-backed editor state
    useAutosave.ts         Debounced localStorage persistence
  components/              UI primitives, no external library
  utils/
    storage.ts             Versioned draft persistence with legacy migration
    report.ts              Plain + HTML agenda rendering
    clipboard.ts           Rich clipboard write with text fallback
    date.ts                Next-Wednesday helper
    id.ts                  crypto.randomUUID with fallback
PRODUCT.md, DESIGN.md      Impeccable design contract
legacy/index.html          Original single-file app, preserved verbatim
```

## Deployment notes

The legacy app deploys as a static `index.html` at the repo root. The v2 app is bundled by Vite into `dist/`. Whatever host serves this site (GitHub Pages, Vercel, Netlify) needs to either:

- run `npm run build` and serve `dist/`, or
- continue serving `legacy/index.html` as the public site until the deploy pipeline is updated.

No CI/CD changes are bundled in this rebuild on purpose; that is the next discrete change to make.

## What changed since v1

- Single 670-line HTML file replaced with a typed component tree.
- Brand and product context written down (`PRODUCT.md`, `DESIGN.md`) so future model runs aim at the same target.
- Field-notebook visual direction in place of the original SaaS-gradient palette.
- Live agenda preview pinned next to the editor, mobile collapses behind a disclosure.
- Native `<dialog>` confirm for clear-all (focus trap, Escape, backdrop click handled by the platform).
- Autosave with explicit "Saving / Saved at HH:MM" indicator, no manual save button needed.
- Versioned draft storage with backwards-compatible read of v1 drafts.
- Rich clipboard write keeps formatted output for email and falls back to plain text where needed.
- Reduced motion preference respected; all transitions collapse to 0ms.

## What is intentionally not here

- Dark mode. A separate redesign, not a toggle.
- Cloud sync, accounts, multi-device. Future milestone.
- Configurable categories. Future milestone.
- Tests. Vitest setup is the next sensible follow-up.
