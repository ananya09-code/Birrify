import { useState } from "react";
import type { Column } from "@/components/common-ui/Table";
import type { CompareBank } from "@/services/compare";
import { banklogo } from "@/lib/data";

function BankLogo({ bank }: { bank: string }) {
  const [imageError, setImageError] = useState(false);

  const logo = banklogo[bank];

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background p-2">
      {logo && !imageError ? (
        <img
          src={logo}
          alt={`${bank} logo`}
          className="size-full scale-100 object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-muted-foreground">
          {bank.slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export const compareColumns: Column<CompareBank>[] = [
  {
    key: "bank",
    header: "Bank",
    render: (bank) => (
      <div className="flex items-center gap-3">
        <BankLogo bank={bank.bank} />

        <p className="font-medium">{bank.bank}</p>
      </div>
    ),
  },

  {
    key: "buy",
    header: "Buy",
    render: (bank) => (
      <span className="font-medium text-green-500">{bank.buy.toFixed(2)}</span>
    ),
  },

  {
    key: "sell",
    header: "Sell",
    render: (bank) => (
      <span className="font-medium text-red-500">{bank.sell.toFixed(2)}</span>
    ),
  },

  {
    key: "spread",
    header: "Spread",
    render: (bank) => bank.spread.toFixed(2),
  },
];
