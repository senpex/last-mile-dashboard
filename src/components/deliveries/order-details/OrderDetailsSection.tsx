
import React from 'react';
import { CalendarClock } from "lucide-react";

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
      <div className="rounded-md border bg-card/50 p-4 space-y-4">
        <div className="flex justify-between">
          <p className="text-sm">Total charge price</p>
          <p className="text-sm font-medium">$24.50</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Courier earnings</p>
          <p className="text-sm font-medium">$18.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total tip</p>
          <p className="text-sm font-medium">$5.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Service fee</p>
          <p className="text-sm font-medium">$2.50</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Insurance fee</p>
          <p className="text-sm font-medium">$1.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Tax fee</p>
          <p className="text-sm font-medium">$2.20</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Tax %</p>
          <p className="text-sm font-medium">8.25%</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Item value</p>
          <p className="text-sm font-medium">$85.00</p>
        </div>
      </div>
    </div>
  );
};
