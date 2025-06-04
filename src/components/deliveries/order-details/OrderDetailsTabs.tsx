
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderNotes } from "./OrderNotes";
import { RouteTable } from "./RouteTable";
import { ScheduleInfo } from "./ScheduleInfo";
import { CustomerInfo } from "./CustomerInfo";
import { CourierInfo } from "./CourierInfo";
import { DriverInfoTable } from "./DriverInfoTable";
import { OrderDetailsSection } from "./OrderDetailsSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { OrderRequirementsSection } from "./OrderRequirementsSection";
import { ExtraServicesSection } from "./ExtraServicesSection";
import { ImagesSection } from "./ImagesSection";
import { PaymentTransactions } from "./PaymentTransactions";
import { PackageHistory } from "./PackageHistory";
import { DriverControl } from "./DriverControl";
import { MailingHistory } from "./MailingHistory";
import { ChatHistory } from "./ChatHistory";
import { StatusChangeLog } from "./StatusChangeLog";
import { ItemsSection } from "./ItemsSection";
import { CreditCard, Package, Truck, Mail, MessageSquare, Activity, ShoppingCart } from "lucide-react";
import { Delivery } from "@/types/delivery";
import { Dictionary } from "@/types/dictionary";

interface AdditionalLocation {
  name: string;
  address: string;
  description: string;
  distance: string;
  status: string;
  deliveredAt: string;
}

interface OrderDetailsTabsProps {
  delivery: Delivery;
  status: string;
  driverStatus: string;
  additionalLocations: AdditionalLocation[];
  orderStatusesDictionary: Dictionary;
  onOpenMap: () => void;
}

export const OrderDetailsTabs = ({
  delivery,
  status,
  driverStatus,
  additionalLocations,
  orderStatusesDictionary,
  onOpenMap
}: OrderDetailsTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<string>("order-info");
  const [activeLogTab, setActiveLogTab] = React.useState<string>("payment-transactions");
  
  // Driver names with professional courier names instead of "Bentonville Public Library"
  const customerName = delivery.customerName || "Jane Smith";
  const driverName = delivery.courier || "Michael Torres";
  
  return (
    <Tabs defaultValue="order-info" className="w-full" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-2 mx-6 mb-2 mt-2 sticky top-0 z-10 bg-background">
        <TabsTrigger value="order-info">Order Info</TabsTrigger>
        <TabsTrigger value="order-logs">Order Logs</TabsTrigger>
      </TabsList>
      
      <div className="flex-1 overflow-hidden">
        <TabsContent value="order-info" className="m-0 h-full">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-6 space-y-6 pb-96">
              <OrderNotes notes={delivery.notes} />
              
              <RouteTable 
                delivery={delivery}
                additionalLocations={additionalLocations}
                status={status}
                onOpenMap={onOpenMap}
              />
              
              <ScheduleInfo 
                pickupTime={delivery.pickupTime}
                dropoffTime={delivery.dropoffTime}
              />
              
              <CustomerInfo 
                customerName={delivery.customerName} 
                organization={delivery.organization}
              />
              
              {delivery.courier && (
                <CourierInfo courier={delivery.courier} />
              )}
              
              <DriverInfoTable 
                customerName={customerName}
                driverName={driverName}
                price={delivery.price}
                tip={delivery.tip}
                couriersEarnings={delivery.couriersEarnings}
                driverStatus={driverStatus}
                orderStatusesDictionary={orderStatusesDictionary}
              />
              
              <OrderSummarySection 
                distance={delivery.distance}
                transportType="9ft_cargo_van"
                packageType="Standard Package"
                estimatedRouteTime="25 minutes"
                parkingLot="Main Street Parking"
                returnParkingLot="Warehouse Lot B"
              />
              
              <OrderDetailsSection 
                organization={delivery.organization}
                distance={delivery.distance}
              />
              
              <ExtraServicesSection />
              
              <OrderRequirementsSection />
              
              <ImagesSection />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="order-logs" className="m-0 h-full">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="p-6 px-[23px] pt-0 pb-96">
              <Tabs defaultValue="payment-transactions" value={activeLogTab} onValueChange={setActiveLogTab}>
                <div className="sticky top-0 z-10 bg-background pt-1 pb-2 min-h-[90px]">
                  <TabsList className="flex flex-wrap bg-transparent p-0 py-3 gap-1 justify-start w-full overflow-visible my-0">
                    <TabsTrigger value="payment-transactions" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <CreditCard className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Payment Transactions</span>
                      <span className="sm:hidden">Payments</span>
                    </TabsTrigger>
                    <TabsTrigger value="package-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Package className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Edits Log</span>
                      <span className="sm:hidden">Edits</span>
                    </TabsTrigger>
                    <TabsTrigger value="items" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <ShoppingCart className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Items</span>
                      <span className="sm:hidden">Items</span>
                    </TabsTrigger>
                    <TabsTrigger value="driver-control" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Truck className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Driver Control</span>
                      <span className="sm:hidden">Driver</span>
                    </TabsTrigger>
                    <TabsTrigger value="mailing-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Mail className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Mailing History</span>
                      <span className="sm:hidden">Mail</span>
                    </TabsTrigger>
                    <TabsTrigger value="chat-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <MessageSquare className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Chat History</span>
                      <span className="sm:hidden">Chat</span>
                    </TabsTrigger>
                    <TabsTrigger value="status-change-log" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Activity className="w-4 h-4" /> 
                      <span className="hidden sm:inline">Status Change Log</span>
                      <span className="sm:hidden">Status</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="mt-4 space-y-4">
                  <TabsContent value="payment-transactions" className="space-y-4">
                    <PaymentTransactions price={delivery.price} tip={delivery.tip} />
                  </TabsContent>
                  
                  <TabsContent value="package-history" className="space-y-4">
                    <PackageHistory />
                  </TabsContent>
                  
                  <TabsContent value="items" className="space-y-4">
                    <ItemsSection />
                  </TabsContent>
                  
                  <TabsContent value="driver-control" className="space-y-4">
                    <DriverControl />
                  </TabsContent>
                  
                  <TabsContent value="mailing-history" className="space-y-4">
                    <MailingHistory />
                  </TabsContent>
                  
                  <TabsContent value="chat-history" className="space-y-4">
                    <ChatHistory />
                  </TabsContent>
                  
                  <TabsContent value="status-change-log" className="space-y-4">
                    <StatusChangeLog />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  );
};
