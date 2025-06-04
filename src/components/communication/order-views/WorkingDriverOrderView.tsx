import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, UserRound, ChevronUp, ChevronDown } from "lucide-react";
import { OrderMap } from "../OrderMap";
import { useState } from "react";
import { OrderDetailsSheet } from "@/components/deliveries/OrderDetailsSheet";
import { Delivery } from "@/types/delivery";

interface WorkingDriverOrderViewProps {
  order: {
    id: string;
    status: 'active' | 'completed' | 'cancelled';
    pickupAddress: string;
    deliveryAddress: string;
    driverName: string;
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
  getOrderNotes: (id: string) => string;
}

export const WorkingDriverOrderView = ({
  order,
  expandedOrderId,
  setExpandedOrderId,
  knownLocations,
  senderInfo,
  recipientInfo,
  getOrderNotes
}: WorkingDriverOrderViewProps) => {
  const isExpanded = expandedOrderId === order.id;
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // Convert order to Delivery type for the OrderDetailsSheet
  const deliveryOrder: Delivery = {
    id: parseInt(order.id),
    packageId: order.id,
    orderName: `Order #${order.id}`,
    status: order.status === 'active' ? 'En Route' : order.status === 'completed' ? 'Dropoff Complete' : 'Canceled By Customer',
    pickupTime: "Scheduled pickup time",
    pickupLocation: {
      name: senderInfo.name,
      address: knownLocations[order.pickupAddress] || order.pickupAddress
    },
    dropoffTime: "Estimated delivery time",
    dropoffLocation: {
      name: recipientInfo.name,
      address: knownLocations[order.deliveryAddress] || order.deliveryAddress
    },
    customerName: senderInfo.name,
    price: "$29.99",
    tip: "$5.00",
    courier: order.driverName,
    organization: "Delivery Inc.",
    distance: "3.2 miles",
    notes: getOrderNotes(order.id)
  };

  return (
    <div className="order-card rounded-lg transition-all duration-200 ease-in-out">
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
            <Badge className="bg-green-500">Active</Badge>
          </div>
          
          <div className="relative overflow-hidden rounded-lg h-28">
            <OrderMap 
              pickupAddress={knownLocations[order.pickupAddress] || order.pickupAddress} 
              deliveryAddress={knownLocations[order.deliveryAddress] || order.deliveryAddress} 
              driverName={order.driverName}
            />
          </div>
          
          <div className="notes-card rounded-md bg-muted/50 p-2.5 shadow-sm">
            <div className="flex items-start gap-2">
              <FileText className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-muted-foreground mb-0.5">Notes:</div>
                <div className="text-xs whitespace-pre-line">{getOrderNotes(order.id)}</div>
              </div>
            </div>
          </div>
          
          <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
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
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs py-1"
            onClick={() => setIsOrderDetailsOpen(true)}
          >
            View Full Order
          </Button>
        </div>
      )}
      
      <OrderDetailsSheet
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        delivery={deliveryOrder}
        flaggedOrders={new Set()}
        onOrderFlag={() => {}}
      />
    </div>
  );
};
