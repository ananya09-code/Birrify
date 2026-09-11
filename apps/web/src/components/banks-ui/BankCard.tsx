import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { Bank } from "@/services/banks";

type BankCardProps = {
  bank: Bank;
  currency: string;
};

export default function BankCard({ bank, currency }: BankCardProps) {
  const rate = bank.rates.find((item) => item.currency === currency);

  if (!rate) return null;

  return (
    <article className="group flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Bank header */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {bank.short_name.slice(0, 3).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h2 className="truncate font-semibold">{bank.name}</h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {bank.short_name} · {currency}/ETB
          </p>
        </div>
      </div>

      {/* Rates */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Buy</p>

          <p className="mt-1 text-lg font-semibold text-blue-600 dark:text-blue-400">
            {rate.buy.toFixed(2)}
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Sell</p>

          <p className="mt-1 text-lg font-semibold">{rate.sell.toFixed(2)}</p>
        </div>
      </div>

      {/* Spread */}
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Spread</p>

          <p className="mt-1 text-sm font-medium">
            {rate.spread.toFixed(2)} ETB
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            Updated
          </div>

          <p className="mt-1 text-sm font-medium">
            {new Date(rate.updated_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* View More */}
      <Link
        to="/banks/$bankId"
        params={{
          bankId: String(bank.id),
        }}
        className="mt-5 flex h-10 items-center justify-center gap-2 rounded-lg border bg-background text-sm font-medium transition-colors hover:bg-muted"
      >
        View more
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
