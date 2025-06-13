
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, FileText, CreditCard } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  address: string;
  transports: string[];
  rating: number;
  status: string;
  hireStatus: string;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  notes: string;
  profileTypes: string[];
}

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  transportTypes: {
    [key: string]: string;
  };
  statusDictionary: {
    [key: string]: string;
  };
  hireStatusDictionary: {
    [key: string]: string;
  };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
}

export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus
}: DriverDetailsSheetProps) => {
  if (!driver) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
        {/* Main Content with Flex Structure */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <SheetHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <SheetTitle className="text-left text-lg">{driver.name}</SheetTitle>
                  <SheetDescription className="text-left text-sm">
                    Driver ID: {driver.id}
                  </SheetDescription>
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 space-y-6">
            {/* Contact Information */}
            <div>
              <CardTitle className="text-lg flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={driver.name} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={driver.phone} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={driver.email} readOnly />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Information */}
            <div>
              <CardTitle className="text-lg flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipcode">Zipcode</Label>
                      <Input id="zipcode" value={driver.zipcode} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={driver.address} readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Information */}
            <div>
              <CardTitle className="text-lg mb-4">Status & Rating</CardTitle>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Current Status</Label>
                      <div className="mt-1">
                        {renderStatus(driver.status)}
                      </div>
                    </div>
                    <div>
                      <Label>Hire Status</Label>
                      <div className="mt-1">
                        <Badge variant="secondary">
                          {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Rating
                      </Label>
                      <div className="mt-1 text-lg font-semibold">
                        {driver.rating.toFixed(1)} / 5.0
                      </div>
                    </div>
                    <div>
                      <Label className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Stripe Status
                      </Label>
                      <div className="mt-1">
                        {renderStripeStatus(driver.stripeStatus)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Types */}
            <div>
              <CardTitle className="text-lg mb-4">Profile Types</CardTitle>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {driver.profileTypes && driver.profileTypes.length > 0 ? 
                      driver.profileTypes.map(type => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      )) : 
                      <span className="text-muted-foreground text-sm">No profile types assigned</span>
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transport Types */}
            <div>
              <CardTitle className="text-lg mb-4">Transport Types</CardTitle>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    {driver.transports.map(transportId => (
                      <div key={transportId} className="flex items-center gap-2 p-2 border rounded-lg">
                        <TransportIcon transportType={transportId as TransportType} size={16} className="h-4 w-4" />
                        <span className="text-sm">
                          {transportTypes[transportId] || `Transport ${transportId}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            <div>
              <CardTitle className="text-lg flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5" />
                Notes
              </CardTitle>
              <Card>
                <CardContent className="pt-6">
                  <Textarea 
                    placeholder="Add notes about this driver..." 
                    value={driver.notes || ''} 
                    className="min-h-[100px]" 
                    readOnly 
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-3 p-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Edit Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
