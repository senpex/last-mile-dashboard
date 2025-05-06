import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<string>("order-info");
  const [activeLogTab, setActiveLogTab] = useState<string>("payment-transactions");
  
  const statusMapping: Record<string, string> = {
    "Dropoff Complete": "completed",
    "Canceled By Customer": "cancelled_order",
    "Cancelled By Admin": "cancelled_by_admin",
    "In Transit": "in_transit",
    "Picking Up": "started_working",
    "Arrived For Pickup": "arrived_for_pickup"
  };

  const getStatusBadgeVariant = (status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "cancelled_by_admin":
        return "warning";
      case "in_transit":
        return "secondary";
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "secondary";
    }
  };
  
  const handleStatusChange = (newStatus: DeliveryStatus) => {
    setStatus(newStatus);
    toast(`Status changed to ${newStatus}`);
  };
  
  const getAdditionalLocations = () => {
    const locations = [];
    for (let i = 1; i <= delivery.id % 5; i++) {
      locations.push({
        name: `Transit Point ${i}`,
        address: `123 Main St, Transit City, State ${i}, 1234${i}`
      });
    }
    return locations;
  };
  
  const additionalLocations = getAdditionalLocations();
  const hasAdditionalLocations = additionalLocations.length > 0;
  
  return <Sheet open={isOpen} onOpenChange={open => {
    if (!open) onClose();
  }}>
      <SheetContent className="w-full sm:w-[600px] sm:max-w-full overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-xl">Order #{delivery.packageId}</SheetTitle>
          <SheetDescription>
            <div className="flex justify-between items-center">
              <span>{delivery.orderName}</span>
              <Badge variant={getStatusBadgeVariant(status)} className="ml-2">
                {status}
              </Badge>
            </div>
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="order-info" className="flex-1">Order Info</TabsTrigger>
            <TabsTrigger value="logs" className="flex-1">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="order-info" className="space-y-6">
            <div>
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-medium">Status</h3>
                <Select value={status} onValueChange={(value) => handleStatusChange(value as DeliveryStatus)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dropoff Complete">Completed</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Picking Up">Picking Up</SelectItem>
                    <SelectItem value="Arrived For Pickup">Arrived For Pickup</SelectItem>
                    <SelectItem value="Canceled By Customer">Canceled By Customer</SelectItem>
                    <SelectItem value="Cancelled By Admin">Cancelled By Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Locations</h3>
              <div className="rounded-md border bg-card/50 p-4 space-y-3">
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr_0.5fr] gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
                  <div>Address</div>
                  <div>Description</div>
                  <div>Distance</div>
                  <div>Status</div>
                  <div>Delivered at</div>
                  <div>Action 1</div>
                  <div>Action 2</div>
                </div>
                
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Pickup</h4>
                  <p className="text-sm font-medium">{delivery.pickupLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</p>
                </div>
                
                {hasAdditionalLocations && additionalLocations.map((location, index) => (
                  <React.Fragment key={index}>
                    <div className="flex justify-center">
                      <div className="h-3 border-l border-dashed border-border"></div>
                    </div>
                    <div>
                      <h4 className="text-xs text-muted-foreground mb-1">Transit Point {index + 1}</h4>
                      <p className="text-sm font-medium">{location.name}</p>
                      <p className="text-xs text-muted-foreground">{location.address}</p>
                    </div>
                  </React.Fragment>
                ))}
                
                <div className="flex justify-center">
                  <div className="h-3 border-l border-dashed border-border"></div>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Dropoff</h4>
                  <p className="text-sm font-medium">{delivery.dropoffLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Order Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Customer</h4>
                    <p className="text-sm">{delivery.customerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Organization</h4>
                    <p className="text-sm">{delivery.organization}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Courier</h4>
                    <p className="text-sm">{delivery.courier || "Not assigned"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Price</h4>
                    <p className="text-sm">{delivery.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Tip</h4>
                    <p className="text-sm">{delivery.tip}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Distance</h4>
                    <p className="text-sm">{delivery.distance}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Notes</h3>
              <div className="rounded-md border bg-card/50 p-4">
                {delivery.notes ? <p className="text-sm">{delivery.notes}</p> : <p className="text-sm text-muted-foreground italic">No notes available for this order.</p>}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-6">
            <Tabs defaultValue={activeLogTab} onValueChange={setActiveLogTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="payment-transactions" className="flex-1">Payment Transactions</TabsTrigger>
                <TabsTrigger value="status-changes" className="flex-1">Status Changes</TabsTrigger>
                <TabsTrigger value="courier-updates" className="flex-1">Courier Updates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payment-transactions" className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-3 text-sm font-medium">Payment History</div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Payment Received</p>
                          <p className="text-sm text-muted-foreground">Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{delivery.price}</p>
                          <p className="text-sm text-muted-foreground">{delivery.pickupTime}</p>
                        </div>
                      </div>
                      {parseFloat(delivery.tip.replace(/[^0-9.-]+/g, '')) > 0 && (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Tip Added</p>
                            <p className="text-sm text-muted-foreground">Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{delivery.tip}</p>
                            <p className="text-sm text-muted-foreground">{delivery.dropoffTime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="status-changes" className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-3 text-sm font-medium">Status Change History</div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order Created</p>
                        <p className="text-sm text-muted-foreground">System</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Created</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{new Date(new Date(delivery.pickupTime).getTime() - 3600000).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Courier Assigned</p>
                        <p className="text-sm text-muted-foreground">System</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Assigned</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{new Date(new Date(delivery.pickupTime).getTime() - 1800000).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Status Changed to {delivery.status}</p>
                        <p className="text-sm text-muted-foreground">{delivery.courier || "System"}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusBadgeVariant(delivery.status)}>{delivery.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{delivery.status === "Dropoff Complete" ? delivery.dropoffTime : delivery.pickupTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="courier-updates" className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-3 text-sm font-medium">Courier Updates</div>
                  <div className="p-4">
                    {delivery.courier ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Courier Accepted Order</p>
                            <p className="text-sm text-muted-foreground">{delivery.courier}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{new Date(new Date(delivery.pickupTime).getTime() - 1800000).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Arrived at Pickup Location</p>
                            <p className="text-sm text-muted-foreground">{delivery.courier}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{delivery.pickupTime}</p>
                          </div>
                        </div>
                        {delivery.status === "Dropoff Complete" && (
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Delivered Package</p>
                              <p className="text-sm text-muted-foreground">{delivery.courier}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">{delivery.dropoffTime}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No courier has been assigned to this order yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>;
};
