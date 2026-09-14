import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "@/services/market";
export function useMarkets(date?: string) {
  return useQuery({ queryKey: ["markets", date], queryFn: () => getMarkets(date) });
}
