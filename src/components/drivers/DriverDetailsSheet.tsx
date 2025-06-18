
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  FileText, 
  Edit, 
  Save, 
  X, 
  CreditCard,
  Building,
  Hash,
  Calendar,
  Info
} from "lucide-react";
import { toast } from "sonner";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any | null;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (status: string) => React.ReactNode;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => React.ReactNode;
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
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(driver?.notes || "");

  if (!driver) return null;

  const handleEditNotes = () => {
    setIsEditingNotes(true);
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    toast.success("Driver notes updated successfully");
  };

  const handleCancelNotes = () => {
    setEditedNotes(driver.notes || "");
    setIsEditingNotes(false);
  };

  const getTransportIcon = (transportId: string) => {
    const iconMap: { [key: string]: TransportType } = {
      'helper': 'helper',
      'car': 'car', 
      'suv': 'suv',
      'pickup_truck': 'pickup_truck',
      '9ft_cargo_van': '9ft_cargo_van',
      '10ft_box_truck': '10ft_box_truck',
      '15ft_box_truck': '15ft_box_truck',
      '17ft_box_truck': '17ft_box_truck',
      'refrigerated_van': 'refrigerated_van'
    };
    
    const transportType = iconMap[transportId] || 'car';
    return <TransportIcon transportType={transportType} size={16} />;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Driver Details - {driver.name}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={driver.name} readOnly />
                  </div>
                  <div>
                    <Label>Driver ID</Label>
                    <Input value={driver.id} readOnly />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </Label>
                    <Input value={driver.email} readOnly />
                  </div>
                  <div>
                    <Label className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Phone
                    </Label>
                    <Input value={driver.phone} readOnly />
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Address
                  </Label>
                  <Input value={driver.address} readOnly />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Zipcode</Label>
                    <Input value={driver.zipcode} readOnly />
                  </div>
                  <div>
                    <Label className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Rating
                    </Label>
                    <Input value={driver.rating?.toFixed(1)} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Hire Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Status</Label>
                    <div className="mt-1">
                      {renderStatus(driver.status)}
                    </div>
                  </div>
                  <div>
                    <Label>Hire Status</Label>
                    <div className="mt-1">
                      <Badge variant="outline">
                        {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Stripe Status</Label>
                    <div className="mt-1">
                      {renderStripeStatus(driver.stripeStatus)}
                    </div>
                  </div>
                  <div>
                    <Label>Profile Types</Label>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {driver.profileTypes?.map((type: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transport Types */}
            <Card>
              <CardHeader>
                <CardTitle>Transport Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {driver.transports?.map((transportId: string, index: number) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {getTransportIcon(transportId)}
                      {transportTypes[transportId] || transportId}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditingNotes ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs flex items-center gap-1 border-green-500 text-green-700 hover:bg-green-50"
                          onClick={handleSaveNotes}
                        >
                          <Save className="h-3 w-3" />
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs flex items-center gap-1 border-red-500 text-red-700 hover:bg-red-50"
                          onClick={handleCancelNotes}
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
                        onClick={handleEditNotes}
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingNotes ? (
                  <Textarea 
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Enter notes for this driver..."
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {editedNotes || "No notes available for this driver."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Info Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date Joined</Label>
                    <Input value="March 15, 2024" readOnly />
                  </div>
                  <div>
                    <Label>Last Active</Label>
                    <Input value="2 hours ago" readOnly />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Deliveries</Label>
                    <Input value="127" readOnly />
                  </div>
                  <div>
                    <Label>Completion Rate</Label>
                    <Input value="98.4%" readOnly />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Average Response Time</Label>
                    <Input value="3.2 minutes" readOnly />
                  </div>
                  <div>
                    <Label>Preferred Zone</Label>
                    <Input value="Downtown Area" readOnly />
                  </div>
                </div>

                <div>
                  <Label>Emergency Contact</Label>
                  <Input value="(555) 123-4567 - Sarah Johnson (Spouse)" readOnly />
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
