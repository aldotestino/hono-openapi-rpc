import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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

const chartConfig = {
  notes: {
    label: 'Notes',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function NotesStats() {
  const [granularity, setGranularity] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');
  const { data: stats } = useQuery(getStatsQuery(granularity));

  return (
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
        <BarChart accessibilityLayer data={stats?.stats}>
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
  );
}

export default NotesStats;
