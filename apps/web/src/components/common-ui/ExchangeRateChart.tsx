import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/use-history";

type Currency = "USD" | "EUR" | "GBP";
type RateType = "buy" | "sell" | "average";
type Period = "7D" | "30D" | "90D" | "1Y";

const currencies: Currency[] = ["USD", "EUR", "GBP"];

const periods: Period[] = ["7D", "30D", "90D", "1Y"];

const rateLabels: Record<RateType, string> = {
  buy: "Buy",
  sell: "Sell",
  average: "Average",
};

export default function ExchangeRateChart() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rateType, setRateType] = useState<RateType>("average");
  const [period, setPeriod] = useState<Period>("7D");

  const { data, isLoading, isError } = useHistory({
    currency,
    period,
  });

  const chartData = data?.history ?? [];

  const currentRate = data?.summary[rateType].value ?? 0;

  const change = data?.summary[rateType].change ?? 0;

  const changePercent = data?.summary[rateType].change_percent ?? 0;

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[430px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading exchange rate history...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[430px] items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load exchange rate history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">Exchange Rate History</CardTitle>

            <CardDescription>
              Historical {currency}/ETB exchange rate
            </CardDescription>
          </div>

          {/* Currency */}
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {currencies.map((item) => (
              <Button
                key={item}
                variant={currency === item ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setCurrency(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Rate + change */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight">
                {currentRate.toFixed(2)}
              </span>

              <span className="text-sm text-muted-foreground">ETB</span>
            </div>

            <p
              className={`mt-1 text-xs ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </p>
          </div>

          {/* Buy / Sell / Average */}
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {(Object.keys(rateLabels) as RateType[]).map((type) => (
              <Button
                key={type}
                variant={rateType === type ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setRateType(type)}
              >
                {rateLabels[type]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          {chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No rate history available for this period.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} className="stroke-muted" />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-xs"
                />

                <YAxis
                  domain={["auto", "auto"]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={45}
                  tickFormatter={(value: number) => value.toFixed(0)}
                  className="text-xs"
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--background))",
                  }}
                  formatter={(value) => [
                    `${Number(value).toFixed(2)} ETB`,
                    rateLabels[rateType],
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey={rateType}
                  stroke="currentColor"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  className="text-primary"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Period */}
        <div className="mt-4 flex justify-end">
          <div className="flex rounded-lg border bg-muted/40 p-1">
            {periods.map((item) => (
              <Button
                key={item}
                variant={period === item ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2.5 text-xs"
                onClick={() => setPeriod(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
