
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";

export interface DriversFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | null;
  onDateRangeChange: (range: DateRange | undefined) => void;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
}

export const DriversFilters: React.FC<DriversFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-background border-b">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search drivers..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
};
