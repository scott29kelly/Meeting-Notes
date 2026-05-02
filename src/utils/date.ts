const MEETING_DAY = 3;

export function getNextMeetingDate(now: Date = new Date()): Date {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = today.getDay();
  if (dayOfWeek === MEETING_DAY) {
    return today;
  }
  const daysUntil = (MEETING_DAY - dayOfWeek + 7) % 7;
  const next = new Date(today);
  next.setDate(today.getDate() + daysUntil);
  return next;
}

export function formatMeetingDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}
