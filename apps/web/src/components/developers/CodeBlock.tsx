import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-zinc-950 text-zinc-100 shadow-sm">
      {/* Header */}
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
        <span className="font-mono text-[11px] text-zinc-500">{language}</span>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-blue-400" />
              <span className="text-blue-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
