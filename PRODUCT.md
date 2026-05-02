# PRODUCT.md

> Impeccable context. Inferred from the existing application and explicit user direction (church staff meeting notes generator, single-tenant internal tool). Refresh by running `$impeccable teach` if any field below is wrong for the real organization.

## Register

`product` — design serves the task. This is an internal tool used in a focused, repeating workflow (weekly staff meeting prep). Familiarity, low cognitive load, and disappearing-into-the-task matter more than identity expression.

## Product Purpose

A church operations tool that turns scattered weekly updates (prayer needs, ministry status, budget notes, Sunday recap, upcoming events) into one well-formed agenda document, ready to paste into an email or messaging thread before the Wednesday staff gathering.

The user's job to be done: "Capture this week's updates across thirteen ministry areas in under fifteen minutes, then hand a clean agenda to the team."

## Users

The single primary user is a church administrator or operations lead at a small-to-mid-sized congregation (a "Bucks Church" deployment, generalizable to any small church staff).

- Frequency: once a week, Tuesday afternoon to Wednesday morning.
- Device split: desktop dominant (sit-down composing session), mobile occasional (last-minute edits before staff meeting).
- Technical comfort: not a developer. Comfortable with web forms and email; uninterested in configuration, accounts, or syncing.
- Stakes: pastoral care notes and budget figures pass through this tool. Trust and predictability beat novelty.

Secondary readers (the staff team) consume only the generated output, pasted into their inbox or chat. They never touch the editor.

## Tone & Voice

Considered, calm, trustworthy. The tool sits between a journal and an agenda. It should feel like a well-kept notebook a thoughtful person would carry into a meeting, not a productivity app demanding attention.

- Direct over clever.
- Quiet over enthusiastic. No exclamation points, no "Amazing!" feedback copy.
- Pastoral, not preachy. The product knows its users care for people; it does not reference faith as theming.

## Anti-References

What this product must not look or feel like.

- **The current implementation.** Bright emerald-to-green gradient header, sky-blue instruction box, primary-color shadows, oversized rounded buttons, scaling hover transforms. Reads as 2018 Bootstrap-era SaaS, not as a tool a serious operations lead would trust with pastoral notes.
- **Faith-tech kitsch.** No crosses, doves, sunbeams, stained-glass color palettes, or "inspirational" copy. The product never references religion in its chrome.
- **Generic SaaS dashboard.** No hero metrics, no card grids of identical icon-heading-text tiles, no purple-to-blue gradients, no glass cards floating over photographic backgrounds.
- **Notion or Linear cosplay.** The well-known neutral-gray productivity aesthetic is itself overdone. Avoid the reflex of mimicking it for credibility.
- **Book-of-common-prayer aesthetic.** The second-order reflex when "church + product" gets pushed away from faith-tech is warm-cream-paper plus blackletter or transitional serif. Avoid that lane too.

## Strategic Principles

1. **The output is the product.** The pasted agenda is what the staff sees. The editor exists to produce that artifact correctly. The editor's design priority is fast, structured input; the preview's design priority is to look like the finished document, not like a UI panel.
2. **Resilience by default.** Drafts persist without intervention. Closing the tab never loses work. Catastrophic actions (clear all) require explicit confirmation; everything else autosaves.
3. **No accounts, no cloud, no sync.** The current model is single-user single-device localStorage. Backend sync is a future phase, not part of this rebuild.
4. **Keyboard ergonomics matter.** A user filling thirteen categories should never need to lift their hands to add a row, jump between fields, or generate the report.
5. **Output fidelity is non-negotiable.** Existing staff have eighteen months of muscle memory for the pasted format (emoji-prefixed section headers, bulleted items, indented sub-bullets). The rebuild preserves that exact paste contract, even as the editor surface evolves.

## Categories (data contract)

Thirteen fixed categories, in this exact order, with these emoji headers in the output. Editor UI may render them differently, but the generated document keeps these names and glyphs.

1. Prayer Requests &mdash; 🙏
2. Body Concerns / Updates &mdash; ❤️
3. Budget &mdash; 💰
4. Last Sunday &mdash; ⏪
5. This Coming Sunday &mdash; ⏩
6. Large Upcoming Events &mdash; 🎉
7. Small Groups / Community &mdash; 🏘️
8. Facilities &mdash; 🛠️
9. Media / Communication &mdash; 📱
10. Men's Ministry &mdash; 👨
11. Women's Ministry &mdash; 👩
12. Youth Ministry &mdash; 🧑‍🤝‍🧑
13. Children's Ministry &mdash; 🧒

Customizing this set is a future feature, not in scope here.
