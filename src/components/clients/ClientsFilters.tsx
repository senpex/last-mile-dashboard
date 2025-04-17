
import React from 'react';
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFiltersLayout } from "@/components/users/UserFiltersLayout";
import { SearchInput } from "@/components/ui/search-input";

interface ClientsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  activeView: string;
  onActiveViewChange: (view: string) => void;
  onToggleFilterSidebar: () => void;
  isFilterSidebarOpen: boolean;
}

export function ClientsFilters({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  timezone,
  onTimezoneChange,
  availableColumns,
  visibleColumns,
  onVisibleColumnsChange,
  activeView,
  onActiveViewChange,
  onToggleFilterSidebar,
  isFilterSidebarOpen
}: ClientsFiltersProps) {
  const filterControls = (
    <>
      <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} showStatePicker={false} useButton={false} />
      
      <Button 
        variant={isFilterSidebarOpen ? "default" : "outline"} 
        className={`flex items-center gap-2 text-sm h-9 ${isFilterSidebarOpen ? 'bg-primary text-primary-foreground' : ''}`} 
        onClick={onToggleFilterSidebar} 
        aria-expanded={isFilterSidebarOpen}
      >
        <Filter className="h-4 w-4" />
        <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
      </Button>
    </>
  );

  const searchControls = (
    <>
      <SearchInput
        type="search" 
        placeholder="Search clients..." 
        className="w-[240px]" 
        value={searchTerm} 
        onChange={e => onSearchChange(e.target.value)} 
      />
      
      <TimezonePicker selectedTimezone={timezone} onTimezoneChange={onTimezoneChange} />
      
      <ColumnSelector 
        columns={availableColumns} 
        visibleColumns={visibleColumns} 
        setVisibleColumns={onVisibleColumnsChange} 
      />
    </>
  );

  const viewControls = (
    <Tabs value={activeView} onValueChange={onActiveViewChange} className="w-auto">
      {/* Tabs content - can be customized for clients */}
    </Tabs>
  );

  return (
    <UserFiltersLayout
      title="Clients Management"
      timezoneInfo={`All times are displayed using ${timezone.replace('_', ' ')} timezone`}
      filterControls={filterControls}
      searchControls={searchControls}
      viewControls={viewControls}
    />
  );
}
