import { Coins } from "lucide-react";
import { useInfo } from "@/hooks/use-info";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Currency = {
  code: string;
  name: string;
};


type CurrencySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CurrencySelector({
  value,
  onChange,
}: CurrencySelectorProps) {
  const { data } = useInfo();
  const currencies = data?.currencies.filter((currency) => currency.code !== data.base_currency) ?? [];
  return (
    <Select value={value} onValueChange={(nextValue) => nextValue && onChange(nextValue)}>
      <SelectTrigger className="w-full sm:w-[155px]">
        <Coins className="mr-2 size-4 text-blue-600" />
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code} / ETB
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
