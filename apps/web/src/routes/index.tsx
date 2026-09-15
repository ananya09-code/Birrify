import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CircleDollarSign,
  Code2,
  Database,
  GitCompareArrows,
  Globe2,
  LayoutDashboard,
  LineChart,
  Menu,
  Minus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import birrlogop from "@/assets/birrlogop.png";
export const Route = createFileRoute("/")({
  component: BirrifyLanding,
});

const FONT =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
function Logo() {
  return (
    <a
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="Birrify home"
    >
      <img
        src={birrlogop}
        alt="Birrify"
        className="size-10 shrink-0 object-contain"
      />

      <span className="text-[19px] font-bold tracking-[-0.035em] text-slate-950">
        Birrify
      </span>
    </a>
  );
}
function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Why Birrify", "#why"],
    ["How it works", "#how"],
    ["rates", "/compare"],
    ["banks", "/banks"],
    ["Dashboard", "/dashboard"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" aria-label="Birrify home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-950"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#about"
            className="text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-950"
          >
            Learn more
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20"
          >
            Explore Birrify
            <ArrowRight size={14} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-slate-600 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
        <span className="h-px w-5 bg-blue-600" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-[15px] leading-7 text-slate-500">{description}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white/60">
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "rgba(37,99,235,0.09)" }}
      />
      <div
        className="pointer-events-none absolute left-[-220px] top-[280px] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "rgba(59,130,246,0.045)" }}
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700">
            <Sparkles size={13} />
            Built for a clearer currency market
          </div>

          <h1 className="max-w-3xl text-[46px] font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[68px]">
            Make better decisions
            <span className="block text-blue-600">before you exchange.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[16px] leading-7 text-slate-500 sm:text-[17px]">
            Birrify is building a simple way to understand and compare foreign
            exchange rates in Ethiopia — without jumping between banks,
            websites, and scattered information.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20"
            >
              <LayoutDashboard size={16} />
              Go to Dashboard
            </a>

            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
            >
              See how Birrify works
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              Learn about Birrify
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-slate-500">
            {[
              "Simple by design",
              "Built for comparison",
              "No account required",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={14} className="text-blue-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[30px] bg-blue-50/60 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_32px_90px_rgba(15,23,42,0.15)]">
        <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-blue-600 text-center text-[10px] font-bold leading-6 text-white">
              B
            </div>
            <span className="text-[12px] font-semibold text-slate-800">
              Birrify
            </span>
          </div>

          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-slate-200" />
            <span className="size-2 rounded-full bg-slate-200" />
            <span className="size-2 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="grid grid-cols-[58px_1fr]">
          <div className="border-r border-slate-200 bg-slate-50/70 p-3">
            <div className="mb-5 size-7 rounded-lg bg-blue-600" />
            {[BarChart3, GitCompareArrows, Building2, LineChart].map(
              (Icon, index) => (
                <div
                  key={index}
                  className={`mb-4 flex size-7 items-center justify-center rounded-lg ${
                    index === 0 ? "bg-blue-50 text-blue-600" : "text-slate-400"
                  }`}
                >
                  <Icon size={14} />
                </div>
              ),
            )}
          </div>

          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Exchange market
                </div>
                <div className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                  Compare. Understand. Decide.
                </div>
              </div>

              <div className="hidden rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700 sm:block">
                USD / ETB
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                ["Compare", "Multiple banks"],
                ["Track", "Market movement"],
                ["Explore", "Historical context"],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="rounded-lg border border-slate-200 bg-slate-50/40 p-3 transition-colors duration-200 hover:bg-slate-50"
                >
                  <div className="text-[10px] font-semibold text-slate-400">
                    {title}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-700">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-600">
                  Market view
                </span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <TrendingUp size={12} />
                  Built for clarity
                </span>
              </div>

              <div className="mt-4 h-24">
                <svg
                  viewBox="0 0 500 110"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 82 C38 77 53 83 82 70 S122 73 150 58 S192 66 216 49 S259 57 286 39 S328 50 350 33 S392 40 414 22 S460 27 500 12"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 82 C38 77 53 83 82 70 S122 73 150 58 S192 66 216 49 S259 57 286 39 S328 50 350 33 S392 40 414 22 S460 27 500 12 L500 110 L0 110 Z"
                    fill="url(#heroFill)"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="heroFill" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity="0.15"
                      />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mt-2 flex justify-between text-[9px] text-slate-400">
                <span>Past</span>
                <span>Market context</span>
                <span>Future</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:block">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <GitCompareArrows size={16} />
          </div>
          <div>
            <div className="text-[10px] font-medium text-slate-400">
              The idea
            </div>
            <div className="text-[12px] font-semibold text-slate-800">
              One clearer view
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyBirrify() {
  const items = [
    {
      icon: GitCompareArrows,
      title: "Compare without the noise",
      description:
        "Bring the information people need into one focused experience instead of making them search across different sources.",
    },
    {
      icon: LineChart,
      title: "Understand the market",
      description:
        "Go beyond a single number. Birrify is designed to make rate movement and context easier to understand.",
    },
    {
      icon: ShieldCheck,
      title: "Make informed choices",
      description:
        "Birrify is a comparison and information platform. It helps you understand the market without telling you what you must do.",
    },
  ];

  return (
    <section id="why" className="border-b border-slate-200 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Why Birrify"
          title="The currency market should be easier to understand."
          description="Finding exchange-rate information can mean checking different banks, remembering different numbers, and trying to make sense of changing rates. Birrify is being built to make that experience clearer."
        />

        <div className="mt-12 grid gap-0 md:grid-cols-3">
          {items.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className={`group py-7 transition-transform duration-200 hover:-translate-y-0.5 md:px-7 md:py-0 ${
                index > 0
                  ? "border-t border-slate-200 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={19} />
              </div>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-slate-900">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-6 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Database,
      title: "Gather",
      text: "Birrify brings exchange-rate information together from available public sources.",
    },
    {
      number: "02",
      icon: GitCompareArrows,
      title: "Organize",
      text: "The information is structured so different rates and market views can be understood side by side.",
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Understand",
      text: "Clear comparisons and market context turn scattered information into something easier to use.",
    },
  ];

  return (
    <section id="how" className="border-b border-slate-200 bg-slate-50/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From scattered information to one clear view."
          description="The product is intentionally simple on the surface. Behind that simplicity is a pipeline designed to collect, organize, and present currency information clearly."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <div
              key={number}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_24px_rgba(15,23,42,0.035)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={18} />
                </div>
                <span className="text-xs font-bold tracking-widest text-slate-300">
                  {number}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: "Market overview",
      text: "A focused view for understanding the broader exchange-rate market.",
    },
    {
      icon: GitCompareArrows,
      title: "Bank comparison",
      text: "Compare available bank rates in one place instead of checking them individually.",
    },
    {
      icon: LineChart,
      title: "Historical context",
      text: "See how rates have moved over time so today's number has more meaning.",
    },
    {
      icon: CircleDollarSign,
      title: "Currency tools",
      text: "Simple tools designed to make everyday currency calculations easier.",
    },
    {
      icon: Code2,
      title: "Developer access",
      text: "A developer-friendly direction for people who want to build with currency data.",
    },
    {
      icon: Zap,
      title: "Fast and focused",
      text: "No unnecessary complexity. The interface is designed around the information that matters.",
    },
  ];

  return (
    <section id="features" className="border-b border-slate-200 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What Birrify does"
            title="A toolkit for understanding exchange rates."
            description="Every part of Birrify is built around one goal: reducing the friction between finding a rate and actually understanding it."
          />
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 lg:flex">
            <Minus size={14} />
            Focused by design
          </div>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className={`border-slate-200 p-6 transition-colors duration-200 hover:bg-slate-50 ${
                index % 2 !== 0 ? "sm:border-l" : ""
              } ${index >= 2 ? "border-t" : ""} ${
                index % 3 !== 0 ? "lg:border-l" : ""
              } ${index >= 3 ? "lg:border-t" : ""}`}
            >
              <Icon size={19} className="text-blue-600" />
              <h3 className="mt-5 text-[15px] font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-slate-200 bg-slate-50/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="About Birrify"
            title="Built to make Ethiopia's currency information more accessible."
            description="Birrify is a technology project focused on exchange-rate discovery, comparison, and market context."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={Globe2}
              title="Built for Ethiopia"
              text="Designed around the reality of finding and comparing foreign exchange information in the Ethiopian market."
            />
            <InfoCard
              icon={Building2}
              title="Bank-focused"
              text="The platform is centered around helping people understand differences between available bank rates."
            />
            <InfoCard
              icon={ShieldCheck}
              title="Information first"
              text="Birrify provides comparison and context. It does not set rates or execute currency exchanges."
            />
            <InfoCard
              icon={Code2}
              title="Open to builders"
              text="The long-term vision includes useful tools and data access for developers building financial products."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Globe2;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon size={17} />
      </div>
      <h3 className="mt-5 text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-[13px] leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function ComingSoon() {
  return (
    <section id="coming-soon" className="bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/70 px-6 py-12 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:px-10 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-700">
              <Sparkles size={13} />
              Birrify is still growing
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              More useful tools are coming.
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
              We are working toward a more complete currency-information
              platform with deeper market insights, more tools, and better ways
              to explore exchange rates.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "More market insights",
                "More currencies",
                "Developer tools",
                "Better historical views",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:border-blue-200"
                >
                  <Check size={13} className="text-blue-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-slate-200 bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-4 py-16 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Currency information, made clearer.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Birrify is building a better way to understand the Ethiopian
            exchange-rate market.
          </p>
        </div>

        <a
          href="#"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20"
        >
          Explore Birrify
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-xs leading-5 text-slate-400">
            Birrify is an exchange-rate comparison and information project.
            Rates and information are provided for comparison purposes and are
            not financial advice.
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
          <a
            href="#why"
            className="transition-colors duration-200 hover:text-slate-700"
          >
            Why Birrify
          </a>
          <a
            href="#features"
            className="transition-colors duration-200 hover:text-slate-700"
          >
            Features
          </a>
          <a
            href="#about"
            className="transition-colors duration-200 hover:text-slate-700"
          >
            About
          </a>
          <span>© {new Date().getFullYear()} Birrify</span>
        </div>
      </div>
    </footer>
  );
}

function BirrifyLanding() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950"
      style={{ fontFamily: FONT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* your existing content */}
      <Nav />
      <Hero />
      <WhyBirrify />
      <HowItWorks />
      <Features />
      <About />
      <ComingSoon />
      <FinalCta />
      <Footer />
    </main>
  );
}

export default BirrifyLanding;
