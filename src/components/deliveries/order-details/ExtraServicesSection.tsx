
import React, { useState } from 'react';
import { Package, Edit, Save, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExtraService {
  id: string;
  name: string;
  price: string;
  courierEarning: string;
  units: string;
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
      units: '2'
    },
    {
      id: '2', 
      name: 'White Gloves Service',
      price: '25.00',
      courierEarning: '20.00',
      units: '1'
    }
  ]);
  const [editedServices, setEditedServices] = useState<ExtraService[]>(services);

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
            <div className="flex items-center">
              <h4 className="text-sm font-medium text-gray-700">{service.name}</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor={`units-${service.id}`} className="text-xs font-medium">Units</Label>
                <Input 
                  id={`units-${service.id}`}
                  type="text" 
                  value={service.units}
                  readOnly={!isEditing}
                  onChange={(e) => handleServiceChange(service.id, 'units', e.target.value)}
                  className={`h-8 text-sm ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
