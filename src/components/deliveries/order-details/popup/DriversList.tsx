
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriverCard } from './DriverCard';
import { Driver } from "@/data/driversData";

interface DriversListProps {
  drivers: Driver[];
  selectedDrivers: number[];
  onDriverSelect: (driverId: number) => void;
  onChatWithDriver: (driver: Driver, event: React.MouseEvent) => void;
}

export function DriversList({ 
  drivers, 
  selectedDrivers, 
  onDriverSelect, 
  onChatWithDriver 
}: DriversListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-3">
        {drivers.map(driver => (
          <DriverCard
            key={driver.id}
            driver={driver}
            isSelected={selectedDrivers.includes(driver.id)}
            onSelect={onDriverSelect}
            onChatWithDriver={onChatWithDriver}
          />
        ))}
        {drivers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No drivers found matching the current filters
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
