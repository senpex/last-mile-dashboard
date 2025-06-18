
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Delivery } from "@/types/delivery";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: "verified" | "unverified" | "pending") => JSX.Element;
}

export function DriverDetailsSheet({ 
  isOpen, 
  onClose, 
  driver, 
  transportTypes, 
  statusDictionary, 
  hireStatusDictionary, 
  renderStatus, 
  renderStripeStatus 
}: DriverDetailsSheetProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Mock deliveries data for now - in a real app this would come from props or API
  const mockDeliveries: Delivery[] = [
    {
      id: 234567,
      orderNumber: "234567",
      pickupTime: "2024-01-15 10:30",
      price: "$45.50",
      couriersEarnings: "$22.75",
      status: "Dropoff Complete"
    },
    {
      id: 345678,
      orderNumber: "345678", 
      pickupTime: "2024-01-14 14:20",
      price: "$32.00",
      couriersEarnings: "$16.00",
      status: "Dropoff Complete"
    },
    {
      id: 456789,
      orderNumber: "456789",
      pickupTime: "2024-01-16 09:15",
      price: "$67.25",
      couriersEarnings: "$33.63",
      status: "In Transit"
    },
    {
      id: 567890,
      orderNumber: "567890",
      pickupTime: "2024-01-17 16:45",
      price: "$28.75", 
      couriersEarnings: "$14.38",
      status: "Scheduled Order"
    }
  ];

  if (!driver) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            See all the information about this driver at a glance.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>
                {driver.name?.split(' ').map((n: string) => n[0]).join('') || 'DR'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{driver.name}</p>
              <p className="text-sm text-gray-500">{driver.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Payment History</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {mockDeliveries.slice(0, 4).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>
                      {delivery.id}
                    </p>
                    <p className="text-sm text-gray-500">{delivery.pickupTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{delivery.couriersEarnings || delivery.price}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Upcoming Payments</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {mockDeliveries.slice(2, 4).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>
                      {delivery.id}
                    </p>
                    <p className="text-sm text-gray-500">{delivery.pickupTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-600">{delivery.couriersEarnings || delivery.price}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Weekly Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {mockDeliveries.slice(0, 2).map((delivery) => (
                <div key={delivery.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>
                    {delivery.id}
                  </p>
                  <p className="text-sm text-gray-500">{delivery.pickupTime}</p>
                  <p className="font-medium text-green-600">{delivery.couriersEarnings || delivery.price}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
