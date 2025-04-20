import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { OrderMap } from "./OrderMap";

interface OrderDetailsProps {
  orderData: {
    id: string;
    status: 'active' | 'completed' | 'cancelled';
    pickupAddress: string;
    deliveryAddress: string;
    driverName: string;
    clientName: string;
    eta: string;
    createdAt: string;
  };
}

const StatusBadge = ({ status }: { status: 'active' | 'completed' | 'cancelled' }) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Cancelled</Badge>;
  }
};

export const OrderDetails = ({ orderData }: OrderDetailsProps) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  const orders = [
    {
      ...orderData,
      id: "909090"
    },
    {
      ...orderData,
      id: "909091",
      status: "active" as const,
      eta: "15:45 PM"
    },
    {
      ...orderData,
      id: "909092",
      status: "active" as const,
      eta: "16:30 PM"
    }
  ];
  
  const knownLocations = {
    "123 Pickup St, City": "123 Pickup St, San Francisco, CA 94103",
    "456 Delivery Ave, City": "456 Delivery Ave, San Francisco, CA 94107"
  };

  return (
    <ScrollArea 
      className="h-full" 
      independentPanel={true}
    >
      <div className="right-panel-container">
        <div className="orders-panel">
          <div className="px-4 py-2 space-y-2">
            <h2 className="text-sm font-semibold text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b">
              Orders on Hand
            </h2>
            
            {orders.map((order, index) => {
              const isExpanded = expandedOrderId === order.id;
              
              return (
                <div key={order.id} className="order-card rounded-lg transition-all duration-200 ease-in-out">
                  <div className="flex justify-between items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors">
                    <h3 className="font-medium text-xs text-foreground/90">Order #{order.id}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="h-6 w-6 p-0"
                    >
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </Button>
                  </div>
                  
                  {isExpanded && (
                    <div className="px-3 pt-1 pb-3 space-y-3">
                      <div className="flex justify-start">
                        <Badge 
                          variant={
                            order.status === 'active' ? 'success' : 
                            order.status === 'completed' ? 'default' : 
                            'destructive'
                          }
                          className="text-[10px] px-2 py-0.5"
                        >
                          {order.status === 'active' ? 'Active' : 
                           order.status === 'completed' ? 'Completed' : 
                           'Cancelled'}
                        </Badge>
                      </div>
                      
                      <OrderMap 
                        pickupAddress={knownLocations[order.pickupAddress] || order.pickupAddress}
                        deliveryAddress={knownLocations[order.deliveryAddress] || order.deliveryAddress}
                        driverName={order.driverName}
                      />
                      
                      <div className="order-info-card rounded-md bg-muted/50 p-2.5 shadow-sm">
                        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                          <div className="text-muted-foreground">Created:</div>
                          <div className="col-span-2 font-medium">{order.createdAt}</div>
                          
                          <div className="text-muted-foreground">ETA:</div>
                          <div className="col-span-2 font-medium">{order.eta}</div>
                        </div>
                      </div>
                      
                      <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Pickup Address:</div>
                            <div className="text-xs font-medium">{order.pickupAddress}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="h-3 border-l border-dashed border-border/50"></div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Delivery Address:</div>
                            <div className="text-xs font-medium">{order.deliveryAddress}</div>
                          </div>
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
                    </div>
                  )}
                  
                  {index !== orders.length - 1 && (
                    <Separator className="my-1 opacity-50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>
        {`
        .right-panel-container {
          @apply flex flex-col h-full;
        }
        
        .orders-panel {
          @apply flex-1 transition-all duration-200;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
        }
        
        .order-card {
          @apply bg-card/30 hover:bg-card/40 backdrop-blur-sm;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .order-info-card,
        .address-card {
          @apply backdrop-blur-sm;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        :global(.dark) .orders-panel {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
        }

        :global(.dark) .order-card {
          @apply bg-gray-900/30 hover:bg-gray-900/40;
        }

        :global(.dark) .order-info-card,
        :global(.dark) .address-card {
          background: rgba(0, 0, 0, 0.2);
        }
        `}
      </style>
    </ScrollArea>
  );
};
