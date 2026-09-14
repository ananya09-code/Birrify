import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import cbe from "@/assets/cbe.jpg";
import boa from "@/assets/boa.jpg";
import dashen from "@/assets/Dashen.png";
import awash from "@/assets/Awash.jpg";
import nib from "@/assets/Nib.png";
import cbo from "@/assets/Coop.jpg";
import hibret from "@/assets/Hibret.jpg";
import wegagen from "@/assets/Wogagen.png";
import zemen from "@/assets/Zemen.jpg";
import bunna from "@/assets/Bunna.png";
import berhan from "@/assets/Berhan.jpg";
import enat from "@/assets/Enat.png";
import oromia from "@/assets/Oromia.png";
import addis from "@/assets/Addis.jpg";
import hijra from "@/assets/Hijra.png";
import siinqee from "@/assets/Siinqee.png";
import rammis from "@/assets/Rammis.png";
import global from "@/assets/Global.svg";
import gadaa from "@/assets/Gadaa.png";
import development from "@/assets/Development.png";
import ahadu from "@/assets/Ahadu.svg";
import gohbetoch from "@/assets/GohBetoch.png";
import amhara from "@/assets/Amhara.png";
import abay from "@/assets/abay.webp";
export const banklogo = {
  cbe: cbe,
  boa: boa,
  dashen: dashen,
  awash: awash,
  nib: nib,
  cbo: cbo,
  hibret: hibret,
  wegagen: wegagen,
  zemen: zemen,
  bunna: bunna,
  berhan: berhan,
  enat: enat,
  oromia: oromia,
  addis: addis,
  global: global,
  development: development,
  siinqee: siinqee,
  rammis: rammis,
  gadaa: gadaa,
  ahadu: ahadu,
  gohbetoch: gohbetoch,
  hijra: hijra,
  amhara: amhara,
  abay: abay,
};
export const data = {
  stats: [
    {
      title: "Best Buy Rate",
      value: 144.85,
      unit: "ETB",
      source: "Dashen Bank",
      action: "buy",
    },
    {
      title: "Best Sell Rate",
      value: 146.2,
      unit: "ETB",
      source: "Commercial Bank of Ethiopia",
      action: "sale",
    },
    {
      title: "Market Average",
      value: 145.58,
      unit: "ETB",
      source: "All banks",
      action: "average",
    },
    {
      title: "Last 30 Days",
      value: 2.4,
      unit: "%",
      change: "up",
      high: 146.8,
      low: 141.25,
      action: "trend",
    },
  ],
};

export const actionLook = {
  buy: <TrendingUp className="size-4 text-green-600" />,
  sale: <TrendingDown className="size-4 text-red-600" />,
  average: <Minus className="size-4 text-muted-foreground" />,
  trend: <TrendingUp className="size-4 text-green-600" />,
};
export const rates = [
  {
    currency: "USD",
    name: "US Dollar",
    buy: 144.85,
    sell: 146.2,
    average: 145.53,
    change: 2.4,
    updated: "2 min ago",
  },
  {
    currency: "EUR",
    name: "Euro",
    buy: 168.42,
    sell: 171.15,
    average: 169.79,
    change: 1.8,
    updated: "3 min ago",
  },
];
export const banks = [
  {
    name: "Commercial Bank of Ethiopia",
    buy: 144.85,
    sell: 146.2,
    spread: 1.35,
    updated: "2 min ago",
  },
  {
    name: "Dashen Bank",
    buy: 144.9,
    sell: 146.1,
    spread: 1.2,
    updated: "4 min ago",
  },
  {
    name: "Awash Bank",
    buy: 144.75,
    sell: 146.05,
    spread: 1.3,
    updated: "5 min ago",
  },
];
export const bankFilterFields = [
  {
    key: "bank",
    label: "Bank",
    options: [
      { label: "All banks", value: "all" },
      { label: "Commercial Bank of Ethiopia", value: "cbe" },
      { label: "Dashen Bank", value: "dashen" },
      { label: "Awash Bank", value: "awash" },
    ],
  },
  {
    key: "currency",
    label: "Currency",
    options: [
      { label: "All currencies", value: "all" },
      { label: "USD", value: "usd" },
      { label: "EUR", value: "eur" },
      { label: "GBP", value: "gbp" },
    ],
  },
  {
    key: "sort",
    label: "Sort by",
    options: [
      { label: "Default", value: "default" },
      { label: "Buy: High to low", value: "buy-high" },
      { label: "Buy: Low to high", value: "buy-low" },
      { label: "Sell: High to low", value: "sell-high" },
      { label: "Sell: Low to high", value: "sell-low" },
    ],
  },
];
export const rateFilterFields = [
  {
    key: "currency",
    label: "Currency",
    options: [
      { label: "All currencies", value: "all" },
      { label: "USD — US Dollar", value: "usd" },
      { label: "EUR — Euro", value: "eur" },
      { label: "GBP — British Pound", value: "gbp" },
    ],
  },
  {
    key: "rateType",
    label: "Rate type",
    options: [
      { label: "All rates", value: "all" },
      { label: "Buy", value: "buy" },
      { label: "Sell", value: "sell" },
      { label: "Average", value: "average" },
    ],
  },
  {
    key: "sort",
    label: "Sort by",
    options: [
      { label: "Default", value: "default" },
      { label: "Highest rate", value: "high" },
      { label: "Lowest rate", value: "low" },
      { label: "Biggest change", value: "change" },
    ],
  },
];
export const mata = {
  page: 1,
  page_size: 10,
  total: 24,
  total_pages: 3,
};
