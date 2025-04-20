import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, ChevronUp, ChevronDown, UserCircle2 as UserRound, Calendar } from "lucide-react";
import { OrderMap } from "./OrderMap";
import { cn } from "@/lib/utils";

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
    pickupTime: string;
    dropoffTime: string;
  };
  showDriverInfo?: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
    orderId?: string;
  };
}

const StatusBadge = ({
  status
}: {
  status: 'active' | 'completed' | 'cancelled';
}) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Cancelled</Badge>;
  }
};

export const OrderDetails = ({
  orderData,
  showDriverInfo = true,
  user
}: OrderDetailsProps) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const orders = [{
    ...orderData,
    id: "909090"
  }];

  const repeatedOrders = [
    {
      ...orderData,
      id: "909093",
      status: "repeated" as const,
      schedule: [
        { day: "Tuesday", time: "14:00" },
        { day: "Wednesday", time: "15:30" },
        { day: "Friday", time: "16:00" }
      ]
    }
  ];

  const historyOrders = Array.from({ length: 5 }, (_, index) => ({
    ...orderData,
    id: `hist-${900000 + index}`,
    status: "completed" as const,
    pickupTime: `${new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()} 14:00`,
    dropoffTime: `${new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()} 15:30`,
    eta: "Completed"
  }));

  const knownLocations = {
    "123 Pickup St, City": "123 Pickup St, San Francisco, CA 94103",
    "456 Delivery Ave, City": "456 Delivery Ave, San Francisco, CA 94107"
  };

  const senderInfo = {
    name: "John Smith",
    phone: "+1 (555) 123-4567"
  };

  const recipientInfo = {
    name: "Maria Rodriguez",
    phone: "+1 (555) 987-6543"
  };

  const driverInfo = {
    name: orderData.driverName,
    phone: "+1 (555) 234-5678",
    vehicle: "Cargo Van",
    rating: "4.8",
    totalDeliveries: "1,234"
  };

  const isRepeatedOrder = (orderId: string) => repeatedOrders.some(order => order.id === orderId);
  const isHistoryOrder = (orderId: string) => historyOrders.some(order => order.id === orderId);

  return <ScrollArea independentPanel={true} className="h-full px-[14px] my-0">
    <div className="orders-panel">
      <div className="right-panel-container p-[5px]">
        <h2 className="text-lg font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b">
          Active Orders
        </h2>
        
        {orders.map((order, index) => {
          const isExpanded = expandedOrderId === order.id;
          return (
            <div key={order.id} className="order-card rounded-lg transition-all duration-200 ease-in-out">
              <div className="flex justify-between items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors">
                <h3 className="font-medium text-xs text-foreground/90">Order #{order.id}</h3>
                <Button variant="ghost" size="sm" onClick={() => setExpandedOrderId(isExpanded ? null : order.id)} className="h-6 w-6 p-0">
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
              </div>
              
              {isExpanded && <div className="px-3 pt-1 pb-3 space-y-3">
                  <div className="flex justify-start">
                    <Badge variant={order.status === 'active' ? 'success' : order.status === 'completed' ? 'default' : 'destructive'} className="text-[10px] px-2 py-0.5">
                      {order.status === 'active' ? 'Active' : order.status === 'completed' ? 'Completed' : 'Cancelled'}
                    </Badge>
                  </div>
                  
                  <OrderMap pickupAddress={knownLocations[order.pickupAddress] || order.pickupAddress} deliveryAddress={knownLocations[order.deliveryAddress] || order.deliveryAddress} driverName={order.driverName} />
                  
                  <div className="order-info-card rounded-md bg-muted/50 p-2.5 shadow-sm">
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      <div className="text-muted-foreground">Pickup time:</div>
                      <div className="col-span-2 font-medium">{order.pickupTime || "Not scheduled"}</div>
                      
                      <div className="text-muted-foreground">Dropoff time:</div>
                      <div className="col-span-2 font-medium">{order.dropoffTime || "Not scheduled"}</div>

                      <div className="text-muted-foreground">ETA:</div>
                      <div className="col-span-2 font-medium">{order.eta}</div>
                    </div>
                  </div>
                  
                  <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
                    {(showDriverInfo && !isHistoryOrder(order.id)) || 
                     (user?.role === 'client') || 
                     (user?.role === 'driver' && user?.status !== 'working') ? (
                      <div className="flex items-start gap-2">
                        <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[11px] text-muted-foreground mb-0.5">Driver Details:</div>
                          <div className="text-xs font-medium">{driverInfo.name}</div>
                          <div className="text-xs text-muted-foreground">{driverInfo.phone}</div>
                          <div className="text-xs text-muted-foreground">Vehicle: {driverInfo.vehicle}</div>
                          <div className="text-xs text-muted-foreground">Rating: ⭐️ {driverInfo.rating}</div>
                          <div className="text-xs text-muted-foreground">Deliveries: {driverInfo.totalDeliveries}</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Sender:</div>
                            <div className="text-xs font-medium">{senderInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{senderInfo.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="h-3 border-l border-dashed border-border/50"></div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Recipient:</div>
                            <div className="text-xs font-medium">{recipientInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{recipientInfo.phone}</div>
                          </div>
                        </div>
                      </>
                    )}
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
              
              {index !== orders.length - 1 && <Separator className="my-1 opacity-50" />}
            </div>
          );
        })}

        <h2 className="text-lg font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b mt-4">
          Repeated Orders
        </h2>
        
        {repeatedOrders.map((order, index) => {
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
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                      Repeated Order
                    </Badge>
                  </div>
                  
                  <div className="weekly-schedule-card rounded-md bg-muted/50 p-2.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">Weekly Schedule</span>
                    </div>
                    <div className="grid gap-1.5">
                      {order.schedule.map((slot, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px]">
                          <span className="text-muted-foreground">{slot.day}:</span>
                          <span className="font-medium">{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
                    {(showDriverInfo && !isHistoryOrder(order.id)) || 
                     (user?.role === 'client') || 
                     (user?.role === 'driver' && user?.status !== 'working') ? (
                      <div className="flex items-start gap-2">
                        <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[11px] text-muted-foreground mb-0.5">Driver Details:</div>
                          <div className="text-xs font-medium">{driverInfo.name}</div>
                          <div className="text-xs text-muted-foreground">{driverInfo.phone}</div>
                          <div className="text-xs text-muted-foreground">Vehicle: {driverInfo.vehicle}</div>
                          <div className="text-xs text-muted-foreground">Rating: ⭐️ {driverInfo.rating}</div>
                          <div className="text-xs text-muted-foreground">Deliveries: {driverInfo.totalDeliveries}</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Sender:</div>
                            <div className="text-xs font-medium">{senderInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{senderInfo.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="h-3 border-l border-dashed border-border/50"></div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Recipient:</div>
                            <div className="text-xs font-medium">{recipientInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{recipientInfo.phone}</div>
                          </div>
                        </div>
                      </>
                    )}
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
              
              {index !== repeatedOrders.length - 1 && <Separator className="my-1 opacity-50" />}
            </div>
          );
        })}

        <h2 className="text-lg font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b mt-4">
          History
        </h2>

        {historyOrders.map((order, index) => {
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
                    <Badge variant="default" className="text-[10px] px-2 py-0.5">
                      Completed
                    </Badge>
                  </div>
                  
                  <OrderMap 
                    pickupAddress={knownLocations[order.pickupAddress] || order.pickupAddress}
                    deliveryAddress={knownLocations[order.deliveryAddress] || order.deliveryAddress}
                    driverName={order.driverName}
                  />
                  
                  <div className="order-info-card rounded-md bg-muted/50 p-2.5 shadow-sm">
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      <div className="text-muted-foreground">Pickup time:</div>
                      <div className="col-span-2 font-medium">{order.pickupTime}</div>
                      
                      <div className="text-muted-foreground">Dropoff time:</div>
                      <div className="col-span-2 font-medium">{order.dropoffTime}</div>

                      <div className="text-muted-foreground">Status:</div>
                      <div className="col-span-2 font-medium">Completed</div>
                    </div>
                  </div>
                  
                  <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
                    {((user?.role === 'client' && isHistoryOrder(order.id)) || 
                      showDriverInfo && !isHistoryOrder(order.id)) ? (
                      <div className="flex items-start gap-2">
                        <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-[11px] text-muted-foreground mb-0.5">Driver Details:</div>
                          <div className="text-xs font-medium">{driverInfo.name}</div>
                          <div className="text-xs text-muted-foreground">{driverInfo.phone}</div>
                          <div className="text-xs text-muted-foreground">Vehicle: {driverInfo.vehicle}</div>
                          <div className="text-xs text-muted-foreground">Rating: ⭐️ {driverInfo.rating}</div>
                          <div className="text-xs text-muted-foreground">Deliveries: {driverInfo.totalDeliveries}</div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Sender:</div>
                            <div className="text-xs font-medium">{senderInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{senderInfo.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="h-3 border-l border-dashed border-border/50"></div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-[11px] text-muted-foreground mb-0.5">Recipient:</div>
                            <div className="text-xs font-medium">{recipientInfo.name}</div>
                            <div className="text-xs text-muted-foreground">{recipientInfo.phone}</div>
                          </div>
                        </div>
                      </>
                    )}
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
              
              {index !== historyOrders.length - 1 && <Separator className="my-1 opacity-50" />}
            </div>
          );
        })}
      </div>
    </div>

    <style>
      {`
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

      .weekly-schedule-card {
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

      :global(.dark) .weekly-schedule-card {
        background: rgba(0, 0, 0, 0.2);
      }
      `}
    </style>
  </ScrollArea>;
};
