const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";
export type CurrencyInfo = { code: string; name: string; symbol: string };
export type BankInfo = { id: number; name: string; short_name: string };
export type AppInfo = { base_currency: string; currencies: CurrencyInfo[]; banks: BankInfo[]; periods: string[] };
export async function getInfo(): Promise<AppInfo> {
  const response = await fetch(`${API_URL}/api/info/`);
  if (!response.ok) throw new Error("Unable to load application information");
  return response.json();
}
