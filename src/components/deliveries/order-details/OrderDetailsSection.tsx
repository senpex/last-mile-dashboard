
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
      <div className="rounded-md border bg-card/50 p-4 space-y-2">
        <div className="text-sm">
          <span>Total charge price: </span><span className="font-medium">$24.50</span> | 
          <span> Courier earnings: </span><span className="font-medium">$18.00</span> | 
          <span> Total tip: </span><span className="font-medium">$5.00</span> | 
          <span> Service fee: </span><span className="font-medium">$2.50</span>
        </div>
        <div className="text-sm">
          <span>Insurance fee: </span><span className="font-medium">$1.00</span> | 
          <span> Tax fee: </span><span className="font-medium">$2.20</span> | 
          <span> Tax %: </span><span className="font-medium">8.25%</span> | 
          <span> Item value: </span><span className="font-medium">$85.00</span>
        </div>
      </div>
    </div>
  );
};
