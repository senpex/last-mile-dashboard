
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Building, Home, User } from "lucide-react";
import { LocationFilters } from "@/hooks/useDeliveriesTable";

interface DeliveryLocationFiltersProps {
  locationFilters: LocationFilters;
  onFilterChange: (field: keyof LocationFilters, value: string) => void;
}

export function DeliveryLocationFilters({
  locationFilters,
  onFilterChange
}: DeliveryLocationFiltersProps) {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-medium mb-3">Location Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipcode" className="text-xs font-medium">
            Zipcode
          </Label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="zipcode"
              placeholder="Filter by zipcode"
              className="pl-8 h-9"
              value={locationFilters.zipcode}
              onChange={(e) => onFilterChange('zipcode', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city" className="text-xs font-medium">
            City
          </Label>
          <div className="relative">
            <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="city"
              placeholder="Filter by city"
              className="pl-8 h-9"
              value={locationFilters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state" className="text-xs font-medium">
            State
          </Label>
          <div className="relative">
            <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="state"
              placeholder="Filter by state"
              className="pl-8 h-9"
              value={locationFilters.state}
              onChange={(e) => onFilterChange('state', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="senderName" className="text-xs font-medium">
            Sender Name
          </Label>
          <div className="relative">
            <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="senderName"
              placeholder="Filter by sender name"
              className="pl-8 h-9"
              value={locationFilters.senderName}
              onChange={(e) => onFilterChange('senderName', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pickupAddress" className="text-xs font-medium">
            Pickup Address
          </Label>
          <div className="relative">
            <Home className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="pickupAddress"
              placeholder="Filter by pickup address"
              className="pl-8 h-9"
              value={locationFilters.pickupAddress}
              onChange={(e) => onFilterChange('pickupAddress', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dropoffAddress" className="text-xs font-medium">
            Dropoff Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="dropoffAddress"
              placeholder="Filter by dropoff address"
              className="pl-8 h-9"
              value={locationFilters.dropoffAddress}
              onChange={(e) => onFilterChange('dropoffAddress', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
