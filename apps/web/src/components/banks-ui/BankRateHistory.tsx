import { ArrowDown, ArrowUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BankHistoryPoint } from "@/services/banks";

type Period = "7D" | "30D" | "90D" | "1Y";

type BankRateHistoryProps = {
  history: BankHistoryPoint[];
  currency: string;
  shortName: string;
  change: number;
  changePercent: number;
  period: Period;
  onPeriodChange: (period: Period) => void;
  isLoading?: boolean;
};

const periods: Period[] = ["7D", "30D", "90D", "1Y"];

export default function BankRateHistory({
  history,
  currency,
  shortName,
  change,
  changePercent,
  period,
  onPeriodChange,
  isLoading = false,
}: BankRateHistoryProps) {
  const isPositive = change >= 0;

  const chartData = history.map((item) => ({
    ...item,
    date: new Date(`${item.date}T00:00:00`).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <section className="rounded-xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-semibold">{currency} / ETB Rate History</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Historical exchange-rate movement at {shortName}.
            </p>
          </div>

          {!isLoading && history.length > 0 && (
            <div
              className={
                isPositive
                  ? "flex items-center gap-1.5 text-sm font-medium text-green-600 "
                  : "flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400"
              }
            >
              {isPositive ? (
                <ArrowUp className="size-4" />
              ) : (
                <ArrowDown className="size-4" />
              )}
              {Math.abs(change).toFixed(2)} ETB (
              {Math.abs(changePercent).toFixed(2)}%)
            </div>
          )}
        </div>

        {/* Period selector */}
        <div className="flex w-fit items-center rounded-lg border bg-muted/40 p-1">
          {periods.map((item) => {
            const isActive = period === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onPeriodChange(item)}
                disabled={isLoading}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Loading rate history...
          </p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center px-6">
          <p className="text-sm text-muted-foreground">
            No historical data available for this period.
          </p>
        </div>
      ) : (
        <>
          <div className="h-[320px] w-full p-4 sm:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-border"
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                />

                <YAxis
                  domain={["auto", "auto"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--background))",
                  }}
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)} ETB`,
                    name === "buy"
                      ? "Buy"
                      : name === "sell"
                        ? "Sell"
                        : "Average",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="buy"
                  stroke="green"
                  strokeWidth={2}
                  dot={false}
                  className="text-green-500"
                />

                <Line
                  type="monotone"
                  dataKey="sell"
                  stroke="red"
                  strokeWidth={2}
                  dot={false}
                  className="text-red-500"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 border-t px-5 py-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500" />
              Buy
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500" />
              Sell
            </div>
          </div>
        </>
      )}
    </section>
  );
}
