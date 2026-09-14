export type BankRate = {
  currency: string;
  currency_name: string;
  buy: number;
  sell: number;
  spread: number;
  updated_at: string;
};

export type Bank = {
  id: number;
  name: string;
  short_name: string;
  rates: BankRate[];
  last_updated: string | null;
};

export type BanksResponse = {
  data: Bank[];
  meta: {
    total: number;
    currency: string;
    date: string;
  };
};
const API_URL = import.meta.env.VITE_API_URL;

export async function getBanks(currency = "USD"): Promise<BanksResponse> {
  const params = new URLSearchParams();
  params.set("currency", currency);

  const response = await fetch(`${API_URL}/api/v1/banks?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch banks");
  }

  return response.json();
}

export async function getBank(bankId: string): Promise<Bank> {
  const response = await fetch(`${API_URL}/api/v1/banks/${bankId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Bank not found");
    }

    throw new Error("Failed to fetch bank");
  }

  return response.json();
}

export type BankHistoryPoint = {
  date: string;
  buy: number;
  sell: number;
  average: number;
};

export type BankHistoryResponse = {
  bank_id: number;
  bank_name: string;
  currency: string;
  currency_name: string;
  base_currency: string;
  period: string;
  from_date: string;
  to_date: string;
  summary: {
    buy: {
      value: number;
      previous: number;
      change: number;
      change_percent: number;
    };
    sell: {
      value: number;
      previous: number;
      change: number;
      change_percent: number;
    };
    average: {
      value: number;
      previous: number;
      change: number;
      change_percent: number;
    };
  };
  history: BankHistoryPoint[];
};

export async function getBankHistory(
  bankId: string,
  currency = "USD",
  period = "7D",
): Promise<BankHistoryResponse> {
  const params = new URLSearchParams({
    currency,
    period,
  });

  const response = await fetch(
    `${API_URL}/api/history/${bankId}/?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bank history");
  }

  return response.json();
}
