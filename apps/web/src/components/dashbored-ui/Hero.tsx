import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="w-full">
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-blue-700
          shadow-sm
        "
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
          {/* Left */}
          <div className="max-w-2xl">
            {/* Badge */}
            <Badge
              className="
                mb-5
                border-0
                bg-white/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-white
                backdrop-blur-sm
                hover:bg-white/15
              "
            >
              <span className="mr-2 size-1.5 rounded-full bg-green-400" />
              Live exchange rates
            </Badge>

            {/* Heading */}
            <h1
              className="
                max-w-xl
                text-3xl
                font-semibold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Ethiopian exchange rates,
              <span className="text-blue-200"> made simple.</span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-blue-100
                sm:text-base
              "
            >
              Track currency rates, compare banks, convert currencies, and
              explore Ethiopia's exchange-rate data in one place.
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/converter"
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-blue-700
                  shadow-sm
                  transition-all
                  hover:bg-blue-50
                "
              >
                Convert currency
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="https://github.com/birrify/ethio-exchange"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-sm
                  transition-all
                  hover:bg-white/15
                "
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Rate Card */}
          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-white
              p-5
              shadow-xl
              shadow-blue-950/10
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">USD / ETB</p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  US Dollar
                </p>
              </div>

              <div className="flex size-9 items-center justify-center rounded-lg bg-green-50">
                <TrendingUp className="size-4 text-green-600" />
              </div>
            </div>

            {/* Rate */}
            <div className="mt-7 flex items-baseline">
              <span className="text-3xl font-semibold tracking-tight text-slate-950">
                145.32
              </span>

              <span className="ml-2 text-sm text-slate-400">ETB</span>
            </div>

            {/* Change */}
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
              <TrendingUp className="size-3.5" />

              <span>+1.24%</span>

              <span className="font-normal text-slate-400">today</span>
            </div>

            {/* Mini chart */}
            <div className="mt-6 flex h-16 items-end gap-1">
              {[28, 35, 30, 42, 38, 48, 44, 52, 47, 58, 54, 62].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-sm bg-blue-100"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>

            {/* Updated */}
            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-slate-100
                pt-4
                text-[11px]
              "
            >
              <span className="text-slate-400">Last updated</span>

              <span className="font-medium text-slate-600">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
