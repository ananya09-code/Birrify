import { ArrowDownUp } from "lucide-react";

import CurrencySelect, { SUPPORTED_CURRENCIES } from "./CurrencySelect";

type RateType = "average" | "buy" | "sell";

type ConverterCardProps = {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  rateType: RateType;
  result: number;
  rate: number;
  fromName?: string;
  toName?: string;
  updatedAt?: string;
  isLoading?: boolean;
  onAmountChange: (value: string) => void;
  onFromCurrencyChange: (value: string) => void;
  onToCurrencyChange: (value: string) => void;
  onRateTypeChange: (value: RateType) => void;
  onSwap: () => void;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getCurrencyName(code: string) {
  return (
    SUPPORTED_CURRENCIES.find((currency) => currency.code === code)?.name ??
    code
  );
}

export default function ConverterCard({
  amount,
  fromCurrency,
  toCurrency,
  rateType,
  result,
  rate,
  fromName = getCurrencyName(fromCurrency),
  toName = getCurrencyName(toCurrency),
  updatedAt,
  isLoading = false,
  onAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange,
  onRateTypeChange,
  onSwap,
}: ConverterCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="p-5 sm:p-7">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          {/* From */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              You send
            </label>

            <div className="rounded-xl border bg-background p-3 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={amount}
                  onChange={(event) => onAmountChange(event.target.value)}
                  placeholder="0.00"
                  className="min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/40 sm:text-3xl"
                />

                <CurrencySelect
                  value={fromCurrency}
                  onChange={onFromCurrencyChange}
                />
              </div>

              <p className="mt-2 px-1 text-xs text-muted-foreground">
                {fromName}
              </p>
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center md:pb-3">
            <button
              type="button"
              onClick={onSwap}
              aria-label="Swap currencies"
              className="flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
            >
              <ArrowDownUp className="size-4" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              You receive
            </label>

            <div className="rounded-xl border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1 truncate text-2xl font-semibold sm:text-3xl">
                  {amount && Number(amount) > 0 ? formatNumber(result) : "0.00"}
                </div>

                <CurrencySelect
                  value={toCurrency}
                  onChange={onToCurrencyChange}
                />
              </div>

              <p className="mt-2 px-1 text-xs text-muted-foreground">
                {toName}
              </p>
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-border" />

        {/* Rate type */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Rate type</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Choose how the exchange rate is calculated.
            </p>
          </div>

          <div className="flex rounded-lg border bg-muted/40 p-1">
            {(["average", "buy", "sell"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onRateTypeChange(type)}
                className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  rateType === type
                    ? "bg-background text-blue-600 shadow-sm dark:text-blue-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Rate */}
        <div className="mt-6 rounded-xl bg-blue-50/70 p-4 dark:bg-blue-950/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current rate
              </p>

              <p className="mt-1 text-lg font-semibold tracking-tight">
                1 {fromCurrency}
                <span className="mx-1 text-muted-foreground">=</span>
                {isLoading ? "—" : formatNumber(rate)} {toCurrency}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-muted-foreground">
                {rateType === "average"
                  ? "Average rate"
                  : `${rateType === "buy" ? "Buy" : "Sell"} rate`}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {updatedAt
                  ? `Updated ${new Date(updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Market rate"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
