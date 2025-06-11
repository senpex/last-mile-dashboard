
import React from 'react';
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DeliveryStatus } from "@/types/delivery";

interface FilterSidebarProps {
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<DeliveryStatus[]>>;
  allDeliveryStatuses: DeliveryStatus[];
  selectedZipcodes: string[];
  setSelectedZipcodes: React.Dispatch<React.SetStateAction<string[]>>;
  allZipcodes: string[];
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
  allCities: string[];
  selectedStates: string[];
  setSelectedStates: React.Dispatch<React.SetStateAction<string[]>>;
  allStates: string[];
  onFiltersAdd: (filters: any) => void;
}

export const FilterSidebar = ({
  selectedStatuses,
  setSelectedStatuses,
  allDeliveryStatuses,
  selectedZipcodes,
  setSelectedZipcodes,
  allZipcodes,
  selectedCities,
  setSelectedCities,
  allCities,
  selectedStates,
  setSelectedStates,
  allStates,
  onFiltersAdd
}: FilterSidebarProps) => {
  return (
    <div className="w-72 border-r bg-background flex-shrink-0">
      <DriversSidebar 
        open={true} 
        onClose={() => {}} 
        selectedStatuses={selectedStatuses} 
        setSelectedStatuses={setSelectedStatuses} 
        allDeliveryStatuses={allDeliveryStatuses} 
        allZipcodes={allZipcodes} 
        selectedZipcodes={selectedZipcodes} 
        setSelectedZipcodes={setSelectedZipcodes} 
        allCities={allCities} 
        selectedCities={selectedCities} 
        setSelectedCities={setSelectedCities} 
        allStates={allStates} 
        selectedStates={selectedStates} 
        setSelectedStates={setSelectedStates} 
        onFiltersAdd={onFiltersAdd} 
      />
    </div>
  );
};
