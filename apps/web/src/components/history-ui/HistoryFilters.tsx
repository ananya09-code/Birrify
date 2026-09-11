import CurrencySelector from "@/components/compare-ui/CurrencySelector";
type Period = "7D" | "30D" | "90D" | "1Y";
type HistoryFiltersProps = {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  period: Period;
  onPeriodChange: (period: Period) => void;
};
const periods: Period[] = ["7D", "30D", "90D", "1Y"];
export default function HistoryFilters({
  currency,
  onCurrencyChange,
  period,
  onPeriodChange,
}: HistoryFiltersProps) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {" "}
      <CurrencySelector value={currency} onChange={onCurrencyChange} />{" "}
      <div className="flex w-full overflow-x-auto rounded-lg border bg-card p-1 sm:w-auto">
        {" "}
        {periods.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onPeriodChange(option)}
            className={`h-8 min-w-14 rounded-md px-3 text-xs font-medium transition-colors ${period === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            {" "}
            {option}{" "}
          </button>
        ))}{" "}
      </div>{" "}
    </section>
  );
}
