
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";

interface DeliveryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}

const DeliveryFilters: React.FC<DeliveryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  timezone,
  setTimezone,
  availableColumns,
  visibleColumns,
  setVisibleColumns
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <DateRangePicker
          date={dateRange}
          onChange={setDateRange}
          align="start"
          className="w-[260px]"
        />
        <TimezonePicker 
          value={timezone} 
          onChange={setTimezone}
          className="w-[200px]" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative h-9">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search deliveries..."
            className="w-[200px] pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ColumnSelector
          columns={availableColumns}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      </div>
    </div>
  );
};

export default DeliveryFilters;
