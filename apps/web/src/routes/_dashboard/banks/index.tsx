import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingState } from "@/components/state-ui/Loading";
import { ErrorState } from "@/components/state-ui/Error";
import CurrencySelector from "@/components/compare-ui/CurrencySelector";
import BankCard from "@/components/banks-ui/BankCard";
import { useBanks } from "@/hooks/use-banks";

export const Route = createFileRoute("/_dashboard/banks/")({
  component: BanksPage,
});

function BanksPage() {
  const [currency, setCurrency] = useState("USD");
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch: refetchBanks,
  } = useBanks(currency);

  const banks = data?.data ?? [];

  const filteredBanks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return banks;
    }

    return banks.filter((bank) =>
      `${bank.name} ${bank.short_name}`.toLowerCase().includes(query),
    );
  }, [banks, search]);

  if (isLoading) {
    return <LoadingState message="Loading banks..." />;
  }
  if (isError) {
    return (
      <ErrorState
        title="Failed to load banks"
        message="We couldn't retrieve the banks. Please try again."
        onRetry={() => {
          refetchBanks();
        }}
      />
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading banks...</p>
      </main>
    );
  }
  console.log(data);
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Banks</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Compare exchange rates and explore Ethiopian banks.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search banks..."
            className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredBanks.length} {filteredBanks.length === 1 ? "bank" : "banks"}{" "}
          available
        </p>

        <p className="text-sm font-medium text-foreground">{currency} / ETB</p>
      </div>

      {filteredBanks.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredBanks.map((bank) => (
            <BankCard key={bank.id} bank={bank} currency={currency} />
          ))}
        </section>
      ) : (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 text-center">
          <div className="flex size-11 items-center justify-center rounded-full bg-muted">
            <Search className="size-5 text-muted-foreground" />
          </div>

          <h2 className="mt-4 font-semibold">No banks found</h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try searching with a different bank name or abbreviation.
          </p>
        </section>
      )}
    </section>
  );
}
