import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export type RateType = "buy" | "sell";

type RateSelectorProps = {
  currency: any;
  rateType: RateType;
  onCurrencyChange: (currency: string) => void;
  onRateTypeChange: (rateType: RateType) => void;
};

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
];

export default function RateSelector({
  currency,
  rateType,
  onCurrencyChange,
  onRateTypeChange,
}: RateSelectorProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <label className="text-sm font-medium">Currency</label>

        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {currencies.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                <span className="font-medium">{item.code}</span>
                <span className="ml-2 text-muted-foreground">{item.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Rate type</label>

        <div className="flex rounded-lg border bg-muted/40 p-1">
          <Button
            type="button"
            variant={rateType === "buy" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-5"
            onClick={() => onRateTypeChange("buy")}
          >
            Buy
          </Button>

          <Button
            type="button"
            variant={rateType === "sell" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 px-5"
            onClick={() => onRateTypeChange("sell")}
          >
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
}
