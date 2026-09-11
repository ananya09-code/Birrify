import { ArrowRight } from "lucide-react";

type PopularCurrency = {
  code: string;
  average: number;
};

type PopularConversionsProps = {
  currencies: PopularCurrency[];
  onSelect: (currency: string) => void;
};

export default function PopularConversions({
  currencies,
  onSelect,
}: PopularConversionsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Popular conversions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Quickly check common currency pairs.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            type="button"
            onClick={() => onSelect(currency.code)}
            className="group rounded-xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:hover:border-blue-900"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                {currency.code}
                <span className="mx-1 text-muted-foreground">→</span>
                ETB
              </span>

              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
            </div>

            <p className="mt-3 text-lg font-semibold">
              {currency.average.toFixed(2)}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              1 {currency.code}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
