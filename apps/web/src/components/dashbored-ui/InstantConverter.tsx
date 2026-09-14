import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Currency = {
  code: string;
  name: string;
  rate: number;
};

const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    rate: 145.5,
  },
  {
    code: "EUR",
    name: "Euro",
    rate: 170.2,
  },
  {
    code: "GBP",
    name: "British Pound",
    rate: 196.4,
  },
  {
    code: "AED",
    name: "UAE Dirham",
    rate: 39.62,
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    rate: 38.8,
  },
];

export default function InstantConverter() {
  const [amount, setAmount] = useState("1");
  const [currency, setCurrency] = useState("USD");

  const selectedCurrency = currencies.find((item) => item.code === currency);

  const rate = selectedCurrency?.rate ?? 0;
  const convertedAmount = Number(amount || 0) * rate;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Instant Converter</CardTitle>

        <p className="text-sm text-muted-foreground">
          Convert currencies using the latest rates.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* From */}
        <div className="space-y-2">
          <label className="text-sm font-medium">You send</label>

          <div className="flex gap-2">
            <Input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-medium"
            />

            <Select value={currency} onValueChange={() => setCurrency}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {currencies.map((item) => (
                  <SelectItem key={item.code} value={item.code}>
                    {item.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap indicator */}
        <div className="flex items-center justify-center">
          <div className="flex size-8 items-center justify-center rounded-full border bg-muted">
            <ArrowDownUp className="size-4 text-muted-foreground" />
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-sm font-medium">You receive</label>

          <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2.5">
            <span className="text-xl font-semibold">
              {convertedAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <span className="text-sm font-medium text-muted-foreground">
              ETB
            </span>
          </div>
        </div>

        {/* Rate */}
        <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>1 {currency}</span>
          <span>= {rate.toFixed(2)} ETB</span>
        </div>
      </CardContent>
    </Card>
  );
}
