import type { BankRate } from "@/services/banks";

type OtherCurrencyRatesProps = {
  rates: BankRate[];
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
  shortName: string;
};

export default function OtherCurrencyRates({
  rates,
  currentCurrency,
  onCurrencyChange,
  shortName,
}: OtherCurrencyRatesProps) {
  const otherRates = rates.filter((rate) => rate.currency !== currentCurrency);

  if (otherRates.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-5">
        <h2 className="font-semibold">Other Currency Rates</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Current exchange rates offered by {shortName}.
        </p>
      </div>

      <div className="divide-y">
        {otherRates.map((rate) => (
          <button
            key={rate.currency}
            type="button"
            onClick={() => onCurrencyChange(rate.currency)}
            className="group flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-blue-50/60 dark:hover:bg-blue-950/20"
          >
            <div>
              <p className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {rate.currency} / ETB
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Buy {rate.buy.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium">{rate.sell.toFixed(2)}</p>

              <p className="mt-0.5 text-xs text-muted-foreground">Sell</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
