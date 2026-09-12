import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CurrencyOption = { code: string; name: string };

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
  currencies: CurrencyOption[];
};

export default function CurrencySelect({
  value,
  onChange,
  currencies,
}: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={(nextValue) => nextValue && onChange(nextValue)}>
      <SelectTrigger className="h-10 w-[105px] border-0 bg-muted/50 shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{currency.code}</span>
              <span className="text-muted-foreground">{currency.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
