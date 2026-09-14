export type CurrencyInfo = {
  code: string;
  name: string;
  country: string;
  countryCode: string;
};

export const currencyInfo: Record<string, CurrencyInfo> = {
  // Africa
  ETB: {
    code: "ETB",
    name: "Ethiopian Birr",
    country: "Ethiopia",
    countryCode: "et",
  },
  NGN: {
    code: "NGN",
    name: "Nigerian Naira",
    country: "Nigeria",
    countryCode: "ng",
  },
  ZAR: {
    code: "ZAR",
    name: "South African Rand",
    country: "South Africa",
    countryCode: "za",
  },
  EGP: {
    code: "EGP",
    name: "Egyptian Pound",
    country: "Egypt",
    countryCode: "eg",
  },
  KES: {
    code: "KES",
    name: "Kenyan Shilling",
    country: "Kenya",
    countryCode: "ke",
  },
  GHS: {
    code: "GHS",
    name: "Ghanaian Cedi",
    country: "Ghana",
    countryCode: "gh",
  },
  TZS: {
    code: "TZS",
    name: "Tanzanian Shilling",
    country: "Tanzania",
    countryCode: "tz",
  },
  UGX: {
    code: "UGX",
    name: "Ugandan Shilling",
    country: "Uganda",
    countryCode: "ug",
  },
  MAD: {
    code: "MAD",
    name: "Moroccan Dirham",
    country: "Morocco",
    countryCode: "ma",
  },
  DZD: {
    code: "DZD",
    name: "Algerian Dinar",
    country: "Algeria",
    countryCode: "dz",
  },
  TND: {
    code: "TND",
    name: "Tunisian Dinar",
    country: "Tunisia",
    countryCode: "tn",
  },
  LYD: {
    code: "LYD",
    name: "Libyan Dinar",
    country: "Libya",
    countryCode: "ly",
  },
  XOF: {
    code: "XOF",
    name: "West African CFA Franc",
    country: "Senegal",
    countryCode: "sn",
  },
  XAF: {
    code: "XAF",
    name: "Central African CFA Franc",
    country: "Cameroon",
    countryCode: "cm",
  },

  // North America
  USD: {
    code: "USD",
    name: "US Dollar",
    country: "United States",
    countryCode: "us",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    country: "Canada",
    countryCode: "ca",
  },
  MXN: {
    code: "MXN",
    name: "Mexican Peso",
    country: "Mexico",
    countryCode: "mx",
  },

  // South America
  BRL: {
    code: "BRL",
    name: "Brazilian Real",
    country: "Brazil",
    countryCode: "br",
  },
  ARS: {
    code: "ARS",
    name: "Argentine Peso",
    country: "Argentina",
    countryCode: "ar",
  },
  CLP: {
    code: "CLP",
    name: "Chilean Peso",
    country: "Chile",
    countryCode: "cl",
  },
  COP: {
    code: "COP",
    name: "Colombian Peso",
    country: "Colombia",
    countryCode: "co",
  },
  PEN: {
    code: "PEN",
    name: "Peruvian Sol",
    country: "Peru",
    countryCode: "pe",
  },
  UYU: {
    code: "UYU",
    name: "Uruguayan Peso",
    country: "Uruguay",
    countryCode: "uy",
  },

  // Europe
  EUR: {
    code: "EUR",
    name: "Euro",
    country: "European Union",
    countryCode: "eu",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    country: "United Kingdom",
    countryCode: "gb",
  },
  CHF: {
    code: "CHF",
    name: "Swiss Franc",
    country: "Switzerland",
    countryCode: "ch",
  },
  SEK: {
    code: "SEK",
    name: "Swedish Krona",
    country: "Sweden",
    countryCode: "se",
  },
  NOK: {
    code: "NOK",
    name: "Norwegian Krone",
    country: "Norway",
    countryCode: "no",
  },
  DKK: {
    code: "DKK",
    name: "Danish Krone",
    country: "Denmark",
    countryCode: "dk",
  },
  PLN: {
    code: "PLN",
    name: "Polish Zloty",
    country: "Poland",
    countryCode: "pl",
  },
  CZK: {
    code: "CZK",
    name: "Czech Koruna",
    country: "Czech Republic",
    countryCode: "cz",
  },
  HUF: {
    code: "HUF",
    name: "Hungarian Forint",
    country: "Hungary",
    countryCode: "hu",
  },
  RON: {
    code: "RON",
    name: "Romanian Leu",
    country: "Romania",
    countryCode: "ro",
  },
  BGN: {
    code: "BGN",
    name: "Bulgarian Lev",
    country: "Bulgaria",
    countryCode: "bg",
  },
  ISK: {
    code: "ISK",
    name: "Icelandic Krona",
    country: "Iceland",
    countryCode: "is",
  },
  RSD: {
    code: "RSD",
    name: "Serbian Dinar",
    country: "Serbia",
    countryCode: "rs",
  },
  UAH: {
    code: "UAH",
    name: "Ukrainian Hryvnia",
    country: "Ukraine",
    countryCode: "ua",
  },
  RUB: {
    code: "RUB",
    name: "Russian Ruble",
    country: "Russia",
    countryCode: "ru",
  },
  TRY: {
    code: "TRY",
    name: "Turkish Lira",
    country: "Türkiye",
    countryCode: "tr",
  },

  // Middle East
  AED: {
    code: "AED",
    name: "UAE Dirham",
    country: "United Arab Emirates",
    countryCode: "ae",
  },
  SAR: {
    code: "SAR",
    name: "Saudi Riyal",
    country: "Saudi Arabia",
    countryCode: "sa",
  },
  QAR: {
    code: "QAR",
    name: "Qatari Riyal",
    country: "Qatar",
    countryCode: "qa",
  },
  KWD: {
    code: "KWD",
    name: "Kuwaiti Dinar",
    country: "Kuwait",
    countryCode: "kw",
  },
  BHD: {
    code: "BHD",
    name: "Bahraini Dinar",
    country: "Bahrain",
    countryCode: "bh",
  },
  OMR: {
    code: "OMR",
    name: "Omani Rial",
    country: "Oman",
    countryCode: "om",
  },
  JOD: {
    code: "JOD",
    name: "Jordanian Dinar",
    country: "Jordan",
    countryCode: "jo",
  },
  ILS: {
    code: "ILS",
    name: "Israeli New Shekel",
    country: "Israel",
    countryCode: "il",
  },
  IQD: {
    code: "IQD",
    name: "Iraqi Dinar",
    country: "Iraq",
    countryCode: "iq",
  },

  // Asia
  CNY: {
    code: "CNY",
    name: "Chinese Yuan",
    country: "China",
    countryCode: "cn",
  },
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    country: "Japan",
    countryCode: "jp",
  },
  KRW: {
    code: "KRW",
    name: "South Korean Won",
    country: "South Korea",
    countryCode: "kr",
  },
  INR: {
    code: "INR",
    name: "Indian Rupee",
    country: "India",
    countryCode: "in",
  },
  PKR: {
    code: "PKR",
    name: "Pakistani Rupee",
    country: "Pakistan",
    countryCode: "pk",
  },
  BDT: {
    code: "BDT",
    name: "Bangladeshi Taka",
    country: "Bangladesh",
    countryCode: "bd",
  },
  IDR: {
    code: "IDR",
    name: "Indonesian Rupiah",
    country: "Indonesia",
    countryCode: "id",
  },
  MYR: {
    code: "MYR",
    name: "Malaysian Ringgit",
    country: "Malaysia",
    countryCode: "my",
  },
  SGD: {
    code: "SGD",
    name: "Singapore Dollar",
    country: "Singapore",
    countryCode: "sg",
  },
  THB: {
    code: "THB",
    name: "Thai Baht",
    country: "Thailand",
    countryCode: "th",
  },
  VND: {
    code: "VND",
    name: "Vietnamese Dong",
    country: "Vietnam",
    countryCode: "vn",
  },
  PHP: {
    code: "PHP",
    name: "Philippine Peso",
    country: "Philippines",
    countryCode: "ph",
  },
  LKR: {
    code: "LKR",
    name: "Sri Lankan Rupee",
    country: "Sri Lanka",
    countryCode: "lk",
  },
  NPR: {
    code: "NPR",
    name: "Nepalese Rupee",
    country: "Nepal",
    countryCode: "np",
  },
  KZT: {
    code: "KZT",
    name: "Kazakhstani Tenge",
    country: "Kazakhstan",
    countryCode: "kz",
  },
  PKR2: {
    code: "AZN",
    name: "Azerbaijani Manat",
    country: "Azerbaijan",
    countryCode: "az",
  },
  GEL: {
    code: "GEL",
    name: "Georgian Lari",
    country: "Georgia",
    countryCode: "ge",
  },

  // Oceania
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    country: "Australia",
    countryCode: "au",
  },
  NZD: {
    code: "NZD",
    name: "New Zealand Dollar",
    country: "New Zealand",
    countryCode: "nz",
  },
};
