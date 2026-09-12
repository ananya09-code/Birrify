import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  KeyRound,
  LineChart,
  Terminal,
} from "lucide-react";

import { ApiEndpoint } from "@/components/developers/ApiEndpoint";
import { CodeBlock } from "@/components/developers/CodeBlock";
import { createFileRoute } from "@tanstack/react-router";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export const Route = createFileRoute("/developers")({
  component: Developers,
});

const endpointCards = [
  {
    icon: LineChart,
    title: "Exchange Rates",
    description:
      "Get the latest buying and selling rates across Ethiopian banks.",
    path: "/api/v1/rates",
  },
  {
    icon: Building2,
    title: "Banks",
    description: "Discover banks available through the Birrify API.",
    path: "/api/v1/banks",
  },
  {
    icon: Clock3,
    title: "Historical Data",
    description: "Access historical exchange rates for supported currencies.",
    path: "/api/v1/history/{currency}",
  },
];

const curlExample = `curl "${API_URL}/api/v1/rates?currency=USD"`;

const javascriptExample = `const response = await fetch(
  "${API_URL}/api/v1/rates?currency=USD"
);

const data = await response.json();

console.log(data);`;

export default function Developers() {
  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <section className="border-b bg-blue-50/60">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              <Code2 className="size-3.5" />
              Birrify API
              <span className="font-mono text-blue-100">v1</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build with Birrify
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Access Ethiopian foreign exchange data through a simple REST API.
              Get current rates, bank information, and historical market data.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#quick-start"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-blue-600 px-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get started
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#endpoints"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-blue-200 bg-white px-3.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
              >
                <BookOpen className="size-4" />
                API reference
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview cards */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-3">
          {endpointCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-background p-5 transition-colors hover:bg-blue-50/30"
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <Icon className="size-4.5 text-blue-600" />
                </div>

                <h2 className="text-sm font-semibold">{item.title}</h2>

                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>

                <code className="mt-3 block truncate text-[11px] text-blue-600">
                  {item.path}
                </code>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:px-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Documentation
            </p>

            <nav className="space-y-0.5">
              <DocLink href="#quick-start" active>
                Quick Start
              </DocLink>

              <DocLink href="#endpoints">Endpoints</DocLink>

              <DocLink href="#rates">Rates</DocLink>

              <DocLink href="#banks">Banks</DocLink>

              <DocLink href="#history">Historical Data</DocLink>
            </nav>

            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-blue-600" />

                <span className="text-xs font-semibold">Base URL</span>
              </div>

              <code className="mt-1.5 block break-all text-[11px] leading-5 text-blue-700">
                {API_URL}
              </code>
            </div>
          </div>
        </aside>

        {/* Documentation */}
        <main className="min-w-0 max-w-4xl">
          {/* Quick Start */}
          <section id="quick-start" className="scroll-mt-8">
            <SectionHeader
              icon={<Terminal className="size-4 text-blue-600" />}
              title="Quick Start"
              description="Make your first request in seconds."
            />

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  1. Request the latest USD rates
                </p>

                <CodeBlock language="bash" code={curlExample} />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  2. Use the response in JavaScript
                </p>

                <CodeBlock language="javascript" code={javascriptExample} />
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="endpoints" className="mt-12 scroll-mt-8">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                API v1
              </p>

              <h2 className="mt-1 text-xl font-semibold">API Reference</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                The core endpoints available in the Birrify API.
              </p>
            </div>

            <div className="space-y-2">
              <ApiEndpoint
                method="GET"
                path="/api/v1/rates"
                description="Get the latest exchange rates."
              />

              <ApiEndpoint
                method="GET"
                path="/api/v1/banks"
                description="Get all banks available in Birrify."
              />

              <ApiEndpoint
                method="GET"
                path="/api/v1/history/{currency}"
                description="Get historical rates for a currency."
              />
            </div>
          </section>

          {/* Rates */}
          <section id="rates" className="mt-12 scroll-mt-8">
            <SectionHeader
              icon={<LineChart className="size-4 text-blue-600" />}
              title="Exchange Rates"
              description="Retrieve the latest buying and selling rates."
            />

            <ApiEndpoint
              method="GET"
              path="/api/v1/rates"
              description="Returns the latest exchange rates across banks."
            />

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Example request</p>

              <CodeBlock
                language="bash"
                code={`curl "${API_URL}/api/v1/rates?currency=USD"`}
              />
            </div>
          </section>

          {/* Banks */}
          <section id="banks" className="mt-12 scroll-mt-8">
            <SectionHeader
              icon={<Building2 className="size-4 text-blue-600" />}
              title="Banks"
              description="Discover banks and retrieve their exchange rates."
            />

            <ApiEndpoint
              method="GET"
              path="/api/v1/banks"
              description="Returns banks available through the API."
            />

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Example request</p>

              <CodeBlock
                language="bash"
                code={`curl "${API_URL}/api/v1/banks"`}
              />
            </div>
          </section>

          {/* Historical Data */}
          <section id="history" className="mt-12 scroll-mt-8">
            <SectionHeader
              icon={<Database className="size-4 text-blue-600" />}
              title="Historical Data"
              description="Query historical exchange rates for a supported currency."
            />

            <ApiEndpoint
              method="GET"
              path="/api/v1/history/{currency}"
              description="Returns historical exchange-rate records."
            />

            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Example request</p>

                <CodeBlock
                  language="bash"
                  code={`curl "${API_URL}/api/v1/history/USD"`}
                />
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm font-medium">Historical data</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Historical records include the bank, currency, buy rate,
                      sell rate, spread, and timestamp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <section className="mt-12 border-t pt-6">
            <div className="flex gap-3">
              <KeyRound className="mt-0.5 size-4 text-blue-600" />

              <p className="text-xs leading-5 text-muted-foreground">
                Birrify API v1 is currently available without authentication for
                development and demonstration.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function DocLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-blue-50 font-medium text-blue-700"
          : "text-muted-foreground hover:bg-blue-50/60 hover:text-blue-700",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2.5 flex size-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
        {icon}
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
