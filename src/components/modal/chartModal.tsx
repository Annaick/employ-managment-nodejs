"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, ReferenceLine, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Max",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Min",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartModal({total, max, min}: { total: number, max: number, min: number }) {
const maxValue = Math.max(total, max, min) * 1.1;
const chartData = [
    { browser: "chrome", visitors: total, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: max, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: min, fill: "var(--color-firefox)" },
  ]
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Histogramme - Salaire</CardTitle>
        <CardDescription>{new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide domain={[0, maxValue]} />
            <ReferenceLine x={maxValue} stroke="transparent" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar  dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
