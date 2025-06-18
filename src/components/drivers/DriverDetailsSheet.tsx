import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Edit2, Star, User, Award, Plus, Building, ChevronDown } from 'lucide-react';

interface DriverDetailsSheetProps {
  driver: any;
  isOpen: boolean;
  onClose: () => void;
}

const mockDocuments = [
  {
    id: '1',
    name: 'License-Front.jpg',
    uploadDate: '2024-01-20',
  },
  {
    id: '2',
    name: 'License-Back.jpg',
    uploadDate: '2024-01-20',
  },
  {
    id: '3',
    name: 'Insurance.pdf',
    uploadDate: '2024-01-15',
  },
];

const DriverDetailsSheet = ({ driver, isOpen, onClose }: DriverDetailsSheetProps) => {
  const [name, setName] = useState(driver?.name || '');
  const [email, setEmail] = useState(driver?.email || '');
  const [phone, setPhone] = useState(driver?.phone || '');
  const [address, setAddress] = useState(driver?.address || '');
  const [city, setCity] = useState(driver?.city || '');
  const [region, setRegion] = useState(driver?.region || '');
  const [postalCode, setPostalCode] = useState(driver?.postalCode || '');
  const [country, setCountry] = useState(driver?.country || '');
  const [vehicleMake, setVehicleMake] = useState(driver?.vehicleMake || '');
  const [vehicleModel, setVehicleModel] = useState(driver?.vehicleModel || '');
  const [vehicleYear, setVehicleYear] = useState(driver?.vehicleYear || '');
  const [licensePlate, setLicensePlate] = useState(driver?.licensePlate || '');
  const [employmentStatus, setEmploymentStatus] = useState(driver?.employmentStatus || '');
  const [hireDate, setHireDate] = useState(driver?.hireDate || '');
  const [terminationDate, setTerminationDate] = useState(driver?.terminationDate || '');
  const [notes, setNotes] = useState(driver?.notes || '');
  const [bankName, setBankName] = useState(driver?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(driver?.accountNumber || '');
  const [routingNumber, setRoutingNumber] = useState(driver?.routingNumber || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'region':
        setRegion(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'vehicleMake':
        setVehicleMake(value);
        break;
      case 'vehicleModel':
        setVehicleModel(value);
        break;
      case 'vehicleYear':
        setVehicleYear(value);
        break;
      case 'licensePlate':
        setLicensePlate(value);
        break;
      case 'employmentStatus':
        setEmploymentStatus(value);
        break;
      case 'hireDate':
        setHireDate(value);
        break;
      case 'terminationDate':
        setTerminationDate(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      case 'bankName':
        setBankName(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      case 'routingNumber':
        setRoutingNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Details - {driver?.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    type="text"
                    id="region"
                    name="region"
                    value={region}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    type="text"
                    id="emergencyContactName"
                    defaultValue="John Doe"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                  <Input
                    type="tel"
                    id="emergencyContactPhone"
                    defaultValue="555-123-4567"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryContactName">Secondary Contact Name</Label>
                  <Input
                    type="text"
                    id="secondaryContactName"
                    defaultValue="Jane Smith"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryContactPhone">Secondary Contact Phone</Label>
                  <Input
                    type="tel"
                    id="secondaryContactPhone"
                    defaultValue="555-987-6543"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <CardTitle className="text-lg">Vehicle Information</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleMake">Vehicle Make</Label>
                  <Input
                    type="text"
                    id="vehicleMake"
                    name="vehicleMake"
                    value={vehicleMake}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Vehicle Model</Label>
                  <Input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    value={vehicleModel}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleYear">Vehicle Year</Label>
                  <Input
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    value={vehicleYear}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={licensePlate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Profile */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <CardTitle className="text-lg">Driver Profile</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Input
                    type="text"
                    id="employmentStatus"
                    name="employmentStatus"
                    value={employmentStatus}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input
                    type="date"
                    id="hireDate"
                    name="hireDate"
                    value={hireDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="terminationDate">Termination Date</Label>
                  <Input
                    type="date"
                    id="terminationDate"
                    name="terminationDate"
                    value={terminationDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <CardTitle className="text-lg">Performance</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveriesCompleted">Deliveries Completed</Label>
                  <Input
                    type="text"
                    id="deliveriesCompleted"
                    defaultValue="1200"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    type="text"
                    id="rating"
                    defaultValue="4.8"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="milesDriven">Miles Driven</Label>
                  <Input
                    type="text"
                    id="milesDriven"
                    defaultValue="50000"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="accidents">Accidents</Label>
                  <Input
                    type="text"
                    id="accidents"
                    defaultValue="0"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <CardTitle className="text-lg">Bank Account Information</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={bankName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    type="text"
                    id="routingNumber"
                    name="routingNumber"
                    value={routingNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="drivers-license" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="drivers-license">Driver's License</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance Certificate</TabsTrigger>
                  <TabsTrigger value="background">Background Check</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle Registration</TabsTrigger>
                </TabsList>

                {/* Driver's License Tab */}
                <TabsContent value="drivers-license" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">Driver's License</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="license-number">License Number</Label>
                        <Input
                          id="license-number"
                          value="DL123456789"
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="license-expire">Expiration Date</Label>
                        <Input
                          id="license-expire"
                          value="2025-12-31"
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Building className="h-4 w-4 mr-2" />
                          Upload Front
                        </Button>
                        <Button variant="outline" size="sm">
                          <Building className="h-4 w-4 mr-2" />
                          Upload Back
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Current Images</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {mockDocuments.map((doc) => (
                            <div key={doc.id} className="relative group cursor-pointer border rounded-lg p-2 hover:bg-gray-50">
                              <div className="aspect-[3/2] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 mb-2">
                                {doc.name}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">{doc.uploadDate}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const input = window.document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.click();
                                  }}
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Insurance Certificate Tab */}
                <TabsContent value="insurance" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <h3 className="text-lg font-semibold">Insurance Certificate</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="policy-number">Policy Number</Label>
                        <Input
                          id="policy-number"
                          value="POL123456789"
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="insurance-expire">Expiration Date</Label>
                        <Input
                          id="insurance-expire"
                          value="2025-06-30"
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Building className="h-4 w-4 mr-2" />
                          Upload Front
                        </Button>
                        <Button variant="outline" size="sm">
                          <Building className="h-4 w-4 mr-2" />
                          Upload Back
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Current Images</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {mockDocuments.map((doc) => (
                            <div key={doc.id} className="relative group cursor-pointer border rounded-lg p-2 hover:bg-gray-50">
                              <div className="aspect-[3/2] bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 mb-2">
                                {doc.name}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">{doc.uploadDate}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const input = window.document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.click();
                                  }}
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Background Check Tab */}
                <TabsContent value="background" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Background Check</h3>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Request Check
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="background-status">Status</Label>
                      <Input
                        id="background-status"
                        value="Completed"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="background-date">Last Checked</Label>
                      <Input
                        id="background-date"
                        value="2024-01-01"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="background-notes">Notes</Label>
                      <Textarea
                        id="background-notes"
                        defaultValue="No issues found"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Vehicle Registration Tab */}
                <TabsContent value="vehicle" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Vehicle Registration</h3>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                        <ChevronDown className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vehicles</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vehicle-number">Registration Number</Label>
                      <Input
                        id="vehicle-number"
                        value="VRN123456789"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle-expire">Expiration Date</Label>
                      <Input
                        id="vehicle-expire"
                        value="2024-12-31"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle-notes">Notes</Label>
                      <Textarea
                        id="vehicle-notes"
                        defaultValue="Vehicle is in good condition"
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Work History */}
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
              <CardDescription>Driver's employment and delivery history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Recent Activity</h4>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                      <ChevronDown className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">2024-02-01</td>
                        <td className="px-6 py-4 whitespace-nowrap">Delivery</td>
                        <td className="px-6 py-4 whitespace-nowrap">Delivered package to 123 Main St</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">2024-01-31</td>
                        <td className="px-6 py-4 whitespace-nowrap">Maintenance</td>
                        <td className="px-6 py-4 whitespace-nowrap">Vehicle maintenance completed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DriverDetailsSheet;
