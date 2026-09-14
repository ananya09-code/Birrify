import { useQuery } from "@tanstack/react-query";

import { getBanks } from "@/services/banks";

export function useBanks(currency = "USD") {
  return useQuery({
    queryKey: ["banks", currency],
    queryFn: () => getBanks(currency),
    refetchOnWindowFocus: false,
  });
}
