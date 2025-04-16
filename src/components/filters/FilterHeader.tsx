
import React from 'react';
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface FilterHeaderProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  onToggleFilterSidebar: () => void;
  isFilterSidebarOpen: boolean;
}

export function FilterHeader({
  title,
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  timezone,
  onTimezoneChange,
  availableColumns,
  visibleColumns,
  onVisibleColumnsChange,
  onToggleFilterSidebar,
  isFilterSidebarOpen,
}: FilterHeaderProps) {
  return (
    <div className="px-4 py-6 flex-shrink-0 border-b w-[200%] max-w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <span className="text-sm text-muted-foreground">
            All times are displayed using {timezone.replace('_', ' ')} timezone
          </span>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <DateRangePicker 
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
            />
            
            <Button 
              variant={isFilterSidebarOpen ? "default" : "outline"} 
              className={`flex items-center gap-2 text-sm h-9 ${isFilterSidebarOpen ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={onToggleFilterSidebar}
              aria-expanded={isFilterSidebarOpen}
            >
              <Filter className="h-4 w-4" />
              <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Type to search"
                className="pl-8 h-9 w-[240px]"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
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
    </div>
  );
}
