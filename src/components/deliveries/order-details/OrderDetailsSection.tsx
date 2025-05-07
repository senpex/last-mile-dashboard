
import React from 'react';
import { CalendarClock, FileCheck, ShieldCheck, Signature, Scan } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface OrderDetailsSectionProps {
  organization: string | undefined;
  distance: string;
}

export const OrderDetailsSection = ({ organization, distance }: OrderDetailsSectionProps) => {
  // Example requirements - in a real app, these would come from props
  const orderRequirements = [
    { id: 1, name: "Alcohol delivery license", active: true, icon: ShieldCheck },
    { id: 2, name: "Hazmat delivery license", active: false, icon: ShieldCheck },
    { id: 3, name: "Pharmacy delivery license", active: true, icon: ShieldCheck },
    { id: 4, name: "Recipient verification code", active: true, icon: FileCheck },
    { id: 5, name: "Proof of delivery", active: true, icon: FileCheck },
    { id: 6, name: "Signature from recipient", active: false, icon: Signature },
    { id: 7, name: "Items to be scanned at the pick-up and drop-offs", active: true, icon: Scan }
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
        
        <div className="pt-3 border-t border-border/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <FileCheck className="w-4 h-4 mr-2 text-primary" />
              <p className="text-sm font-medium">Order Requirements</p>
            </div>
            <Badge variant="secondary" className="text-xs">Client Selected</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {orderRequirements.map((req) => {
              const IconComponent = req.icon;
              return (
                <div 
                  key={req.id} 
                  className={`flex items-center p-2 rounded-md border ${
                    req.active ? 'bg-secondary/30 border-primary' : 'bg-muted/10 border-muted/30'
                  } transition-colors`}
                >
                  <IconComponent className={`h-4 w-4 shrink-0 mr-2 ${req.active ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs ${req.active ? 'font-medium' : 'text-muted-foreground'}`}>
                    {req.name}
                  </span>
                </div>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 italic">
            Requirements are specified by the client and may be combined in various ways
          </p>
        </div>
      </div>
    </div>
  );
};
