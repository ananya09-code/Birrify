import { Check, Copy } from "lucide-react";
import { useState } from "react";

type ApiEndpointProps = {
  method: "GET" | "POST";
  path: string;
  description: string;
};

export function ApiEndpoint({ method, path, description }: ApiEndpointProps) {
  const [copied, setCopied] = useState(false);

  async function copyPath() {
    try {
      await navigator.clipboard.writeText(path);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch {
      setCopied(false);
    }
  }

  const methodStyles =
    method === "GET"
      ? "border-green-200 bg-green-500 text-white"
      : method === "POST"
        ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        : "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400";

  return (
    <div className="group overflow-hidden rounded-xl border bg-card transition-colors">
      {/* Endpoint header */}
      <div className="flex min-w-0 items-center gap-3 px-4 py-3">
        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold tracking-wide ${methodStyles}`}
        >
          {method}
        </span>

        <code className="min-w-0 flex-1 truncate text-sm font-medium">
          {path}
        </code>

        <button
          type="button"
          onClick={copyPath}
          aria-label="Copy endpoint"
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
        >
          {copied ? (
            <Check className="size-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      {/* Description */}
      <div className="border-t bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
}
