import { useState } from "react";
import type { Column } from "@/components/common-ui/Table";
import type { Bank } from "@/services/banks";
import { banklogo } from "@/lib/data";

function BankLogo({ bank }: { bank: Bank }) {
  const [imageError, setImageError] = useState(false);

  const logo = banklogo[bank.short_name];

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background p-2">
      {logo && !imageError ? (
        <img
          src={logo}
          alt={`${bank.name} logo`}
          className="size-full scale-150 object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-muted-foreground">
          {bank.short_name.slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function getBankColumns(currency: string): Column<Bank>[] {
  return [
    {
      key: "name",
      header: "Bank",
      render: (bank) => (
        <div className="flex items-center gap-3">
          <BankLogo bank={bank} />

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
          <span className="font-medium text-green-500">
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
          <span className="font-medium text-red-500">
            {rate.sell.toFixed(2)}
          </span>
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
