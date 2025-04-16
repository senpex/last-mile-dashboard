import React from 'react';
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DriversFiltersProps {
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

export function DriversFilters({
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
}: DriversFiltersProps) {
  return <div className="px-4 py-4 flex-shrink-0 border-b space-y-0.5 pb-4">
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold text-foreground text-left">Drivers Management</h1>
          <span className="text-sm text-muted-foreground text-right">
            All times are displayed using {timezone.replace('_', ' ')} timezone
          </span>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} showStatePicker={false} useButton={false} />
            
            <Button variant={isFilterSidebarOpen ? "default" : "outline"} className={`flex items-center gap-2 text-sm h-9 ${isFilterSidebarOpen ? 'bg-primary text-primary-foreground' : ''}`} onClick={onToggleFilterSidebar} aria-expanded={isFilterSidebarOpen}>
              <Filter className="h-4 w-4" />
              <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search drivers..." className="pl-8 h-9 w-[240px]" value={searchTerm} onChange={e => onSearchChange(e.target.value)} />
            </div>
            
            <TimezonePicker selectedTimezone={timezone} onTimezoneChange={onTimezoneChange} />
            
            <ColumnSelector columns={availableColumns} visibleColumns={visibleColumns} setVisibleColumns={onVisibleColumnsChange} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tabs value={activeView} onValueChange={onActiveViewChange} className="w-auto">
              
            </Tabs>
          </div>
        </div>
      </div>
      
      <div style={{
        width: "300px",
        transform: isFilterSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
      }} className="absolute top-0 left-0 h-full bg-background border-r transition-all duration-300 ease-in-out z-10 px-[85px] -mt-0">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <ScrollArea className="flex-1 -mr-4 pr-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  {/* Add status filters */}
                </div>
                <div>
                  <label className="text-sm font-medium">Hire Status</label>
                  {/* Add hire status filters */}
                </div>
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  {/* Add rating filters */}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>;
}
