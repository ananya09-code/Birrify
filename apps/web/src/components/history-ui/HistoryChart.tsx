import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HistoryPoint } from "@/services/history";
type HistoryChartProps = {
  data: HistoryPoint[];
  currency: string;
  baseCurrency: string;
};
export default function HistoryChart({
  data,
  currency,
  baseCurrency,
}: HistoryChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    label: new Date(`${item.date}T00:00:00`).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    }),
  }));
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">
            {currency} / {baseCurrency}{" "}
          </h2>
          <p className="text-sm text-muted-foreground">Buy and sell rates </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500" /> Buy{" "}
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500" /> Sell
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No historical data available.{" "}
          </p>
        </div>
      ) : (
        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />{" "}
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={55}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${Number(value).toFixed(2)} ETB`,
                  name === "buy" ? "Buy" : "Sell",
                ]}
              />
              <Line
                type="monotone"
                dataKey="buy"
                stroke="green"
                className="text-primary"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="sell"
                stroke="red"
                className="text-muted-foreground"
                strokeWidth={2}
                dot={false}
              />{" "}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
