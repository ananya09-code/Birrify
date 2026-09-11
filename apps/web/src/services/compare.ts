export type CompareBank = {
  bank: string;
  buy: number;
  sell: number;
  spread: number;
};

export type CompareResponse = {
  currency: string;
  currency_name: string;
  base_currency: string;
  date: string;
  summary: {
    largest_rate_gap: number;
    average_spread: number;
    most_competitive_bank: {
      bank: string;
      spread: number;
    };
    banks_compared: number;
  };
  banks: CompareBank[];
  last_updated: string;
};

export async function getCompareData(
  date: string,
  currency: string,
): Promise<CompareResponse> {
  const params = new URLSearchParams();

  params.set("date", date);
  params.set("currency", currency);

  const response = await fetch(
    `http://localhost:8000/api/compare?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comparison data");
  }

  return response.json();
}
