import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Unable to load data",
  message = "Something went wrong while fetching the latest information.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-44 items-center justify-center">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="flex size-10 items-center justify-center rounded-full border border-red-100 bg-red-50">
          <AlertCircle className="size-4.5 text-red-600" />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex h-8 items-center gap-2 rounded-md border border-blue-200 bg-blue-600 px-3 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="size-3.5" />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
