
import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, User } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { InsuranceCertificateImageView } from "./InsuranceCertificateImageView"

interface DriverDetailsSheetProps {
  isOpen: boolean
  onClose: () => void
  driver: {
    id: string
    name: string
    email: string
    phone: string
    avatarUrl?: string
    status: "active" | "inactive" | "pending"
    documents: {
      type: string
      url?: string
      uploadDate: string
      expiryDate?: string
      verified: boolean
    }[]
  }
}

const DriverDetailsSheet: React.FC<DriverDetailsSheetProps> = ({
  isOpen,
  onClose,
  driver,
}) => {
  const [isEditing, setIsEditing] = React.useState(false)

  const documents = driver.documents || []

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            {driver.name} - {driver.email}
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {/* Driver Info Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "View" : "Edit"}
                {isEditing ? (
                  <Eye className="h-4 w-4 ml-2" />
                ) : (
                  <Pencil className="h-4 w-4 ml-2" />
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={driver.avatarUrl} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{driver.name}</h4>
                <p className="text-sm text-gray-500">{driver.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    defaultValue={driver.name}
                    placeholder="Enter driver name"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border">{driver.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    defaultValue={driver.email}
                    placeholder="Enter driver email"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border">{driver.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    defaultValue={driver.phone}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border">{driver.phone}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Badge variant={driver.status === "active" ? "default" : "secondary"}>
                  {driver.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Documents</h3>
            
            {documents.filter(doc => doc.type !== "Insurance Certificate").map((doc, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{doc.type}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={doc.verified ? "default" : "secondary"}>
                      {doc.verified ? "Verified" : "Pending"}
                    </Badge>
                    {!isEditing && (
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {doc.url && (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={doc.url} 
                      alt={doc.type}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                
                <div className="text-sm text-gray-600">
                  <p>Uploaded: {doc.uploadDate}</p>
                  {doc.expiryDate && <p>Expires: {doc.expiryDate}</p>}
                </div>
              </div>
            ))}

            {/* Insurance Certificate Section with Policy Details */}
            {(() => {
              const insuranceCert = documents.find(doc => doc.type === "Insurance Certificate");
              if (!insuranceCert) return null;
              
              return (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Insurance Certificate</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={insuranceCert.verified ? "default" : "secondary"}>
                        {insuranceCert.verified ? "Verified" : "Pending"}
                      </Badge>
                      {!isEditing && (
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Policy Details Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policy-number">Policy Number</Label>
                      {isEditing ? (
                        <Input
                          id="policy-number"
                          defaultValue="POL-123456789"
                          placeholder="Enter policy number"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded border">
                          POL-123456789
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expire-date">Expire Date</Label>
                      {isEditing ? (
                        <Input
                          id="expire-date"
                          type="date"
                          defaultValue="2024-12-31"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded border">
                          December 31, 2024
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Independent Insurance Certificate Image View Component */}
                  <InsuranceCertificateImageView 
                    imageUrl={insuranceCert.url} 
                    isEditing={isEditing}
                  />
                  
                  <div className="text-sm text-gray-600">
                    <p>Uploaded: {insuranceCert.uploadDate}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default DriverDetailsSheet
