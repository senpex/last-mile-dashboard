
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserRound, Eye, EyeOff, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface DriverProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  statusColors: { [key: string]: string };
}

export const DriverProfileSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  statusColors
}: DriverProfileSheetProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  if (!driver) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl md:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Profile - {driver.name}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Profile Photo and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UserRound className="w-16 h-16 text-primary" />
              </div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Name</label>
                  <Input defaultValue={driver.name} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Email</label>
                  <Input defaultValue={driver.email} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Phone</label>
                  <Input defaultValue={driver.phone} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Zip Code</label>
                  <Input defaultValue={driver.zipcode} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Address</label>
                <Textarea defaultValue={driver.address} className="min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* Driver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Transport Types</label>
                <div className="flex flex-wrap gap-2">
                  {driver.transports.map((transportId: string) => (
                    <div key={transportId} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                      <TransportIcon transportType={transportId as TransportType} size={16} />
                      <span className="text-sm">{transportTypes[transportId] || transportId}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Profile Types</label>
                <div className="flex flex-wrap gap-1">
                  {driver.profileTypes && Array.isArray(driver.profileTypes) ? 
                    driver.profileTypes.map((type: string) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    )) : 
                    <span className="text-muted-foreground text-sm">No profiles assigned</span>
                  }
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Status</label>
                <Badge 
                  variant="secondary" 
                  className="text-white"
                  style={{ backgroundColor: statusColors[driver.status] || '#6B7280' }}
                >
                  {statusDictionary[driver.status] || 'Unknown'}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold">{driver.rating}</span>
                  <span className="text-muted-foreground">/5</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Hire Status</label>
                <Badge variant="outline">
                  {driver.hireStatus === 'hired' ? 'Hired' : 'Available'}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Stripe Status</label>
                <Badge 
                  variant={driver.stripeStatus === 'verified' ? 'default' : 'secondary'}
                  className={driver.stripeStatus === 'verified' ? 'bg-green-500' : ''}
                >
                  {driver.stripeStatus || 'Unverified'}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Notes</label>
                <Textarea 
                  defaultValue={driver.notes || ''} 
                  placeholder="Add notes about this driver..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-medium">Change Password</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-sm font-medium block mb-1">Current Password</label>
                <div className="relative">
                  <Input 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="Enter current password" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2"></div>
              
              <div className="relative">
                <label className="text-sm font-medium block mb-1">New Password</label>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => togglePasswordVisibility(setShowNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <label className="text-sm font-medium block mb-1">Confirm New Password</label>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm new password" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
