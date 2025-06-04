
import React from 'react';
import { MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TransportIcon from "@/components/icons/TransportIcon";

interface OrderSummarySectionProps {
  distance?: string;
  transportType?: string;
  packageType?: string;
  estimatedRouteTime?: string;
  parkingLot?: string;
  returnParkingLot?: string;
}

export const OrderSummarySection = ({
  distance = "3.2 miles",
  transportType = "9ft_cargo_van",
  packageType = "Standard Package",
  estimatedRouteTime = "25 minutes",
  parkingLot = "Main Street Parking",
  returnParkingLot = "Warehouse Lot B"
}: OrderSummarySectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        Order Summary
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distance" className="text-xs font-medium">Distance</Label>
            <Input 
              id="distance" 
              type="text" 
              value={distance} 
              readOnly
              className="h-8 text-sm bg-muted/50" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transport-type" className="text-xs font-medium">Transport type</Label>
            <div className="flex items-center gap-2 h-8 px-3 rounded-md border bg-muted/50">
              <TransportIcon transportType={transportType as any} size={16} />
              <span className="text-sm">{transportType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="package-type" className="text-xs font-medium">Package type</Label>
            <Input 
              id="package-type" 
              type="text" 
              value={packageType} 
              readOnly
              className="h-8 text-sm bg-muted/50" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated-route-time" className="text-xs font-medium">Estimated route time</Label>
            <Input 
              id="estimated-route-time" 
              type="text" 
              value={estimatedRouteTime} 
              readOnly
              className="h-8 text-sm bg-muted/50" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parking-lot" className="text-xs font-medium">Parking lot</Label>
            <Input 
              id="parking-lot" 
              type="text" 
              value={parkingLot} 
              readOnly
              className="h-8 text-sm bg-muted/50" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="return-parking-lot" className="text-xs font-medium">Return parking lot</Label>
            <Input 
              id="return-parking-lot" 
              type="text" 
              value={returnParkingLot} 
              readOnly
              className="h-8 text-sm bg-muted/50" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
