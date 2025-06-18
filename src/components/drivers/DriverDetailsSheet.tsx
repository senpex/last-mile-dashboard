import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Edit2, FileText, Trash2, Upload } from 'lucide-react';

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any; // Replace with proper driver type
}

const DriverDetailsSheet: React.FC<DriverDetailsSheetProps> = ({ isOpen, onClose, driver }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  
  // Sample data for driver's license images
  const driverLicenseImages = [
    { id: 1, title: 'Driver License Front', imageUrl: '/images/license-front.jpg', uploadDate: '12/05/2023' },
    { id: 2, title: 'Driver License Back', imageUrl: '', uploadDate: '12/05/2023' },
  ];
  
  // Sample data for other documents
  const otherDocuments = [
    { id: 1, name: 'Insurance Card', fileUrl: '/images/insurance-card.jpg', fileType: 'image', uploadDate: '10/15/2023' },
    { id: 2, name: 'Vehicle Registration', fileUrl: '', fileType: 'pdf', uploadDate: '11/20/2023' },
  ];
  
  const handleLicenseImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic
    console.log('Uploading image for license ID:', id);
  };
  
  const handleViewDocument = (document: any) => {
    // Handle document viewing logic
    console.log('Viewing document:', document);
  };

  return <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
          <div className="border-b p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Driver Details</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Personal Information */}
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{driver?.name || 'John Doe'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{driver?.email || 'john.doe@example.com'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{driver?.phone || '(555) 123-4567'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{driver?.address || '123 Main St, Anytown, CA 12345'}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <div className="flex items-center gap-2">
                    {editingSection === 'documents' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEditingSection(null)}
                          className="h-8"
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => setEditingSection(null)}
                          className="h-8"
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingSection('documents')}
                        className="h-8"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>

                {/* Driver's License Section */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-700">Driver's License</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {driverLicenseImages.map((image) => (
                      <div key={image.id} className="border rounded-lg p-3">
                        <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                          {image.imageUrl ? (
                            <img 
                              src={image.imageUrl} 
                              alt={image.title}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <FileText className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">{image.title}</h5>
                            <p className="text-xs text-gray-500">Uploaded: {image.uploadDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {editingSection === 'documents' && (
                              <>
                                <Input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  id={`license-upload-${image.id}`}
                                  onChange={e => handleLicenseImageUpload(image.id, e)}
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => document.getElementById(`license-upload-${image.id}`)?.click()}
                                  className="h-7 px-2 border-blue-500 text-blue-700 hover:bg-blue-50"
                                >
                                  <Upload className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleViewDocument(image)}>
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Documents Section */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-700">Other Documents</h4>
                  
                  {/* Policy Number and Date of Expiration Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="policy-number">Policy Number</Label>
                      {editingSection === 'documents' ? (
                        <Input 
                          id="policy-number"
                          placeholder="Enter policy number"
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-600">Not provided</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="expiration-date">Date of Expiration</Label>
                      {editingSection === 'documents' ? (
                        <Input 
                          id="expiration-date"
                          type="date"
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-600">Not provided</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherDocuments.map((document) => (
                      <div key={document.id} className="border rounded-lg p-3">
                        <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                          {document.fileType === 'image' ? (
                            <img 
                              src={document.fileUrl} 
                              alt={document.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <FileText className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">{document.name}</h5>
                            <p className="text-xs text-gray-500">Uploaded: {document.uploadDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {editingSection === 'documents' && (
                              <Button variant="outline" size="sm" className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="border rounded-lg p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Vehicle Information</h3>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Make</p>
                    <p className="font-medium">Toyota</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-medium">Camry</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">2020</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Plate</p>
                    <p className="font-medium">ABC123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Document Viewer Modal would go here */}
    </>;
};

export default DriverDetailsSheet;
