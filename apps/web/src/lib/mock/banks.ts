export type BankRate = {
  buy: number;
  sell: number;
};

export type Bank = {
  id: string;
  name: string;
  shortName: string;
  rates: Record<string, BankRate>;
  updated: string;
};

export const banks: Bank[] = [
  {
    id: "cbe",
    name: "Commercial Bank of Ethiopia",
    shortName: "CBE",
    rates: {
      USD: { buy: 148.52, sell: 151.48 },
      EUR: { buy: 173.84, sell: 177.26 },
      GBP: { buy: 201.62, sell: 205.38 },
      AED: { buy: 40.44, sell: 41.24 },
      SAR: { buy: 39.56, sell: 40.34 },
    },
    updated: "5 min ago",
  },
  {
    id: "dashen",
    name: "Dashen Bank",
    shortName: "DB",
    rates: {
      USD: { buy: 149.18, sell: 152.24 },
      EUR: { buy: 174.32, sell: 177.94 },
      GBP: { buy: 202.18, sell: 206.12 },
      AED: { buy: 40.62, sell: 41.42 },
      SAR: { buy: 39.72, sell: 40.52 },
    },
    updated: "8 min ago",
  },
  {
    id: "awash",
    name: "Awash Bank",
    shortName: "AW",
    rates: {
      USD: { buy: 148.94, sell: 151.96 },
      EUR: { buy: 174.06, sell: 177.68 },
      GBP: { buy: 201.94, sell: 205.86 },
      AED: { buy: 40.52, sell: 41.32 },
      SAR: { buy: 39.64, sell: 40.46 },
    },
    updated: "12 min ago",
  },
  {
    id: "abyssinia",
    name: "Bank of Abyssinia",
    shortName: "BOA",
    rates: {
      USD: { buy: 149.42, sell: 152.58 },
      EUR: { buy: 174.58, sell: 178.18 },
      GBP: { buy: 202.46, sell: 206.42 },
      AED: { buy: 40.68, sell: 41.48 },
      SAR: { buy: 39.78, sell: 40.58 },
    },
    updated: "15 min ago",
  },
  {
    id: "coop",
    name: "Cooperative Bank of Oromia",
    shortName: "CBO",
    rates: {
      USD: { buy: 149.06, sell: 152.12 },
      EUR: { buy: 174.18, sell: 177.82 },
      GBP: { buy: 202.06, sell: 205.98 },
      AED: { buy: 40.56, sell: 41.36 },
      SAR: { buy: 39.68, sell: 40.48 },
    },
    updated: "18 min ago",
  },
];
