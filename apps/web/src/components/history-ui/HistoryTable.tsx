import { CalendarDays } from "lucide-react";
import type { HistoryPoint } from "@/services/history";
type HistoryTableProps = { data: HistoryPoint[]; period: string };
export default function HistoryTable({ data, period }: HistoryTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="font-semibold">Historical Rates</h2>{" "}
          <p className="text-sm text-muted-foreground">
            Daily exchange rate history{" "}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" /> {period}{" "}
        </div>
      </div>
      {data.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No historical data available.{" "}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Buy
                </th>
                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Sell
                </th>
                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Spread
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.date} className="border-b last:border-0">
                  <td className="px-5 py-4 font-medium">
                    {new Date(`${item.date}T00:00:00`).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-green-500 text-right">
                    {item.buy.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-red-500 text-right">
                    {item.sell.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-right text-muted-foreground">
                    {typeof item.spread === "number"
                      ? item.spread.toFixed(2)
                      : (item.sell - item.buy).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
