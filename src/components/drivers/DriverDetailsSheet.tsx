
import { useState } from "react"
import { Building2, Edit2, File, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface DriverDetailsSheetProps {
  driver: any // Replace with your driver type
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DriverDetailsSheet({ driver, open, onOpenChange }: DriverDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    // Implement save logic here
    setIsEditing(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Basic Information
              </h3>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  value={driver?.firstName || "John"}
                  readOnly
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  value={driver?.lastName || "Doe"}
                  readOnly
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  value={driver?.email || "john.doe@example.com"}
                  readOnly
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  value={driver?.phone || "123-456-7890"}
                  readOnly
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Bank Details
              </h3>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">City</Label>
                <Input 
                  value="New York" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Address 1</Label>
                <Input 
                  value="123 Main Street" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Address 2</Label>
                <Input 
                  value="Apt 4B" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">State</Label>
                <Input 
                  value="NY" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Zipcode</Label>
                <Input 
                  value="10001" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Birth Date</Label>
                <Input 
                  value="01/15/1985" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Route Number</Label>
                <Input 
                  value="021000021" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Account Number</Label>
                <Input 
                  value="****1234" 
                  readOnly 
                  className="bg-white"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Institution Number</Label>
                <Input 
                  value="123456789" 
                  readOnly 
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <File className="h-5 w-5" />
                Documents
              </h3>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Driver's License
                </Label>
                <Input
                  value="driver_license.pdf"
                  readOnly
                  className="bg-white"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Insurance
                </Label>
                <Input value="insurance.pdf" readOnly className="bg-white" />
              </div>
            </div>
          </div>

          {/* Awards Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Awards
              </h3>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Safe Driver Award
                </Label>
                <Input value="2022" readOnly className="bg-white" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Perfect Attendance
                </Label>
                <Input value="2023" readOnly className="bg-white" />
              </div>
            </div>
          </div>

          {/* Companies Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Companies</h3>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Company 1
                </Label>
                <Input value="ABC Logistics" readOnly className="bg-white" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Company 2
                </Label>
                <Input value="XYZ Transport" readOnly className="bg-white" />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
