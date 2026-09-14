import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Clock3 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/stockmarket")({
  component: StockMarket,
});

export default function StockMarket() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-6 py-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <BarChart3 className="size-6" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            <Clock3 className="size-3.5" />
            Coming soon
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Stock Market
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Explore stock market data, company performance, market trends, and
            more in one place.
          </p>

          <div className="mt-6 rounded-lg border bg-background px-4 py-3 text-xs text-muted-foreground">
            We're working on it. Stock market features will be available in a
            future update.
          </div>
        </div>
      </div>
    </div>
  );
}
