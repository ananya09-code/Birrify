export type CurrencyRate = {
  code: string;
  name: string;
  buy: number;
  sell: number;
  average: number;
};

export const currencyRates: CurrencyRate[] = [
  {
    code: "ETB",
    name: "Ethiopian Birr",
    buy: 1,
    sell: 1,
    average: 1,
  },
  {
    code: "USD",
    name: "US Dollar",
    buy: 144.85,
    sell: 146.2,
    average: 145.53,
  },
  {
    code: "EUR",
    name: "Euro",
    buy: 168.2,
    sell: 170.1,
    average: 169.15,
  },
  {
    code: "GBP",
    name: "British Pound",
    buy: 194.3,
    sell: 196.4,
    average: 195.35,
  },
  {
    code: "AED",
    name: "UAE Dirham",
    buy: 39.45,
    sell: 40.1,
    average: 39.78,
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    buy: 38.62,
    sell: 39.2,
    average: 38.91,
  },
];
