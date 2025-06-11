
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriverCard } from './DriverCard';
import { Driver } from "@/data/driversData";

interface DriversListProps {
  drivers: Driver[];
  selectedDrivers: number[];
  onDriverSelect: (driverId: number) => void;
  onChatWithDriver: (driver: Driver, event: React.MouseEvent) => void;
  getStatusColor: (status: string) => string;
}

export const DriversList = ({
  drivers,
  selectedDrivers,
  onDriverSelect,
  onChatWithDriver,
  getStatusColor
}: DriversListProps) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {drivers.map(driver => (
            <DriverCard
              key={driver.id}
              driver={driver}
              isSelected={selectedDrivers.includes(driver.id)}
              onSelect={() => onDriverSelect(driver.id)}
              onChatWithDriver={onChatWithDriver}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
