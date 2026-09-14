export type HistoryPoint = {
  date: string;
  buy: number;
  sell: number;
  average: number;
  spread: number;
};
export type HistoryChange = {
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
    buy: HistoryChange;
    sell: HistoryChange;
    average: HistoryChange;
    period_high: number;
    period_low: number;
  };
  history: HistoryPoint[];
};
const API_URL = import.meta.env.VITE_API_URL;
export async function getRateHistory(
  currency = "USD",
  period = "7D",
): Promise<HistoryResponse> {
  const params = new URLSearchParams({ currency, period });
  const response = await fetch(`${API_URL}/api/history/?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch rate history");
  }
  return response.json();
}
