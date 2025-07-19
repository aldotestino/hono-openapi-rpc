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
      return subYears(today, 10);
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
  const grouped = Object.groupBy(notes, (note) =>
    getPeriodByGranularity(note.createdAt, granularity)
  );

  return Object.entries(grouped).map(([period, n]) => ({
    period,
    notes: n?.length ?? 0,
  }));
};
