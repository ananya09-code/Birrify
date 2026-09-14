import { useQuery } from "@tanstack/react-query";
import { getRates } from "../services/rates";
type UseRatesParams = {
  currency?: string;
  date?: string;
  page?: number;
  perPage?: number;
};

export function useRates({
  currency = "USD",
  date,
  page = 1,
  perPage = 10,
}: UseRatesParams = {}) {
  return useQuery({
    queryKey: ["rates", currency, date, page, perPage],

    queryFn: () =>
      getRates({
        currency,
        date,
        page,
        perPage,
      }),

    placeholderData: (previousData) => previousData,
  });
}
