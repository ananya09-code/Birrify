import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatusCard({
  title,
  value,
  unit,
  footer,
  action,
}: {
  title: string;
  value: string | number;
  unit: string;
  footer: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        {action}
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tracking-tight">{value}</span>

          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        {footer}
      </CardFooter>
    </Card>
  );
}
