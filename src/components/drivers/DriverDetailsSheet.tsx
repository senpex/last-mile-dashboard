import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Edit, FileText, User, Car, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UploadButton } from "@/components/uploadthing"

interface DriverDetailsSheetProps {
  driver: any // Replace 'any' with the actual type of your driver object
  isOpen: boolean
  onClose: () => void
}

export default function DriverDetailsSheet({ driver, isOpen, onClose }: DriverDetailsSheetProps) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingDocuments, setIsEditingDocuments] = useState(false)
  const [isEditingVehicle, setIsEditingVehicle] = useState(false)
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
  ])
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
  })

  const handleSavePersonal = () => {
    setIsEditingPersonal(false)
    // Save personal information logic here
  }

  const handleSaveDocuments = () => {
    setIsEditingDocuments(false)
    // Save documents logic here
  }

  const handleSaveVehicle = () => {
    setIsEditingVehicle(false)
    // Save vehicle information logic here
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[800px] sm:max-w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-semibold">Driver Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Personal Information */}
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
                <div>
                  <div className="text-sm font-medium">
                    {driver?.firstName} {driver?.lastName}
                  </div>
                  <div className="text-muted-foreground">
                    {driver?.email}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-x-2">
                  <Label>Phone:</Label>
                  <span>{driver?.phone || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>Address:</Label>
                  <span>{driver?.address || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>City:</Label>
                  <span>{driver?.city || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>State:</Label>
                  <span>{driver?.state || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>Zip:</Label>
                  <span>{driver?.zip || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
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
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Driver's License */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Driver's License</h4>
                  </div>
                  <div className="space-y-4">
                    {documents
                      .filter(doc => doc.name.includes("Driver's License"))
                      .map(document => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between"
                        >
                          <a
                            href={document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            {document.name}
                          </a>
                          <Badge variant="secondary">Uploaded</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Insurance certificate */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Insurance certificate</h4>
                  </div>
                  <div className="space-y-4">
                    {/* Policy number and Date of expiration fields */}
                    {isEditingDocuments && (
                      <div className="space-y-3 mb-4">
                        <div>
                          <Label htmlFor="policy-number" className="text-sm font-medium">
                            Policy number
                          </Label>
                          <Input
                            id="policy-number"
                            placeholder="Enter policy number"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="date-expiration" className="text-sm font-medium">
                            Date of expiration
                          </Label>
                          <Input
                            id="date-expiration"
                            type="date"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                    {documents.filter(doc => !doc.name.includes("Driver's License")).map(document => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between"
                      >
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {document.name}
                        </a>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Uploaded</Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="xs" className="h-6">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete
                                  the document from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteDocument(document.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={res => {
                        console.log("Files: ", res)
                        alert("Upload Completed!")
                      }}
                      onUploadError={error => {
                        alert(`ERROR! ${error.message}`)
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
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
              <div className="space-y-2">
                <div className="space-x-2">
                  <Label>Make:</Label>
                  <span>{vehicleInfo.make || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>Model:</Label>
                  <span>{vehicleInfo.model || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>Year:</Label>
                  <span>{vehicleInfo.year || "N/A"}</span>
                </div>
                <div className="space-x-2">
                  <Label>Color:</Label>
                  <span>{vehicleInfo.color || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSavePersonal}>Save</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
