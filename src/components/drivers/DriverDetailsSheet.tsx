import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Delivery } from "@/types/delivery";

interface DriverDetailsSheetProps {
  driver: any;
  driverDeliveries: Delivery[];
}

export function DriverDetailsSheet({ driver, driverDeliveries }: DriverDetailsSheetProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Driver Details</Button>
      </SheetTrigger>
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
              <AvatarFallback>OM</AvatarFallback>
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
              {driverDeliveries.slice(0, 4).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>{delivery.id}</p>
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
              {driverDeliveries.slice(4, 7).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>{delivery.id}</p>
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
              {driverDeliveries.slice(0, 2).map((delivery) => (
                <div key={delivery.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium cursor-pointer hover:text-blue-600" onClick={() => setSelectedOrderId(delivery.id)}>{delivery.id}</p>
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
