import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Calendar, 
  FileText, 
  Car,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { ExtraServicesSection } from "@/components/deliveries/order-details/ExtraServicesSection";

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  hireStatus: string;
  transports: string[];
  rating: number;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  zipcode: string;
  address: string;
  notes: string;
  profileTypes?: string[];
}

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
}

export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus
}: DriverDetailsSheetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState<Driver | null>(null);

  React.useEffect(() => {
    if (driver) {
      setEditedDriver({ ...driver });
    }
  }, [driver]);

  if (!driver || !editedDriver) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false);
    toast.success("Driver profile updated successfully");
  };

  const handleCancel = () => {
    setEditedDriver({ ...driver });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Driver, value: string | number) => {
    setEditedDriver(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl w-full overflow-hidden p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold">Driver Profile</SheetTitle>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancel}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedDriver.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium">{driver.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedDriver.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm">{driver.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedDriver.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm">{driver.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipcode">Zipcode</Label>
                    {isEditing ? (
                      <Input
                        id="zipcode"
                        value={editedDriver.zipcode}
                        onChange={(e) => handleInputChange('zipcode', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm">{driver.zipcode}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editedDriver.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm">{driver.address}</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Status Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Status Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    {renderStatus(driver.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Hire Status</Label>
                    <Badge variant="outline">
                      {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Stripe Status</Label>
                    {renderStripeStatus(driver.stripeStatus)}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{driver.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Transport Types */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Transport Types
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {driver.transports.map((transportId) => (
                    <Badge key={transportId} variant="secondary" className="flex items-center gap-2">
                      <TransportIcon 
                        transportType={transportId as TransportType} 
                        size={14} 
                        className="h-3.5 w-3.5" 
                      />
                      {transportTypes[transportId] || transportId}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Profile Types */}
              {driver.profileTypes && driver.profileTypes.length > 0 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Types
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {driver.profileTypes.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                </>
              )}

              {/* Extra Services Section */}
              <ExtraServicesSection />

              <Separator />

              {/* Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </h3>
                
                {isEditing ? (
                  <Textarea
                    value={editedDriver.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add notes about this driver..."
                    rows={4}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {driver.notes || "No notes available"}
                  </p>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
