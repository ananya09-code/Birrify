import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import HistoryHeader from "@/components/history-ui/HistoryHeader";
import HistoryFilters from "@/components/history-ui/HistoryFilters";
import HistorySummary from "@/components/history-ui/HistorySummary";
import HistoryChart from "@/components/history-ui/HistoryChart";
import HistoryTable from "@/components/history-ui/HistoryTable";
import { useRateHistory } from "@/hooks/use-historypage";
import { LoadingState } from "@/components/state-ui/Loading";
import { ErrorState } from "@/components/state-ui/Error";
type Period = "7D" | "30D" | "90D" | "1Y";
export const Route = createFileRoute("/_dashboard/history")({
  component: HistoryPage,
});
function HistoryPage() {
  const [currency, setCurrency] = useState("USD");
  const [period, setPeriod] = useState<Period>("7D");
  const { data, isLoading, isError, refetch } = useRateHistory(
    currency,
    period,
  );
  if (isLoading) {
    return <LoadingState message="Loading rate history..." />;
  }
  if (isError) {
    return (
      <ErrorState
        title="Failed to load rate history"
        message="We couldn't retrieve the rate history. Please try again."
        onRetry={() => {
          refetch();
        }}
      />
    );
  }
  if (!data) {
    return <ErrorState title="Failed to load rate history" />;
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
