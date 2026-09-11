import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react";

import type { MarketPoint } from "@/services/market";

type RateInfoProps = {
  currency: string;
  market: MarketPoint["market"];
  updatedAt?: string;
};

export default function RateInfo({
  currency,
  market,
  updatedAt,
}: RateInfoProps) {
  const average = (market.average_buy + market.average_sell) / 2;

  const items = [
    {
      label: "Buy rate",
      value: market.average_buy,
      icon: ArrowDown,
    },
    {
      label: "Sell rate",
      value: market.average_sell,
      icon: ArrowUp,
    },
    {
      label: "Average",
      value: average,
      icon: Minus,
    },
    {
      label: "Spread",
      value: market.spread,
      icon: ArrowRight,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          {currency} / ETB rate information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Latest available market rates from Birrify.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4" />
                {item.label}
              </div>

              <p className="mt-3 text-xl font-semibold">
                {item.value.toFixed(2)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  ETB
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Rates provided by Birrify</span>

        <span>
          {updatedAt
            ? `Updated ${new Date(updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Latest available"}
        </span>
      </div>
    </section>
  );
}
