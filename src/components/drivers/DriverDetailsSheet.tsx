import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderDetailsSheet } from "@/components/deliveries/OrderDetailsSheet";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  deliveries: any[];
  flaggedOrders: Set<number>;
  onOrderFlag: (orderId: number, isFlagged: boolean) => void;
}

export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  deliveries,
  flaggedOrders,
  onOrderFlag
}: DriverDetailsSheetProps) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const handleOrderClick = (orderId: number) => {
    const order = deliveries.find(delivery => delivery.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsOrderDetailsOpen(true);
    }
  };

  const renderPaymentHistory = () => {
    const payments = [
      { id: 1, orderId: 100423, amount: "$45.50", date: "2024-01-15", time: "14:30" },
      { id: 2, orderId: 100424, amount: "$32.75", date: "2024-01-15", time: "15:45" },
      { id: 3, orderId: 100425, amount: "$67.20", date: "2024-01-14", time: "16:20" }
    ];

    return (
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">
                  Order #
                  <button 
                    onClick={() => handleOrderClick(payment.orderId)}
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    {payment.orderId}
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">{payment.date} at {payment.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{payment.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOrdersOnHands = () => {
    const orders = [
      { id: 100429, customer: "John Smith", status: "In Transit", amount: "$45.50", date: "2024-01-15", time: "14:30" },
      { id: 100430, customer: "Sarah Johnson", status: "Pending", amount: "$32.75", date: "2024-01-15", time: "15:45" },
      { id: 100431, customer: "Mike Davis", status: "Delivered", amount: "$67.20", date: "2024-01-14", time: "16:20" }
    ];

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Order #<button 
                    onClick={() => handleOrderClick(order.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    {order.id}
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.date} at {order.time}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium">{order.amount}</p>
                <Badge variant={order.status === "Delivered" ? "default" : order.status === "In Transit" ? "secondary" : "outline"}>
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Driver Details</SheetTitle>
        </SheetHeader>
        <div className="flex items-center space-x-4 pt-4">
          <Avatar>
            <AvatarImage src={driver?.image} alt={driver?.name} />
            <AvatarFallback>{driver?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{driver?.name}</h4>
            <p className="text-sm text-muted-foreground">{driver?.email}</p>
            <Badge variant="secondary">
              {driver?.status}
            </Badge>
          </div>
        </div>
        <Tabs defaultValue="paymentHistory" className="space-y-4 pt-4">
          <TabsList>
            <TabsTrigger value="paymentHistory">Payment History</TabsTrigger>
            <TabsTrigger value="ordersOnHands">Orders on Hands</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="paymentHistory" className="space-y-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {renderPaymentHistory()}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="ordersOnHands" className="space-y-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {renderOrdersOnHands()}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Driver ID: {driver?.id}</p>
              <p className="text-sm text-muted-foreground">Email: {driver?.email}</p>
              <p className="text-sm text-muted-foreground">Phone: {driver?.phone}</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
      <OrderDetailsSheet
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        delivery={selectedOrder}
        flaggedOrders={flaggedOrders}
        onOrderFlag={onOrderFlag}
      />
    </Sheet>
  );
};
