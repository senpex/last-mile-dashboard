
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Clock, UserRound, ChevronUp, ChevronDown } from "lucide-react";
import { OrderMap } from "../OrderMap";
import { StatusBadge } from "./StatusBadge";

interface CustomerOrderViewProps {
  order: {
    id: string;
    status: 'active' | 'completed' | 'cancelled';
    pickupAddress: string;
    deliveryAddress: string;
    driverName: string;
    pickupTime: string;
    dropoffTime: string;
    eta: string;
  };
  expandedOrderId: string | null;
  setExpandedOrderId: (id: string | null) => void;
  knownLocations: Record<string, string>;
  senderInfo: {
    name: string;
    phone: string;
  };
  recipientInfo: {
    name: string;
    phone: string;
  };
  driverInfo: {
    name: string;
    phone: string;
    vehicle: string;
    rating: string;
    totalDeliveries: string;
  };
  shouldShowDriverInfo: (orderId: string) => boolean;
}

export const CustomerOrderView = ({
  order,
  expandedOrderId,
  setExpandedOrderId,
  knownLocations,
  senderInfo,
  recipientInfo,
  driverInfo,
  shouldShowDriverInfo
}: CustomerOrderViewProps) => {
  const isExpanded = expandedOrderId === order.id;
  
  return <div className="order-card rounded-lg transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors">
        <h3 className="font-medium text-xs text-foreground/90">Order #{order.id}</h3>
        <Button variant="ghost" size="sm" onClick={() => setExpandedOrderId(isExpanded ? null : order.id)} className="h-6 w-6 p-0">
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </div>
      
      {isExpanded && <div className="px-3 pt-1 pb-3 space-y-4">
          <div className="flex justify-start">
            <Badge className="bg-green-500">Active</Badge>
          </div>
          
          <OrderMap pickupAddress={knownLocations[order.pickupAddress] || order.pickupAddress} deliveryAddress={knownLocations[order.deliveryAddress] || order.deliveryAddress} driverName={order.driverName} />
          
          <div className="rounded-md bg-muted/50 p-3 shadow-sm">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Time Details</span>
              </div>
              <div className="grid grid-cols-2 gap-y-1 pl-4">
                <span className="text-xs text-muted-foreground">Pickup:</span>
                <span className="text-xs font-medium">{order.pickupTime}</span>
                <span className="text-xs text-muted-foreground">Dropoff:</span>
                <span className="text-xs font-medium">{order.dropoffTime}</span>
                <span className="text-xs text-muted-foreground">ETA:</span>
                <span className="text-xs font-medium">{order.eta}</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-md bg-muted/50 p-3 shadow-sm">
            <div>
              {shouldShowDriverInfo(order.id) ? (
                <>
                  <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-white">
                    <UserRound className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium mb-1">Driver Details</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      <span className="text-xs text-muted-foreground">Name:</span>
                      <span className="text-xs font-medium">{driverInfo.name}</span>
                      <span className="text-xs text-muted-foreground">Phone:</span>
                      <span className="text-xs">{driverInfo.phone}</span>
                      <span className="text-xs text-muted-foreground">Vehicle:</span>
                      <span className="text-xs">{driverInfo.vehicle}</span>
                      <span className="text-xs text-muted-foreground">Rating:</span>
                      <span className="text-xs">⭐️ {driverInfo.rating}</span>
                      <span className="text-xs text-muted-foreground">Deliveries:</span>
                      <span className="text-xs">{driverInfo.totalDeliveries}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 mb-2">
                    <UserRound className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Location Details</span>
                  </div>
                  <div className="pl-4">
                    <div className="mb-2">
                      <div className="text-xs font-medium mb-1">Sender</div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <span className="text-xs text-muted-foreground">Name:</span>
                        <span className="text-xs font-medium">{senderInfo.name}</span>
                        <span className="text-xs text-muted-foreground">Phone:</span>
                        <span className="text-xs">{senderInfo.phone}</span>
                        <span className="text-xs text-muted-foreground">Address:</span>
                        <span className="text-xs">{knownLocations[order.pickupAddress] || order.pickupAddress}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-2 bg-border/30" />
                    
                    <div>
                      <div className="text-xs font-medium mb-1">Recipient</div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <span className="text-xs text-muted-foreground">Name:</span>
                        <span className="text-xs font-medium">{recipientInfo.name}</span>
                        <span className="text-xs text-muted-foreground">Phone:</span>
                        <span className="text-xs">{recipientInfo.phone}</span>
                        <span className="text-xs text-muted-foreground">Address:</span>
                        <span className="text-xs">{knownLocations[order.deliveryAddress] || order.deliveryAddress}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-xs py-1">
                View Full Order
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Order Details</SheetTitle>
              </SheetHeader>
              <div className="py-2">
                <h3 className="text-sm font-medium mb-1">Order #{order.id}</h3>
                <p className="text-xs">Full order details would be displayed here.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>}
    </div>;
};
