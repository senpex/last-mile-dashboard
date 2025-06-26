import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Calendar, Car, CreditCard, FileText, MessageSquare, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DocumentViewerModal } from './DocumentViewerModal';
import { EmailsSentList } from './EmailsSentList';

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  hireStatus: string;
  profileType: string;
  transportType: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipcode: string;
    coordinates?: { lat: number; lng: number };
  };
  avatar?: string;
  rating: number;
  completedDeliveries: number;
  joinDate: string;
  lastActive: string;
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
  };
  documents?: Array<{
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    status: string;
  }>;
  bankInfo?: {
    accountType: string;
    lastFour: string;
    routingNumber: string;
  };
  extraServices?: string[];
}

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

export const DriverDetailsSheet = ({ isOpen, onClose, driver }: DriverDetailsSheetProps) => {
  const [selectedDocument, setSelectedDocument] = useState<{
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    status: string;
  } | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isEmailsModalOpen, setIsEmailsModalOpen] = useState(false);

  if (!driver) return null;

  const handleDocumentView = (document: {
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    status: string;
  }) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const getStatusBadgeVariant = (status: string): string => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "secondary";
      case "Suspended":
        return "destructive";
      case "Inactive":
        return "muted";
      default:
        return "default";
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-2xl w-full overflow-hidden p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-lg font-semibold">
              Driver Details
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {/* Driver Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={driver.avatar} alt={driver.name} />
                      <AvatarFallback>{driver.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{driver.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {driver.location.city}, {driver.location.state}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        Rating: {driver.rating}/5 ({driver.completedDeliveries} deliveries)
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${driver.email}`} className="text-sm hover:underline">
                        {driver.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${driver.phone}`} className="text-sm hover:underline">
                        {driver.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Join Date: {driver.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Last Active: {driver.lastActive}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status and Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Profile</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant={getStatusBadgeVariant(driver.status)}>{driver.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hire Status</p>
                      <Badge variant="secondary">{driver.hireStatus}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Profile Type</p>
                      <Badge variant="secondary">{driver.profileType}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Transport Type</p>
                      <Badge variant="secondary">{driver.transportType}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Information Card */}
              {driver.vehicleInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Make</p>
                        <span className="text-sm">{driver.vehicleInfo.make}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Model</p>
                        <span className="text-sm">{driver.vehicleInfo.model}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Year</p>
                        <span className="text-sm">{driver.vehicleInfo.year}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">License Plate</p>
                        <span className="text-sm">{driver.vehicleInfo.licensePlate}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Color</p>
                        <span className="text-sm">{driver.vehicleInfo.color}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents Card */}
              {driver.documents && driver.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {driver.documents.map(document => (
                        <div key={document.id} className="border rounded-md p-3 hover:bg-secondary/50 cursor-pointer" onClick={() => handleDocumentView(document)}>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{document.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Type: {document.type}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {document.uploadDate}</p>
                          <Badge variant="outline" className="mt-2">{document.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bank Information Card */}
              {driver.bankInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                        <span className="text-sm">{driver.bankInfo.accountType}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Four Digits</p>
                        <span className="text-sm">**** **** **** {driver.bankInfo.lastFour}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Routing Number</p>
                        <span className="text-sm">{driver.bankInfo.routingNumber}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Extra Services Card */}
              {driver.extraServices && driver.extraServices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Extra Services</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {driver.extraServices.map((service, index) => (
                        <Badge key={index} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEmailsModalOpen(true)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              View Emails
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </SheetContent>
      </Sheet>

      <DocumentViewerModal 
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        document={selectedDocument}
      />

      <EmailsSentList 
        isOpen={isEmailsModalOpen}
        onClose={() => setIsEmailsModalOpen(false)}
        driverName={driver.name}
      />
    </>
  );
};
