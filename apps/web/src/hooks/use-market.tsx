import { useQuery } from "@tanstack/react-query";

import { getMarket } from "@/services/market";

type UseMarketParams = {
  currency?: string;
  date?: string;
};

export function useMarket({ currency = "USD", date }: UseMarketParams = {}) {
  return useQuery({
    queryKey: ["market", currency, date],

    queryFn: () =>
      getMarket({
        currency,
        date,
      }),

    placeholderData: (previousData) => previousData,
  });
}
