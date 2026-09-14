import { useQuery } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;
export async function getMeta() {
  const response = await fetch(`${API_URL}/api/v1/meta`);

  if (!response.ok) {
    throw new Error("Failed to fetch meta data");
  }

  return response.json();
}

export function useMeta() {
  return useQuery({
    queryKey: ["meta"],
    queryFn: getMeta,
  });
}
