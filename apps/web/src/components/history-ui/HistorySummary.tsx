import StatusCard from "@/components/common-ui/StatusCard";
import type { HistoryPoint } from "@/services/history";

type HistorySummaryProps = {
  buy: {
    value: number;
    change_percent: number;
  };
  sell: {
    value: number;
    change_percent: number;
  };
  history?: HistoryPoint[];
};

function formatChange(changePercent: number) {
  if (changePercent > 0) {
    return `↑ ${changePercent.toFixed(2)}%`;
  }

  if (changePercent < 0) {
    return `↓ ${Math.abs(changePercent).toFixed(2)}%`;
  }

  return "No change";
}

export default function HistorySummary({
  buy,
  sell,
  history = [],
}: HistorySummaryProps) {
  const periodHigh =
    history.length > 0 ? Math.max(...history.map((item) => item.average)) : 0;

  const periodLow =
    history.length > 0 ? Math.min(...history.map((item) => item.average)) : 0;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="Current Buy"
        value={buy.value.toFixed(2)}
        unit="ETB"
        footer={formatChange(buy.change_percent)}
      />

      <StatusCard
        title="Current Sell"
        value={sell.value.toFixed(2)}
        unit="ETB"
        footer={formatChange(sell.change_percent)}
      />

      <StatusCard
        title="Period High"
        value={periodHigh.toFixed(2)}
        unit="ETB"
        footer="Highest average rate"
      />

      <StatusCard
        title="Period Low"
        value={periodLow.toFixed(2)}
        unit="ETB"
        footer="Lowest average rate"
      />
    </section>
  );
}
