
import { MessageSquare } from "lucide-react";

interface OrderTimingsProps {
  pickupTime: string;
  dropoffTime: string;
  eta: string;
}

export const OrderTimings = ({ pickupTime, dropoffTime, eta }: OrderTimingsProps) => {
  return (
    <div className="order-info-card rounded-md bg-muted/50 p-2.5 shadow-sm">
      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
        <div className="text-muted-foreground">Pickup time:</div>
        <div className="col-span-2 font-medium">{pickupTime || "Not scheduled"}</div>
        <div className="text-muted-foreground">Dropoff time:</div>
        <div className="col-span-2 font-medium">{dropoffTime || "Not scheduled"}</div>
        <div className="text-muted-foreground">ETA:</div>
        <div className="col-span-2 font-medium">{eta}</div>
      </div>
    </div>
  );
};

interface OrderNotesProps {
  orderId: string;
}

export const OrderNotes = ({ orderId }: OrderNotesProps) => {
  const getOrderNotes = (id: string) => {
    return `Order #${id}
Package contents: 2 boxes of office supplies
Special instructions: Delivery must be made during business hours (9 AM - 5 PM)
Contact recipient before delivery at provided number`;
  };

  return (
    <div className="order-info-card rounded-md bg-muted/50 p-2.5 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium">Notes:</span>
      </div>
      <div className="text-xs whitespace-pre-line text-muted-foreground border-l-2 border-muted pl-2">
        {getOrderNotes(orderId)}
      </div>
    </div>
  );
};
