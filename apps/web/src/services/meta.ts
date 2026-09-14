import { useQuery } from "@tanstack/react-query";
export async function getMeta() {
  const response = await fetch("http://localhost:8000/api/meta");

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
