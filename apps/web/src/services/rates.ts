// getting rates from the backend
type GetRatesParams = {
  currency?: string;
  date?: string;
  page?: number;
  perPage?: number;
};

export async function getRates({
  currency = "USD",
  date,
  page = 1,
  perPage = 10,
}: GetRatesParams = {}) {
  const params = new URLSearchParams();

  params.set("currency", currency);
  params.set("page", String(page));
  params.set("per_page", String(perPage));

  if (date) {
    params.set("date", date);
  }

  const response = await fetch(
    `http://127.0.0.1:8000/api/rates?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  return response.json();
}
