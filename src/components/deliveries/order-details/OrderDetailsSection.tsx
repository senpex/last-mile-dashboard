
import React from 'react';
import { CalendarClock, FileCheck, CheckCircle2, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsSectionProps {
  organization: string | undefined;
  distance: string;
}

export const OrderDetailsSection = ({ organization, distance }: OrderDetailsSectionProps) => {
  // Example requirements - in a real app, these would come from props
  const orderRequirements = [
    { id: 1, name: "Alcohol delivery license", active: true },
    { id: 2, name: "Hazmat delivery license", active: false },
    { id: 3, name: "Pharmacy delivery license", active: true },
    { id: 4, name: "Recipient verification code", active: true },
    { id: 5, name: "Proof of delivery", active: true },
    { id: 6, name: "Signature from recipient", active: false },
    { id: 7, name: "Items to be scanned at the pick-up and drop-offs", active: true }
  ];

  return (
    <div>
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
        
        <div className="pt-2 border-t border-border/40">
          <div className="flex items-center mb-2">
            <FileCheck className="w-4 h-4 mr-2 text-muted-foreground" />
            <p className="text-sm font-medium">Order Requirements</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {orderRequirements.map((req) => (
              <Badge 
                key={req.id} 
                variant={req.active ? "default" : "outline"}
                className="flex items-center gap-1 text-xs py-1"
              >
                {req.active && <CheckCircle2 className="h-3 w-3" />}
                {req.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
