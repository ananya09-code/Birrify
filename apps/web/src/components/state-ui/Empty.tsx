import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = "No data available",
  message = "There is currently no information to display.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-44 items-center justify-center">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="flex size-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
          <Inbox className="size-4.5 text-blue-600" />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}
