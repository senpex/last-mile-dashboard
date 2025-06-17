
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  Calendar, 
  Star, 
  DollarSign, 
  Truck,
  Shield,
  Clock,
  FileText,
  Activity,
  CreditCard,
  MessageSquare
} from "lucide-react";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  vehicle: string;
  rating: number;
  totalDeliveries: number;
  earnings: number;
  joinDate: string;
  location: string;
  documents?: {
    driverLicense: { status: string; expiryDate: string };
    insurance: { status: string; expiryDate: string };
    vehicleRegistration: { status: string; expiryDate: string };
    backgroundCheck: { status: string; date: string };
  };
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  twoStepVerification: boolean;
  driverControl: boolean;
  planning: boolean;
  banned: boolean;
}

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

export const DriverDetailsSheet = ({ isOpen, onClose, driver }: DriverDetailsSheetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState<Driver | null>(null);

  if (!driver) return null;

  const currentDriver = editedDriver || driver;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDriver({ ...driver });
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditedDriver(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDriver(null);
  };

  const updateField = (field: string, value: any) => {
    if (editedDriver) {
      setEditedDriver({ ...editedDriver, [field]: value });
    }
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    if (editedDriver) {
      setEditedDriver({
        ...editedDriver,
        [parent]: {
          ...(editedDriver[parent as keyof Driver] as object || {}),
          [field]: value
        }
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-left text-lg">Driver Profile - {currentDriver.name}</SheetTitle>
          </div>
        </SheetHeader>

        <Tabs defaultValue="driver-info" className="flex-1 flex flex-col">
          <TabsList className="mx-6 mb-2">
            <TabsTrigger value="driver-info" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Driver Info
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="driver-info" className="m-0 h-full">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-6 space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <p className="mt-1 text-sm">{currentDriver.name}</p>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <p className="mt-1 text-sm">{currentDriver.email}</p>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <p className="mt-1 text-sm">{currentDriver.phone}</p>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <p className="mt-1 text-sm">{currentDriver.location || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vehicle Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        Vehicle Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="vehicle">Vehicle Type</Label>
                        <p className="mt-1 text-sm">{currentDriver.vehicle || 'N/A'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status & Rating */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Status & Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Status</Label>
                          <Badge variant={currentDriver.status === 'Active' ? 'default' : 'secondary'} className="mt-1">
                            {currentDriver.status}
                          </Badge>
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{currentDriver.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Two Step Verification</Label>
                          <p className="mt-1 text-sm">{currentDriver.twoStepVerification ? "Yes" : "No"}</p>
                        </div>

                        <div>
                          <Label>Driver Control</Label>
                          <p className="mt-1 text-sm">{currentDriver.driverControl ? "Yes" : "No"}</p>
                        </div>

                        <div>
                          <Label>Planning</Label>
                          <p className="mt-1 text-sm">{currentDriver.planning ? "Yes" : "No"}</p>
                        </div>

                        <div>
                          <Label>Banned</Label>
                          <p className="mt-1 text-sm">{currentDriver.banned ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documents */}
                  {currentDriver.documents && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Documents
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Driver License</Label>
                            <div className="flex items-center justify-between">
                              <Badge variant={currentDriver.documents.driverLicense.status === 'Verified' ? 'default' : 'secondary'}>
                                {currentDriver.documents.driverLicense.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Expires: {currentDriver.documents.driverLicense.expiryDate}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Insurance</Label>
                            <div className="flex items-center justify-between">
                              <Badge variant={currentDriver.documents.insurance.status === 'Verified' ? 'default' : 'secondary'}>
                                {currentDriver.documents.insurance.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Expires: {currentDriver.documents.insurance.expiryDate}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Vehicle Registration</Label>
                            <div className="flex items-center justify-between">
                              <Badge variant={currentDriver.documents.vehicleRegistration.status === 'Verified' ? 'default' : 'secondary'}>
                                {currentDriver.documents.vehicleRegistration.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Expires: {currentDriver.documents.vehicleRegistration.expiryDate}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Background Check</Label>
                            <div className="flex items-center justify-between">
                              <Badge variant={currentDriver.documents.backgroundCheck.status === 'Verified' ? 'default' : 'secondary'}>
                                {currentDriver.documents.backgroundCheck.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Date: {currentDriver.documents.backgroundCheck.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Bank Details */}
                  {currentDriver.bankDetails && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Bank Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <p className="mt-1 text-sm">{currentDriver.bankDetails.bankName}</p>
                          </div>
                          <div>
                            <Label htmlFor="account-number">Account Number</Label>
                            <p className="mt-1 text-sm">****{currentDriver.bankDetails.accountNumber.slice(-4)}</p>
                          </div>
                          <div>
                            <Label htmlFor="routing-number">Routing Number</Label>
                            <p className="mt-1 text-sm">{currentDriver.bankDetails.routingNumber}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="logs" className="m-0 h-full">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-6 space-y-6">
                  {/* Activity Log */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Activity Log
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Delivery completed</p>
                            <p className="text-xs text-muted-foreground">Order #12345 - 2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Started delivery</p>
                            <p className="text-xs text-muted-foreground">Order #12345 - 3 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Accepted order</p>
                            <p className="text-xs text-muted-foreground">Order #12345 - 4 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Delivery History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Order #12345</p>
                            <p className="text-xs text-muted-foreground">Delivered 2 hours ago</p>
                          </div>
                          <Badge variant="default">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Order #12344</p>
                            <p className="text-xs text-muted-foreground">Delivered 1 day ago</p>
                          </div>
                          <Badge variant="default">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Order #12343</p>
                            <p className="text-xs text-muted-foreground">Cancelled 2 days ago</p>
                          </div>
                          <Badge variant="destructive">Cancelled</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Communication Log */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Communication Log
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Message sent to customer</p>
                            <p className="text-xs text-muted-foreground">"I'm on my way to pickup location" - 3 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Call made to dispatcher</p>
                            <p className="text-xs text-muted-foreground">Duration: 2:30 - 5 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-6 border-t">
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
