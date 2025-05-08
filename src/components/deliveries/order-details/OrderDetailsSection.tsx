
import React from 'react';
import { CalendarClock, FileCheck, Package, Truck, Clock, Globe, Calendar, Ruler, Weight, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface OrderDetailsSectionProps {
  organization: string | undefined;
  distance: string;
}

export const OrderDetailsSection = ({
  organization,
  distance
}: OrderDetailsSectionProps) => {
  // Example requirements with icons mapped to specific requirement types
  const orderRequirements = [
    {
      id: 1,
      name: "Package size",
      icon: <Package className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 2,
      name: "Transport type",
      icon: <Truck className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 3,
      name: "Schedule type",
      icon: <CalendarClock className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 4,
      name: "Scheduled time",
      icon: <Clock className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 5,
      name: "Timezone",
      icon: <Globe className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 6,
      name: "Inserted date",
      icon: <Calendar className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 7,
      name: "Custom dimensions (L×W×H)",
      icon: <Ruler className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 8,
      name: "Weight",
      icon: <Weight className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 9,
      name: "Distance",
      icon: <Route className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    },
    {
      id: 10,
      name: "Delivery time",
      icon: <Clock className="h-4 w-4 text-primary shrink-0 mr-2" />,
      active: true
    }
  ];

  return <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <CalendarClock className="w-4 h-4 mr-2" />
        Order Details
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
        
        <div className="pt-3 border-t border-border/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <FileCheck className="w-4 h-4 mr-2 text-primary" />
              <p className="text-sm font-medium">Order Requirements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {orderRequirements.map(req => <div key={req.id} className="flex items-center p-2 transition-colors">
                {req.icon}
                <span className="text-xs font-medium">
                  {req.name}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
