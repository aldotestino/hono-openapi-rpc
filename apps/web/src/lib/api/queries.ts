import { queryOptions } from '@tanstack/react-query';
import { client } from '@/lib/api/client';

export const notesQuery = queryOptions({
  queryKey: ['notes'],
  queryFn: async () => {
    const response = await client.api.notes.$get();
    return response.json();
  },
  select: (data) => data.notes,
  refetchOnWindowFocus: false,
});
