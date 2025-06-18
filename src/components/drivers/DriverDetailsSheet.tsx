
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DriverBasicInfo } from './driver-details/DriverBasicInfo';
import { DriverVehicleInfo } from './driver-details/DriverVehicleInfo';
import { DriverDocuments } from './driver-details/DriverDocuments';
import { DriverNotes } from './driver-details/DriverNotes';

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
}

export const DriverDetailsSheet: React.FC<DriverDetailsSheetProps> = ({
  isOpen,
  onClose,
  driver
}) => {
  if (!driver) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold">
                {driver.firstName} {driver.lastName}
              </SheetTitle>
              <SheetDescription>
                Driver ID: {driver.id}
              </SheetDescription>
            </div>
            {getStatusBadge(driver.status)}
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <DriverBasicInfo driver={driver} />
            </TabsContent>

            <TabsContent value="vehicle" className="mt-6">
              <DriverVehicleInfo driver={driver} />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <DriverDocuments driver={driver} />
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <DriverNotes driver={driver} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
