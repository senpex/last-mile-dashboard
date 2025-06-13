import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
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
      <SheetContent className="w-[1200px] sm:max-w-[1200px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{driver.name}</h2>
              <p className="text-sm text-muted-foreground">Driver ID: {driver.id}</p>
            </div>
          </SheetTitle>
          <SheetDescription>
            View and edit driver profile information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

          {/* Status Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status & Rating</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

          {/* Profile Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {driver.profileTypes && driver.profileTypes.length > 0 ? (
                  driver.profileTypes.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">No profile types assigned</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transport Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transport Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {driver.transports.map((transportId) => (
                  <div key={transportId} className="flex items-center gap-2 p-2 border rounded-lg">
                    <TransportIcon 
                      transportType={transportId as TransportType} 
                      size={16} 
                      className="h-4 w-4" 
                    />
                    <span className="text-sm">
                      {transportTypes[transportId] || `Transport ${transportId}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Add notes about this driver..."
                value={driver.notes || ''}
                className="min-h-[100px]"
                readOnly
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-6">
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
