import { CATEGORIES, CATEGORY_BY_ID } from '../config/categories';
import type { CategoryId, NotebookState } from '../types';
import { formatMeetingDate } from './date';

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch] ?? ch);
}

export interface ReportSection {
  id: CategoryId;
  name: string;
  emoji: string;
  items: { text: string; subpoints: string[] }[];
}

export function buildReportSections(state: NotebookState): ReportSection[] {
  const sections: ReportSection[] = [];
  for (const def of CATEGORIES) {
    const items = state[def.id]
      .map((item) => ({
        text: item.text.trim(),
        subpoints: item.subpoints.map((s) => s.text.trim()).filter(Boolean),
      }))
      .filter((entry) => entry.text.length > 0);
    if (items.length === 0) continue;
    sections.push({ id: def.id, name: def.name, emoji: def.emoji, items });
  }
  return sections;
}

export function hasAnyContent(state: NotebookState): boolean {
  for (const id of Object.keys(state) as CategoryId[]) {
    if (state[id].some((item) => item.text.trim().length > 0)) return true;
  }
  return false;
}

export interface RenderedReport {
  html: string;
  plain: string;
}

export function renderReport(state: NotebookState, meetingDate: Date): RenderedReport {
  const sections = buildReportSections(state);
  const dateLine = formatMeetingDate(meetingDate);

  const htmlParts: string[] = [
    '<div style="font-family: Georgia, serif; color: #232128; line-height: 1.6;">',
    '<div style="font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">Bucks Church &middot; Staff Meeting Notes</div>',
    `<div style="font-size: 14px; color: #5b5b66; margin-top: 4px;">${escapeHtml(dateLine)}</div>`,
    '<hr style="border: none; border-top: 1px solid #d8d4cb; margin: 16px 0 24px 0;" />',
  ];

  const plainParts: string[] = [
    'Bucks Church | Staff Meeting Notes',
    dateLine,
    '',
    '----------------------------------------',
    '',
  ];

  sections.forEach((section, index) => {
    if (index > 0) {
      htmlParts.push('<div style="height: 18px;"></div>');
      plainParts.push('');
    }
    const def = CATEGORY_BY_ID[section.id];
    const heading = `${def.emoji} ${section.name.toUpperCase()}`;
    htmlParts.push(
      `<div style="font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">${escapeHtml(heading)}</div>`,
    );
    htmlParts.push('<ul style="margin: 6px 0 0 0; padding-left: 22px;">');
    plainParts.push(heading);
    section.items.forEach((item) => {
      htmlParts.push(`<li style="margin-top: 4px;">${escapeHtml(item.text)}`);
      plainParts.push(`- ${item.text}`);
      if (item.subpoints.length > 0) {
        htmlParts.push('<ul style="margin: 4px 0 0 0; padding-left: 22px;">');
        for (const sub of item.subpoints) {
          htmlParts.push(`<li>${escapeHtml(sub)}</li>`);
          plainParts.push(`    - ${sub}`);
        }
        htmlParts.push('</ul>');
      }
      htmlParts.push('</li>');
    });
    htmlParts.push('</ul>');
  });

  htmlParts.push('</div>');

  return {
    html: htmlParts.join(''),
    plain: plainParts.join('\n'),
  };
}
