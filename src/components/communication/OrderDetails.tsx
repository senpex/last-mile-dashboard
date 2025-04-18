
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Order Details</h3>
        <Button variant="ghost" size="sm" onClick={() => setOrderDetailsExpanded(!orderDetailsExpanded)}>
          {orderDetailsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {orderDetailsExpanded && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Order #{orderData.id}</div>
            <StatusBadge status={orderData.status} />
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-gray-500">Created:</div>
              <div className="col-span-2 font-medium">{orderData.createdAt}</div>
              
              <div className="text-gray-500">ETA:</div>
              <div className="col-span-2 font-medium">{orderData.eta}</div>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Pickup Address:</div>
                <div className="text-sm">{orderData.pickupAddress}</div>
              </div>
            </div>
            
            <div className="flex justify-center my-2">
              <div className="h-6 border-l border-dashed"></div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <div className="text-xs text-gray-500 mb-1">Delivery Address:</div>
                <div className="text-sm">{orderData.deliveryAddress}</div>
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
                  <h3 className="font-medium mb-2">Order #{orderData.id}</h3>
                  <p>Full order details would be displayed here.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}
    </div>
  );
};
