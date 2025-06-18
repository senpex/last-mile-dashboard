
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, FileText, User, Car, CreditCard, Upload } from "lucide-react";
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
      url: "https://example.com/license-front.pdf",
    },
    {
      id: "2",
      name: "Driver's License Back",
      url: "https://example.com/license-back.pdf",
    },
    {
      id: "3",
      name: "Insurance certificate",
      url: "https://example.com/insurance.pdf",
    },
  ]);

  const [vehicleInfo, setVehicleInfo] = useState({
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[800px] sm:max-w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-semibold">Driver Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Personal Information Section */}
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
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      {isEditingPersonal ? (
                        <Input defaultValue={driver?.firstName || "John"} />
                      ) : (
                        <p className="text-sm text-gray-600">{driver?.firstName || "John"}</p>
                      )}
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      {isEditingPersonal ? (
                        <Input defaultValue={driver?.lastName || "Doe"} />
                      ) : (
                        <p className="text-sm text-gray-600">{driver?.lastName || "Doe"}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      {isEditingPersonal ? (
                        <Input defaultValue={driver?.email || "john.doe@example.com"} />
                      ) : (
                        <p className="text-sm text-gray-600">{driver?.email || "john.doe@example.com"}</p>
                      )}
                    </div>
                    <div>
                      <Label>Phone</Label>
                      {isEditingPersonal ? (
                        <Input defaultValue={driver?.phone || "+1 (555) 123-4567"} />
                      ) : (
                        <p className="text-sm text-gray-600">{driver?.phone || "+1 (555) 123-4567"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isEditingPersonal && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSavePersonal} size="sm">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingPersonal(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents Section */}
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
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                    {isEditingDocuments && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Replace Document</AlertDialogTitle>
                            <AlertDialogDescription>
                              Upload a new document to replace "{doc.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="py-4">
                            <Button className="w-full">
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </Button>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Upload</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))}
              {isEditingDocuments && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveDocuments} size="sm">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingDocuments(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle Information Section */}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Make</Label>
                  {isEditingVehicle ? (
                    <Input defaultValue={vehicleInfo.make} />
                  ) : (
                    <p className="text-sm text-gray-600">{vehicleInfo.make}</p>
                  )}
                </div>
                <div>
                  <Label>Model</Label>
                  {isEditingVehicle ? (
                    <Input defaultValue={vehicleInfo.model} />
                  ) : (
                    <p className="text-sm text-gray-600">{vehicleInfo.model}</p>
                  )}
                </div>
                <div>
                  <Label>Year</Label>
                  {isEditingVehicle ? (
                    <Input defaultValue={vehicleInfo.year.toString()} />
                  ) : (
                    <p className="text-sm text-gray-600">{vehicleInfo.year}</p>
                  )}
                </div>
                <div>
                  <Label>Color</Label>
                  {isEditingVehicle ? (
                    <Input defaultValue={vehicleInfo.color} />
                  ) : (
                    <p className="text-sm text-gray-600">{vehicleInfo.color}</p>
                  )}
                </div>
              </div>
              {isEditingVehicle && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveVehicle} size="sm">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingVehicle(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Status & Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{driver?.status || "Active"}</Badge>
                <span className="text-sm text-gray-600">
                  Driver since: {driver?.joinDate || "January 2023"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
