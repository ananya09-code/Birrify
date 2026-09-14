import type { Column } from "@/components/common-ui/Table";
import { CurrencyFlag } from "@/components/common-ui/CurrencyFlag";

export type Rate = {
  id: number;
  bank_id: number;
  bank_name: string;
  currency: string;
  name: string;
  buy: number;
  sell: number;
  created_at: string;
};

export const rateColumns: Column<Rate>[] = [
  {
    key: "currency",
    header: "Currency",
    render: (rate) => (
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background p-2">
          <CurrencyFlag currency={rate.currency} size="size-full" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium">{rate.name}</p>

          <p className="text-xs text-muted-foreground">{rate.currency}/ETB</p>
        </div>
      </div>
    ),
  },

  {
    key: "bank_name",
    header: "Bank",
    render: (rate) => <span className="font-medium">{rate.bank_name}</span>,
  },

  {
    key: "buy",
    header: "Buy",
    render: (rate) => (
      <span className="font-medium text-green-500">{rate.buy.toFixed(2)}</span>
    ),
  },

  {
    key: "sell",
    header: "Sell",
    render: (rate) => (
      <span className="font-medium text-red-500">{rate.sell.toFixed(2)}</span>
    ),
  },

  {
    key: "created_at",
    header: "Updated",
    className: "text-right",
    render: (rate) => {
      const date = new Date(rate.created_at);

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];
