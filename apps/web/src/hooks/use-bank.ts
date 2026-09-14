import { useQuery } from "@tanstack/react-query";

import { getBank } from "@/services/banks";

export function useBank(bankId: string) {
  return useQuery({
    queryKey: ["bank", bankId],
    queryFn: () => getBank(bankId),
    enabled: Boolean(bankId),
    refetchOnWindowFocus: false,
  });
}
