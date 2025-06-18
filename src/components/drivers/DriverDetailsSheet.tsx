
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  Calendar,
  FileText,
  Download,
  Eye,
  Edit2,
  Save,
  X,
  CreditCard,
  Building2,
  Hash
} from 'lucide-react';

interface Driver {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  documents: Array<{
    id: number;
    name: string;
    type: string;
    uploadDate: string;
    status: string;
  }>;
  notes: string;
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  totalDeliveries: number;
  joinDate: string;
}

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

export function DriverDetailsSheet({ isOpen, onClose, driver }: DriverDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState<Driver | null>(null);

  if (!driver) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDriver({ ...driver });
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
    console.log('Saving driver:', editedDriver);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDriver(null);
  };

  const currentDriver = editedDriver || driver;

  const handleDocumentView = (doc: Driver['documents'][0]) => {
    console.log('Viewing document:', doc.name);
  };

  const handleDocumentDownload = (doc: Driver['documents'][0]) => {
    console.log('Downloading document:', doc.name);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Details
            </SheetTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={currentDriver.name}
                    onChange={(e) => setEditedDriver(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.name}</p>
                )}
              </div>
              <div>
                <Label>Status</Label>
                {isEditing ? (
                  <Select
                    value={currentDriver.status}
                    onValueChange={(value) => setEditedDriver(prev => prev ? { ...prev, status: value as Driver['status'] } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge 
                    variant={currentDriver.status === 'active' ? 'default' : 
                            currentDriver.status === 'suspended' ? 'destructive' : 'secondary'}
                    className="mt-1"
                  >
                    {currentDriver.status}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={currentDriver.phone}
                    onChange={(e) => setEditedDriver(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {currentDriver.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={currentDriver.email}
                    onChange={(e) => setEditedDriver(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {currentDriver.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    id="address"
                    value={currentDriver.address}
                    onChange={(e) => setEditedDriver(prev => prev ? { ...prev, address: e.target.value } : null)}
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      value={currentDriver.city}
                      onChange={(e) => setEditedDriver(prev => prev ? { ...prev, city: e.target.value } : null)}
                      placeholder="City"
                    />
                    <Input
                      value={currentDriver.state}
                      onChange={(e) => setEditedDriver(prev => prev ? { ...prev, state: e.target.value } : null)}
                      placeholder="State"
                    />
                    <Input
                      value={currentDriver.zipCode}
                      onChange={(e) => setEditedDriver(prev => prev ? { ...prev, zipCode: e.target.value } : null)}
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {currentDriver.address}, {currentDriver.city}, {currentDriver.state} {currentDriver.zipCode}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Join Date</Label>
                <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(currentDriver.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label>Total Deliveries</Label>
                <p className="mt-1 text-sm text-gray-600">{currentDriver.totalDeliveries}</p>
              </div>
              <div>
                <Label>Rating</Label>
                <p className="mt-1 text-sm text-gray-600">⭐ {currentDriver.rating}/5</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Car className="h-4 w-4" />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                {isEditing ? (
                  <Input
                    id="make"
                    value={currentDriver.vehicle.make}
                    onChange={(e) => setEditedDriver(prev => prev ? { 
                      ...prev, 
                      vehicle: { ...prev.vehicle, make: e.target.value }
                    } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.vehicle.make}</p>
                )}
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                {isEditing ? (
                  <Input
                    id="model"
                    value={currentDriver.vehicle.model}
                    onChange={(e) => setEditedDriver(prev => prev ? { 
                      ...prev, 
                      vehicle: { ...prev.vehicle, model: e.target.value }
                    } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.vehicle.model}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="year">Year</Label>
                {isEditing ? (
                  <Input
                    id="year"
                    type="number"
                    value={currentDriver.vehicle.year}
                    onChange={(e) => setEditedDriver(prev => prev ? { 
                      ...prev, 
                      vehicle: { ...prev.vehicle, year: parseInt(e.target.value) }
                    } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.vehicle.year}</p>
                )}
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                {isEditing ? (
                  <Input
                    id="color"
                    value={currentDriver.vehicle.color}
                    onChange={(e) => setEditedDriver(prev => prev ? { 
                      ...prev, 
                      vehicle: { ...prev.vehicle, color: e.target.value }
                    } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.vehicle.color}</p>
                )}
              </div>
              <div>
                <Label htmlFor="licensePlate">License Plate</Label>
                {isEditing ? (
                  <Input
                    id="licensePlate"
                    value={currentDriver.vehicle.licensePlate}
                    onChange={(e) => setEditedDriver(prev => prev ? { 
                      ...prev, 
                      vehicle: { ...prev.vehicle, licensePlate: e.target.value }
                    } : null)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{currentDriver.vehicle.licensePlate}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </h3>
            <div className="space-y-2">
              {currentDriver.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type} • Uploaded {doc.uploadDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'approved' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDocumentView(doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDocumentDownload(doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Bank Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                {isEditing ? (
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    Chase Bank
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                {isEditing ? (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-sm text-gray-600">Checking</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                {isEditing ? (
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    ****1234
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                {isEditing ? (
                  <Input
                    id="routingNumber"
                    placeholder="Enter routing number"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    021000021
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              {isEditing ? (
                <Input
                  id="accountHolderName"
                  placeholder="Enter account holder name"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-600">{currentDriver.name}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Notes</h3>
            {isEditing ? (
              <Textarea
                value={currentDriver.notes}
                onChange={(e) => setEditedDriver(prev => prev ? { ...prev, notes: e.target.value } : null)}
                placeholder="Add notes about this driver..."
                rows={4}
              />
            ) : (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {currentDriver.notes || 'No notes available.'}
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
