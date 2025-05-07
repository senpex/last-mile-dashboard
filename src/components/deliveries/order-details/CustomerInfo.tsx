
import React from 'react';
import { User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerInfoProps {
  customerName: string;
  organization?: string;
}

export const CustomerInfo = ({ customerName, organization }: CustomerInfoProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Customer
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">{customerName}</p>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <MessageSquare className="w-3 h-3 mr-2" />
            Send message
          </Button>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-700">Company: </span>
            <span className="text-sm ml-1">{organization || "Not specified"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
