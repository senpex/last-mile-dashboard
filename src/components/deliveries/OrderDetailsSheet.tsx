
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OrderMap } from "@/components/communication/OrderMap";
import { StatusSelector } from "./order-details/StatusSelector";
import { OrderDetailsTabs } from "./order-details/OrderDetailsTabs";
import { OrderControlPanel } from "./order-details/OrderControlPanel";
import { Dictionary } from "@/types/dictionary";
import { toast } from "sonner";

interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
  flaggedOrders: Set<number>;
  onOrderFlag: (orderId: number, isFlagged: boolean) => void;
}

export const OrderDetailsSheet = ({
  isOpen,
  onClose,
  delivery,
  flaggedOrders,
  onOrderFlag
}: OrderDetailsSheetProps) => {
  if (!delivery) return null;
  
  const [status, setStatus] = useState<string>(delivery.status);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [driverStatus, setDriverStatus] = useState<string>("Available");
  
  const statuses: DeliveryStatus[] = [
    "Dropoff Complete", "Canceled By Customer", "Cancelled By Admin", 
    "In Transit", "Picking Up", "Arrived For Pickup", "Scheduled Order", 
    "Online", "Offline", "Busy", "Not approved", "Available", "On Break"
  ];

  // Create Order statuses dictionary
  const orderStatusesDictionary: Dictionary = {
    id: "order-statuses",
    dic_name: "Order Statuses",
    items: [
      { id: "1", value: "Available", description: "Driver is available for new orders" },
      { id: "2", value: "Busy", description: "Driver is currently handling orders" },
      { id: "3", value: "On Break", description: "Driver is on a scheduled break" },
      { id: "4", value: "Online", description: "Driver is actively connected to the system" },
      { id: "5", value: "Offline", description: "Driver is not currently connected to the system" },
      { id: "6", value: "Not approved", description: "Driver account is pending approval" }
    ]
  };

  // Status badge variant function
  const getStatusBadgeVariant = (status: string): string => {
    switch (status) {
      case "Dropoff Complete":
        return "success";
      case "In Transit":
      case "Picking Up":
      case "Arrived For Pickup":
        return "default";
      case "Canceled By Customer":
      case "Cancelled By Admin":
        return "destructive";
      case "Scheduled Order":
      case "Not approved":
        return "warning";
      default:
        return "outline";
    }
  };

  // Get color for each status
  const getStatusColor = (statusOption: string): string => {
    switch (statusOption) {
      case "Dropoff Complete":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "In Transit":
      case "Picking Up":
      case "Arrived For Pickup":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Canceled By Customer":
      case "Cancelled By Admin":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Scheduled Order":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Online":
      case "Available":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Offline":
      case "On Break":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Busy":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Not approved":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  const handleStatusChange = (newStatus: DeliveryStatus) => {
    setStatus(newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };
  
  // Generate additional locations based on delivery ID
  const getAdditionalLocations = () => {
    // Use delivery ID to deterministically generate locations
    const locationSeed = delivery.id % 3; // 0, 1, or 2

    const additionalLocations = [{
      name: "Warehouse Storage",
      address: "1250 Industrial Blvd, Warehouse District, SF 94107",
      description: "Primary storage facility for dry goods",
      distance: "2.5 miles",
      status: "Completed",
      deliveredAt: "10:30 AM"
    }, {
      name: "Processing Center",
      address: "582 Tech Park Way, Innovation District, SF 94158",
      description: "Order verification and processing hub",
      distance: "1.8 miles",
      status: "In Progress",
      deliveredAt: "11:05 AM"
    }, {
      name: "Distribution Hub",
      address: "975 Logistics Avenue, Commerce Park, SF 94124",
      description: "Regional distribution center for all deliveries",
      distance: "3.2 miles",
      status: "Pending",
      deliveredAt: "11:30 AM"
    }, {
      name: "Temporary Holding",
      address: "342 Transit Road, Gateway Center, SF 94103",
      description: "Short-term storage for time-sensitive packages",
      distance: "1.5 miles",
      status: "Completed",
      deliveredAt: "10:45 AM"
    }, {
      name: "Dispatch Center",
      address: "127 Fleet Street, Transport Zone, SF 94110",
      description: "Main dispatch point for courier assignments",
      distance: "2.7 miles",
      status: "Pending",
      deliveredAt: "12:15 PM"
    }];

    // Show different number of additional locations based on delivery ID
    if (locationSeed === 0) {
      return []; // No additional locations
    } else if (locationSeed === 1) {
      return [additionalLocations[delivery.id % additionalLocations.length]]; // One additional location
    } else {
      // Two additional locations
      return [additionalLocations[delivery.id % additionalLocations.length], additionalLocations[(delivery.id + 2) % additionalLocations.length]];
    }
  };
  
  const additionalLocations = getAdditionalLocations();
  
  return (
    <Sheet open={isOpen} onOpenChange={open => {
      if (!open) onClose();
    }}>
      <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
        {/* Main Content with Flex Structure - ReOrdered to show content first, then fixed controls */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <SheetHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-left text-lg">Order #{delivery.packageId}</SheetTitle>
                <StatusSelector 
                  status={status} 
                  statuses={statuses}
                  getStatusBadgeVariant={getStatusBadgeVariant}
                  getStatusColor={getStatusColor}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
            <SheetDescription className="text-left text-sm">
              May 6-Food pickup@11:18 AM Delivery time 11:45 AM [5K1-6U4] NORMAL
            </SheetDescription>
          </SheetHeader>
          
          <OrderDetailsTabs 
            delivery={delivery}
            status={status}
            driverStatus={driverStatus}
            additionalLocations={additionalLocations}
            orderStatusesDictionary={orderStatusesDictionary}
            onOpenMap={() => setIsMapDialogOpen(true)}
          />
        </div>
        
        {/* Control Panel Section - Fixed at bottom */}
        <OrderControlPanel 
          statuses={statuses}
          onStatusChange={handleStatusChange}
          flaggedOrders={flaggedOrders}
          onOrderFlag={onOrderFlag}
          delivery={delivery}
        />
      </SheetContent>

      {/* Map Dialog */}
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] w-full max-h-[90vh] p-0 bg-background">
          <DialogTitle className="p-4 border-b">Delivery Route Map</DialogTitle>
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 min-h-[500px] h-[calc(90vh-120px)] rounded-md overflow-hidden">
              {delivery.pickupLocation?.address && delivery.dropoffLocation?.address && (
                <OrderMap 
                  pickupAddress={delivery.pickupLocation.address} 
                  deliveryAddress={delivery.dropoffLocation.address} 
                  driverName={delivery.courier || "Driver"} 
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};
