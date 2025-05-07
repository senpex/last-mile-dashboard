
import React from 'react';
import { Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourierInfoProps {
  courier: string | undefined;
}

export const CourierInfo = ({ courier }: CourierInfoProps) => {
  if (!courier) return null;
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Truck className="w-4 h-4 mr-2" />
        Courier info
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <p className="text-sm font-medium">{courier}</p>
        <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
          <Phone className="w-3 h-3 mr-2" />
          Contact Courier
        </Button>
      </div>
    </div>
  );
};
