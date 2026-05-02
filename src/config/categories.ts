import type { CategoryDefinition, CategoryId } from '../types';

export const CATEGORIES: readonly CategoryDefinition[] = [
  { id: 'prayer', name: 'Prayer Requests', emoji: '🙏', placeholder: 'Who are we lifting up this week?' },
  { id: 'body_concerns', name: 'Body Concerns / Updates', emoji: '❤️', placeholder: 'Health updates, hospital visits, recoveries.' },
  { id: 'budget', name: 'Budget', emoji: '💰', placeholder: 'Giving, expenses, line items to discuss.' },
  { id: 'last_sunday', name: 'Last Sunday', emoji: '⏪', placeholder: 'Attendance, response, what worked, what needs follow-up.' },
  { id: 'this_sunday', name: 'This Coming Sunday', emoji: '⏩', placeholder: 'Speaker, theme, special elements, logistics.' },
  { id: 'large_events', name: 'Large Upcoming Events', emoji: '🎉', placeholder: 'Retreats, outreach, baptisms, conferences.' },
  { id: 'small_groups', name: 'Small Groups / Community', emoji: '🏘️', placeholder: 'Group launches, leader notes, attendance trends.' },
  { id: 'facilities', name: 'Facilities', emoji: '🛠️', placeholder: 'Repairs, scheduling conflicts, access issues.' },
  { id: 'media', name: 'Media / Communication', emoji: '📱', placeholder: 'Announcements, social, email blasts, livestream.' },
  { id: 'mens_ministry', name: "Men's Ministry", emoji: '👨', placeholder: 'Studies, breakfasts, service days.' },
  { id: 'womens_ministry', name: "Women's Ministry", emoji: '👩', placeholder: 'Studies, gatherings, mentorship.' },
  { id: 'youth_ministry', name: 'Youth Ministry', emoji: '🧑\u200d🤝\u200d🧑', placeholder: 'Wednesday night, retreats, leader rotation.' },
  { id: 'childrens_ministry', name: "Children's Ministry", emoji: '🧒', placeholder: 'Sunday classes, volunteers, curriculum.' },
] as const;

export const CATEGORY_IDS: readonly CategoryId[] = CATEGORIES.map((c) => c.id);

export const CATEGORY_BY_ID: Readonly<Record<CategoryId, CategoryDefinition>> = Object.freeze(
  CATEGORIES.reduce<Record<CategoryId, CategoryDefinition>>((acc, def) => {
    acc[def.id] = def;
    return acc;
  }, {} as Record<CategoryId, CategoryDefinition>),
);
