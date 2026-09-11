import { useQuery } from "@tanstack/react-query";
import { getRateHistory } from "@/services/history-page";
export function useRateHistory(currency = "USD", period = "7D") {
  return useQuery({
    queryKey: ["history", currency, period],
    queryFn: () => getRateHistory(currency, period),
    refetchOnWindowFocus: false,
  });
}
