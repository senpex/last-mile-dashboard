
import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Mail, Phone, MapPin, Star, Calendar, Car } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface DriverProfileDrawerProps {
  driver: any | null;
  isOpen: boolean;
  onClose: () => void;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  statusColors: { [key: string]: string };
  renderRating: (rating: number) => JSX.Element;
}

export const DriverProfileDrawer = ({
  driver,
  isOpen,
  onClose,
  transportTypes,
  statusDictionary,
  statusColors,
  renderRating
}: DriverProfileDrawerProps) => {
  if (!driver) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] max-w-md ml-auto mr-0">
        <DrawerHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DrawerTitle className="text-xl font-semibold">Driver Profile</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">
                  {driver.name?.charAt(0)?.toUpperCase() || 'D'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">ID: {driver.id}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{driver.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{driver.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{driver.zipcode}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Address</h4>
            <p className="text-sm">{driver.address || "No address provided"}</p>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Rating</h4>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              {renderRating(driver.rating)}
            </div>
          </div>

          {/* Transport Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Transport Types</h4>
            <div className="flex flex-wrap gap-2">
              {driver.transports?.map((transportId: string) => (
                <div 
                  key={transportId} 
                  className="flex items-center gap-2 p-2 rounded-md bg-muted"
                  title={transportTypes[transportId] || `Transport ID: ${transportId}`}
                >
                  <TransportIcon 
                    transportType={transportId as TransportType} 
                    size={16} 
                    className="h-4 w-4" 
                  />
                  <span className="text-xs">
                    {transportTypes[transportId] || transportId}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Status</h4>
            <Badge 
              variant="secondary"
              style={{ 
                backgroundColor: statusColors[driver.status] || '#gray', 
                color: 'white' 
              }}
            >
              {statusDictionary[driver.status] || driver.status}
            </Badge>
          </div>

          {/* Profile Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Profile Types</h4>
            <div className="flex flex-wrap gap-1">
              {driver.profileTypes && Array.isArray(driver.profileTypes) ? 
                driver.profileTypes.map((type: string) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                )) : 
                <span className="text-muted-foreground text-xs">No profiles</span>
              }
            </div>
          </div>

          {/* Notes */}
          {driver.notes && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Notes</h4>
              <p className="text-sm bg-muted p-3 rounded-md">{driver.notes}</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
