
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

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Busy":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "On Break":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Offline":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  }, []);

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
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 flex flex-col">
          <DialogHeader className="p-6 pb-4 flex-shrink-0 border-b">
            <DialogTitle className="text-xl font-semibold">
              Send Order #{orderId} to Drivers
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <FilterSidebar
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              allDeliveryStatuses={allDeliveryStatuses}
              selectedZipcodes={selectedZipcodes}
              setSelectedZipcodes={setSelectedZipcodes}
              allZipcodes={allZipcodes}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              allCities={allCities}
              selectedStates={selectedStates}
              setSelectedStates={setSelectedStates}
              allStates={allStates}
              onFiltersAdd={onFiltersAdd}
            />

            <div className="flex-1 flex flex-col min-h-0">
              <ActiveFilters
                selectedRadius={selectedRadius}
                selectedNames={selectedNames}
                selectedStatuses={selectedStatuses}
                selectedZipcodes={selectedZipcodes}
                selectedCities={selectedCities}
                selectedStates={selectedStates}
                selectedProfiles={selectedProfiles}
                selectedTransports={selectedTransports}
                selectedHireStatuses={selectedHireStatuses}
                clearFilter={clearFilter}
              />

              <DriversList
                drivers={mockDrivers}
                selectedDrivers={selectedDrivers}
                onDriverSelect={handleDriverSelect}
                onChatWithDriver={handleChatWithDriver}
                getStatusColor={getStatusColor}
              />

              <PopupFooter
                totalDrivers={mockDrivers.length}
                selectedDriversCount={selectedDrivers.length}
                onSelectAll={handleSelectAll}
                onClose={onClose}
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
