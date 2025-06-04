
import React, { useState } from 'react';
import { ChevronDown, X, Flag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [driverControl, setDriverControl] = useState<string>('Off');
  const [priority, setPriority] = useState<string>('Normal');
  const [orderStatus, setOrderStatus] = useState<string>(delivery.status);
  const [assignedDriver, setAssignedDriver] = useState<string>(delivery.courier || 'Unassigned');
  
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
  
  const handleDriverControlChange = (value: string) => {
    setDriverControl(value);
    console.log(`Driver control set to: ${value}`);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
    console.log(`Priority set to: ${value}`);
  };

  const handleStatusChange = (value: string) => {
    setOrderStatus(value);
    console.log(`Order status set to: ${value}`);
  };

  const handleDriverChange = (value: string) => {
    setAssignedDriver(value);
    console.log(`Driver assigned: ${value}`);
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
          {/* Button Section */}
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
          
          {/* Dropdown Controls Section */}
          <div className="grid grid-cols-2 gap-3">
            {/* Driver Control */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Driver Control</label>
              <Select value={driverControl} onValueChange={handleDriverControlChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select control" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On">On</SelectItem>
                  <SelectItem value="Off">Off</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Priority</label>
              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Status */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Order Status</label>
              <Select value={orderStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="En Route">En Route</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assigned Driver */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Assigned Driver</label>
              <Select value={assignedDriver} onValueChange={handleDriverChange}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                  <SelectItem value="Lisa Brown">Lisa Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
