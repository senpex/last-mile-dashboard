
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveOrderCard } from "./order/ActiveOrderCard";
import { RepeatedOrderCard } from "./order/RepeatedOrderCard";
import { OrderStyles } from "./order/OrderStyles";
import { OrderData, OrderDetailsProps } from "./order/OrderTypes";

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

  const repeatedOrders = [{
    ...orderData,
    id: "909093",
    status: "repeated" as const,
    schedule: [{
      day: "Tuesday",
      time: "14:00"
    }, {
      day: "Wednesday",
      time: "15:30"
    }, {
      day: "Friday",
      time: "16:00"
    }]
  }];

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

  const shouldShowDriverInfo = (orderId: string) => {
    if (user?.role === 'driver' && user?.status === 'working') {
      return false;
    }
    return showDriverInfo;
  };

  const isDriverWorkingView = user?.role === 'driver' && user?.status === 'working';

  return (
    <div className="orders-panel flex flex-col h-full relative px-[14px] my-0">
      <div className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 min-h-0 flex flex-col">
          <ScrollArea independentPanel={true} className="flex-1 min-h-0 overflow-auto pr-0">
            <div className="right-panel-container p-[5px] pb-0 flex-1">
              <h2 className="text-lg font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b">
                {isDriverWorkingView ? "Active Orders - Working Driver" : "Active Orders - Customer"}
              </h2>
              
              {orders.map((order, index) => (
                <ActiveOrderCard
                  key={order.id}
                  order={order}
                  knownLocations={knownLocations}
                  expandedOrderId={expandedOrderId}
                  setExpandedOrderId={setExpandedOrderId}
                  shouldShowDriverInfo={shouldShowDriverInfo}
                  driverInfo={driverInfo}
                  senderInfo={senderInfo}
                  recipientInfo={recipientInfo}
                  isDriverWorkingView={isDriverWorkingView}
                  index={index}
                  ordersLength={orders.length}
                />
              ))}
              
              <h2 className="text-lg font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 border-b mt-4">
                Repeated Orders
              </h2>
              
              {repeatedOrders.map((order, index) => (
                <RepeatedOrderCard
                  key={order.id}
                  order={order}
                  expandedOrderId={expandedOrderId}
                  setExpandedOrderId={setExpandedOrderId}
                  shouldShowDriverInfo={shouldShowDriverInfo}
                  driverInfo={driverInfo}
                  senderInfo={senderInfo}
                  recipientInfo={recipientInfo}
                  index={index}
                  ordersLength={repeatedOrders.length}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <OrderStyles />
    </div>
  );
};
