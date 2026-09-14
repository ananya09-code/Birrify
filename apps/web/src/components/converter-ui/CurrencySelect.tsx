import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CurrencyOption = {
  code: string;
  name: string;
};

type CurrencySelectProps = {
  value: string;
  onChange: (value: string) => void;
  currencies: CurrencyOption[] | string[];
  typeofuse: "one" | "two";
};

export default function CurrencySelect({
  value,
  onChange,
  currencies,
  typeofuse,
}: CurrencySelectProps) {
  const isObjectArray = (
    currency: CurrencyOption | string,
  ): currency is CurrencyOption => {
    return typeof currency !== "string";
  };

  return (
    <Select
      value={value}
      onValueChange={(nextValue) => nextValue && onChange(nextValue)}
    >
      <SelectTrigger className="h-10 w-[105px] border-0 bg-muted/50 shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {currencies.map((currency) => {
          if (typeofuse === "one") {
            const code = isObjectArray(currency) ? currency.code : currency;

            return (
              <SelectItem key={code} value={code}>
                <span className="font-medium">{code}</span>
              </SelectItem>
            );
          }

          const code = isObjectArray(currency) ? currency.code : currency;

          const name = isObjectArray(currency) ? currency.name : currency;

          return (
            <SelectItem key={code} value={code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{code}</span>
                <span className="text-muted-foreground">{name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
