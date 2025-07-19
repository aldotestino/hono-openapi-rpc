import { format, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import type { Note } from 'db/schema';
import { z } from 'zod/v4';

export const statsSchema = z.object({
  period: z.string(),
  notes: z.number(),
});

export const granularitySchema = z
  .enum(['day', 'week', 'month', 'year'])
  .default('day');

type Granularity = z.infer<typeof granularitySchema>;

export const getPeriodStart = (granularity: Granularity) => {
  const today = new Date();

  switch (granularity) {
    case 'day':
      return subDays(today, 10);
    case 'week':
      return subWeeks(today, 10);
    case 'month':
      return subMonths(today, 10);
    default:
      return subYears(today, 5);
  }
};

export const getPeriodByGranularity = (
  date: Date | string,
  granularity: Granularity
) => {
  switch (granularity) {
    case 'day':
      return format(date, 'MMM d');
    case 'week':
      return `Week ${format(date, 'w')}`;
    case 'month':
      return format(date, 'MMM');
    default:
      return format(date, 'yyyy');
  }
};

export const getNotesByPeriod = (notes: Note[], granularity: Granularity) => {
  const grouped = new Map<string, number>();

  for (const note of notes) {
    const period = getPeriodByGranularity(note.createdAt, granularity);
    grouped.set(period, (grouped.get(period) || 0) + 1);
  }

  return Array.from(grouped, ([period, count]) => ({ period, notes: count }));
};
