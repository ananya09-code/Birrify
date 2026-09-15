import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingState } from "@/components/state-ui/Loading";
import { ErrorState } from "@/components/state-ui/Error";
import { useBank } from "@/hooks/use-bank";
import { useBankHistory } from "@/hooks/use-bank-history";

import StatusCard from "@/components/common-ui/StatusCard";
import BankDetailsHeader from "@/components/banks-ui/BankDetailsHeader";
import BankRateHistory from "@/components/banks-ui/BankRateHistory";
import OtherCurrencyRates from "@/components/banks-ui/OtherCurrencyRates";
import BankAbout from "@/components/banks-ui/BankAbout";
type Period = "7D" | "30D" | "90D" | "1Y";

export const Route = createFileRoute("/_dashboard/banks/$bankId")({
  component: BankDetailsPage,
});

function BankDetailsPage() {
  const { bankId } = Route.useParams();

  const [currency, setCurrency] = useState("USD");
  const [period, setPeriod] = useState<Period>("7D");

  const {
    data: bank,
    isLoading,
    isError,
    refetch: bankRefetch,
  } = useBank(bankId);

  const { data: historyData, isLoading: isHistoryLoading } = useBankHistory(
    bankId,
    currency,
    period,
  );
  console.log(historyData);

  if (isLoading) {
    return <LoadingState message="Loading bank data..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load bank data"
        message="We couldn't retrieve the bank data. Please try again."
        onRetry={() => {
          bankRefetch();
        }}
      />
    );
  }
  if (!bank) {
    return (
      <ErrorState
        title="Bank not found"
        message="The bank you are looking for does not exist."
      />
    );
  }
  const rate = bank.rates.find((item) => item.currency === currency);

  const updatedAt = bank.last_updated
    ? new Date(bank.last_updated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";

  if (!rate) {
    return (
      <main className="space-y-6">
        <BankDetailsHeader
          name={bank.name}
          shortName={bank.short_name}
          updatedAt={updatedAt}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        <section className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="font-semibold">No {currency} rate available</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {bank.name} does not currently have a {currency} exchange rate
            available.
          </p>
        </section>

        <OtherCurrencyRates
          rates={bank.rates}
          currentCurrency={currency}
          onCurrencyChange={setCurrency}
          shortName={bank.short_name}
        />
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <BankDetailsHeader
        name={bank.name}
        shortName={bank.short_name}
        updatedAt={updatedAt}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatusCard
          title="Buy Rate"
          value={rate.buy.toFixed(2)}
          unit="ETB"
          footer={`${bank.short_name} → ETB`}
        />

        <StatusCard
          title="Sell Rate"
          value={rate.sell.toFixed(2)}
          unit="ETB"
          footer={`ETB → ${bank.short_name}`}
        />

        <StatusCard
          title="Spread"
          value={rate.spread.toFixed(2)}
          unit="ETB"
          footer={`${bank.short_name} → ETB`}
        />
      </section>

      <BankRateHistory
        history={historyData?.history ?? []}
        currency={currency}
        shortName={bank.short_name}
        change={historyData?.summary.buy.change ?? 0}
        changePercent={historyData?.summary.buy.change_percent ?? 0}
        period={period}
        onPeriodChange={setPeriod}
        isLoading={isHistoryLoading}
      />

      <OtherCurrencyRates
        rates={bank.rates}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        shortName={bank.short_name}
      />

      <BankAbout bankName={bank.name} />
    </main>
  );
}
