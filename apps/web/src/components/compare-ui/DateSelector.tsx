import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateSelectorProps = {
  date?: Date;
  onDateChange: (date: Date) => void;
};

export default function DateSelector({
  date,
  onDateChange,
}: DateSelectorProps) {
  const selectedDate = date ?? new Date();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 sm:w-[180px]"
        >
          <CalendarDays className="size-4 text-muted-foreground" />

          <span>{format(selectedDate, "MMM d, yyyy")}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(newDate) => {
            if (newDate) {
              onDateChange(newDate);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
