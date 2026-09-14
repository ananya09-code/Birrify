import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import HistoryHeader from "@/components/history-ui/HistoryHeader";
import HistoryFilters from "@/components/history-ui/HistoryFilters";
import HistorySummary from "@/components/history-ui/HistorySummary";
import HistoryChart from "@/components/history-ui/HistoryChart";
import HistoryTable from "@/components/history-ui/HistoryTable";
import { useRateHistory } from "@/hooks/use-historypage";
type Period = "7D" | "30D" | "90D" | "1Y";
export const Route = createFileRoute("/_dashboard/history")({ component: HistoryPage });
function HistoryPage() {
  const [currency, setCurrency] = useState("USD");
  const [period, setPeriod] = useState<Period>("7D");
  const { data, isLoading, isError } = useRateHistory(currency, period);
  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading rate history...{" "}
        </p>
      </main>
    );
  }
  if (isError || !data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-destructive">
          Failed to load rate history.{" "}
        </p>
      </main>
    );
  }
  return (
    <main className="space-y-6 px-4 sm:px-6 lg:px-8">
      <HistoryHeader currency={currency} />{" "}
      <HistoryFilters
        currency={currency}
        onCurrencyChange={setCurrency}
        period={period}
        onPeriodChange={setPeriod}
      />
      <HistorySummary
        buy={data.summary.buy}
        sell={data.summary.sell}
        history={data.history}
      />{" "}
      <HistoryChart
        data={data.history}
        currency={data.currency}
        baseCurrency={data.base_currency}
      />
      <HistoryTable data={data.history} period={data.period} />{" "}
    </main>
  );
}
