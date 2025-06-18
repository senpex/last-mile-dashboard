
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, FileText, User, Car, CreditCard, Upload, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function DriverDetailsSheet({ driver, isOpen, onClose }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingDocuments, setIsEditingDocuments] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);

  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Driver's License Front",
      url: "https://example.com/license-front.pdf"
    },
    {
      id: "2", 
      name: "Driver's License Back",
      url: "https://example.com/license-back.pdf"
    },
    {
      id: "3",
      name: "Insurance certificate", 
      url: "https://example.com/insurance.pdf"
    }
  ]);

  const [vehicleInfo, setVehicleInfo] = useState({
    make: "Toyota",
    model: "Camry", 
    year: 2020,
    color: "Silver"
  });

  const handleSavePersonal = () => {
    setIsEditingPersonal(false);
    // Save personal information logic here
  };

  const handleSaveDocuments = () => {
    setIsEditingDocuments(false);
    // Save documents logic here
  };

  const handleSaveVehicle = () => {
    setIsEditingVehicle(false);
    // Save vehicle information logic here
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[800px] sm:max-w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-semibold">Driver Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  className="ml-auto"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Driver ID: #12345</p>
                </div>
              </div>

              {isEditingPersonal ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="col-span-2">
                    <Button onClick={handleSavePersonal} className="mr-2">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingPersonal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">john.doe@example.com</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <Label>Join Date</Label>
                    <p className="text-sm">January 15, 2023</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant="secondary" className="w-fit">
                      Active
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingDocuments(!isEditingDocuments)}
                  className="ml-auto"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingDocuments ? (
                <div className="space-y-4">
                  <div>
                    <Label>Upload New Document</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="flex-1"
                      />
                      <Button size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{doc.name}</span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Document</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this document? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteDocument(doc.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <Button onClick={handleSaveDocuments} className="mr-2">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingDocuments(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Vehicle Information
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingVehicle(!isEditingVehicle)}
                  className="ml-auto"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingVehicle ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      defaultValue={vehicleInfo.make}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      defaultValue={vehicleInfo.model}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      defaultValue={vehicleInfo.year}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, year: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      defaultValue={vehicleInfo.color}
                      onChange={(e) => setVehicleInfo({ ...vehicleInfo, color: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Button onClick={handleSaveVehicle} className="mr-2">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingVehicle(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Make</Label>
                    <p className="text-sm">{vehicleInfo.make}</p>
                  </div>
                  <div>
                    <Label>Model</Label>
                    <p className="text-sm">{vehicleInfo.model}</p>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <p className="text-sm">{vehicleInfo.year}</p>
                  </div>
                  <div>
                    <Label>Color</Label>
                    <p className="text-sm">{vehicleInfo.color}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Bank Account</Label>
                  <p className="text-sm">****1234</p>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <p className="text-sm">Direct Deposit</p>
                </div>
                <div>
                  <Label>Tax ID</Label>
                  <p className="text-sm">***-**-5678</p>
                </div>
                <div>
                  <Label>Total Earnings</Label>
                  <p className="text-sm font-medium">$2,450.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
