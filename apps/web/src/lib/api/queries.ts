import { client } from "@/lib/api/client";
import { queryOptions } from "@tanstack/react-query";

export const notesQuery = queryOptions({
  queryKey: ["notes"],
  queryFn: async () => {
    const response = await client.api.notes.$get();
    return response.json();
  },
  select: (data) => data.notes,
  refetchOnWindowFocus: false,
})