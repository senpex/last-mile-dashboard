
import React, { useState } from 'react';
import { CalendarClock, Edit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrderDetailsSectionProps {
  organization: string | undefined;
  distance: string;
}

export const OrderDetailsSection = ({
  organization,
  distance
}: OrderDetailsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    totalChargePrice: "$24.50",
    courierEarnings: "$18.00",
    totalTip: "$5.00",
    serviceFee: "$2.50",
    insuranceFee: "$1.00",
    taxFee: "$2.20",
    taxPercentage: "8.25%",
    itemValue: "$85.00"
  });

  const handleInputChange = (field: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <CalendarClock className="w-4 h-4 mr-2" />
          Price Details
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="h-7 px-2"
        >
          <Edit className="w-3 h-3 mr-1" />
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="total-charge-price" className="text-xs font-medium">Total charge price</Label>
            <Input 
              id="total-charge-price" 
              type="text" 
              value={values.totalChargePrice} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('totalChargePrice', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courier-earnings" className="text-xs font-medium">Courier earnings</Label>
            <Input 
              id="courier-earnings" 
              type="text" 
              value={values.courierEarnings} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('courierEarnings', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-tip" className="text-xs font-medium">Total tip</Label>
            <Input 
              id="total-tip" 
              type="text" 
              value={values.totalTip} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('totalTip', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-fee" className="text-xs font-medium">Service fee</Label>
            <Input 
              id="service-fee" 
              type="text" 
              value={values.serviceFee} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('serviceFee', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-fee" className="text-xs font-medium">Insurance fee</Label>
            <Input 
              id="insurance-fee" 
              type="text" 
              value={values.insuranceFee} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('insuranceFee', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-fee" className="text-xs font-medium">Tax fee</Label>
            <Input 
              id="tax-fee" 
              type="text" 
              value={values.taxFee} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('taxFee', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-percentage" className="text-xs font-medium">Tax %</Label>
            <Input 
              id="tax-percentage" 
              type="text" 
              value={values.taxPercentage} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('taxPercentage', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-value" className="text-xs font-medium">Item value</Label>
            <Input 
              id="item-value" 
              type="text" 
              value={values.itemValue} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('itemValue', e.target.value)}
              className="h-8 text-sm" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
