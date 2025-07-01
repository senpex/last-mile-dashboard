
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExtraServicesSection } from "@/components/deliveries/order-details/ExtraServicesSection";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Calendar,
  FileText,
  Package,
  DollarSign,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (status: string) => JSX.Element;
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
  const [editedDriver, setEditedDriver] = useState(driver || {});

  if (!driver) return null;

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Driver profile updated successfully");
  };

  const handleCancel = () => {
    setEditedDriver(driver);
    setIsEditing(false);
  };

  // Mock documents data
  const documents = [
    { id: 1, name: "Driver's License", type: "PDF", uploadDate: "2024-01-15", status: "verified" },
    { id: 2, name: "Insurance Certificate", type: "PDF", uploadDate: "2024-01-10", status: "pending" },
    { id: 3, name: "Vehicle Registration", type: "PDF", uploadDate: "2024-01-05", status: "verified" }
  ];

  // Mock earnings data
  const earnings = {
    thisWeek: 1250.50,
    thisMonth: 4800.75,
    totalEarnings: 28940.25,
    pendingPayouts: 350.00
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-4xl w-full overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Driver Profile</SheetTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">Edit Profile</Button>
              )}
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="services">Extra Services</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={isEditing ? editedDriver.name : driver.name}
                      onChange={(e) => setEditedDriver({...editedDriver, name: e.target.value})}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedDriver.email : driver.email}
                      onChange={(e) => setEditedDriver({...editedDriver, email: e.target.value})}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedDriver.phone : driver.phone}
                      onChange={(e) => setEditedDriver({...editedDriver, phone: e.target.value})}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipcode">Zipcode</Label>
                    <Input
                      id="zipcode"
                      value={isEditing ? editedDriver.zipcode : driver.zipcode}
                      onChange={(e) => setEditedDriver({...editedDriver, zipcode: e.target.value})}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={isEditing ? editedDriver.address : driver.address}
                    onChange={(e) => setEditedDriver({...editedDriver, address: e.target.value})}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={isEditing ? editedDriver.notes : driver.notes}
                    onChange={(e) => setEditedDriver({...editedDriver, notes: e.target.value})}
                    readOnly={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status & Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <Label>Stripe Status</Label>
                    <div className="mt-1">
                      {renderStripeStatus(driver.stripeStatus)}
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{driver.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transport Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {driver.transports?.map((transportId: string) => (
                    <Badge key={transportId} variant="secondary">
                      {transportTypes[transportId] || `Transport ${transportId}`}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {driver.profileTypes?.map((type: string) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.type} • Uploaded {doc.uploadDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === 'verified' ? 'default' : doc.status === 'pending' ? 'secondary' : 'destructive'}>
                          {doc.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${earnings.thisWeek.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${earnings.thisMonth.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${earnings.totalEarnings.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${earnings.pendingPayouts.toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <ExtraServicesSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Activity History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Activity history will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DriverDetailsSheet;
