type HistoryHeaderProps = {
  currency: string;
};

export default function HistoryHeader({ currency }: HistoryHeaderProps) {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Rate History</h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Track how {currency} / ETB exchange rates have changed over time.
      </p>
    </section>
  );
}
