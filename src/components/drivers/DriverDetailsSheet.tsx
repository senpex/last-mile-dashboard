import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderDetailsSheet } from "@/components/deliveries/OrderDetailsSheet";
import { Delivery } from "@/types/delivery";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
  } | null;
}

export const DriverDetailsSheet = ({ isOpen, onClose, driver }: DriverDetailsSheetProps) => {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const flaggedOrders = new Set<number>();
  
  const upcomingPayments = [{
    id: "payment-1",
    date: "2024-03-15",
    amount: "$150.00",
    transactions: [{
      id: "transaction-1",
      orderId: "121212",
      orderNumber: "20240315-121212",
      date: "2024-03-15",
      amount: "$50.00"
    }, {
      id: "transaction-2",
      orderId: "343434",
      orderNumber: "20240315-343434",
      date: "2024-03-15",
      amount: "$50.00"
    }, {
      id: "transaction-3",
      orderId: "565656",
      orderNumber: "20240315-565656",
      date: "2024-03-15",
      amount: "$50.00"
    }]
  }, {
    id: "payment-2",
    date: "2024-03-22",
    amount: "$120.00",
    transactions: [{
      id: "transaction-4",
      orderId: "787878",
      orderNumber: "20240322-787878",
      date: "2024-03-22",
      amount: "$40.00"
    }, {
      id: "transaction-5",
      orderId: "909090",
      orderNumber: "20240322-909090",
      date: "2024-03-22",
      amount: "$40.00"
    }, {
      id: "transaction-6",
      orderId: "123456",
      orderNumber: "20240322-123456",
      date: "2024-03-22",
      amount: "$40.00"
    }]
  }];
  
  const ordersOnHands = [{
    id: "909091",
    pickupDate: "2024-03-22",
    deliveryDate: "2024-03-22",
    status: "In Transit"
  }, {
    id: "909092",
    pickupDate: "2024-03-22",
    deliveryDate: "2024-03-22",
    status: "In Transit"
  }, {
    id: "909093",
    pickupDate: "2024-03-22",
    deliveryDate: "2024-03-22",
    status: "In Transit"
  }];
  
  const handleOrderClick = (orderId: string) => {
    // Find the actual order from either upcoming payments or orders on hands
    let foundOrder = null;
    
    // Search in upcoming payments
    upcomingPayments.forEach(payment => {
      const transaction = payment.transactions.find(t => t.orderId === orderId);
      if (transaction) {
        foundOrder = {
          id: parseInt(orderId),
          packageId: transaction.orderNumber,
          status: "In Transit" as const,
          courier: driver?.name || "Unknown Driver",
          pickupLocation: {
            name: "Pickup Location",
            address: "123 Pickup St, San Francisco, CA 94103"
          },
          dropoffLocation: {
            name: "Delivery Location", 
            address: "456 Delivery Ave, San Francisco, CA 94107"
          },
          pickupTime: transaction.date,
          dropoffTime: transaction.date,
          estimatedDelivery: transaction.date
        };
      }
    });
    
    // Search in orders on hands if not found
    if (!foundOrder) {
      const orderOnHand = ordersOnHands.find(order => order.id === orderId);
      if (orderOnHand) {
        foundOrder = {
          id: parseInt(orderId),
          packageId: orderOnHand.id,
          status: "In Transit" as const,
          courier: driver?.name || "Unknown Driver",
          pickupLocation: {
            name: "Pickup Location",
            address: "123 Pickup St, San Francisco, CA 94103"
          },
          dropoffLocation: {
            name: "Delivery Location",
            address: "456 Delivery Ave, San Francisco, CA 94107"
          },
          pickupTime: orderOnHand.pickupDate,
          dropoffTime: orderOnHand.pickupDate,
          estimatedDelivery: orderOnHand.pickupDate
        };
      }
    }
    
    if (foundOrder) {
      setSelectedOrderId(orderId);
      setSelectedDelivery(foundOrder);
      setIsOrderDetailsOpen(true);
    }
  };

  const handleOrderFlag = (orderId: number, isFlagged: boolean) => {
    if (isFlagged) {
      flaggedOrders.add(orderId);
    } else {
      flaggedOrders.delete(orderId);
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            Information about the driver and their performance.
          </SheetDescription>
        </SheetHeader>
        
        {driver && (
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${driver.name}`} />
                <AvatarFallback>{driver.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">{driver.email}</p>
                <p className="text-sm text-muted-foreground">{driver.phone}</p>
                <Badge variant="secondary">{driver.status}</Badge>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Upcoming Payments</h4>
              <ul>
                {upcomingPayments.map(payment => (
                  <li key={payment.id} className="py-2 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Date: {payment.date}</p>
                        <p className="text-sm">Amount: {payment.amount}</p>
                        <ul className="ml-4">
                          {payment.transactions.map(transaction => (
                            <li key={transaction.id} className="text-xs text-muted-foreground">
                              Order ID: <Button variant="link" onClick={() => handleOrderClick(transaction.orderId)}>{transaction.orderId}</Button> - Amount: {transaction.amount}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Orders on Hands</h4>
              <ul>
                {ordersOnHands.map(order => (
                  <li key={order.id} className="py-2 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Order ID: <Button variant="link" onClick={() => handleOrderClick(order.id)}>{order.id}</Button></p>
                        <p className="text-sm">Pickup Date: {order.pickupDate}</p>
                        <p className="text-sm">Delivery Date: {order.deliveryDate}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <OrderDetailsSheet
          isOpen={isOrderDetailsOpen}
          onClose={() => setIsOrderDetailsOpen(false)}
          delivery={selectedDelivery}
          flaggedOrders={flaggedOrders}
          onOrderFlag={handleOrderFlag}
        />
      </SheetContent>
    </Sheet>
  );
};
