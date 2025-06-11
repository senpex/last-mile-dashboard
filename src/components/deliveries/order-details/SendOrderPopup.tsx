
import React, { useState, useMemo, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeliveryStatus } from "@/types/delivery";
import DriverChatModal from "./DriverChatModal";
import { mockDrivers, Driver } from "@/data/driversData";
import { FilterSidebar } from "./popup/FilterSidebar";
import { ActiveFilters } from "./popup/ActiveFilters";
import { DriversList } from "./popup/DriversList";
import { PopupFooter } from "./popup/PopupFooter";

interface SendOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const SendOrderPopup = ({
  isOpen,
  onClose,
  orderId
}: SendOrderPopupProps) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedDriverForChat, setSelectedDriverForChat] = useState<Driver | null>(null);

  // Memoized static data
  const allDeliveryStatuses: DeliveryStatus[] = useMemo(() => 
    ["Available", "Busy", "On Break", "Offline", "Online"], []
  );
  
  const allZipcodes = useMemo(() => 
    ["94102", "94103", "94104", "94105", "94107", "94108"], []
  );
  
  const allCities = useMemo(() => 
    ["San Francisco", "Oakland", "Berkeley", "Daly City"], []
  );
  
  const allStates = useMemo(() => 
    ["California", "Nevada", "Oregon"], []
  );

  // Memoized event handlers
  const handleDriverSelect = useCallback((driverId: number) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId) 
        : [...prev, driverId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedDrivers.length === mockDrivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(mockDrivers.map(driver => driver.id));
    }
  }, [selectedDrivers.length]);

  const handleSendToSelected = useCallback(() => {
    if (selectedDrivers.length === 0) {
      alert("Please select at least one driver");
      return;
    }
    console.log(`Sending order ${orderId} to drivers:`, selectedDrivers);
    alert(`Order sent to ${selectedDrivers.length} driver(s)`);
    onClose();
  }, [selectedDrivers.length, orderId, onClose]);

  const handleChatWithDriver = useCallback((driver: Driver, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedDriverForChat(driver);
    setIsChatModalOpen(true);
  }, []);

  const handleAssignToDriver = useCallback(() => {
    if (selectedDrivers.length !== 1) {
      alert("Please select exactly one driver to assign");
      return;
    }
    const selectedDriver = mockDrivers.find(driver => driver.id === selectedDrivers[0]);
    console.log(`Assigning order ${orderId} to driver:`, selectedDriver?.name);
    alert(`Order assigned to ${selectedDriver?.name}`);
    onClose();
  }, [selectedDrivers, orderId, onClose]);

  const onFiltersAdd = useCallback((filters: any) => {
    console.log("Filters updated:", filters);

    if (filters.statuses !== undefined) {
      setSelectedStatuses(filters.statuses);
    }
    if (filters.zipcodes !== undefined) {
      setSelectedZipcodes(filters.zipcodes);
    }
    if (filters.cities !== undefined) {
      setSelectedCities(filters.cities);
    }
    if (filters.states !== undefined) {
      setSelectedStates(filters.states);
    }
    if (filters.profiles !== undefined) {
      setSelectedProfiles(filters.profiles);
    }
    if (filters.transports !== undefined) {
      setSelectedTransports(filters.transports);
    }
    if (filters.hireStatuses !== undefined) {
      setSelectedHireStatuses(filters.hireStatuses);
    }
    if (filters.radius !== undefined) {
      setSelectedRadius(filters.radius);
    }
    if (filters.names !== undefined) {
      setSelectedNames(filters.names);
    }
  }, []);

  const clearFilter = useCallback((type: string, value: string) => {
    switch (type) {
      case 'status':
        setSelectedStatuses(prev => prev.filter(s => s !== value));
        break;
      case 'zipcode':
        setSelectedZipcodes(prev => prev.filter(z => z !== value));
        break;
      case 'city':
        setSelectedCities(prev => prev.filter(c => c !== value));
        break;
      case 'state':
        setSelectedStates(prev => prev.filter(s => s !== value));
        break;
      case 'profile':
        setSelectedProfiles(prev => prev.filter(p => p !== value));
        break;
      case 'transport':
        setSelectedTransports(prev => prev.filter(t => t !== value));
        break;
      case 'hireStatus':
        setSelectedHireStatuses(prev => prev.filter(h => h !== value));
        break;
      case 'radius':
        setSelectedRadius(15);
        break;
      case 'name':
        setSelectedNames(prev => prev.filter(n => n !== value));
        break;
    }
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-7xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Send Order #{orderId} to Drivers</DialogTitle>
          </DialogHeader>
          
          <div className="flex h-[700px]">
            {/* Filter Sidebar - Fixed width */}
            <div className="w-80 flex-shrink-0">
              <FilterSidebar 
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

            {/* Main Content - Takes remaining space */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Active Filters */}
              <ActiveFilters
                selectedStatuses={selectedStatuses}
                selectedZipcodes={selectedZipcodes}
                selectedCities={selectedCities}
                selectedStates={selectedStates}
                selectedProfiles={selectedProfiles}
                selectedTransports={selectedTransports}
                selectedHireStatuses={selectedHireStatuses}
                selectedRadius={selectedRadius}
                selectedNames={selectedNames}
                onClearFilter={clearFilter}
              />

              {/* Drivers List */}
              <DriversList
                drivers={mockDrivers}
                selectedDrivers={selectedDrivers}
                onDriverSelect={handleDriverSelect}
                onChatWithDriver={handleChatWithDriver}
              />

              {/* Footer Actions */}
              <PopupFooter
                totalDrivers={mockDrivers.length}
                selectedCount={selectedDrivers.length}
                onSelectAll={handleSelectAll}
                onCancel={onClose}
                onAssignToDriver={handleAssignToDriver}
                onSendToSelected={handleSendToSelected}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DriverChatModal 
        open={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        driver={selectedDriverForChat}
      />
    </>
  );
};

export default SendOrderPopup;
