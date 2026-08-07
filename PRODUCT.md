# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user is a church administrator or operations lead preparing weekly staff meeting notes for Bucks Church. They usually work at a desktop or laptop, once a week, with occasional mobile edits before the meeting.

They are comfortable with web forms and copy/paste workflows, but they should not need to think about configuration, accounts, syncing, or technical details. The tool handles pastoral care notes, budget updates, Sunday recaps, ministry updates, and upcoming events, so the interface must feel predictable and trustworthy.

Secondary users are staff readers who only see the generated notes after they are pasted into email, chat, or another document.

## Product Purpose

This product turns scattered weekly updates into one clean staff meeting agenda. The user enters notes by category, adds optional subpoints, saves a draft locally, generates formatted notes, and copies the result for sharing.

Success means the user can capture updates quickly, recover a saved draft, avoid accidental deletion, and produce a readable agenda without reformatting the output by hand.

## Positioning

A single-purpose tool that produces one document well, with no account to create and no service to depend on. It is one static HTML file with no build step, no framework, no backend, and no external requests — it can be opened from disk and it will keep working years from now regardless of what happened to any vendor. A general note-taking app or church-management suite would require sign-up, sync, and ongoing subscription to do this one weekly job worse.

## Operating Context

The rhythm is weekly and deadline-bound: notes get assembled shortly before a staff meeting, often under mild time pressure, sometimes finished on a phone on the way in. The user is a non-technical administrator handling genuinely sensitive material — pastoral care notes about real congregants, and budget figures — so the tool must never surprise them, and content must never leave the machine unless they deliberately copy it out.

The output is the point: the generated agenda gets pasted into email, chat, or a document, where staff read it without ever visiting this tool. Formatting must survive that paste cleanly.

Drafts persist in `localStorage` only. There is no account, no sync, and no server, which means a cleared browser or a different device loses the draft. Save and load behavior therefore has to be obvious and dependable, and destructive actions need real friction.

## Capabilities and Constraints

Confirmed: categorized note entry with optional subpoints, local draft save and load, agenda generation, and copy-to-clipboard for sharing. Categories cover pastoral care, budget, Sunday recap, ministry updates, and upcoming events.

Hard constraints:

- **Single-file static frontend.** The entire product is `index.html` — roughly 1,200 lines, no build step, no bundler. It stays that way. Not React, Next.js, Vite, or any other app shell.
- **No external requests.** There are currently zero remote scripts, stylesheets, or fonts. Keep it that way; the tool must work offline and from disk.
- **`localStorage` is the only persistence.** No accounts, no server, no sync, no cross-device recovery.

## Brand Personality

Calm, practical, and attentive. The product should feel like a well-kept staff notebook: quiet enough to support focused writing, structured enough to prevent missed categories, and clear enough for a non-technical user.

The voice is direct and specific. It avoids hype, exclamation-heavy feedback, faith-themed decoration, and clever copy that makes routine work feel heavier than it is.

## Anti-references

- Faith-tech kitsch: no crosses, doves, sunbeams, stained-glass palettes, or inspirational chrome.
- Generic SaaS dashboard: no hero metrics, decorative gradients, glass panels, or identical icon-card grids.
- The previous visual style: no bright gradient header, heavy shadows, scaling hover buttons, or instruction-heavy card layout.
- Framework migration: this remains a single-file static frontend, not React, Next.js, Vite, or another app shell.
- Editorial paper cosplay: avoid ornate church bulletin styling, blackletter, or decorative book aesthetics.

## Evidence on Hand

- Working implementation: `index.html`, self-contained, no external dependencies.
- Real category structure drawn from an actual weekly staff meeting agenda at Bucks Church.
- Recorded improvement backlog: `IMPROVEMENT_SUGGESTIONS.md`.

Absences that future work must not fabricate:

- No real meeting content, pastoral care notes, congregant names, or budget figures may be used as sample or placeholder data. This tool handles confidential material about identifiable people; demo content must be plainly invented and obviously generic.
- No user counts, adoption figures, testimonials, or endorsements from the church or its staff.
- No claim of affiliation with, or approval by, Bucks Church as an institution beyond its use as the originating context.
- No implication that drafts are backed up, synced, or recoverable from anywhere other than this browser's local storage.

## Product Principles

1. **The generated agenda is the outcome.** The editor exists to produce that document cleanly; everything else is secondary.
2. **Fast entry beats decoration.** It should be obvious where to type next and how to add a subpoint, with no thinking required.
3. **Local resilience is the whole safety story.** With no server behind it, save and load must be dependable and legible, and the user must understand where their draft lives.
4. **Destructive actions need friction.** Clearing notes requires clear confirmation and a safe way back.
5. **Stay one file.** Every proposed improvement must survive the constraint of a single static HTML document with no build step.

## Design Principles

1. The generated agenda is the outcome. The editor exists to help the user produce that document cleanly.
2. Fast entry beats decoration. The page should make it obvious where to type next and how to add subpoints.
3. Local resilience matters. Save and load draft behavior must remain obvious and dependable.
4. Destructive actions need friction. Clearing notes requires clear confirmation and a safe way out.
5. Keyboard access is part of the workflow. Focus states, tab order, and Escape behavior should be visible and predictable.

## Accessibility & Inclusion

Target WCAG AA for contrast, focus visibility, labels, touch targets, and keyboard navigation. Do not rely on color alone to communicate state. Use plain language for empty, success, warning, and error messages. Respect reduced motion preferences.
