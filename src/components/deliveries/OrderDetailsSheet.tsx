import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, User, Phone, Clock, Truck, DollarSign, CalendarClock, MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
}

export const OrderDetailsSheet = ({
  isOpen,
  onClose,
  delivery
}: OrderDetailsSheetProps) => {
  if (!delivery) return null;
  
  const [status, setStatus] = useState<string>(delivery.status);
  
  const statuses: DeliveryStatus[] = ["Dropoff Complete", "Canceled By Customer", "Cancelled By Admin", "In Transit", "Picking Up", "Arrived For Pickup", "Scheduled Order", "Online", "Offline", "Busy", "Not approved", "Available", "On Break"];
  
  const getStatusBadgeVariant = (status: string): string => {
    switch (status) {
      case "Dropoff Complete":
        return "success";
      case "En Route":
      case "At Dropoff":
      case "At Pickup":
        return "default";
      case "Canceled By Customer":
      case "Cancelled By Admin":
        return "destructive";
      case "Looking For Driver":
      case "Waiting For Driver Approval":
        return "warning";
      default:
        return "outline";
    }
  };
  
  const handleStatusChange = (newStatus: DeliveryStatus) => {
    setStatus(newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };
  
  return <Sheet open={isOpen} onOpenChange={open => {
    if (!open) onClose();
  }}>
      <SheetContent className="sm:max-w-md md:max-w-lg w-full overflow-hidden p-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-left text-lg">Order #{delivery.packageId}</SheetTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className={cn(
                    status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-200" : "",
                    getStatusBadgeVariant(status) === "destructive" ? "bg-red-100 text-red-800 hover:bg-red-200" : "",
                    getStatusBadgeVariant(status) === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "",
                    getStatusBadgeVariant(status) === "default" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "",
                    getStatusBadgeVariant(status) === "outline" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "",
                    "rounded-md flex items-center gap-1 py-1 px-3 h-7 justify-between font-medium"
                  )}>
                    {status}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-1">
                  <div className="grid gap-1">
                    {statuses.map(statusOption => (
                      <Button 
                        key={statusOption} 
                        variant="ghost" 
                        size="sm"
                        className={cn(
                          "justify-start text-left font-normal", 
                          statusOption === status ? "bg-accent text-accent-foreground" : ""
                        )}
                        onClick={() => handleStatusChange(statusOption)}
                      >
                        {statusOption}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <SheetDescription className="text-left text-sm">
            {delivery.orderName}
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> 
                Locations
              </h3>
              <div className="rounded-md border bg-card/50 p-4 space-y-3">
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Pickup Location</h4>
                  <p className="text-sm font-medium">{delivery.pickupLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</p>
                </div>
                <div className="flex justify-center">
                  <div className="h-3 border-l border-dashed border-border"></div>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Dropoff Location</h4>
                  <p className="text-sm font-medium">{delivery.dropoffLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </h3>
              <div className="rounded-md border bg-card/50 p-4 space-y-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Pickup Time</h4>
                    <p className="text-sm font-medium">{delivery.pickupTime}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Dropoff Time</h4>
                    <p className="text-sm font-medium">{delivery.dropoffTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Customer
              </h3>
              <div className="rounded-md border bg-card/50 p-4">
                <p className="text-sm font-medium">{delivery.customerName}</p>
                <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                  <MessageSquare className="w-3 h-3 mr-2" />
                  Message Customer
                </Button>
              </div>
            </div>
            
            {delivery.courier && <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Courier
                </h3>
                <div className="rounded-md border bg-card/50 p-4">
                  <p className="text-sm font-medium">{delivery.courier}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                    <Phone className="w-3 h-3 mr-2" />
                    Contact Courier
                  </Button>
                </div>
              </div>}
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Financial
              </h3>
              <div className="rounded-md border bg-card/50 p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Base Price</p>
                  <p className="text-sm font-medium">{delivery.price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Tip</p>
                  <p className="text-sm font-medium">{delivery.tip}</p>
                </div>
                {delivery.couriersEarnings && <div className="flex justify-between">
                    <p className="text-sm">Courier's Earnings</p>
                    <p className="text-sm font-medium">{delivery.couriersEarnings}</p>
                  </div>}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Notes
              </h3>
              <div className="rounded-md border bg-card/50 p-4">
                <p className="text-sm">
                  {delivery.notes || "No notes available for this order."}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <CalendarClock className="w-4 h-4 mr-2" />
                Order Details
              </h3>
              <div className="rounded-md border bg-card/50 p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Organization</p>
                  <p className="text-sm font-medium">{delivery.organization}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Distance</p>
                  <p className="text-sm font-medium">{delivery.distance}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>;
};
