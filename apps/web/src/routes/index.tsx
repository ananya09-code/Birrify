import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Scale,
  History as HistoryIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: BirrifyLanding,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HistoryPoint = {
  date: string;
  rate: number;
};

type HistoryRange = "7D" | "30D" | "90D";

type EyebrowProps = {
  children: React.ReactNode;
};

type ChangeProps = {
  value: number;
  size?: number;
};

type SectionLabelProps = {
  kicker?: string;
  title: string;
  description?: string;
};

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

const COLORS = {
  blue: "#2563EB",
  blueDark: "#1D4ED8",
  green: "#16A34A",
  greenSoft: "#EEF9F1",
  red: "#DC2626",
  redSoft: "#FDEEEE",
  bg: "#F8FAFC",
  panel: "#FFFFFF",
  text: "#111827",
  textSoft: "#4B5563",
  textFaint: "#9AA3AF",
  border: "#E4E8EE",
};

const FONT_STACK =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const BANKS = [
  {
    name: "Commercial Bank of Ethiopia",
    short: "CBE",
    buy: 144.62,
    sell: 147.35,
    change: 1.74,
  },
  {
    name: "Dashen Bank",
    short: "DASH",
    buy: 144.8,
    sell: 147.1,
    change: 1.61,
  },
  {
    name: "Awash Bank",
    short: "AWASH",
    buy: 144.55,
    sell: 147.48,
    change: 1.92,
  },
  {
    name: "Bank of Abyssinia",
    short: "BOA",
    buy: 144.3,
    sell: 146.95,
    change: -0.22,
  },
  {
    name: "Wegagen Bank",
    short: "WEGA",
    buy: 144.4,
    sell: 147.02,
    change: 0.85,
  },
  {
    name: "Nib International Bank",
    short: "NIB",
    buy: 144.2,
    sell: 146.8,
    change: -0.41,
  },
];

function seededRandom(seed: number): () => number {
  let s = seed;

  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildHistory(
  days: number,
  start: number,
  seed: number,
): HistoryPoint[] {
  const rand = seededRandom(seed);
  const out: HistoryPoint[] = [];
  let value = start;

  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    value += (rand() - 0.47) * 0.55;

    const d = new Date(today);
    d.setDate(d.getDate() - i);

    out.push({
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rate: Number(value.toFixed(2)),
    });
  }

  return out;
}

const HISTORY: Record<HistoryRange, HistoryPoint[]> = {
  "7D": buildHistory(7, 143.6, 11),
  "30D": buildHistory(30, 140.9, 7),
  "90D": buildHistory(90, 134.5, 3),
};

const SPARK = buildHistory(14, 143.0, 21);

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Eyebrow({ children }: EyebrowProps) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: COLORS.blue,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Change({ value, size = 13 }: ChangeProps) {
  const positive = value >= 0;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        fontSize: size,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        color: positive ? COLORS.green : COLORS.red,
      }}
    >
      {positive ? (
        <ArrowUpRight size={size + 1} />
      ) : (
        <ArrowDownRight size={size + 1} />
      )}
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function SectionLabel({ kicker, title, description }: SectionLabelProps) {
  return (
    <div style={{ maxWidth: 620, marginBottom: 40 }}>
      {kicker && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: COLORS.textFaint,
            marginBottom: 10,
          }}
        >
          {kicker}
        </div>
      )}

      <h2
        style={{
          fontSize: 30,
          lineHeight: 1.25,
          fontWeight: 600,
          color: COLORS.text,
          margin: 0,
          marginBottom: description ? 10 : 0,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: COLORS.textSoft,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <header
      style={{
        borderBottom: `1px solid ${COLORS.border}`,
        background: "rgba(248,250,252,0.9)",
        backdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 26,
              height: 26,
              background: COLORS.blue,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            B
          </div>

          <span
            style={{
              fontWeight: 600,
              fontSize: 15,
              color: COLORS.text,
            }}
          >
            Birrify
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            gap: 28,
            fontSize: 14,
            color: COLORS.textSoft,
          }}
          className="birrify-nav-links"
        >
          <a href="/compare" style={navLink}>
            Rates
          </a>

          <a href="/banks" style={navLink}>
            Banks
          </a>

          <a href="/history" style={navLink}>
            History
          </a>

          <a href="/converter" style={navLink}>
            Converter
          </a>
        </nav>

        <button style={navCta}>Open Dashboard</button>
      </div>
    </header>
  );
}

