import { queryOptions } from '@tanstack/react-query';
import { client } from '@/lib/api/client';

export type Granularity = Parameters<
  typeof client.api.notes.stats.$get
>[0]['query']['granularity'];

export const notesQuery = queryOptions({
  queryKey: ['notes'],
  queryFn: async () => {
    const response = await client.api.notes.$get();
    return response.json();
  },
  select: (data) => data.notes,
  refetchOnWindowFocus: false,
  staleTime: Number.POSITIVE_INFINITY,
});

export const getStatsQuery = (granularity: Granularity = 'day') =>
  queryOptions({
    queryKey: ['stats', { granularity }],
    queryFn: async () => {
      const response = await client.api.notes.stats.$get({
        query: { granularity },
      });
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
