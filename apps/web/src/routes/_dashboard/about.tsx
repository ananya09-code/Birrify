import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Globe2,
  Landmark,
  LineChart,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/about")({
  component: About,
});

const features = [
  {
    icon: Landmark,
    title: "Compare Bank Rates",
    description:
      "Compare foreign exchange rates across Ethiopian banks in one place instead of checking each bank individually.",
  },
  {
    icon: LineChart,
    title: "Track Market Trends",
    description:
      "Explore historical exchange-rate movements and understand how the market changes over time.",
  },
  {
    icon: RefreshCw,
    title: "Regularly Updated Data",
    description:
      "Birrify collects and processes exchange-rate information so you can work with current market data.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Turn raw financial data into simple charts, comparisons, and useful information.",
  },
];

const banks = ["CBE", "Dashen", "Awash", "Nib", "Abyssinia", "Abay", "Hibret"];

export default function About() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-5">
        {/* Hero */}
        <section className="border-b pb-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              <Globe2 className="size-3.5" />
              Built for Ethiopian financial data
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Making financial data easier to understand.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Birrify is a financial data platform focused on making Ethiopian
              exchange-rate and market information easier to find, compare, and
              understand.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Instead of visiting multiple bank websites or working through
              scattered information, Birrify brings important financial data
              together in one simple interface.
            </p>
          </div>
        </section>

        {/* What is Birrify */}
        <section className="grid gap-8 border-b py-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              About Birrify
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight">
              One place for financial information
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>
              Birrify started with a simple problem: financial information can
              be difficult to compare when it is spread across different
              sources.
            </p>

            <p>
              The platform focuses on collecting, organizing, and presenting
              this information in a way that is easier to use. Whether you are
              checking today's exchange rate, comparing banks, or looking at
              historical trends, the goal is to make the information clear
              without overwhelming you.
            </p>

            <p>
              Birrify is being built as a growing financial data platform,
              starting with foreign exchange and expanding toward broader market
              information.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-b py-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              What you can do
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight">
              Built around useful financial data
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-background p-4"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="size-4.5" />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data */}
        <section className="grid gap-8 border-b py-8 lg:grid-cols-2">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Database className="size-5" />
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight">
              How the data works
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Birrify's backend collects exchange-rate information from
              supported financial institutions, processes the data, and makes it
              available through the platform.
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Historical data is stored so that Birrify can provide more than
              just today's numbers. This allows users to compare rates and
              understand how prices have changed over time.
            </p>
          </div>

          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-blue-600" />
              <h3 className="text-sm font-semibold">Data transparency</h3>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Financial data can change throughout the day. Birrify presents
              collected information as market data and should not be treated as
              financial advice.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Source information is organized by institution",
                "Historical values are kept for comparison",
                "Data is processed before being displayed",
                "More sources and market data are planned",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported banks */}
        <section className="border-b py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Coverage
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Growing financial coverage
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Birrify is designed to support data from multiple Ethiopian
                financial institutions rather than relying on a single source.
              </p>
            </div>

            <div className="flex flex-wrap content-start gap-2">
              {banks.map((bank) => (
                <div
                  key={bank}
                  className="rounded-lg border bg-background px-3 py-2 text-sm font-medium"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future */}
        <section className="border-b py-8">
          <div className="rounded-xl border bg-blue-50/60 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                <TrendingUp className="size-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  What's next
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  Birrify is more than exchange rates
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  The long-term goal is to build a broader financial information
                  platform for Ethiopia. Future areas include stock market data,
                  deeper market analytics, watchlists, alerts, and more tools
                  for understanding financial markets.
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {[
                    "Stock market data",
                    "Advanced analytics",
                    "Price alerts",
                    "Market watchlists",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 font-medium"
                    >
                      <span className="size-1.5 rounded-full bg-blue-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Our goal
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Financial information should be simple.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Birrify is being built to make financial data more accessible,
              understandable, and useful for everyone — from someone checking a
              currency rate for the first time to someone who regularly follows
              the market.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
                Explore Rates
                <ArrowRight className="size-4" />
              </button>
              <a
                href="https://github.com/ananya09-code/ethio-exchange"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium hover:bg-muted"
              >
                View Project
              </a>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="border-t pt-5 text-center text-xs text-muted-foreground">
          Birrify provides financial information for informational purposes
          only. Data may be delayed, incomplete, or subject to change.
        </div>
      </div>
    </div>
  );
}
