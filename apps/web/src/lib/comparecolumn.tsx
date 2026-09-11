import type { Column } from "@/components/common-ui/Table";
import type { CompareBank } from "@/services/compare";

export const compareColumns: Column<CompareBank>[] = [
  {
    key: "bank",
    header: "Bank",
    render: (bank) => (
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {bank.bank.slice(0, 3).toUpperCase()}
        </div>

        <p className="font-medium">{bank.bank}</p>
      </div>
    ),
  },

  {
    key: "buy",
    header: "Buy",
    render: (bank) => (
      <span className="font-medium text-blue-600 dark:text-blue-400">
        {bank.buy.toFixed(2)}
      </span>
    ),
  },

  {
    key: "sell",
    header: "Sell",
    render: (bank) => bank.sell.toFixed(2),
  },

  {
    key: "spread",
    header: "Spread",
    render: (bank) => bank.spread.toFixed(2),
  },
];
