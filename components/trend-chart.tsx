'use client';

import { useMemo, useState } from 'react';
import { Brush, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { aggregateWeeklyVolumes } from '@/lib/volume';
import type { VolumePoint, WeeklyVolumePoint } from '@/lib/types';

const chartConfig = {
  mathDg: { label: 'math.DG', color: 'var(--burgundy)' },
  mathMg: { label: 'math.MG', color: 'var(--teal)' },
  mathGt: { label: 'math.GT', color: 'var(--ochre)' },
} satisfies ChartConfig;

const series = [
  { key: 'mathDg', label: 'math.DG', color: 'var(--burgundy)', width: 1.7 },
  { key: 'mathMg', label: 'math.MG', color: 'var(--teal)', width: 1.7 },
  { key: 'mathGt', label: 'math.GT', color: 'var(--ochre)', width: 1.7 },
] as const;

function TooltipBody({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: WeeklyVolumePoint }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="min-w-48 rounded-[4px] border border-border bg-card p-3 text-xs shadow-lg">
      <p className="mb-0.5 font-semibold">
        {point.weekStart} 至 {point.weekEnding}
      </p>
      <p className="mb-2 text-[10px] text-muted-foreground">截至周五的完整周</p>
      <div className="space-y-1.5">
        {series.map((item) => (
          <div key={item.key} className="flex justify-between gap-5">
            <span style={{ color: item.color }}>{item.label}</span>
            <span className="font-mono font-semibold text-foreground">
              {point[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendChart({
  volumes,
  range,
}: {
  volumes: VolumePoint[];
  range: '6m' | '2y';
}) {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    mathDg: true,
    mathMg: true,
    mathGt: true,
  });
  const weekly = useMemo(() => aggregateWeeklyVolumes(volumes), [volumes]);
  const data = useMemo(
    () => (range === '6m' ? weekly.slice(-26) : weekly),
    [weekly, range],
  );
  const latest = data.at(-1);
  return (
    <div>
      <div className="mb-2 flex justify-end text-[10px] text-muted-foreground">
        最新完整周：
        {latest ? `${latest.weekStart} 至 ${latest.weekEnding}` : '暂无'}
      </div>
      <div className="mb-6 grid grid-cols-3 gap-x-5 border-y border-border sm:gap-x-6">
        {series.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={visible[item.key]}
            onClick={() =>
              setVisible((current) => ({
                ...current,
                [item.key]: !current[item.key],
              }))
            }
            className={`py-3.5 text-left transition-opacity ${visible[item.key] ? '' : 'opacity-40'}`}
          >
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span
                className="size-1.5 rounded-full"
                style={{ background: item.color }}
              />
              {item.label}／周
            </div>
            <p className="mt-1 font-serif text-2xl font-semibold tracking-tight">
              {latest?.[item.key] ?? 0}
            </p>
          </button>
        ))}
      </div>
      <ChartContainer
        config={chartConfig}
        className={
          range === '2y'
            ? 'h-[410px] w-full aspect-auto'
            : 'h-[300px] w-full aspect-auto sm:h-[320px]'
        }
      >
        <LineChart
          data={data}
          margin={{
            left: -18,
            right: 8,
            top: 8,
            bottom: range === '2y' ? 18 : 0,
          }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} strokeDasharray="2 5" />
          <XAxis
            dataKey="weekEnding"
            tickFormatter={(value: string) => value.slice(5)}
            tickLine={false}
            axisLine={false}
            minTickGap={36}
          />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
          <ChartTooltip content={<TooltipBody />} />
          {series.map((item) =>
            visible[item.key] ? (
              <Line
                key={item.key}
                dataKey={item.key}
                name={item.label}
                type="monotone"
                stroke={item.color}
                strokeWidth={item.width}
                dot={false}
                activeDot={{ r: 3 }}
              />
            ) : null,
          )}
          {range === '2y' ? (
            <Brush
              dataKey="weekEnding"
              height={22}
              travellerWidth={8}
              stroke="var(--burgundy)"
              fill="var(--background)"
              startIndex={Math.max(0, data.length - 52)}
            />
          ) : null}
        </LineChart>
      </ChartContainer>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
        {series.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() =>
              setVisible((current) => ({
                ...current,
                [item.key]: !current[item.key],
              }))
            }
            className={`flex items-center gap-1.5 ${visible[item.key] ? '' : 'line-through opacity-45'}`}
          >
            <span className="h-0.5 w-4" style={{ background: item.color }} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
