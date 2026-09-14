export type HistoryPoint = {
  date: string;
  buy: number;
  sell: number;
  average: number;
  spread: number;
};

export type RateChange = {
  value: number;
  previous: number;
  change: number;
  change_percent: number;
};

export type HistoryResponse = {
  currency: string;
  currency_name: string;
  base_currency: string;
  period: string;
  from_date: string;
  to_date: string;

  summary: {
    buy: RateChange;
    sell: RateChange;
    average: RateChange;
  };

  history: HistoryPoint[];
};

type GetHistoryParams = {
  currency?: string;
  period?: string;
};
const API_URL = import.meta.env.VITE_API_URL;
export async function getHistory({
  currency = "USD",
  period = "7D",
}: GetHistoryParams = {}): Promise<HistoryResponse> {
  const params = new URLSearchParams();

  params.set("currency", currency);
  params.set("period", period);

  const response = await fetch(`${API_URL}/api/history/?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch rate history");
  }

  return response.json();
}
