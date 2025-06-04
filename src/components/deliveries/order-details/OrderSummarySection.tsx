
import React, { useState } from 'react';
import { MapPin, Edit, Save, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TransportIcon from "@/components/icons/TransportIcon";
import { toast } from "sonner";

interface OrderSummarySectionProps {
  distance?: string;
  transportType?: string;
  packageType?: string;
  estimatedRouteTime?: string;
  parkingLot?: string;
  returnParkingLot?: string;
}

export const OrderSummarySection = ({
  distance = "3.2 miles",
  transportType = "9ft_cargo_van",
  packageType = "Standard Package",
  estimatedRouteTime = "25 minutes",
  parkingLot = "Main Street Parking",
  returnParkingLot = "Warehouse Lot B"
}: OrderSummarySectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    distance,
    transportType,
    packageType,
    estimatedRouteTime,
    parkingLot,
    returnParkingLot,
    customLength: "",
    customWidth: "",
    customHeight: "",
    customWeight: ""
  });

  const transportTypes = [
    { value: 'helper', label: 'Helper' },
    { value: 'car', label: 'Car' },
    { value: 'suv', label: 'SUV' },
    { value: 'pickup_truck', label: 'Pickup Truck' },
    { value: '9ft_cargo_van', label: '9ft Cargo Van' },
    { value: '10ft_box_truck', label: '10ft Box Truck' },
    { value: '15ft_box_truck', label: '15ft Box Truck' },
    { value: '17ft_box_truck', label: '17ft Box Truck' },
    { value: 'refrigerated_van', label: 'Refrigerated Van' }
  ];

  const packageTypes = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
    { value: 'Extra Large', label: 'Extra Large' },
    { value: 'Custom Size', label: 'Custom Size' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Order summary updated successfully");
  };

  const handleCancel = () => {
    setEditedValues({
      distance,
      transportType,
      packageType,
      estimatedRouteTime,
      parkingLot,
      returnParkingLot,
      customLength: "",
      customWidth: "",
      customHeight: "",
      customWeight: ""
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedValues(prev => ({ ...prev, [field]: value }));
  };

  const isCustomSize = editedValues.packageType === 'Custom Size';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Order Summary
        </h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="h-7 px-2"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="h-7 px-2"
            >
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="h-7 px-2"
            >
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distance" className="text-xs font-medium">Distance</Label>
            <Input 
              id="distance" 
              type="text" 
              value={isEditing ? editedValues.distance : distance}
              onChange={(e) => handleInputChange('distance', e.target.value)}
              readOnly={!isEditing}
              className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transport-type" className="text-xs font-medium">Transport type</Label>
            {isEditing ? (
              <Select value={editedValues.transportType} onValueChange={(value) => handleInputChange('transportType', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {transportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <TransportIcon transportType={type.value as any} size={16} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-2 h-8 px-3 rounded-md border bg-muted/50">
                <TransportIcon transportType={transportType as any} size={16} />
                <span className="text-sm">{transportType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="package-type" className="text-xs font-medium">Package type</Label>
            {isEditing ? (
              <Select value={editedValues.packageType} onValueChange={(value) => handleInputChange('packageType', value)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {packageTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input 
                id="package-type" 
                type="text" 
                value={packageType} 
                readOnly
                className="h-8 text-sm bg-muted/50" 
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated-route-time" className="text-xs font-medium">Estimated route time</Label>
            <Input 
              id="estimated-route-time" 
              type="text" 
              value={isEditing ? editedValues.estimatedRouteTime : estimatedRouteTime}
              onChange={(e) => handleInputChange('estimatedRouteTime', e.target.value)}
              readOnly={!isEditing}
              className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parking-lot" className="text-xs font-medium">Parking lot</Label>
            <Input 
              id="parking-lot" 
              type={isEditing ? "text" : "text"}
              value={isEditing ? editedValues.parkingLot : parkingLot}
              onChange={(e) => handleInputChange('parkingLot', e.target.value)}
              readOnly={!isEditing}
              className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              style={{ MozAppearance: 'textfield' }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="return-parking-lot" className="text-xs font-medium">Return parking lot</Label>
            <Input 
              id="return-parking-lot" 
              type={isEditing ? "text" : "text"}
              value={isEditing ? editedValues.returnParkingLot : returnParkingLot}
              onChange={(e) => handleInputChange('returnParkingLot', e.target.value)}
              readOnly={!isEditing}
              className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              style={{ MozAppearance: 'textfield' }}
            />
          </div>
        </div>
        
        {/* Custom Size Fields */}
        {isEditing && isCustomSize && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Custom Size Details</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="custom-length" className="text-xs font-medium">Length</Label>
                <Input 
                  id="custom-length" 
                  type="text" 
                  value={editedValues.customLength}
                  onChange={(e) => handleInputChange('customLength', e.target.value)}
                  placeholder="Length"
                  className="h-8 text-sm bg-background [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  style={{ MozAppearance: 'textfield' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-width" className="text-xs font-medium">Width</Label>
                <Input 
                  id="custom-width" 
                  type="text" 
                  value={editedValues.customWidth}
                  onChange={(e) => handleInputChange('customWidth', e.target.value)}
                  placeholder="Width"
                  className="h-8 text-sm bg-background [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  style={{ MozAppearance: 'textfield' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-height" className="text-xs font-medium">Height</Label>
                <Input 
                  id="custom-height" 
                  type="text" 
                  value={editedValues.customHeight}
                  onChange={(e) => handleInputChange('customHeight', e.target.value)}
                  placeholder="Height"
                  className="h-8 text-sm bg-background [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  style={{ MozAppearance: 'textfield' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-weight" className="text-xs font-medium">Weight</Label>
                <Input 
                  id="custom-weight" 
                  type="text" 
                  value={editedValues.customWeight}
                  onChange={(e) => handleInputChange('customWeight', e.target.value)}
                  placeholder="Weight"
                  className="h-8 text-sm bg-background [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  style={{ MozAppearance: 'textfield' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
