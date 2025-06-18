import React, { useState } from 'react';
import { Building2, X, Upload, Eye, Download, Edit, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  licenseNumber: string;
  licenseExpiry: string;
  insuranceProvider: string;
  insurancePolicy: string;
  insuranceExpiry: string;
  status: 'active' | 'inactive' | 'pending';
  documents: Document[];
  vehicles: Vehicle[];
  notes: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
}

const mockDriver: Driver = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-555-5555',
  address: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  licenseNumber: '123456789',
  licenseExpiry: '2024-12-31',
  insuranceProvider: 'Acme Insurance',
  insurancePolicy: 'ABC12345',
  insuranceExpiry: '2024-12-31',
  status: 'active',
  documents: [
    { id: '1', name: 'License', type: 'license', url: '/license.pdf', status: 'approved' },
    { id: '2', name: 'Insurance', type: 'insurance', url: '/insurance.pdf', status: 'approved' },
  ],
  vehicles: [
    { id: '1', make: 'Toyota', model: 'Camry', year: '2020', licensePlate: 'ABC-123' },
  ],
  notes: 'This driver has a clean record.',
};

const DriverDetailsSheet = ({ driver, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(driver);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (status) => {
    setEditedDriver(prev => ({
      ...prev,
      status
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited driver data
    setIsEditing(false);
    // Here you would typically make an API call to update the driver
    console.log('Saving driver:', editedDriver);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDriver(driver); // Reset to original driver data
  };

  const handleUploadDocument = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log('Uploading file:', file);
  };

  const handleDeleteDocument = (docId) => {
    // Handle document deletion logic here
    console.log('Deleting document:', docId);
  };

  const handleViewDocument = (doc) => {
    // Fixed: Use document.getElementById instead of doc.getElementById
    const url = `/documents/${doc.id}`;
    window.open(url, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={editedDriver.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={editedDriver.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={editedDriver.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={editedDriver.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={editedDriver.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      defaultValue={editedDriver.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip</Label>
                    <Input
                      id="zip"
                      name="zip"
                      defaultValue={editedDriver.zip}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={handleStatusChange} defaultValue={editedDriver.status}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Driver notes..."
                  name="notes"
                  defaultValue={editedDriver.notes}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="upload-document" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Upload Document</span>
                      <Input
                        type="file"
                        id="upload-document"
                        className="hidden"
                        onChange={handleUploadDocument}
                      />
                    </Button>
                  </Label>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {editedDriver.documents.map((doc) => (
                    <div key={doc.id} className="border rounded-md p-4">
                      <div className="font-semibold">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">{doc.type}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{doc.status}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bank Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Bank Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bank-city">City</Label>
                    <Input
                      id="bank-city"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-address1">Address 1</Label>
                    <Input
                      id="bank-address1"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-address2">Address 2</Label>
                    <Input
                      id="bank-address2"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-state">State</Label>
                    <Input
                      id="bank-state"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-zipcode">Zipcode</Label>
                    <Input
                      id="bank-zipcode"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-birth-date">Birth Date</Label>
                    <Input
                      id="bank-birth-date"
                      type="date"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-route-number">Route Number</Label>
                    <Input
                      id="bank-route-number"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-account-number">Account Number</Label>
                    <Input
                      id="bank-account-number"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-institution-number">Institution Number</Label>
                    <Input
                      id="bank-institution-number"
                      defaultValue=""
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editedDriver.vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="border rounded-md p-4">
                    <div className="font-semibold">{vehicle.make} {vehicle.model}</div>
                    <div className="text-sm text-muted-foreground">Year: {vehicle.year}</div>
                    <div className="text-sm text-muted-foreground">License Plate: {vehicle.licensePlate}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Performance content here */}
                <div>Performance data will be displayed here.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Payments content here */}
                <div>Payment information will be displayed here.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communication</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Communication content here */}
                <div>Communication logs and tools will be here.</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-4">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
              <Button onClick={handleSaveClick}>Save</Button>
            </>
          ) : (
            <Button onClick={handleEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DriverDetailsSheet;
