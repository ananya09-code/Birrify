export type MarketPoint = {
  currency: string;
  date: string;
  market: {
    average_buy: number;
    average_sell: number;
    spread: number;
    lowest_buy: number;
    highest_buy: number;
    lowest_sell: number;
    highest_sell: number;
  };
  banks_count: number;
  last_updated: string;
};
export type MarketsResponse = { date: string; data: MarketPoint[] };

type GetMarketParams = {
  currency?: string;
  date?: string;
};

export async function getMarket({
  currency = "USD",
  date,
}: GetMarketParams = {}): Promise<MarketPoint> {
  const params = new URLSearchParams();

  params.set("currency", currency);

  if (date) {
    params.set("date", date);
  }

  const response = await fetch(
    `http://127.0.0.1:8000/api/market?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch market");
  }

  return response.json();
}

export async function getMarkets(date?: string): Promise<MarketsResponse> {
  const params = date ? `?date=${encodeURIComponent(date)}` : "";
  const response = await fetch(`http://127.0.0.1:8000/api/market/all${params}`);
  if (!response.ok) throw new Error("Failed to fetch markets");
  return response.json();
}
