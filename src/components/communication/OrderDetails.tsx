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
  const [orderDetailsExpanded, setOrderDetailsExpanded] = useState(true);
  
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
    <ScrollArea className="h-[500px] px-4">
      <div className="pr-4">
        <h2 className="text-lg font-semibold mb-4 text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">Orders on Hand</h2>
        
        {orders.map((order) => (
          <div key={order.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Order Details ({order.id})</h3>
              <Button variant="ghost" size="sm" onClick={() => setOrderDetailsExpanded(!orderDetailsExpanded)}>
                {orderDetailsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {orderDetailsExpanded && (
              <div className="space-y-3">
                <div className="flex justify-start">
                  <Badge 
                    variant={
                      order.status === 'active' ? 'success' : 
                      order.status === 'completed' ? 'default' : 
                      'destructive'
                    }
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
                
                <div className="p-3 bg-card dark:bg-gray-900/50 rounded-md shadow-sm">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-muted-foreground dark:text-gray-400">Created:</div>
                    <div className="col-span-2 font-medium dark:text-gray-300">{order.createdAt}</div>
                    
                    <div className="text-muted-foreground dark:text-gray-400">ETA:</div>
                    <div className="col-span-2 font-medium dark:text-gray-300">{order.eta}</div>
                  </div>
                </div>
                
                <div className="p-3 bg-card dark:bg-gray-900/50 rounded-md shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground dark:text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Pickup Address:</div>
                      <div className="text-sm dark:text-gray-300">{order.pickupAddress}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="h-6 border-l border-dashed dark:border-gray-700"></div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground dark:text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground dark:text-gray-400 mb-1">Delivery Address:</div>
                      <div className="text-sm dark:text-gray-300">{order.deliveryAddress}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        View Full Order
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Order Details</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <h3 className="font-medium mb-2">Order #{order.id}</h3>
                        <p>Full order details would be displayed here.</p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            )}
            
            {order.id !== orders[orders.length - 1].id && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
