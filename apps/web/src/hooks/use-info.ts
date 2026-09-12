import { useQuery } from "@tanstack/react-query";
import { getInfo } from "@/services/info";
export function useInfo() {
  return useQuery({ queryKey: ["info"], queryFn: getInfo, staleTime: 1000 * 60 * 30 });
}
