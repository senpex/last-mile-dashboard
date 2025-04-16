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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataTableFilters } from "@/components/filters/DataTableFilters";

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
  isFilterSidebarOpen,
}: DriversFiltersProps) {
  return (
    <>
      <div className="px-4 py-4 flex-shrink-0 border-b space-y-0.5 pb-4">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-semibold text-foreground">Drivers Management</h1>
            <span className="text-sm text-muted-foreground">
              All times are displayed using {timezone.replace('_', ' ')} timezone
            </span>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <DateRangePicker 
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
                showStatePicker={false}
                useButton={false}
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
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Tabs 
                value={activeView} 
                onValueChange={onActiveViewChange} 
                className="w-auto"
              >
                <TabsList className="inline-flex h-6 bg-muted space-x-1 items-center justify-center">
                  <TabsTrigger 
                    value="main" 
                    className="px-3 text-xs rounded-md h-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
                  >
                    Main view
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={isFilterSidebarOpen} onOpenChange={onToggleFilterSidebar}>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <DataTableFilters
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
            timezone={timezone}
            onTimezoneChange={onTimezoneChange}
            availableColumns={availableColumns}
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={onVisibleColumnsChange}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
