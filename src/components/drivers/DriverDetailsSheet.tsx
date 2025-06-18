import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Check, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EmailsSentList } from "@/components/drivers/EmailsSentList";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
  bio?: string;
  location?: string;
  vehicle?: string;
}

interface DriverDetailsSheetProps {
  driver: Driver;
  isOpen: boolean;
  onClose: () => void;
}

export const DriverDetailsSheet = ({ driver, isOpen, onClose }: DriverDetailsSheetProps) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingDedicatedCompanies, setIsEditingDedicatedCompanies] = useState(false);
  const [profileData, setProfileData] = useState({
    name: driver.name,
    email: driver.email,
    phone: driver.phone,
    bio: driver.bio || '',
    location: driver.location || '',
    vehicle: driver.vehicle || '',
  });
  const [dedicatedCompanies, setDedicatedCompanies] = useState(['Walmart', 'FedEx']); // Example data

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Save the profile data
    console.log('Saving profile:', profileData);
    // In a real app, this would make an API call to save the data
    setIsEditingProfile(false);
    toast.success("Profile updated successfully");
  };

  const handleEditDedicatedCompanies = () => {
    setIsEditingDedicatedCompanies(true);
  };

  const handleSaveDedicatedCompanies = () => {
    // Save the dedicated companies data
    console.log('Saving dedicated companies:', dedicatedCompanies);
    
    // In a real app, this would make an API call to save the data
    // For now, we'll just show a success message and exit edit mode
    setIsEditingDedicatedCompanies(false);
    toast.success("Dedicated companies saved successfully");
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setIsEditingDedicatedCompanies(false);
    // Reset profile data to the original driver data
    setProfileData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      bio: driver.bio || '',
      location: driver.location || '',
      vehicle: driver.vehicle || '',
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="pr-0">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            Make changes to your driver profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={driver.avatarUrl} alt={driver.name} />
              <AvatarFallback>{driver.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Badge variant="secondary">{driver.status}</Badge>
          </div>
          <Separator />
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              {!isEditingProfile ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleSaveProfile} className="text-green-500">
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="text-red-500">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Input
                  id="vehicle"
                  name="vehicle"
                  value={profileData.vehicle}
                  onChange={handleInputChange}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditingProfile}
                />
              </div>
            </CardContent>
          </Card>
          <Separator />
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Dedicated companies</CardTitle>
              {!isEditingDedicatedCompanies ? (
                <Button variant="ghost" size="sm" onClick={handleEditDedicatedCompanies}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Companies
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleSaveDedicatedCompanies} className="text-green-500">
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="text-red-500">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditingDedicatedCompanies ? (
                <div className="space-y-2">
                  {dedicatedCompanies.map((company, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={company}
                      onChange={(e) => {
                        const newCompanies = [...dedicatedCompanies];
                        newCompanies[index] = e.target.value;
                        setDedicatedCompanies(newCompanies);
                      }}
                    />
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setDedicatedCompanies([...dedicatedCompanies, ''])}>
                    Add Company
                  </Button>
                </div>
              ) : (
                <ul className="list-disc pl-5">
                  {dedicatedCompanies.map((company, index) => (
                    <li key={index}>{company}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Emails Sent</CardTitle>
              <CardDescription>List of emails sent to this driver</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailsSentList driverName={driver.name} />
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
