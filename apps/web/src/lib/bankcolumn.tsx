import type { Column } from "@/components/common-ui/Table";
import type { Bank } from "@/services/banks";

export function getBankColumns(currency: string): Column<Bank>[] {
  return [
    {
      key: "name",
      header: "Bank",
      render: (bank) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            {bank.short_name.slice(0, 3).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">{bank.name}</p>
            <p className="text-xs text-muted-foreground">{bank.short_name}</p>
          </div>
        </div>
      ),
    },

    {
      key: "buy",
      header: "Buy",
      render: (bank) => {
        const rate = bank.rates.find((item) => item.currency === currency);

        return rate ? (
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {rate.buy.toFixed(2)}
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },

    {
      key: "sell",
      header: "Sell",
      render: (bank) => {
        const rate = bank.rates.find((item) => item.currency === currency);

        return rate ? (
          rate.sell.toFixed(2)
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },

    {
      key: "spread",
      header: "Spread",
      render: (bank) => {
        const rate = bank.rates.find((item) => item.currency === currency);

        return rate ? (
          rate.spread.toFixed(2)
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },

    {
      key: "last_updated",
      header: "Updated",
      className: "text-right",
      render: (bank) =>
        bank.last_updated
          ? new Date(bank.last_updated).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",
    },
  ];
}
