import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, FileText, CreditCard, User, Award, Settings, File, Image, Edit } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { DocumentViewerModal } from "./DocumentViewerModal";

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  address: string;
  transports: string[];
  rating: number;
  status: string;
  hireStatus: string;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  notes: string;
  profileTypes: string[];
}
interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  transportTypes: {
    [key: string]: string;
  };
  statusDictionary: {
    [key: string]: string;
  };
  hireStatusDictionary: {
    [key: string]: string;
  };
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
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  if (!driver) return null;

  // Sample documents data - in a real app this would come from the driver data
  const documents = [{
    id: 1,
    name: "Driver's License - Front",
    type: "Image",
    uploadDate: "2024-01-15",
    status: "Verified"
  }, {
    id: 2,
    name: "Driver's License - Back",
    type: "Image", 
    uploadDate: "2024-01-12",
    status: "Pending"
  }, {
    id: 4,
    name: "Insurance Certificate",
    type: "Image",
    uploadDate: "2024-01-08",
    status: "Verified"
  }];

  const handleViewDocument = (document: typeof documents[0]) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
          {/* Main Content with Flex Structure */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Main Content with Flex Structure */}
            <SheetHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <SheetTitle className="text-left text-lg">{driver.name}</SheetTitle>
                    <SheetDescription className="text-left text-sm">
                      Driver ID: {driver.id}
                    </SheetDescription>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 space-y-6 my-[25px]">
              {/* Status Information */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Status & Rating
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
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
                          <Badge variant="secondary">
                            {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Rating
                        </Label>
                        <div className="mt-1 text-lg font-semibold">
                          {driver.rating.toFixed(1)} / 5.0
                        </div>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Stripe Status
                        </Label>
                        <div className="mt-1">
                          {renderStripeStatus(driver.stripeStatus)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Information
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={driver.name} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={driver.phone} readOnly />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" value={driver.email} readOnly />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Information */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipcode">Zipcode</Label>
                        <Input id="zipcode" value={driver.zipcode} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" value={driver.address} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Types */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile Types
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {driver.profileTypes && driver.profileTypes.length > 0 ? driver.profileTypes.map(type => <Badge key={type} variant="outline">
                            {type}
                          </Badge>) : <span className="text-muted-foreground text-sm">No profile types assigned</span>}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transport Types */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Transport Types
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {driver.transports.map(transportId => <div key={transportId} className="flex items-center gap-2 p-2 border rounded-lg">
                          <TransportIcon transportType={transportId as TransportType} size={16} className="h-4 w-4" />
                          <span className="text-sm">
                            {transportTypes[transportId] || `Transport ${transportId}`}
                          </span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Documents */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <File className="w-4 h-4 mr-2" />
                    Documents
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {documents.map(document => (
                        <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Image className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {document.type} • Uploaded {document.uploadDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={document.status === 'Verified' ? 'default' : 'secondary'}>
                              {document.status}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewDocument(document)}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                      {documents.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No documents uploaded</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Notes
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <Textarea placeholder="Add notes about this driver..." value={driver.notes || ''} className="min-h-[100px]" readOnly />
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3 p-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                Edit Profile
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <DocumentViewerModal 
        isOpen={isDocumentModalOpen}
        onClose={handleCloseDocumentModal}
        document={selectedDocument}
      />
    </>
  );
};
