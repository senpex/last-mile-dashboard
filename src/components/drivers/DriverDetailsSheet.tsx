
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriverBasicInfo } from './driver-details/DriverBasicInfo';
import { DriverVehicleInfo } from './driver-details/DriverVehicleInfo';
import { DriverDocuments } from './driver-details/DriverDocuments';
import { DriverNotes } from './driver-details/DriverNotes';

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  renderStatus: (status: string) => React.ReactNode;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => React.ReactNode;
}

export const DriverDetailsSheet: React.FC<DriverDetailsSheetProps> = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  renderStatus,
  renderStripeStatus
}) => {
  const handleNotesUpdate = (notes: string) => {
    // Handle notes update logic here
    console.log('Notes updated:', notes);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Driver Details</SheetTitle>
          <SheetDescription>
            View and manage driver information
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-4">
            <DriverBasicInfo 
              driver={driver}
              renderStatus={renderStatus}
              renderStripeStatus={renderStripeStatus}
            />
            
            <DriverVehicleInfo 
              driver={driver}
              transportTypes={transportTypes}
            />
            
            <DriverDocuments driver={driver} />
            
            <DriverNotes 
              driver={driver}
              onNotesUpdate={handleNotesUpdate}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
