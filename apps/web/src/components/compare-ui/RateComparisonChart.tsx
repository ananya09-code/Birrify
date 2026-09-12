import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CompareResponse } from "@/services/compare";
type RateComparisonChartProps = {
  currency: string;
  data: CompareResponse["banks"];
};

export default function RateComparisonChart({
  currency,
  data,
}: RateComparisonChartProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">Buy vs Sell Rates</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Compare {currency} exchange rates across banks.
            </p>
          </div>

          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            {currency} / ETB
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
              barGap={6}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted"
              />

              <XAxis
                dataKey="bank"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickMargin={8}
                tickFormatter={(value) => value.toFixed(1)}
                domain={["dataMin - 1", "dataMax + 1"]}
              />

              <Tooltip
                cursor={{
                  fill: "hsl(var(--muted) / 0.4)",
                }}
              formatter={(value, name) => [
                  Number(value ?? 0).toFixed(2),
                  name === "buy" ? "Buy" : "Sell",
                ]}
                labelFormatter={(label) => `${label} Bank`}
              />

              <Bar
                dataKey="buy"
                name="buy"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />

              <Bar
                dataKey="sell"
                name="sell"
                fill="#93c5fd"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue-600" />
            Buy rate
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-blue-300" />
            Sell rate
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
