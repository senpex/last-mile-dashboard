
import React from 'react';
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Map, MapPin } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFiltersLayout } from "@/components/users/UserFiltersLayout";
import { DeliveryStatus } from "@/types/delivery";
import { Checkbox } from "@/components/ui/checkbox";

interface DriversFiltersProps {
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<DeliveryStatus[]>>;
  allDeliveryStatuses: DeliveryStatus[];
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: React.Dispatch<React.SetStateAction<string[]>>;
  allCities: string[];
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
  allStates: string[];
  selectedStates: string[];
  setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>;
  onFiltersAdd: (filters: any) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  dateRange?: DateRange | undefined;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;
  availableColumns?: ColumnOption[];
  visibleColumns?: string[];
  onVisibleColumnsChange?: (columns: string[]) => void;
  activeView?: string;
  onActiveViewChange?: (view: string) => void;
  onToggleFilterSidebar?: () => void;
  isFilterSidebarOpen?: boolean;
}

export function DriversFilters({
  selectedStatuses,
  setSelectedStatuses,
  allDeliveryStatuses,
  allZipcodes,
  selectedZipcodes,
  setSelectedZipcodes,
  allCities,
  selectedCities,
  setSelectedCities,
  allStates,
  selectedStates,
  setSelectedStates,
  onFiltersAdd,
  searchTerm = "",
  onSearchChange = () => {},
  dateRange,
  onDateRangeChange = () => {},
  timezone = "America/New_York",
  onTimezoneChange = () => {},
  availableColumns = [],
  visibleColumns = [],
  onVisibleColumnsChange = () => {},
  activeView = "table",
  onActiveViewChange = () => {},
  onToggleFilterSidebar = () => {},
  isFilterSidebarOpen = false
}: DriversFiltersProps) {
  const handleStatusChange = (status: DeliveryStatus, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const handleZipcodeChange = (zipcode: string, checked: boolean) => {
    if (checked) {
      setSelectedZipcodes([...selectedZipcodes, zipcode]);
    } else {
      setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
    }
  };

  const handleCityChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedCities([...selectedCities, city]);
    } else {
      setSelectedCities(selectedCities.filter(c => c !== city));
    }
  };

  const handleStateChange = (state: string, checked: boolean) => {
    if (checked) {
      setSelectedStates([...selectedStates, state]);
    } else {
      setSelectedStates(selectedStates.filter(s => s !== state));
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">Status</h3>
        <div className="space-y-2">
          {allDeliveryStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
              />
              <label htmlFor={`status-${status}`} className="text-sm">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Zipcode Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">Zipcode</h3>
        <div className="space-y-2">
          {allZipcodes.map((zipcode) => (
            <div key={zipcode} className="flex items-center space-x-2">
              <Checkbox
                id={`zipcode-${zipcode}`}
                checked={selectedZipcodes.includes(zipcode)}
                onCheckedChange={(checked) => handleZipcodeChange(zipcode, checked as boolean)}
              />
              <label htmlFor={`zipcode-${zipcode}`} className="text-sm">
                {zipcode}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">City</h3>
        <div className="space-y-2">
          {allCities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={selectedCities.includes(city)}
                onCheckedChange={(checked) => handleCityChange(city, checked as boolean)}
              />
              <label htmlFor={`city-${city}`} className="text-sm">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* State Filter */}
      <div>
        <h3 className="text-sm font-medium mb-3">State</h3>
        <div className="space-y-2">
          {allStates.map((state) => (
            <div key={state} className="flex items-center space-x-2">
              <Checkbox
                id={`state-${state}`}
                checked={selectedStates.includes(state)}
                onCheckedChange={(checked) => handleStateChange(state, checked as boolean)}
              />
              <label htmlFor={`state-${state}`} className="text-sm">
                {state}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
