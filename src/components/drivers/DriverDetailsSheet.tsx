
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  Plus,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';
import { DocumentViewerModal } from './DocumentViewerModal';

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  hireStatus: string;
  transportType: string;
  location: string;
  joinDate: string;
  lastActive: string;
  totalDeliveries: number;
  rating: number;
  earnings: number;
}

interface DriverDetailsSheetProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ExtraService {
  name: string;
  description: string;
  price: string;
}

const DriverDetailsSheet = ({ driver, isOpen, onClose }: DriverDetailsSheetProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [extraServices, setExtraServices] = useState<ExtraService[]>([
    {
      name: "Express Delivery",
      description: "Same-day delivery service",
      price: "15.00"
    },
    {
      name: "Fragile Handling",
      description: "Special care for fragile items",
      price: "10.00"
    }
  ]);
  const [newService, setNewService] = useState<ExtraService>({
    name: '',
    description: '',
    price: ''
  });

  const [documents] = useState([
    {
      id: 1,
      name: 'Driver License',
      type: 'PDF',
      uploadDate: '2024-01-15',
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Insurance Certificate',
      type: 'PDF',
      uploadDate: '2024-01-10',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Vehicle Registration',
      type: 'PDF',
      uploadDate: '2024-01-08',
      status: 'Approved'
    }
  ]);

  if (!driver) return null;

  const handleAddService = () => {
    if (newService.name.trim() && newService.description.trim() && newService.price.trim()) {
      setExtraServices([...extraServices, { ...newService }]);
      setNewService({ name: '', description: '', price: '' });
      setIsAddServiceDialogOpen(false);
    }
  };

  const handleDeleteService = (index: number) => {
    setExtraServices(extraServices.filter((_, i) => i !== index));
  };

  const handlePreviewDocument = (document: any) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  const handleDeleteDocument = (documentId: number) => {
    // This would typically make an API call to delete the document
    console.log('Delete document:', documentId);
  };

  const handleDownloadDocument = (document: any) => {
    // Create a blob URL and trigger download
    const link = document.createElement('a');
    link.href = '#';
    link.download = document.name;
    link.click();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Driver Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{driver.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant="secondary">{driver.status}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hire Status</p>
                <p className="font-medium">{driver.hireStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transport Type</p>
                <p className="font-medium">{driver.transportType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{driver.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{driver.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="font-medium">{driver.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Vehicle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transport Type</p>
                  <p className="font-medium">{driver.transportType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                  <p className="font-medium">{driver.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Active</p>
                  <p className="font-medium">{driver.lastActive}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Services Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Extra Services</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddServiceDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                {extraServices.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No extra services added yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {extraServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <p className="text-sm font-medium text-green-600">${service.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Documents</h3>
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{document.name}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <p className="text-sm">{document.type}</p>
                        <span className="text-xs">•</span>
                        <p className="text-sm">Uploaded: {document.uploadDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{document.status}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handlePreviewDocument(document)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(document)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(document.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DocumentViewerModal 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          document={selectedDocument}
        />

        {/* Add Service Dialog */}
        <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Extra Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="service-name" className="text-sm font-medium block mb-2">
                  Service Name
                </label>
                <Input
                  id="service-name"
                  placeholder="Enter service name..."
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="service-description" className="text-sm font-medium block mb-2">
                  Description
                </label>
                <Textarea
                  id="service-description"
                  placeholder="Describe the service..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="service-price" className="text-sm font-medium block mb-2">
                  Price ($)
                </label>
                <Input
                  id="service-price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddServiceDialogOpen(false);
                  setNewService({ name: '', description: '', price: '' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddService}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
};

export default DriverDetailsSheet;
