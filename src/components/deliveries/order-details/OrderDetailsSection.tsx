
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
          <p className="text-sm">Organization</p>
          <p className="text-sm font-medium">{organization}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Distance</p>
          <p className="text-sm font-medium">{distance}</p>
        </div>
      </div>
    </div>
  );
};
