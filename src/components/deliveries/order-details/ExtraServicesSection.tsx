
import React, { useState } from 'react';
import { Package, Edit, Save, X, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ExtraService {
  id: string;
  name: string;
  price: string;
  courierEarning: string;
  units: string;
  unitType: 'minutes' | 'quantity';
}

interface ExtraServicesSectionProps {
  onSave?: (services: ExtraService[]) => void;
}

export const ExtraServicesSection = ({ onSave }: ExtraServicesSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState<ExtraService[]>([
    {
      id: '1',
      name: 'Packing and Unpacking',
      price: '15.00',
      courierEarning: '12.00',
      units: '2',
      unitType: 'quantity'
    },
    {
      id: '2', 
      name: 'White Gloves Service',
      price: '25.00',
      courierEarning: '20.00',
      units: '15 minutes',
      unitType: 'minutes'
    }
  ]);
  const [editedServices, setEditedServices] = useState<ExtraService[]>(services);

  // Generate minutes options from 15 minutes to 6 hours (360 minutes) in 15-minute increments
  const generateMinutesOptions = () => {
    const options = [];
    for (let i = 15; i <= 360; i += 15) {
      if (i < 60) {
        options.push(`${i} minutes`);
      } else {
        const hours = Math.floor(i / 60);
        const remainingMinutes = i % 60;
        if (remainingMinutes === 0) {
          options.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        } else {
          options.push(`${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`);
        }
      }
    }
    return options;
  };

  // Generate quantity options from 1 to 10
  const generateQuantityOptions = () => {
    return Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setServices(editedServices);
    setIsEditing(false);
    if (onSave) {
      onSave(editedServices);
    }
    toast.success("Extra services updated successfully");
  };

  const handleCancel = () => {
    setEditedServices(services);
    setIsEditing(false);
  };

  const handleServiceChange = (serviceId: string, field: string, value: string) => {
    setEditedServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, [field]: value }
          : service
      )
    );
  };

  const handleDeleteService = (serviceId: string) => {
    setEditedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleUnitTypeChange = (serviceId: string, unitType: 'minutes' | 'quantity') => {
    setEditedServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              unitType, 
              units: unitType === 'minutes' ? '15 minutes' : '1'
            }
          : service
      )
    );
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <Package className="w-4 h-4 mr-2" />
          Extra Services
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1"
                onClick={handleSave}
              >
                <Save className="h-3 w-3" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1"
                onClick={handleCancel}
              >
                <X className="h-3 w-3" />
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1"
              onClick={handleEdit}
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
      </h3>
      <div className="rounded-md border bg-card/50 p-4 space-y-4">
        {(isEditing ? editedServices : services).map((service) => (
          <div key={service.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">{service.name}</h4>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteService(service.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`price-${service.id}`} className="text-xs font-medium">Price</Label>
                <Input 
                  id={`price-${service.id}`}
                  type="text" 
                  value={service.price}
                  readOnly={!isEditing}
                  onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                  className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`courier-earning-${service.id}`} className="text-xs font-medium">Courier Earning</Label>
                <Input 
                  id={`courier-earning-${service.id}`}
                  type="text" 
                  value={service.courierEarning}
                  readOnly={!isEditing}
                  onChange={(e) => handleServiceChange(service.id, 'courierEarning', e.target.value)}
                  className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`units-${service.id}`} className="text-xs font-medium">Units</Label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Select 
                      value={service.unitType} 
                      onValueChange={(value: 'minutes' | 'quantity') => handleUnitTypeChange(service.id, value)}
                    >
                      <SelectTrigger className="h-8 text-sm flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="quantity">Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select 
                      value={service.units} 
                      onValueChange={(value) => handleServiceChange(service.id, 'units', value)}
                    >
                      <SelectTrigger className="h-8 text-sm flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {service.unitType === 'minutes' 
                          ? generateMinutesOptions().map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))
                          : generateQuantityOptions().map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <Input 
                    id={`units-${service.id}`}
                    type="text" 
                    value={service.units}
                    readOnly
                    className="h-8 text-sm bg-muted/50"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
