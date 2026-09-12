import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  key: string;
  label: string;
  placeholder?: string;
  options: FilterOption[];
};

type TableFilterProps = {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
};

export default function TableFilter({
  fields,
  values,
  onChange,
  onReset,
}: TableFilterProps) {
  const hasFilters = Object.values(values).some(
    (value) => value && value !== "all",
  );

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" />
          Filter
          {hasFilters && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              !
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80">
        <div className="space-y-5">
          {/* Header */}
          <div>
            <h3 className="font-semibold">Filters</h3>
            <p className="text-sm text-muted-foreground">
              Refine the table results.
            </p>
          </div>

          {/* Dynamic fields */}
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>

              <Select
                value={values[field.key] ?? "all"}
                onValueChange={(value: any) => onChange(field.key, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={field.placeholder ?? `Select ${field.label}`}
                  />
                </SelectTrigger>

                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {/* Actions */}
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={!hasFilters}
            >
              <RotateCcw className="mr-2 size-3.5" />
              Reset
            </Button>

            <Button size="sm">Apply filters</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
