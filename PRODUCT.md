# Product

## Register

product

## Users

The primary user is a church administrator or operations lead preparing weekly staff meeting notes for Bucks Church. They usually work at a desktop or laptop, once a week, with occasional mobile edits before the meeting.

They are comfortable with web forms and copy/paste workflows, but they should not need to think about configuration, accounts, syncing, or technical details. The tool handles pastoral care notes, budget updates, Sunday recaps, ministry updates, and upcoming events, so the interface must feel predictable and trustworthy.

Secondary users are staff readers who only see the generated notes after they are pasted into email, chat, or another document.

## Product Purpose

This product turns scattered weekly updates into one clean staff meeting agenda. The user enters notes by category, adds optional subpoints, saves a draft locally, generates formatted notes, and copies the result for sharing.

Success means the user can capture updates quickly, recover a saved draft, avoid accidental deletion, and produce a readable agenda without reformatting the output by hand.

## Brand Personality

Calm, practical, and attentive. The product should feel like a well-kept staff notebook: quiet enough to support focused writing, structured enough to prevent missed categories, and clear enough for a non-technical user.

The voice is direct and specific. It avoids hype, exclamation-heavy feedback, faith-themed decoration, and clever copy that makes routine work feel heavier than it is.

## Anti-references

- Faith-tech kitsch: no crosses, doves, sunbeams, stained-glass palettes, or inspirational chrome.
- Generic SaaS dashboard: no hero metrics, decorative gradients, glass panels, or identical icon-card grids.
- The previous visual style: no bright gradient header, heavy shadows, scaling hover buttons, or instruction-heavy card layout.
- Framework migration: this remains a single-file static frontend, not React, Next.js, Vite, or another app shell.
- Editorial paper cosplay: avoid ornate church bulletin styling, blackletter, or decorative book aesthetics.

## Design Principles

1. The generated agenda is the outcome. The editor exists to help the user produce that document cleanly.
2. Fast entry beats decoration. The page should make it obvious where to type next and how to add subpoints.
3. Local resilience matters. Save and load draft behavior must remain obvious and dependable.
4. Destructive actions need friction. Clearing notes requires clear confirmation and a safe way out.
5. Keyboard access is part of the workflow. Focus states, tab order, and Escape behavior should be visible and predictable.

## Accessibility & Inclusion

Target WCAG AA for contrast, focus visibility, labels, touch targets, and keyboard navigation. Do not rely on color alone to communicate state. Use plain language for empty, success, warning, and error messages. Respect reduced motion preferences.
