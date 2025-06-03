
import React from 'react';
import { User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerInfoProps {
  customer?: any;
  customerName?: string;
  organization?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  onOpenMap?: () => void;
}

export const CustomerInfo = ({ 
  customer, 
  customerName, 
  organization, 
  pickupAddress, 
  dropoffAddress, 
  onOpenMap 
}: CustomerInfoProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Customer Information
      </h3>
      <div className="rounded-md border bg-card/50 p-4 space-y-4">
        <div className="flex justify-between">
          <p className="text-sm">Customer</p>
          <p className="text-sm font-medium">{customerName || customer?.name || "Not available"}</p>
        </div>
        {organization && (
          <div className="flex justify-between">
            <p className="text-sm">Organization</p>
            <p className="text-sm font-medium">{organization}</p>
          </div>
        )}
        {pickupAddress && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Pickup Address</p>
            <p className="text-xs text-muted-foreground">{pickupAddress}</p>
          </div>
        )}
        {dropoffAddress && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Dropoff Address</p>
            <p className="text-xs text-muted-foreground">{dropoffAddress}</p>
          </div>
        )}
        {onOpenMap && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={onOpenMap}
          >
            <MapPin className="w-4 h-4" />
            View on Map
          </Button>
        )}
      </div>
    </div>
  );
};
