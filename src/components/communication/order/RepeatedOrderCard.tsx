
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown } from "lucide-react";
import { WeeklySchedule, RepeatedOrderBadge } from "./WeeklySchedule";
import { SenderRecipientInfo, DriverInfo } from "./AddressCard";

interface RepeatedOrderCardProps {
  order: {
    id: string;
    schedule: Array<{ day: string; time: string }>;
    status: string;
  };
  expandedOrderId: string | null;
  setExpandedOrderId: (id: string | null) => void;
  shouldShowDriverInfo: (orderId: string) => boolean;
  driverInfo: {
    name: string;
    phone: string;
    vehicle: string;
    rating: string;
    totalDeliveries: string;
  };
  senderInfo: {
    name: string;
    phone: string;
  };
  recipientInfo: {
    name: string;
    phone: string;
  };
  index: number;
  ordersLength: number;
}

export const RepeatedOrderCard = ({
  order,
  expandedOrderId,
  setExpandedOrderId,
  shouldShowDriverInfo,
  driverInfo,
  senderInfo,
  recipientInfo,
  index,
  ordersLength
}: RepeatedOrderCardProps) => {
  const isExpanded = expandedOrderId === order.id;

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
            <RepeatedOrderBadge />
          </div>
          <WeeklySchedule schedule={order.schedule} />
          <div className="address-card rounded-md bg-muted/50 p-2.5 shadow-sm space-y-2">
            {shouldShowDriverInfo(order.id) ? (
              <DriverInfo driverInfo={driverInfo} />
            ) : (
              <SenderRecipientInfo 
                senderInfo={senderInfo}
                recipientInfo={recipientInfo}
              />
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
      {index !== ordersLength - 1 && <Separator className="my-1 opacity-50" />}
    </div>
  );
};
