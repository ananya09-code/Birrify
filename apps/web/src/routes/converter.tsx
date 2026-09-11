import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

import ConverterCard from "@/components/converter-ui/ConverterCard";
import PopularConversions from "@/components/converter-ui/PopularConversions";
import RateInfo from "@/components/converter-ui/RateInfo";
import { useMarket } from "@/hooks/use-market";
import { SUPPORTED_CURRENCIES } from "@/components/converter-ui/CurrencySelect";

type RateType = "average" | "buy" | "sell";

export const Route = createFileRoute("/converter")({
  component: ConverterPage,
});

function ConverterPage() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [rateType, setRateType] = useState<RateType>("average");

  const fromMarket = useMarket({
    currency: fromCurrency === "ETB" ? "USD" : fromCurrency,
  });

  const toMarket = useMarket({
    currency: toCurrency === "ETB" ? "USD" : toCurrency,
  });

  const fromData = fromCurrency === "ETB" ? null : fromMarket.data;

  const toData = toCurrency === "ETB" ? null : toMarket.data;

  const isLoading = fromMarket.isLoading || toMarket.isLoading;

  function getAverage(market: { average_buy: number; average_sell: number }) {
    return (market.average_buy + market.average_sell) / 2;
  }

  function getRate(
    currency: string,
    market: typeof fromData,
    direction: "source" | "target",
  ) {
    if (currency === "ETB") {
      return 1;
    }

    if (!market) {
      return 0;
    }

    if (rateType === "average") {
      return getAverage(market.market);
    }

    if (rateType === "buy") {
      return market.market.average_buy;
    }

    if (rateType === "sell") {
      return market.market.average_sell;
    }

    return direction === "source"
      ? market.market.average_buy
      : market.market.average_sell;
  }

  const rate = useMemo(() => {
    if (fromCurrency === toCurrency) {
      return 1;
    }

    const sourceRate = getRate(fromCurrency, fromData, "source");

    const targetRate = getRate(toCurrency, toData, "target");

    if (!sourceRate || !targetRate) {
      return 0;
    }

    // Foreign → ETB
    if (toCurrency === "ETB") {
      return sourceRate;
    }

    // ETB → Foreign
    if (fromCurrency === "ETB") {
      return 1 / targetRate;
    }

    // Foreign → Foreign
    return sourceRate / targetRate;
  }, [fromCurrency, toCurrency, fromData, toData, rateType]);

  const result = useMemo(() => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0 || rate <= 0) {
      return 0;
    }

    return numericAmount * rate;
  }, [amount, rate]);

  function handleAmountChange(value: string) {
    if (value === "") {
      setAmount("");
      return;
    }

    if (Number(value) < 0) {
      return;
    }

    setAmount(value);
  }

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function handlePopularConversion(currency: string) {
    setFromCurrency(currency);
    setToCurrency("ETB");
  }

  const popularCurrencies = SUPPORTED_CURRENCIES.filter(
    (currency) => currency.code !== "ETB",
  ).map((currency) => {
    const market =
      currency.code === fromCurrency
        ? fromData
        : currency.code === toCurrency
          ? toData
          : undefined;

    return {
      code: currency.code,
      average: market ? getAverage(market.market) : 0,
    };
  });

  const fromName =
    SUPPORTED_CURRENCIES.find((currency) => currency.code === fromCurrency)
      ?.name ?? fromCurrency;

  const toName =
    SUPPORTED_CURRENCIES.find((currency) => currency.code === toCurrency)
      ?.name ?? toCurrency;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <div className="mb-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Calculator className="size-4" />
          Currency converter
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Convert Currency
        </h1>

        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Convert between currencies using Birrify&apos;s latest exchange rates.
        </p>
      </header>

      <ConverterCard
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        rateType={rateType}
        result={result}
        rate={rate}
        fromName={fromName}
        toName={toName}
        updatedAt={fromData?.last_updated ?? toData?.last_updated}
        isLoading={isLoading}
        onAmountChange={handleAmountChange}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onRateTypeChange={setRateType}
        onSwap={handleSwap}
      />

      <PopularConversions
        currencies={popularCurrencies}
        onSelect={handlePopularConversion}
      />

      {fromCurrency !== "ETB" && fromData && (
        <RateInfo
          currency={fromCurrency}
          market={fromData.market}
          updatedAt={fromData.last_updated}
        />
      )}

      {fromCurrency === "ETB" && toCurrency !== "ETB" && toData && (
        <RateInfo
          currency={toCurrency}
          market={toData.market}
          updatedAt={toData.last_updated}
        />
      )}
    </main>
  );
}
