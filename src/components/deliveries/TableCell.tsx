
import React from 'react';
import { TableCell as UiTableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Delivery } from '@/types/delivery';

interface DeliveryTableCellProps {
  columnId: string;
  delivery: Delivery;
  getStatusDisplay: (status: string) => string;
  getStatusBadgeVariant: (status: string) => string;
  onCourierClick: (courierName: string) => void;
}

export function DeliveryTableCell({
  columnId,
  delivery,
  getStatusDisplay,
  getStatusBadgeVariant,
  onCourierClick
}: DeliveryTableCellProps) {
  switch (columnId) {
    case "status":
      return (
        <UiTableCell>
          <Badge 
            variant={getStatusBadgeVariant(delivery.status) as any}
            className={`${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
          >
            {getStatusDisplay(delivery.status)}
          </Badge>
        </UiTableCell>
      );
    case "packageId":
      return (
        <UiTableCell>
          <span className="font-sans text-sm">{delivery.packageId}</span>
        </UiTableCell>
      );
    case "orderName":
      return <UiTableCell>{delivery.orderName}</UiTableCell>;
    case "customerName":
      return <UiTableCell>{delivery.customerName}</UiTableCell>;
    case "pickupTime":
      return <UiTableCell>{delivery.pickupTime}</UiTableCell>;
    case "pickupLocation":
      return (
        <UiTableCell>
          <div className="flex flex-col">
            <span className="font-medium">{delivery.pickupLocation.name}</span>
            <span className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</span>
          </div>
        </UiTableCell>
      );
    case "dropoffTime":
      return <UiTableCell>{delivery.dropoffTime}</UiTableCell>;
    case "dropoffLocation":
      return (
        <UiTableCell>
          <div className="flex flex-col">
            <span className="font-medium">{delivery.dropoffLocation.name}</span>
            <span className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</span>
          </div>
        </UiTableCell>
      );
    case "price":
      return <UiTableCell>{delivery.price}</UiTableCell>;
    case "tip":
      return <UiTableCell>{delivery.tip}</UiTableCell>;
    case "courier":
      return (
        <UiTableCell>
          {delivery.courier ? (
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal text-primary" 
              onClick={() => onCourierClick(delivery.courier)}
            >
              {delivery.courier}
            </Button>
          ) : (
            <span>-</span>
          )}
        </UiTableCell>
      );
    case "organization":
      return <UiTableCell>{delivery.organization}</UiTableCell>;
    case "distance":
      return <UiTableCell className="text-right">{delivery.distance}</UiTableCell>;
    case "couriersEarnings":
      return <UiTableCell className="text-right">{delivery.couriersEarnings || "-"}</UiTableCell>;
    default:
      return <UiTableCell></UiTableCell>;
  }
}
