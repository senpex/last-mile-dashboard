import React, { useState } from 'react';
import { ChevronDown, X, Flag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DeliveryStatus, Delivery } from "@/types/delivery";

interface OrderControlPanelProps {
  statuses: DeliveryStatus[];
  onStatusChange: (status: DeliveryStatus) => void;
  flaggedOrders: Set<number>;
  onOrderFlag: (orderId: number, isFlagged: boolean) => void;
  delivery: Delivery;
}

export const OrderControlPanel = ({ 
  statuses, 
  onStatusChange, 
  flaggedOrders,
  onOrderFlag,
  delivery
}: OrderControlPanelProps) => {
  const isFlagged = flaggedOrders.has(delivery.id);
  
  // Get current timezone for display
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Get UTC offset in minutes
  const getUtcOffsetMinutes = () => {
    const offset = new Date().getTimezoneOffset();
    return -offset; // getTimezoneOffset returns negative values for positive offsets
  };
  
  const utcOffsetMinutes = getUtcOffsetMinutes();
  const offsetDisplay = utcOffsetMinutes >= 0 ? `+${utcOffsetMinutes}` : `${utcOffsetMinutes}`;
  
  const handleFlagToggle = () => {
    onOrderFlag(delivery.id, !isFlagged);
  };
  
  return (
    <div className="border-t bg-gray-50 p-4 mt-auto">
      <div className="mb-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Control Panel</h3>
          <div className="text-xs text-muted-foreground">
            Time Zone: {currentTimezone} ({offsetDisplay})
          </div>
        </div>
        <Separator className="mb-3" />
        
        <div className="grid grid-cols-1 gap-3">
          {/* Button Section - Now positioned above dropdowns */}
          <div className="grid grid-cols-3 gap-2">
            <Button size="sm" className="flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </Button>
            
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-1">
              <Send className="h-4 w-4" /> Send Order
            </Button>
            
            <Button 
              size="sm" 
              variant={isFlagged ? "destructive" : "outline"}
              className={`flex items-center gap-1 ${isFlagged ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
              onClick={handleFlagToggle}
            >
              <Flag className="h-4 w-4" /> Flag
            </Button>
          </div>
          
          {/* Dropdowns Section - Now positioned below buttons */}
          <div className="grid grid-cols-11 gap-2 mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Status <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map(statusOption => (
                  <DropdownMenuItem key={statusOption} onClick={() => onStatusChange(statusOption)}>
                    {statusOption}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Driver <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Assign Driver</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>John Smith</DropdownMenuItem>
                <DropdownMenuItem>Mary Johnson</DropdownMenuItem>
                <DropdownMenuItem>Robert Lee</DropdownMenuItem>
                <DropdownMenuItem>Susan Williams</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Priority <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Vehicle <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Car</DropdownMenuItem>
                <DropdownMenuItem>Van</DropdownMenuItem>
                <DropdownMenuItem>Bike</DropdownMenuItem>
                <DropdownMenuItem>Truck</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Payment <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Process Payment</DropdownMenuItem>
                <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                <DropdownMenuItem>Add Charge</DropdownMenuItem>
                <DropdownMenuItem>Apply Discount</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Template <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Email Template</DropdownMenuItem>
                <DropdownMenuItem>SMS Template</DropdownMenuItem>
                <DropdownMenuItem>Invoice Template</DropdownMenuItem>
                <DropdownMenuItem>Label Template</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Labels <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Fragile</DropdownMenuItem>
                <DropdownMenuItem>VIP</DropdownMenuItem>
                <DropdownMenuItem>Urgent</DropdownMenuItem>
                <DropdownMenuItem>Express</DropdownMenuItem>
                <DropdownMenuItem>Custom Label</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Route <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Optimize Route</DropdownMenuItem>
                <DropdownMenuItem>Add Waypoint</DropdownMenuItem>
                <DropdownMenuItem>Edit Route</DropdownMenuItem>
                <DropdownMenuItem>View Alternatives</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Contact <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Email Customer</DropdownMenuItem>
                <DropdownMenuItem>Call Customer</DropdownMenuItem>
                <DropdownMenuItem>Text Driver</DropdownMenuItem>
                <DropdownMenuItem>Call Driver</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Documents <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                <DropdownMenuItem>Create Receipt</DropdownMenuItem>
                <DropdownMenuItem>Print Waybill</DropdownMenuItem>
                <DropdownMenuItem>Print Package Labels</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Reports <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Order Summary</DropdownMenuItem>
                <DropdownMenuItem>Financial Report</DropdownMenuItem>
                <DropdownMenuItem>Timeline Report</DropdownMenuItem>
                <DropdownMenuItem>Performance Stats</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
