import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

import ConverterCard from "@/components/converter-ui/ConverterCard";
import PopularConversions from "@/components/converter-ui/PopularConversions";
import RateInfo from "@/components/converter-ui/RateInfo";
import { useMarket } from "@/hooks/use-market";
import { useMarkets } from "@/hooks/use-markets";
import { useInfo } from "@/hooks/use-info";

type RateType = "average" | "buy" | "sell";

export const Route = createFileRoute("/_dashboard/converter")({
  component: ConverterPage,
});

function ConverterPage() {
  const [amount, setAmount] = useState("1000");
  const { data: info, isLoading: infoLoading, isError: infoError } = useInfo();
  const currencies = info?.currencies ?? [];
  const foreignCurrencies = currencies.filter(
    (currency) => currency.code !== "ETB",
  );
  const defaultForeign = foreignCurrencies[0]?.code ?? "USD";
  const [fromCurrency, setFromCurrency] = useState(defaultForeign);
  const [toCurrency, setToCurrency] = useState("ETB");
  const [rateType, setRateType] = useState<RateType>("average");

  const fromMarket = useMarket({
    currency: fromCurrency === "ETB" ? "USD" : fromCurrency,
  });

  const toMarket = useMarket({
    currency: toCurrency === "ETB" ? "USD" : toCurrency,
  });
  const markets = useMarkets();

  const fromData = fromCurrency === "ETB" ? null : fromMarket.data;

  const toData = toCurrency === "ETB" ? null : toMarket.data;

  const isLoading = fromMarket.isLoading || toMarket.isLoading;

  function getAverage(market: { average_buy: number; average_sell: number }) {
    return (market.average_buy + market.average_sell) / 2;
  }

  const rate = useMemo(() => {
    if (fromCurrency === toCurrency) {
      return 1;
    }

    const sourceRate =
      fromCurrency === "ETB"
        ? 1
        : rateType === "buy"
          ? (fromData?.market.average_buy ?? 0)
          : rateType === "sell"
            ? (fromData?.market.average_sell ?? 0)
            : fromData
              ? getAverage(fromData.market)
              : 0;
    const targetRate =
      toCurrency === "ETB"
        ? 1
        : rateType === "buy"
          ? (toData?.market.average_buy ?? 0)
          : rateType === "sell"
            ? (toData?.market.average_sell ?? 0)
            : toData
              ? getAverage(toData.market)
              : 0;

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

  const popularCurrencies = currencies
    .filter((currency) => currency.code !== "ETB")
    .map((currency) => {
      const market = markets.data?.data.find(
        (item) => item.currency === currency.code,
      );

      return {
        code: currency.code,
        average: market ? getAverage(market.market) : 0,
      };
    });

  const fromName =
    currencies.find((currency) => currency.code === fromCurrency)?.name ??
    fromCurrency;

  const toName =
    currencies.find((currency) => currency.code === toCurrency)?.name ??
    toCurrency;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-2">
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
        isLoading={isLoading || infoLoading || markets.isLoading}
        onAmountChange={handleAmountChange}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onRateTypeChange={setRateType}
        onSwap={handleSwap}
        currencies={currencies}
      />

      {infoError ||
      fromMarket.isError ||
      toMarket.isError ||
      markets.isError ? (
        <p className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive">
          Unable to load one or more current market rates. Please retry.
        </p>
      ) : null}

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
