import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = "Loading data...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-44 items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex size-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
          <Loader2 className="size-4.5 animate-spin text-blue-600" />
        </div>

        <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Please wait a moment
        </p>
      </div>
    </div>
  );
}
