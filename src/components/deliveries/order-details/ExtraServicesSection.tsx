import React, { useState } from 'react';
import { Package, Edit, Save, X } from "lucide-react";
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

  const [allServices] = useState<ExtraService[]>([
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
    },
    {
      id: '3',
      name: 'Furniture Assembly and Disassembly',
      price: '60.00',
      courierEarning: '42.00',
      units: '15 minutes',
      unitType: 'minutes'
    },
    {
      id: '4',
      name: 'Appliance Dolly',
      price: '18.00',
      courierEarning: '14.40',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '5',
      name: 'Blankets',
      price: '18.00',
      courierEarning: '14.40',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '6',
      name: 'Food Catering Setup',
      price: '31.50',
      courierEarning: '22.50',
      units: '0',
      unitType: 'minutes'
    },
    {
      id: '7',
      name: 'White gloves service',
      price: '31.50',
      courierEarning: '18.00',
      units: '0',
      unitType: 'minutes'
    },
    {
      id: '8',
      name: 'Waiting on the line',
      price: '27.00',
      courierEarning: '18.90',
      units: '0',
      unitType: 'minutes'
    },
    {
      id: '9',
      name: 'Temperature Controlled Coolers',
      price: '27.00',
      courierEarning: '18.90',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '10',
      name: 'Special Handling',
      price: '17.00',
      courierEarning: '9.50',
      units: '0',
      unitType: 'minutes'
    },
    {
      id: '11',
      name: 'Insulated Bag',
      price: '7.20',
      courierEarning: '4.50',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '12',
      name: 'Parking fee',
      price: '10.00',
      courierEarning: '10.00',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '13',
      name: '4x7 Utility Trailer',
      price: '85.00',
      courierEarning: '21.00',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '14',
      name: '6x12 Utility Trailer',
      price: '120.00',
      courierEarning: '30.00',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '15',
      name: 'Liftgate',
      price: '160.00',
      courierEarning: '60.00',
      units: '0',
      unitType: 'quantity'
    },
    {
      id: '16',
      name: 'Pallet jack',
      price: '0.00',
      courierEarning: '0.00',
      units: '0',
      unitType: 'quantity'
    }
  ]);

  const [editedServices, setEditedServices] = useState<ExtraService[]>(allServices);

  // Generate minutes options from 15 minutes to 6 hours (360 minutes) in 15-minute increments
  const generateMinutesOptions = () => {
    const options = ['0'];
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

  // Generate quantity options from 0 to 10
  const generateQuantityOptions = () => {
    return Array.from({ length: 11 }, (_, i) => i.toString());
  };

  const handleEdit = () => {
    setEditedServices(allServices);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Filter services with units > 0 for display in normal view
    const servicesWithValues = editedServices.filter(service => {
      const unitValue = service.unitType === 'minutes' 
        ? (service.units === '0' ? 0 : 1) 
        : parseInt(service.units) || 0;
      return unitValue > 0;
    });
    
    setServices(servicesWithValues);
    setIsEditing(false);
    if (onSave) {
      onSave(servicesWithValues);
    }
    toast.success("Extra services updated successfully");
  };

  const handleCancel = () => {
    setEditedServices(allServices);
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

  const handleUnitTypeChange = (serviceId: string, unitType: 'minutes' | 'quantity') => {
    setEditedServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              unitType, 
              units: unitType === 'minutes' ? '0' : '0'
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
      <div className="rounded-md border bg-card/50 p-4 space-y-3">
        {(isEditing ? editedServices : services).map((service) => (
          <div key={service.id} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{service.name}</h4>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <Label htmlFor={`price-${service.id}`} className="text-xs font-medium w-16 shrink-0">Price:</Label>
                <Input 
                  id={`price-${service.id}`}
                  type="text" 
                  value={service.price}
                  readOnly={!isEditing}
                  onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                  className={`h-8 text-sm flex-1 ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
                />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <Label htmlFor={`courier-earning-${service.id}`} className="text-xs font-medium w-20 shrink-0">Courier fee:</Label>
                <Input 
                  id={`courier-earning-${service.id}`}
                  type="text" 
                  value={service.courierEarning}
                  readOnly={!isEditing}
                  onChange={(e) => handleServiceChange(service.id, 'courierEarning', e.target.value)}
                  className={`h-8 text-sm flex-1 ${!isEditing ? 'bg-muted/50' : 'bg-background'}`}
                />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <Label htmlFor={`units-${service.id}`} className="text-xs font-medium w-12 shrink-0">Units:</Label>
                {isEditing ? (
                  <div className="flex gap-2 flex-1">
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
                    className="h-8 text-sm bg-muted/50 flex-1"
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
