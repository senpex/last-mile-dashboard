
import React from 'react';
import { FilterHeader } from "@/components/filters/FilterHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateRange } from "react-day-picker";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface DeliveryFiltersProps {
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
  showMyDeliveriesOnly?: boolean;
  onToggleMyDeliveries?: (showMyDeliveriesOnly: boolean) => void;
  hasAttentionRequiredOrders?: boolean;
}

export function DeliveryFilters({
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
  showMyDeliveriesOnly = true,
  onToggleMyDeliveries = () => {},
  hasAttentionRequiredOrders = false
}: DeliveryFiltersProps) {
  return (
    <>
      <FilterHeader
        title="Deliveries"
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        timezone={timezone}
        onTimezoneChange={onTimezoneChange}
        availableColumns={availableColumns}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={onVisibleColumnsChange}
        onToggleFilterSidebar={onToggleFilterSidebar}
        isFilterSidebarOpen={isFilterSidebarOpen}
      />
      
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-4">
          <ToggleGroup 
            type="single" 
            value={showMyDeliveriesOnly ? "me" : "all"}
            onValueChange={(value) => {
              if (value) { 
                onToggleMyDeliveries(value === "me");
              }
            }}
            className="border rounded-md h-6"
          >
            <ToggleGroupItem 
              value="me" 
              aria-label="Show my deliveries" 
              className="px-3 text-xs rounded-md h-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Me
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="all" 
              aria-label="Show all deliveries" 
              className="px-3 text-xs rounded-md h-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              All
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="flex items-center">
            <h2 className="text-sm font-semibold text-black mr-2">Views:</h2>
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
                <TabsTrigger 
                  value="attention" 
                  className="px-3 text-xs rounded-md h-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative flex items-center"
                >
                  Attention Required
                  {hasAttentionRequiredOrders && (
                    <span className="ml-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