const navLink: React.CSSProperties = {
  color: COLORS.textSoft,
  textDecoration: "none",
};

const navCta: React.CSSProperties = {
  background: COLORS.blue,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "8px 16px",
  fontSize: 13.5,
  fontWeight: 600,
  cursor: "pointer",
};

// ---------------------------------------------------------------------------
// Dashboard preview
// ---------------------------------------------------------------------------

function DashboardPreview() {
  const latest = SPARK[SPARK.length - 1].rate;
  const first = SPARK[0].rate;

  const pct = ((latest - first) / first) * 100;

  const bestBuy = Math.max(...BANKS.map((b) => b.buy));
  const bestSell = Math.min(...BANKS.map((b) => b.sell));

  const avg = (
    BANKS.reduce((s, b) => s + (b.buy + b.sell) / 2, 0) / BANKS.length
  ).toFixed(2);

  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        boxShadow:
          "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.05)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "18px 20px 8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textFaint,
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              USD / ETB
            </div>

            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.text,
                fontVariantNumeric: "tabular-nums",
                marginTop: 2,
              }}
            >
              {latest.toFixed(2)}{" "}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: COLORS.textFaint,
                }}
              >
                ETB
              </span>
            </div>
          </div>

          <Change value={pct} size={13.5} />
        </div>
      </div>

      <div style={{ height: 110, margin: "4px 4px 0" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={SPARK}
            margin={{
              top: 8,
              right: 12,
              left: 12,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.blue} stopOpacity={0.18} />

                <stop offset="100%" stopColor={COLORS.blue} stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="rate"
              stroke={COLORS.blue}
              strokeWidth={2}
              fill="url(#sparkFill)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        {[
          {
            label: "Best Buy",
            value: bestBuy.toFixed(2),
            color: COLORS.green,
          },
          {
            label: "Best Sell",
            value: bestSell.toFixed(2),
            color: COLORS.red,
          },
          {
            label: "Market Average",
            value: avg,
            color: COLORS.text,
          },
        ].map((cell, i) => (
          <div
            key={cell.label}
            style={{
              padding: "12px 16px",
              borderLeft: i > 0 ? `1px solid ${COLORS.border}` : "none",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.textFaint,
                fontWeight: 600,
              }}
            >
              {cell.label}
            </div>

            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: cell.color,
                fontVariantNumeric: "tabular-nums",
                marginTop: 2,
              }}
            >
              {cell.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      id="rates"
      style={{
        maxWidth: 1140,
        margin: "0 auto",
        padding: "68px 24px 84px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
        className="birrify-hero-grid"
      >
        <div>
          <Eyebrow>Ethiopian Exchange Rates</Eyebrow>

          <h1
            style={{
              fontSize: 44,
              lineHeight: 1.14,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: COLORS.text,
              margin: 0,
              marginBottom: 18,
            }}
          >
            Know the rate before you exchange.
          </h1>

          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.65,
              color: COLORS.textSoft,
              maxWidth: 460,
              margin: 0,
              marginBottom: 30,
            }}
          >
            Compare exchange rates from Ethiopian banks, track market trends,
            and find the rate that works best for you.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                background: COLORS.blue,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 20px",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Explore Rates <ArrowRight size={16} />
            </button>

            <button
              style={{
                background: "transparent",
                color: COLORS.text,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 6,
                padding: "12px 20px",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Compare Banks
            </button>
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why Birrify
// ---------------------------------------------------------------------------

function WhyBirrify() {
  const items = [
    {
      icon: Scale,
      title: "Compare bank rates",
      description:
        "See buy and sell rates from Ethiopia's major banks side by side, updated regularly.",
    },
    {
      icon: HistoryIcon,
      title: "Track historical trends",
      description:
        "Follow how the USD/ETB rate has moved over the past week, month, or quarter.",
    },
    {
      icon: ArrowLeftRight,
      title: "Convert currencies",
      description:
        "Estimate what your money is worth using current market rates before you exchange.",
    },
  ];

  return (
    <section
      style={{
        background: COLORS.panel,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        <SectionLabel
          kicker="Why Birrify"
          title="One dashboard instead of six browser tabs"
          description="Birrify pulls published rates from Ethiopian banks into a single view, so you can see where you stand before you make a decision."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
          }}
          className="birrify-feature-grid"
        >
          {items.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              style={{
                padding: "0 28px",
                paddingLeft: i === 0 ? 0 : 28,
                borderLeft: i > 0 ? `1px solid ${COLORS.border}` : "none",
              }}
            >
              <Icon size={20} color={COLORS.blue} strokeWidth={1.75} />

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.text,
                  margin: "16px 0 8px",
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: COLORS.textSoft,
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bank Comparison
// ---------------------------------------------------------------------------

function BankComparison() {
  return (
    <section
      id="banks"
      style={{
        maxWidth: 1140,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      <SectionLabel
        kicker="Bank comparison"
        title="Current rates across major banks"
        description="Buy and sell rates for US Dollars, as published by each bank. Rates change throughout the day."
      />

      <div
        style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          overflow: "hidden",
          background: COLORS.panel,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
            padding: "10px 20px",
            fontSize: 11.5,
            fontWeight: 600,
            color: COLORS.textFaint,
            letterSpacing: "0.02em",
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.bg,
          }}
        >
          <div>Bank</div>
          <div style={{ textAlign: "right" }}>Buy</div>
          <div style={{ textAlign: "right" }}>Sell</div>
          <div style={{ textAlign: "right" }}>24h change</div>
        </div>

        {BANKS.map((bank, i) => (
          <div
            key={bank.short}
            style={{
              display: "grid",
              gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
              padding: "14px 20px",
              alignItems: "center",
              borderBottom:
                i < BANKS.length - 1 ? `1px solid ${COLORS.border}` : "none",
              fontSize: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: COLORS.textSoft,
                  flexShrink: 0,
                }}
              >
                {bank.short.slice(0, 3)}
              </div>

              <span
                style={{
                  color: COLORS.text,
                  fontWeight: 500,
                }}
              >
                {bank.name}
              </span>
            </div>

            <div
              style={{
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: COLORS.text,
              }}
            >
              {bank.buy.toFixed(2)}
            </div>

            <div
              style={{
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: COLORS.text,
              }}
            >
              {bank.sell.toFixed(2)}
            </div>

            <div style={{ textAlign: "right" }}>
              <Change value={bank.change} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Historical Data
// ---------------------------------------------------------------------------

function HistoricalData() {
  const [range, setRange] = useState<HistoryRange>("30D");
  const data = HISTORY[range];

  return (
    <section
      id="history"
      style={{
        background: COLORS.panel,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <SectionLabel
            kicker="Historical data"
            title="See how the rate has moved"
            description="Market average rate over time, based on aggregated bank data."
          />

          <div
            style={{
              display: "flex",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 40,
            }}
          >
            {(Object.keys(HISTORY) as HistoryRange[]).map((key) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                style={{
                  border: "none",
                  padding: "7px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: range === key ? COLORS.blue : "transparent",
                  color: range === key ? "#fff" : COLORS.textSoft,
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "20px 12px 8px",
            height: 300,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 4,
                right: 16,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid stroke={COLORS.border} vertical={false} />

              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11.5,
                  fill: COLORS.textFaint,
                }}
                axisLine={{
                  stroke: COLORS.border,
                }}
                tickLine={false}
                minTickGap={40}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{
                  fontSize: 11.5,
                  fill: COLORS.textFaint,
                }}
                axisLine={false}
                tickLine={false}
                width={44}
              />

              <Tooltip
                contentStyle={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  fontSize: 12.5,
                  boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
                }}
                formatter={(v) => [
                  `${Number(v).toFixed(2)} ETB`,
                  "Market average",
                ]}
              />

              <Line
                type="monotone"
                dataKey="rate"
                stroke={COLORS.blue}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Converter
// ---------------------------------------------------------------------------

function Converter() {
  const avgRate = useMemo(
    () => BANKS.reduce((s, b) => s + (b.buy + b.sell) / 2, 0) / BANKS.length,
    [],
  );

  const [amount, setAmount] = useState("100");

  const numeric = parseFloat(amount) || 0;
  const converted = (numeric * avgRate).toFixed(2);

  return (
    <section
      id="converter"
      style={{
        maxWidth: 1140,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
        className="birrify-hero-grid"
      >
        <SectionLabel
          kicker="Currency converter"
          title="Estimate before you exchange"
          description="Enter an amount to see roughly what it's worth at the current market average rate. Individual banks may offer better or worse rates."
        />

        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            background: COLORS.panel,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <label style={fieldLabel}>You send</label>

              <div style={inputWrap}>
                <input
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  style={inputStyle}
                  inputMode="decimal"
                />

                <span style={currencyTag}>USD</span>
              </div>
            </div>

            <div
              style={{
                paddingTop: 22,
                color: COLORS.textFaint,
              }}
            >
              <ArrowLeftRight size={16} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={fieldLabel}>They receive</label>

              <div style={inputWrap}>
                <span
                  style={{
                    ...inputStyle,
                    fontWeight: 600,
                    color: COLORS.text,
                  }}
                >
                  {Number(converted).toLocaleString()}
                </span>

                <span style={currencyTag}>ETB</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${COLORS.border}`,
              fontSize: 12.5,
              color: COLORS.textFaint,
              lineHeight: 1.6,
            }}
          >
            Estimated using today's market average rate of {avgRate.toFixed(2)}{" "}
            ETB per USD. Rates are aggregated for comparison only and are not
            official or guaranteed.
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: 11.5,
  fontWeight: 600,
  color: COLORS.textFaint,
  marginBottom: 6,
};

const inputWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 6,
  padding: "10px 12px",
  background: COLORS.bg,
};

const inputStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 16,
  fontVariantNumeric: "tabular-nums",
  color: COLORS.text,
  width: "100%",
};

const currencyTag: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: COLORS.textFaint,
  letterSpacing: "0.02em",
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------

function FinalCta() {
  return (
    <section
      style={{
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "56px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.text,
              margin: 0,
              marginBottom: 6,
            }}
          >
            See today's rates before you exchange
          </h2>

          <p
            style={{
              fontSize: 14.5,
              color: COLORS.textSoft,
              margin: 0,
            }}
          >
            Free to use. No account required to compare rates.
          </p>
        </div>

        <button
          style={{
            background: COLORS.blue,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 22px",
            fontSize: 14.5,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          Open Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
  return (
    <footer
      style={{
        background: COLORS.panel,
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                background: COLORS.blue,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 10.5,
              }}
            >
              B
            </div>

            <span
              style={{
                fontWeight: 600,
                fontSize: 13.5,
                color: COLORS.text,
              }}
            >
              Birrify
            </span>
          </div>

          <p
            style={{
              fontSize: 12.5,
              color: COLORS.textFaint,
              maxWidth: 420,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Rates are aggregated from public bank sources for comparison
            purposes. Birrify does not set, guarantee, or execute exchange
            rates.
          </p>
        </div>

        <div
          style={{
            fontSize: 12.5,
            color: COLORS.textFaint,
          }}
        >
          © {new Date().getFullYear()} Birrify
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BirrifyLanding() {
  return (
    <div
      style={{
        background: `
          radial-gradient(
            700px 420px at 78% 0%,
            rgba(37,99,235,0.08),
            transparent 65%
          ),
          linear-gradient(
            ${COLORS.border} 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            ${COLORS.border} 1px,
            transparent 1px
          )
        `,
        backgroundColor: COLORS.bg,
        backgroundSize: "auto, 40px 40px, 40px 40px",
        backgroundPosition: "0 0, -1px -1px, -1px -1px",
        minHeight: "100vh",
        fontFamily: FONT_STACK,
        color: COLORS.text,
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        button:focus-visible,
        a:focus-visible,
        input:focus-visible {
          outline: 2px solid ${COLORS.blue};
          outline-offset: 2px;
        }

        @media (max-width: 860px) {
          .birrify-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .birrify-feature-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }

          .birrify-feature-grid > div {
            border-left: none !important;
            padding-left: 0 !important;
          }

          .birrify-nav-links {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <Nav />
      <Hero />
      <WhyBirrify />
      <BankComparison />
      <HistoricalData />
      <Converter />
      <FinalCta />
      <Footer />
    </div>
  );
}
