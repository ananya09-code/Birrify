import { useQuery } from "@tanstack/react-query";
import { getCompareData } from "@/services/compare";

export function useCompareData(date: string, currency: string) {
  return useQuery({
    queryKey: ["compare", date, currency],

    queryFn: () => getCompareData(date, currency),

    refetchOnWindowFocus: false,
  });
}
