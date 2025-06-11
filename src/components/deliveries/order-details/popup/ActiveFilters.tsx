
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { DeliveryStatus } from "@/types/delivery";

interface ActiveFiltersProps {
  selectedStatuses: DeliveryStatus[];
  selectedZipcodes: string[];
  selectedCities: string[];
  selectedStates: string[];
  selectedProfiles: string[];
  selectedTransports: string[];
  selectedHireStatuses: string[];
  selectedRadius: number;
  selectedNames: string[];
  onClearFilter: (type: string, value: string) => void;
}

export function ActiveFilters({
  selectedStatuses,
  selectedZipcodes,
  selectedCities,
  selectedStates,
  selectedProfiles,
  selectedTransports,
  selectedHireStatuses,
  selectedRadius,
  selectedNames,
  onClearFilter
}: ActiveFiltersProps) {
  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Active Filters</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
          <span>Radius: {selectedRadius} miles</span>
          <button 
            className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
            onClick={() => onClearFilter('radius', '')}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        
        {selectedNames.map(name => (
          <div key={name} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
            <span>Name: {name}</span>
            <button 
              className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
              onClick={() => onClearFilter('name', name)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {selectedStatuses.map(status => (
          <div key={status} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
            <span>Status: {status}</span>
            <button 
              className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
              onClick={() => onClearFilter('status', status)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {selectedZipcodes.map(zipcode => (
          <div key={zipcode} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
            <span>Zipcode: {zipcode}</span>
            <button 
              className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
              onClick={() => onClearFilter('zipcode', zipcode)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {selectedCities.map(city => (
          <div key={city} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
            <span>City: {city}</span>
            <button 
              className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
              onClick={() => onClearFilter('city', city)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {selectedStates.map(state => (
          <div key={state} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
            <span>State: {state}</span>
            <button 
              className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
              onClick={() => onClearFilter('state', state)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
