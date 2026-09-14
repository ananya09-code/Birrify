import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TableFilter, { type FilterField } from "./TableFilter";

type TableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  filterFields: FilterField[];
  filterValues: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
};

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterFields,
  filterValues,
  onFilterChange,
  onResetFilters,
}: TableToolbarProps) {
  return (
    <div className="mb-3 flex items-center justify-end gap-2">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      <TableFilter
        fields={filterFields}
        values={filterValues}
        onChange={onFilterChange}
        onReset={onResetFilters}
      />
    </div>
  );
}
