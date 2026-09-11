import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getBankColumns } from "@/lib/bankcolumn";
import CompareHeader from "../components/compare-ui/CompareHeader";
import RateComparisonChart from "../components/compare-ui/RateComparisonChart";
import { compareColumns } from "@/lib/comparecolumn";
import StatusCard from "../components/common-ui/StatusCard";
import DataTable from "../components/common-ui/Table";

import { useCompareData } from "../hooks/use-compare";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
});

function ComparePage() {
  const [currency, setCurrency] = useState("USD");
  const [date, setDate] = useState<Date>(new Date());
  const columns = getBankColumns(currency);
  // Backend expects YYYY-MM-DD
  const formattedDate = date.toISOString().slice(0, 10);

  const {
    data: compareData,
    isLoading,
    isError,
  } = useCompareData(formattedDate, currency);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading comparison...</p>
      </main>
    );
  }

  if (isError || !compareData) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-destructive">
          Failed to load comparison data.
        </p>
      </main>
    );
  }

  const competitiveBank = compareData.summary.most_competitive_bank;

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <CompareHeader
          currency={currency}
          onCurrencyChange={setCurrency}
          date={date}
          onDateChange={setDate}
        />

        {/* Stats */}
        <section className="mt-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatusCard
              title="Largest Rate Gap"
              value={compareData.summary.largest_rate_gap.toFixed(2)}
              unit="ETB"
              footer="Difference between bank rates"
            />

            <StatusCard
              title="Average Spread"
              value={compareData.summary.average_spread.toFixed(2)}
              unit="ETB"
              footer={`Across ${currency} rates`}
            />

            <StatusCard
              title="Most Competitive"
              value={competitiveBank.bank}
              unit=""
              footer={`Lowest spread: ${competitiveBank.spread.toFixed(2)} ETB`}
            />

            <StatusCard
              title="Banks Compared"
              value={compareData.summary.banks_compared.toString()}
              unit="banks"
              footer={`${currency} / ETB`}
            />
          </div>
        </section>

        {/* Chart */}
        <section className="mt-8">
          <RateComparisonChart data={compareData.banks} currency={currency} />
        </section>

        {/* Table */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Bank Comparison
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Detailed {currency} rates across Ethiopian banks.
              </p>
            </div>

            <span className="hidden rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 sm:block">
              {currency} / ETB
            </span>
          </div>
          <DataTable columns={compareColumns} data={compareData.banks} />

          <div className="overflow-hidden rounded-xl border bg-card"></div>
        </section>
      </div>
    </main>
  );
}
