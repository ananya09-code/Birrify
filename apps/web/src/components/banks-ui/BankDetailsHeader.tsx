import { ArrowLeft, Clock3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import CurrencySelector from "@/components/compare-ui/CurrencySelector";

type BankDetailsHeaderProps = {
  name: string;
  shortName: string;
  updatedAt: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
};

export default function BankDetailsHeader({
  name,
  shortName,
  updatedAt,
  currency,
  onCurrencyChange,
}: BankDetailsHeaderProps) {
  return (
    <>
      <Link
        to="/banks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="size-4" />
        Back to Banks
      </Link>

      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              {shortName.slice(0, 3).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {name}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>{shortName}</span>

                <span className="size-1 rounded-full bg-muted-foreground/50" />

                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  Updated {updatedAt}
                </span>
              </div>
            </div>
          </div>

          <CurrencySelector value={currency} onChange={onCurrencyChange} />
        </div>
      </section>
    </>
  );
}
