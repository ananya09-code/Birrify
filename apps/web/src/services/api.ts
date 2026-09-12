// src/lib/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function fetchRates(params?: {
  currency?: string;
  bank?: string;
  limit?: number;
  offset?: number;
}) {
  const searchParams = new URLSearchParams();

  if (params?.currency) {
    searchParams.set("currency", params.currency);
  }

  if (params?.bank) {
    searchParams.set("bank", params.bank);
  }

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.offset) {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/rates${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  return response.json();
}

export async function fetchBanks(search?: string) {
  const searchParams = new URLSearchParams();

  if (search) {
    searchParams.set("search", search);
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/banks${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch banks");
  }

  return response.json();
}

export async function fetchHistory(
  currency: string,
  params?: {
    bankId?: number;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  },
) {
  const searchParams = new URLSearchParams();

  if (params?.bankId !== undefined) {
    searchParams.set("bank_id", String(params.bankId));
  }

  if (params?.startDate) {
    searchParams.set("start_date", params.startDate);
  }

  if (params?.endDate) {
    searchParams.set("end_date", params.endDate);
  }

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.offset) {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/history/${currency}${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical rates");
  }

  return response.json();
}
