
import React from 'react';
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryStatus } from "@/types/delivery";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SearchInput } from "@/components/ui/search-input";

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
    <div className="px-4 py-6 flex-shrink-0 border-b w-[200%] max-w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Deliveries</h1>
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
            <SearchInput
              type="search"
              placeholder="Type to search"
              className="w-[240px]"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
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
        
        <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
}
