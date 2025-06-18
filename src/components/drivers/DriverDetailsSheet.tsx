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
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState({ ...driver });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: "Driver's License", type: "PDF", uploadDate: "2023-01-15", status: "Approved" },
    { id: 2, name: "Insurance Policy", type: "PDF", uploadDate: "2023-02-20", status: "Pending" },
    { id: 3, name: "Vehicle Registration", type: "PDF", uploadDate: "2023-03-10", status: "Approved" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you would typically save the editedDriver data to your backend
    console.log("Saving driver data:", editedDriver);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would typically call an API to delete the driver
    console.log("Deleting driver:", driver.id);
    setIsDeleteDialogOpen(false);
    onClose(); // Close the sheet after deletion
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleUploadDocument = (docId) => {
    const fileInput = document.getElementById(`file-input-${docId}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event, docId) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading file for document ${docId}:`, file.name);
      // Here you would typically upload the file to your server
    }
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
        </SheetHeader>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://ui-avatars.com/api/?name=${driver.name}`} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <Input
                    type="text"
                    name="name"
                    value={editedDriver.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <h2 className="text-lg font-semibold">{driver.name}</h2>
                )}
                <p className="text-sm text-muted-foreground">Driver ID: {driver.id}</p>
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      name="email"
                      value={editedDriver.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.email}</p>
                  )}
                </div>
                <div>
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      name="phone"
                      value={editedDriver.phone}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <Label>Address</Label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="address"
                    value={editedDriver.address}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <p>{driver.address}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Make</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="vehicleMake"
                      value={editedDriver.vehicleMake}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.vehicleMake}</p>
                  )}
                </div>
                <div>
                  <Label>Model</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="vehicleModel"
                      value={editedDriver.vehicleModel}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.vehicleModel}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Year</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="vehicleYear"
                      value={editedDriver.vehicleYear}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.vehicleYear}</p>
                  )}
                </div>
                <div>
                  <Label>License Plate</Label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="licensePlate"
                      value={editedDriver.licensePlate}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p>{driver.licensePlate}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {documents.map(doc => (
                <li key={doc.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <FileText className="inline-block mr-2 h-4 w-4" />
                    {doc.name}
                    <Badge className="ml-2">{doc.status}</Badge>
                  </div>
                  <div>
                    <input
                      type="file"
                      id={`file-input-${doc.id}`}
                      style={{ display: 'none' }}
                      onChange={(event) => handleFileChange(event, doc.id)}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleUploadDocument(doc.id)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc.id)} className="ml-2">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSaveClick}>Save</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEditClick}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the driver from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
