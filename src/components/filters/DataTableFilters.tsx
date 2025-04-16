
import React from 'react';
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface DataTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
}

export function DataTableFilters({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  timezone,
  onTimezoneChange,
  availableColumns,
  visibleColumns,
  onVisibleColumnsChange,
}: DataTableFiltersProps) {
  return (
    <div className="px-4 py-6 flex-shrink-0 space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="space-y-4">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
          
          <TimezonePicker 
            selectedTimezone={timezone}
            onTimezoneChange={onTimezoneChange}
          />
          
          <ColumnSelector 
            columns={availableColumns}
            visibleColumns={visibleColumns}
            setVisibleColumns={onVisibleColumnsChange}
          />
        </div>
      </div>
    </div>
  );
}
