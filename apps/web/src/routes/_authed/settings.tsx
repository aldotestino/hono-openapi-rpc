import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getStatsQuery } from '@/lib/api/queries';
import { authClient } from '@/lib/auth';

const chartConfig = {
  notes: {
    label: 'Notes',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export const Route = createFileRoute('/_authed/settings')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(getStatsQuery());
  },
});

function RouteComponent() {
  const { data } = authClient.useSession();

  const [granularity, setGranularity] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');
  const {
    data: { stats, total },
  } = useSuspenseQuery(getStatsQuery(granularity));

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="size-32">
          <AvatarImage src={data?.user.image || undefined} />
          <AvatarFallback className="font-semibold text-4xl">
            {data?.user.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h2 className="font-semibold text-4xl">{data?.user.name}</h2>
          <p className="text-lg text-muted-foreground">{data?.user.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Connector</p>
          {data?.provider === 'github' ? (
            <div className="flex items-center gap-1">
              <FaGithub className="size-4" />
              <p className="font-semibold">GitHub</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <KeyRound className="size-4" />
              <p className="font-semibold">Credentials</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Joined On</p>
          <p className="font-semibold">
            {format(data?.user.createdAt || new Date(), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Notes</p>
          <p className="font-semibold">{total}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl">Notes per {granularity}</p>
          <Select
            onValueChange={(value) =>
              setGranularity(value as 'day' | 'week' | 'month' | 'year')
            }
            value={granularity}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a granularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={stats}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="period"
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="notes" fill="var(--color-notes)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
