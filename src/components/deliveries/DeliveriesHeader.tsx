
import React from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { DateRange } from "react-day-picker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DeliveriesHeaderProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  timezone: string;
  setTimezone: (zone: string) => void;
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const DeliveriesHeader: React.FC<DeliveriesHeaderProps> = ({
  dateRange,
  setDateRange,
  searchTerm,
  setSearchTerm,
  timezone,
  setTimezone,
  availableColumns,
  visibleColumns,
  setVisibleColumns,
  activeView,
  setActiveView,
}) => {
  return (
    <div className="px-4 py-6 flex-shrink-0 border-b">
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
              onDateRangeChange={setDateRange}
            />
            
            <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <TimezonePicker 
              selectedTimezone={timezone}
              onTimezoneChange={setTimezone}
            />
            
            <ColumnSelector 
              columns={availableColumns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-black mr-2">Views:</h2>
            <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
              <TabsList className="inline-flex h-8 bg-muted space-x-1">
                <TabsTrigger 
                  value="main" 
                  className="px-3 text-xs rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Main view
                </TabsTrigger>
                <TabsTrigger 
                  value="attention" 
                  className="px-3 text-xs rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Attention Required
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveriesHeader;
