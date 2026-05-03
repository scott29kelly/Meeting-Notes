import { describe, expect, it } from 'vitest';
import { CATEGORY_IDS } from '../config/categories';
import type { Item, NotebookState } from '../types';
import { buildReportSections, hasAnyContent, renderReport } from './report';

function emptyState(): NotebookState {
  return CATEGORY_IDS.reduce((acc, id) => {
    acc[id] = [];
    return acc;
  }, {} as NotebookState);
}

function item(text: string, subpoints: string[] = []): Item {
  return {
    id: `item-${text}`,
    text,
    subpoints: subpoints.map((s, i) => ({ id: `sub-${text}-${i}`, text: s })),
  };
}

const FIXED_DATE = new Date('2026-05-06T12:00:00Z'); // Wednesday

describe('buildReportSections', () => {
  it('skips categories with no items', () => {
    const state = emptyState();
    state.prayer = [item('Sarah')];
    const sections = buildReportSections(state);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.id).toBe('prayer');
  });

  it('drops items with whitespace-only text', () => {
    const state = emptyState();
    state.prayer = [item('   '), item('Sarah'), item('')];
    const sections = buildReportSections(state);
    expect(sections[0]?.items.map((i) => i.text)).toEqual(['Sarah']);
  });

  it('drops empty subpoints but keeps the parent item', () => {
    const state = emptyState();
    state.prayer = [item('Sarah', ['   ', 'Cards welcome', ''])];
    const sections = buildReportSections(state);
    expect(sections[0]?.items[0]?.subpoints).toEqual(['Cards welcome']);
  });

  it('preserves the configured category order, not insertion order', () => {
    const state = emptyState();
    state.youth_ministry = [item('Retreat')];
    state.prayer = [item('Sarah')];
    state.budget = [item('Q1 giving')];
    const sections = buildReportSections(state);
    expect(sections.map((s) => s.id)).toEqual(['prayer', 'budget', 'youth_ministry']);
  });
});

describe('hasAnyContent', () => {
  it('is false for an empty state', () => {
    expect(hasAnyContent(emptyState())).toBe(false);
  });

  it('is false when items are whitespace-only', () => {
    const state = emptyState();
    state.prayer = [item('   ')];
    expect(hasAnyContent(state)).toBe(false);
  });

  it('is true when any category has at least one non-empty item', () => {
    const state = emptyState();
    state.last_sunday = [item('412')];
    expect(hasAnyContent(state)).toBe(true);
  });
});

describe('renderReport — v1 paste contract', () => {
  // The v1 paste contract (PRODUCT.md §"Output fidelity is non-negotiable"):
  //   1. Emoji-prefixed section headers
  //   2. Bulleted items (HTML <ul><li>)
  //   3. Indented sub-bullets (nested <ul><li>)
  // Plus the document title line and the dated subtitle. Staff have eighteen
  // months of muscle memory for this format; these tests are the guardrail.

  function fullState(): NotebookState {
    const state = emptyState();
    state.prayer = [
      item('Sarah Mitchell — recovery from surgery', ['Cards welcome']),
      item('Pastor Tim — sabbatical begins June 1'),
    ];
    state.budget = [item('Q1 giving up 8% YoY')];
    state.last_sunday = [item('Attendance 412 (4-week avg 387)')];
    return state;
  }

  it('HTML preserves the document title', () => {
    const { html } = renderReport(fullState(), FIXED_DATE);
    // Title line, exact text. The pipe-vs-middot separator is currently
    // &middot; (·) — locked here so any future change is intentional.
    expect(html).toContain('Bucks Church &middot; Staff Meeting Notes');
  });

  it('HTML includes the meeting date in long form', () => {
    const { html } = renderReport(fullState(), FIXED_DATE);
    expect(html).toContain('Wednesday, May 6, 2026');
  });

  it('HTML uses emoji-prefixed uppercase section headers', () => {
    const { html } = renderReport(fullState(), FIXED_DATE);
    expect(html).toContain('🙏 PRAYER REQUESTS');
    expect(html).toContain('💰 BUDGET');
    expect(html).toContain('⏪ LAST SUNDAY');
  });

  it('HTML wraps items in <ul><li> bullets', () => {
    const { html } = renderReport(fullState(), FIXED_DATE);
    expect(html).toMatch(/<ul[^>]*>\s*<li[^>]*>Sarah Mitchell/);
  });

  it('HTML nests sub-bullets as a nested <ul><li>', () => {
    const { html } = renderReport(fullState(), FIXED_DATE);
    // Item with one subpoint: <li>...text...<ul><li>sub</li></ul></li>
    expect(html).toMatch(
      /Sarah Mitchell[^<]*<ul[^>]*>\s*<li[^>]*>Cards welcome<\/li>\s*<\/ul>/,
    );
  });

  it('HTML escapes user-supplied special characters', () => {
    const state = emptyState();
    state.prayer = [item("Mother's Day & <script>alert(1)</script>")];
    const { html } = renderReport(state, FIXED_DATE);
    expect(html).not.toContain('<script>');
    expect(html).toContain('Mother&#39;s Day &amp; &lt;script&gt;');
  });

  it('plain text starts with the title and date', () => {
    const { plain } = renderReport(fullState(), FIXED_DATE);
    const lines = plain.split('\n');
    expect(lines[0]).toBe('Bucks Church | Staff Meeting Notes');
    expect(lines[1]).toBe('Wednesday, May 6, 2026');
  });

  it('plain text marks items with "- " and sub-items with four-space "    - "', () => {
    const { plain } = renderReport(fullState(), FIXED_DATE);
    expect(plain).toContain('- Sarah Mitchell — recovery from surgery');
    expect(plain).toContain('    - Cards welcome');
    expect(plain).toContain('- Pastor Tim — sabbatical begins June 1');
  });

  it('plain text includes the emoji-prefixed uppercase headers', () => {
    const { plain } = renderReport(fullState(), FIXED_DATE);
    expect(plain).toContain('🙏 PRAYER REQUESTS');
    expect(plain).toContain('💰 BUDGET');
  });

  it('does not emit headers for empty categories', () => {
    const state = emptyState();
    state.prayer = [item('Sarah')];
    const { html, plain } = renderReport(state, FIXED_DATE);
    expect(html).not.toContain('BUDGET');
    expect(plain).not.toContain('BUDGET');
  });

  it('renders empty state with title only and no section blocks', () => {
    const { html, plain } = renderReport(emptyState(), FIXED_DATE);
    expect(html).toContain('Bucks Church &middot; Staff Meeting Notes');
    expect(html).not.toContain('<ul');
    expect(plain).not.toMatch(/^- /m);
  });

  it('full plain-text snapshot — locks the entire paste contract', () => {
    // This snapshot is the load-bearing test. If it changes, staff muscle
    // memory changes. Update this string deliberately, with intent.
    const { plain } = renderReport(fullState(), FIXED_DATE);
    expect(plain).toBe(
      [
        'Bucks Church | Staff Meeting Notes',
        'Wednesday, May 6, 2026',
        '',
        '----------------------------------------',
        '',
        '🙏 PRAYER REQUESTS',
        '- Sarah Mitchell — recovery from surgery',
        '    - Cards welcome',
        '- Pastor Tim — sabbatical begins June 1',
        '',
        '💰 BUDGET',
        '- Q1 giving up 8% YoY',
        '',
        '⏪ LAST SUNDAY',
        '- Attendance 412 (4-week avg 387)',
      ].join('\n'),
    );
  });
});
