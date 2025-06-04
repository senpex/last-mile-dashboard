
import React from 'react';
import { CalendarClock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OrderDetailsSectionProps {
  organization: string | undefined;
  distance: string;
}

export const OrderDetailsSection = ({
  organization,
  distance
}: OrderDetailsSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <CalendarClock className="w-4 h-4 mr-2" />
        Price Details
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="total-charge-price" className="text-xs font-medium">Total charge price</Label>
            <Input id="total-charge-price" type="text" value="$24.50" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courier-earnings" className="text-xs font-medium">Courier earnings</Label>
            <Input id="courier-earnings" type="text" value="$18.00" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-tip" className="text-xs font-medium">Total tip</Label>
            <Input id="total-tip" type="text" value="$5.00" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-fee" className="text-xs font-medium">Service fee</Label>
            <Input id="service-fee" type="text" value="$2.50" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-fee" className="text-xs font-medium">Insurance fee</Label>
            <Input id="insurance-fee" type="text" value="$1.00" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-fee" className="text-xs font-medium">Tax fee</Label>
            <Input id="tax-fee" type="text" value="$2.20" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-percentage" className="text-xs font-medium">Tax %</Label>
            <Input id="tax-percentage" type="text" value="8.25%" readOnly className="h-8 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-value" className="text-xs font-medium">Item value</Label>
            <Input id="item-value" type="text" value="$85.00" readOnly className="h-8 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
