import { currencyInfo } from "@/lib/currency";
type CurrencyFlagProps = {
  currency: string;
  size?: string;
};

export function CurrencyFlag({ currency, size = "size-6" }: CurrencyFlagProps) {
  const info = currencyInfo[currency];

  if (!info) return null;

  return (
    <img
      src={`https://flagcdn.io/flags/4x3/${info.countryCode}.svg`}
      alt={`${info.country} flag`}
      className={`${size} rounded object-cover`}
    />
  );
}
