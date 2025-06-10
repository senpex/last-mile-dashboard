import React, { useState } from 'react';
import { ChevronDown, X, Flag, Send, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  const [driverControlStatus, setDriverControlStatus] = useState<'On' | 'Off'>('Off');
  const [automailStatus, setAutomailStatus] = useState<'On' | 'Off'>('Off');
  const [notificationsStatus, setNotificationsStatus] = useState<'On' | 'Off'>('Off');
  const [parkingLotStatus, setParkingLotStatus] = useState<'Yes' | 'No'>('No');
  const [selectedAction, setSelectedAction] = useState<string>('Take Action');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelText, setCancelText] = useState('');
  
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
  
  const handleDriverControlChange = (status: 'On' | 'Off') => {
    setDriverControlStatus(status);
    console.log(`Driver control set to: ${status}`);
  };
  
  const handleAutomailChange = (status: 'On' | 'Off') => {
    setAutomailStatus(status);
    console.log(`Automail set to: ${status}`);
  };
  
  const handleNotificationsChange = (status: 'On' | 'Off') => {
    setNotificationsStatus(status);
    console.log(`Notifications set to: ${status}`);
  };
  
  const handleParkingLotChange = (status: 'Yes' | 'No') => {
    setParkingLotStatus(status);
    console.log(`Parking lot set to: ${status}`);
  };

  const handleTakeAction = (action: string) => {
    setSelectedAction(action);
    console.log(`Take action: ${action}`);
  };
  
  const handleCancelClick = () => {
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = (cancelType: string) => {
    console.log(`Order cancelled: ${cancelType}`);
    console.log(`Reason: ${cancelReason}`);
    console.log(`Additional text: ${cancelText}`);
    setIsCancelDialogOpen(false);
    setCancelReason('');
    setCancelText('');
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
          <div className="grid grid-cols-4 gap-2">
            <Button size="sm" className="flex items-center gap-1" onClick={handleCancelClick}>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
                  <Zap className="h-4 w-4" /> {selectedAction} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Take Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleTakeAction('Start Delivery')}
                  className={`hover:bg-green-100 focus:bg-green-100 hover:text-green-800 focus:text-green-800 ${
                    selectedAction === 'Start Delivery' ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  Start Delivery
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleTakeAction('Arrived for pickup')}
                  className={`hover:bg-green-100 focus:bg-green-100 hover:text-green-800 focus:text-green-800 ${
                    selectedAction === 'Arrived for pickup' ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  Arrived for pickup
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleTakeAction('Take package')}
                  className={`hover:bg-green-100 focus:bg-green-100 hover:text-green-800 focus:text-green-800 ${
                    selectedAction === 'Take package' ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  Take package
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleTakeAction('Courier reported problem')}
                  className={`hover:bg-green-100 focus:bg-green-100 hover:text-green-800 focus:text-green-800 ${
                    selectedAction === 'Courier reported problem' ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  Courier reported problem
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleTakeAction('Sender reported problem')}
                  className={`hover:bg-green-100 focus:bg-green-100 hover:text-green-800 focus:text-green-800 ${
                    selectedAction === 'Sender reported problem' ? 'bg-green-100 text-green-800' : ''
                  }`}
                >
                  Sender reported problem
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Dropdown Section - Driver Control, Automail, Notifications, and Parking lot */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[120px]">
                  Driver control: {driverControlStatus} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Driver Control</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDriverControlChange('On')}>
                  On
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDriverControlChange('Off')}>
                  Off
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[120px]">
                  Automail: {automailStatus} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Automail</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAutomailChange('On')}>
                  On
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAutomailChange('Off')}>
                  Off
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[120px]">
                  Notifications: {notificationsStatus} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNotificationsChange('On')}>
                  On
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNotificationsChange('Off')}>
                  Off
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[120px]">
                  Parking lot: {parkingLotStatus} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Parking lot</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleParkingLotChange('Yes')}>
                  Yes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleParkingLotChange('No')}>
                  No
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-center">Cancel Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Cancellation Reason</label>
              <Select value={cancelReason} onValueChange={setCancelReason}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-request">Customer Request</SelectItem>
                  <SelectItem value="driver-unavailable">Driver Unavailable</SelectItem>
                  <SelectItem value="weather-conditions">Weather Conditions</SelectItem>
                  <SelectItem value="technical-issues">Technical Issues</SelectItem>
                  <SelectItem value="address-issues">Address Issues</SelectItem>
                  <SelectItem value="payment-issues">Payment Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Additional Details</label>
              <Textarea 
                placeholder="Enter additional cancellation details..."
                value={cancelText}
                onChange={(e) => setCancelText(e.target.value)}
                rows={3}
                className="w-full resize-none"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-3 pt-4">
            <Button 
              onClick={() => handleCancelConfirm('Cancel by client')}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Cancel by Client
            </Button>
            <Button 
              onClick={() => handleCancelConfirm('Cancel by senpex(full refund)')}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Cancel by Senpex (Full Refund)
            </Button>
            <Button 
              onClick={() => handleCancelConfirm('Cancel by admin')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel by Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
