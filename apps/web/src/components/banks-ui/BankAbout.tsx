type BankAboutProps = {
  bankName: string;
};

export default function BankAbout({ bankName }: BankAboutProps) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="font-semibold">About {bankName}</h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        View the latest exchange rates offered by {bankName}
        and compare its pricing with other banks in Birrify.
      </p>
    </section>
  );
}
