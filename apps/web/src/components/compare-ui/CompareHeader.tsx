import { ArrowDownUp } from "lucide-react";

import CurrencySelector from "./CurrencySelector";
import DateSelector from "./DateSelector";

type CompareHeaderProps = {
  currency: string;
  onCurrencyChange: (value: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function CompareHeader({
  currency,
  onCurrencyChange,
  date,
  onDateChange,
}: CompareHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-blue-600">
          <ArrowDownUp className="size-4" />
          Market comparison
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Compare Rates
        </h1>

        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Compare exchange rates across Ethiopian banks and find the most
          competitive option.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
        <CurrencySelector value={currency} onChange={onCurrencyChange} />

        <DateSelector date={date} onDateChange={onDateChange} />
      </div>
    </div>
  );
}
