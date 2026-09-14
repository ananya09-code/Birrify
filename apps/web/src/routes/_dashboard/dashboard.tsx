import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CurrencySelect from "@/components/converter-ui/CurrencySelect";
import { useMarket } from "@/hooks/use-market";
import { actionLook, bankFilterFields } from "@/lib/data";
import { Hero } from "@/components/dashbored-ui/Hero";
import InstantConverter from "@/components/dashbored-ui/InstantConverter";
import ExchangeRateChart from "@/components/common-ui/ExchangeRateChart";
import StatusCard from "@/components/common-ui/StatusCard";
import DataTable from "@/components/common-ui/Table";
import TableToolbar from "@/components/common-ui/TableToolbar";
import TablePagination from "@/components/common-ui/TablePagination";
import { useRates } from "@/hooks/use-rates";
import { rateColumns } from "@/lib/ratescolumn";
import { useMeta } from "@/services/meta";
import { LoadingState } from "@/components/state-ui/Loading";
import { ErrorState } from "@/components/state-ui/Error";
import { EmptyState } from "@/components/state-ui/Empty";
export const Route = createFileRoute("/_dashboard/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [bankSearch, setBankSearch] = useState("");
  const [currency, setCurrency] = useState("USD");
  const date = new Date().toISOString().slice(0, 10);

  const [bankFilters, setBankFilters] = useState({
    bank: "all",
    currency: "all",
    sort: "default",
  });

  const [page, setPage] = useState(1);
  const { data: meta } = useMeta();
  console.log(meta);
  const {
    data: market,
    isLoading: marketLoading,
    isError: marketError,
    refetch: marketRefetch,
    isFetching: marketFetching,
  } = useMarket({
    currency,
  });

  const {
    data: rates,
    isLoading: ratesLoading,
    isError: ratesError,
    refetch: ratesRefetch,
  } = useRates({
    currency,
    date,
    page,
    perPage: 10,
  });

  const stats = market
    ? [
        {
          title: "Average Buy",
          value: market.market.average_buy.toFixed(2),
          unit: "ETB",
          source: `${market.currency}/ETB`,
          action: "view",
        },
        {
          title: "Average Sell",
          value: market.market.average_sell.toFixed(2),
          unit: "ETB",
          source: `${market.currency}/ETB`,
          action: "view",
        },
        {
          title: "Market Spread",
          value: market.market.spread.toFixed(2),
          unit: "ETB",
          source: "Average buy/sell gap",
          action: "view",
        },
        {
          title: "Banks Tracked",
          value: String(market.banks_count),
          unit: "banks",
          source: `Updated ${new Date(market.last_updated).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          )}`,
          action: "view",
        },
      ]
    : [];
  if (marketLoading || ratesLoading) {
    return <LoadingState message="Loading market data..." />;
  }

  if (marketError || ratesError) {
    return (
      <ErrorState
        title="Failed to load dashboard data"
        message="We couldn't retrieve the latest market data. Please try again."
        onRetry={() => {
          marketRefetch();
          ratesRefetch();
        }}
      />
    );
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-2 py-4 sm:px-4 lg:px-1">
        <Hero />

        {/* Currency */}
        <div className="mt-5 flex justify-between item-center  bg-gray-50  px-8 py-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 rounded-lg">
          <div>
            <p className="text-sm font-medium">Market Currency</p>
            <p className="text-xs text-muted-foreground">
              View rates and market data in your selected currency.
            </p>
          </div>

          <CurrencySelect
            value={currency}
            onChange={setCurrency}
            currencies={meta?.currencies ?? []}
            typeofuse="two"
          />
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatusCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              unit={stat.unit}
              footer={stat.source}
              action={actionLook[stat.action as keyof typeof actionLook]}
            />
          ))}
        </div>

        {/* Chart + Converter */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ExchangeRateChart />
          <InstantConverter />
        </div>

        {/* Banks */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div></div>
            <TableToolbar
              search={bankSearch}
              onSearchChange={setBankSearch}
              searchPlaceholder="Search banks..."
              filterFields={bankFilterFields}
              filterValues={bankFilters}
              onFilterChange={(key, value) =>
                setBankFilters((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
              onResetFilters={() =>
                setBankFilters({
                  bank: "all",
                  currency: "all",
                  sort: "default",
                })
              }
            />
          </div>

          <DataTable
            title="Banks"
            description="Latest market rates across supported banks."
            columns={rateColumns}
            data={rates?.data ?? []}
          />

          <TablePagination
            currentPage={rates?.meta.page ?? 1}
            totalPages={rates?.meta.total_pages ?? 0}
            totalItems={rates?.meta.total ?? 0}
            pageSize={rates?.meta.per_page ?? 10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
