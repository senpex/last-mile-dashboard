import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Star, FileText, CreditCard, User, Award, Settings, File, Image, Edit, Save, X } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { toast } from "sonner";

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
  verifiedByDriver?: 'Verified' | 'Not verified';
  approvedByAdmin?: 'approved' | 'disapproved' | 'pending';
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
  
  // Editing states
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState({
    name: driver?.name || '',
    email: driver?.email || '',
    phone: driver?.phone || '',
    zipcode: driver?.zipcode || '',
    address: driver?.address || '',
    notes: driver?.notes || '',
    rating: driver?.rating || 0,
    hireStatus: driver?.hireStatus || '',
    stripeStatus: driver?.stripeStatus || 'unverified' as const,
    verifiedByDriver: driver?.verifiedByDriver || 'Not verified' as const,
    approvedByAdmin: driver?.approvedByAdmin || 'pending' as const
  });

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

  const hireStatusOptions = Object.entries(hireStatusDictionary).map(([key, value]) => ({
    value: key,
    label: value
  }));

  const handleEdit = (section: string) => {
    setEditingSection(section);
    // Reset edited data to current driver data
    setEditedData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      zipcode: driver.zipcode,
      address: driver.address,
      notes: driver.notes,
      rating: driver.rating,
      hireStatus: driver.hireStatus,
      stripeStatus: driver.stripeStatus,
      verifiedByDriver: driver.verifiedByDriver || 'Not verified',
      approvedByAdmin: driver.approvedByAdmin || 'pending'
    });
  };

  const handleSave = (section: string) => {
    setEditingSection(null);
    toast.success(`${section} updated successfully`);
  };

  const handleCancel = () => {
    setEditingSection(null);
    // Reset edited data to original values
    setEditedData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      zipcode: driver.zipcode,
      address: driver.address,
      notes: driver.notes,
      rating: driver.rating,
      hireStatus: driver.hireStatus,
      stripeStatus: driver.stripeStatus,
      verifiedByDriver: driver.verifiedByDriver || 'Not verified',
      approvedByAdmin: driver.approvedByAdmin || 'pending'
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
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
                  {editingSection === 'status' ? (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave('Status & Rating')}
                        className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1"
                      onClick={() => handleEdit('status')}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  )}
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
                          {editingSection === 'status' ? (
                            <Select 
                              value={editedData.hireStatus} 
                              onValueChange={(value) => handleInputChange('hireStatus', value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {hireStatusOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary">
                              {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Rating
                        </Label>
                        <div className="mt-1">
                          <div className="text-lg font-semibold">
                            {driver.rating.toFixed(1)} / 5.0
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Stripe Status
                        </Label>
                        <div className="mt-1">
                          {editingSection === 'status' ? (
                            <Select 
                              value={editedData.stripeStatus} 
                              onValueChange={(value) => handleInputChange('stripeStatus', value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unverified">Unverified</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            renderStripeStatus(driver.stripeStatus)
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Verified by Driver</Label>
                        <div className="mt-1">
                          {editingSection === 'status' ? (
                            <Select 
                              value={editedData.verifiedByDriver} 
                              onValueChange={(value) => handleInputChange('verifiedByDriver', value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Verified">Verified</SelectItem>
                                <SelectItem value="Not verified">Not verified</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant={driver.verifiedByDriver === 'Verified' ? 'default' : 'secondary'}>
                              {driver.verifiedByDriver || 'Not verified'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Approved by Admin</Label>
                        <div className="mt-1">
                          {editingSection === 'status' ? (
                            <Select 
                              value={editedData.approvedByAdmin} 
                              onValueChange={(value) => handleInputChange('approvedByAdmin', value)}
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="disapproved">Disapproved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant={
                              driver.approvedByAdmin === 'approved' ? 'default' : 
                              driver.approvedByAdmin === 'disapproved' ? 'destructive' : 
                              'secondary'
                            }>
                              {driver.approvedByAdmin || 'Pending'}
                            </Badge>
                          )}
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
                  {editingSection === 'contact' ? (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave('Contact Information')}
                        className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1"
                      onClick={() => handleEdit('contact')}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  )}
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={editingSection === 'contact' ? editedData.name : driver.name} 
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          readOnly={editingSection !== 'contact'} 
                          className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={editingSection === 'contact' ? editedData.phone : driver.phone} 
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          readOnly={editingSection !== 'contact'} 
                          className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        value={editingSection === 'contact' ? editedData.email : driver.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        readOnly={editingSection !== 'contact'} 
                        className={editingSection !== 'contact' ? 'bg-muted/50' : 'bg-background'}
                      />
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
                  {editingSection === 'location' ? (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave('Location')}
                        className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1"
                      onClick={() => handleEdit('location')}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  )}
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipcode">Zipcode</Label>
                        <Input 
                          id="zipcode" 
                          value={editingSection === 'location' ? editedData.zipcode : driver.zipcode} 
                          onChange={(e) => handleInputChange('zipcode', e.target.value)}
                          readOnly={editingSection !== 'location'} 
                          className={editingSection !== 'location' ? 'bg-muted/50' : 'bg-background'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={editingSection === 'location' ? editedData.address : driver.address} 
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          readOnly={editingSection !== 'location'} 
                          className={editingSection !== 'location' ? 'bg-muted/50' : 'bg-background'}
                        />
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
                  <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
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
                  <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
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
                  <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
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
                  {editingSection === 'notes' ? (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave('Notes')}
                        className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1"
                      onClick={() => handleEdit('notes')}
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  )}
                </div>
                <Card>
                  <CardContent className="pt-6">
                    {editingSection === 'notes' ? (
                      <Textarea 
                        placeholder="Add notes about this driver..." 
                        value={editedData.notes} 
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="min-h-[100px]" 
                      />
                    ) : (
                      <Textarea 
                        placeholder="Add notes about this driver..." 
                        value={driver.notes || ''} 
                        className="min-h-[100px] bg-muted/50" 
                        readOnly 
                      />
                    )}
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
