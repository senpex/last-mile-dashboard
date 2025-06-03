
import React from 'react';
import { FileCheck, CheckCircle2 } from "lucide-react";

export const OrderRequirementsSection = () => {
  // Example requirements - in a real app, these would come from props
  const orderRequirements = [{
    id: 1,
    name: "Alcohol delivery license",
    active: true
  }, {
    id: 2,
    name: "Hazmat delivery license",
    active: true
  }, {
    id: 3,
    name: "Pharmacy delivery license",
    active: true
  }, {
    id: 4,
    name: "Recipient verification code",
    active: true
  }, {
    id: 5,
    name: "Proof of delivery",
    active: true
  }, {
    id: 6,
    name: "Signature from recipient",
    active: true
  }, {
    id: 7,
    name: "Items to be scanned at the pick-up and drop-offs",
    active: true
  }];

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <FileCheck className="w-4 h-4 mr-2 text-primary" />
        Order Requirements
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {orderRequirements.map(req => (
            <div key={req.id} className="flex items-center p-2 transition-colors">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mr-2" />
              <span className="text-xs font-medium">
                {req.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
