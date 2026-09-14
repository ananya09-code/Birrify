import { useQuery } from "@tanstack/react-query";

import { getHistory, type HistoryResponse } from "@/services/history";

type UseHistoryParams = {
  currency?: string;
  period?: string;
};

export function useHistory({
  currency = "USD",
  period = "7D",
}: UseHistoryParams = {}) {
  return useQuery<HistoryResponse>({
    queryKey: ["rate-history", currency, period],

    queryFn: () =>
      getHistory({
        currency,
        period,
      }),

    placeholderData: (previousData) => previousData,
  });
}
