import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderDetailsSection } from "./OrderDetailsSection";
import { OrderRequirementsSection } from "./OrderRequirementsSection";
import { CourierInfo } from "./CourierInfo";
import { CustomerInfo } from "./CustomerInfo";
import { ScheduleInfo } from "./ScheduleInfo";
import { OrderNotes } from "./OrderNotes";
import { Delivery } from "@/types/delivery";
import { Dictionary } from "@/types/dictionary";
import { MapPin, Package, User, Clock } from "lucide-react";
import { AdditionalLocation } from './AdditionalLocation';

interface OrderDetailsTabsProps {
  delivery: Delivery;
  status: string;
  driverStatus: string;
  additionalLocations: any[];
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
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="p-6">
        <TabsTrigger value="details" className="text-sm"><Package className="w-4 h-4 mr-2" /> Details</TabsTrigger>
        <TabsTrigger value="locations" className="text-sm"><MapPin className="w-4 h-4 mr-2" /> Locations</TabsTrigger>
        <TabsTrigger value="courier" className="text-sm"><User className="w-4 h-4 mr-2" /> Courier</TabsTrigger>
        <TabsTrigger value="schedule" className="text-sm"><Clock className="w-4 h-4 mr-2" /> Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CourierInfo 
              courier={delivery.courier}
              status={driverStatus}
              onStatusChange={(newStatus) => console.log('Driver status changed:', newStatus)}
            />
            <CustomerInfo 
              customer={delivery.recipient}
              pickupAddress={delivery.pickupLocation?.address}
              dropoffAddress={delivery.dropoffLocation?.address}
              onOpenMap={onOpenMap}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrderDetailsSection 
                organization={delivery.organization}
                distance={delivery.distance}
              />
              <OrderRequirementsSection />
            </div>
          </div>

          <div className="space-y-6">
            <ScheduleInfo />
            <OrderNotes notes="Verify delivery with photo of drop-off location. Contact customer 15 minutes before arrival. Package contains fragile items - handle with care." />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="locations" className="space-y-6 mt-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Main Locations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdditionalLocation 
              name="Pickup Location"
              address={delivery.pickupLocation?.address || "Not Available"}
              description={delivery.pickupLocation?.description || "No description provided."}
              distance="N/A"
              status={status}
              deliveredAt="N/A"
            />
            <AdditionalLocation
              name="Drop-off Location"
              address={delivery.dropoffLocation?.address || "Not Available"}
              description={delivery.dropoffLocation?.description || "No description provided."}
              distance="N/A"
              status={status}
              deliveredAt="N/A"
            />
          </div>
        </div>

        {additionalLocations.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Additional Locations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalLocations.map((location, index) => (
                <AdditionalLocation
                  key={index}
                  name={location.name}
                  address={location.address}
                  description={location.description}
                  distance={location.distance}
                  status={location.status}
                  deliveredAt={location.deliveredAt}
                />
              ))}
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="courier" className="space-y-6 mt-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Courier Details</h4>
          <CourierInfo 
            courier={delivery.courier}
            status={driverStatus}
            onStatusChange={(newStatus) => console.log('Driver status changed:', newStatus)}
          />
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-6 mt-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Schedule Information</h4>
          <ScheduleInfo />
        </div>
      </TabsContent>
    </Tabs>
  );
};
