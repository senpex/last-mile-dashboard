
import React from 'react';
import { DeliveryStatus } from "@/types/delivery";
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedRadius: number;
  selectedNames: string[];
  selectedStatuses: DeliveryStatus[];
  selectedZipcodes: string[];
  selectedCities: string[];
  selectedStates: string[];
  selectedProfiles: string[];
  selectedTransports: string[];
  selectedHireStatuses: string[];
  clearFilter: (type: string, value: string) => void;
}

export const ActiveFilters = ({
  selectedRadius,
  selectedNames,
  selectedStatuses,
  selectedZipcodes,
  selectedCities,
  selectedStates,
  selectedProfiles,
  selectedTransports,
  selectedHireStatuses,
  clearFilter
}: ActiveFiltersProps) => {
  return (
    <div className="p-4 border-b bg-muted/30 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Active Filters</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
          <span>Radius: {selectedRadius} miles</span>
          <button 
            className="ml-2 text-primary hover:text-primary/80" 
            onClick={() => clearFilter('radius', '')}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        {selectedNames.map(name => (
          <div key={name} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Name: {name}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('name', name)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedStatuses.map(status => (
          <div key={status} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Status: {status}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('status', status)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedZipcodes.map(zipcode => (
          <div key={zipcode} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Zipcode: {zipcode}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('zipcode', zipcode)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedCities.map(city => (
          <div key={city} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>City: {city}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('city', city)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedStates.map(state => (
          <div key={state} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>State: {state}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('state', state)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedProfiles.map(profile => (
          <div key={profile} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Profile: {profile}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('profile', profile)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedTransports.map(transport => (
          <div key={transport} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Transport: {transport}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('transport', transport)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {selectedHireStatuses.map(hireStatus => (
          <div key={hireStatus} className="bg-primary/10 border border-primary/20 rounded-md py-1.5 px-3 text-sm flex items-center text-primary">
            <span>Hire Status: {hireStatus}</span>
            <button 
              className="ml-2 text-primary hover:text-primary/80" 
              onClick={() => clearFilter('hireStatus', hireStatus)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
