import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Phone, Mail, Edit, Save, X } from "lucide-react";
import { DriverLicense } from "./driver-details/DriverLicense";
import { InsurancePolicy } from "./driver-details/InsurancePolicy";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "suspended";
  vehicleType: string;
  location: string;
  rating: number;
  totalDeliveries: number;
  joinDate: string;
  avatar?: string;
  documents?: {
    driverLicense?: string;
    insurance?: string;
  };
}

interface DriverDetailsSheetProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
}

const mockDriverData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    address: "123 Main St, Anytown, CA 90210"
  },
  vehicleInfo: {
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Blue",
    licensePlate: "ABC123",
    vin: "1HGBH41JXMN109186"
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543"
  },
  bankingInfo: {
    accountHolderName: "John Doe",
    routingNumber: "123456789",
    accountNumber: "987654321"
  },
  // New fields for documents
  licenseId: "DL123456789",
  licenseExpiration: "2025-12-31",
  licenseState: "CA",
  ssn: "***-**-1234",
  policyNumber: "POL123456789",
  policyExpiration: "2025-06-30"
};

export function DriverDetailsSheet({ driver, isOpen, onClose }: DriverDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [driverData, setDriverData] = useState(mockDriverData);

  const handleDataChange = (field: string, value: any) => {
    setDriverData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedDataChange = (section: string, field: string, value: any) => {
    setDriverData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving driver data:', driverData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data if needed
    setDriverData(mockDriverData);
    setIsEditing(false);
  };

  useEffect(() => {
    if (driver) {
      // You might want to fetch the driver data here based on the driver.id
      // For now, we'll just use the mock data
      // setDriverData(mockDriverData);
    }
  }, [driver]);

  if (!driver) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-xl font-bold">{driver.name}</SheetTitle>
            <SheetDescription>Driver Details and Information</SheetDescription>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.email}</div>
                    <p className="text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2 inline-block" />
                      {driver.email}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.phone}</div>
                    <p className="text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2 inline-block" />
                      {driver.phone}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.location}</div>
                    <p className="text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 inline-block" />
                      {driver.location}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Join Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.joinDate}</div>
                    <p className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 inline-block" />
                      {driver.joinDate}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={driver.status === "active" ? "default" : "secondary"}>
                      {driver.status}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.rating}</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={driverData.personalInfo.firstName}
                        onChange={(e) => handleNestedDataChange('personalInfo', 'firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={driverData.personalInfo.lastName}
                        onChange={(e) => handleNestedDataChange('personalInfo', 'lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Make</Label>
                      <Input
                        id="make"
                        value={driverData.vehicleInfo.make}
                        onChange={(e) => handleNestedDataChange('vehicleInfo', 'make', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        value={driverData.vehicleInfo.model}
                        onChange={(e) => handleNestedDataChange('vehicleInfo', 'model', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DriverLicense 
                isEditing={isEditing}
                driverData={driverData}
                onDataChange={handleDataChange}
              />
              <InsurancePolicy 
                isEditing={isEditing}
                driverData={driverData}
                onDataChange={handleDataChange}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
