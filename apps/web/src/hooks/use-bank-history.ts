import { useQuery } from "@tanstack/react-query";

import { getBankHistory } from "@/services/banks";

export function useBankHistory(
  bankId: string,
  currency = "USD",
  period = "7D",
) {
  return useQuery({
    queryKey: ["bank-history", bankId, currency, period],
    queryFn: () => getBankHistory(bankId, currency, period),
    enabled: Boolean(bankId),
    refetchOnWindowFocus: false,
  });
}
