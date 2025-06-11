import React, { useState, useMemo, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DeliveryStatus } from "@/types/delivery";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Star, MapPin, Clock, Phone, X } from "lucide-react";
import DriverChatModal from "./DriverChatModal";
import { mockDrivers, Driver } from "@/data/driversData";

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
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-orange-100 text-orange-800";
      case "On Break":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  }, []);

  const onFiltersAdd = useCallback((filters: any) => {
    console.log("Filters updated:", filters);

    // Update all filter states when filters are applied
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

  const hasActiveFilters = useMemo(() => 
    selectedStatuses.length > 0 || 
    selectedZipcodes.length > 0 || 
    selectedCities.length > 0 || 
    selectedStates.length > 0 || 
    selectedProfiles.length > 0 || 
    selectedTransports.length > 0 || 
    selectedHireStatuses.length > 0 || 
    selectedNames.length > 0, [
    selectedStatuses.length,
    selectedZipcodes.length,
    selectedCities.length,
    selectedStates.length,
    selectedProfiles.length,
    selectedTransports.length,
    selectedHireStatuses.length,
    selectedNames.length
  ]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Send Order #{orderId} to Drivers</DialogTitle>
          </DialogHeader>
          
          <div className="flex h-[600px]">
            {/* Filter Sidebar */}
            <div className="w-[275px] border-r">
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

            {/* Drivers List */}
            <div className="flex-1 flex flex-col">
              {/* Active Filters */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Active Filters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                    <span>Radius: {selectedRadius} miles</span>
                    <button 
                      className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                      onClick={() => clearFilter('radius', '')}
                    >
                      &times;
                    </button>
                  </div>
                  {selectedNames.map(name => (
                    <div key={name} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Name: {name}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('name', name)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedStatuses.map(status => (
                    <div key={status} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Status: {status}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('status', status)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedZipcodes.map(zipcode => (
                    <div key={zipcode} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Zipcode: {zipcode}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('zipcode', zipcode)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedCities.map(city => (
                    <div key={city} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>City: {city}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('city', city)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedStates.map(state => (
                    <div key={state} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>State: {state}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('state', state)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedProfiles.map(profile => (
                    <div key={profile} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Profile: {profile}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('profile', profile)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedTransports.map(transport => (
                    <div key={transport} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Transport: {transport}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('transport', transport)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedHireStatuses.map(hireStatus => (
                    <div key={hireStatus} className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-3 text-sm flex items-center text-blue-700 dark:text-blue-200">
                      <span>Hire Status: {hireStatus}</span>
                      <button 
                        className="ml-2 text-blue-700 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100" 
                        onClick={() => clearFilter('hireStatus', hireStatus)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {mockDrivers.map(driver => {
                    const transportTypes = driver.transportType.split(',');
                    
                    return (
                      <div 
                        key={driver.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedDrivers.includes(driver.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} 
                        onClick={() => handleDriverSelect(driver.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={driver.avatar} />
                              <AvatarFallback className="text-xs">{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-sm truncate">{driver.name}</h4>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 py-0 text-xs hover:bg-blue-50"
                                    onClick={(e) => handleChatWithDriver(driver, e)}
                                  >
                                    Chat
                                  </Button>
                                  <Badge variant="outline" className={`text-xs px-1 py-0.5 ${getStatusColor(driver.status)}`}>
                                    {driver.status}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  {transportTypes.map((transportType, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center justify-center p-1 rounded bg-muted"
                                      title={transportType}
                                    >
                                      <TransportIcon 
                                        transportType={transportType.trim() as TransportType} 
                                        size={12} 
                                        className="h-3 w-3" 
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{driver.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate">{driver.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{driver.eta}</span>
                                  </div>
                                </div>
                                <span className="text-xs">{driver.totalDeliveries} deliveries</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Footer Actions */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">
                      {mockDrivers.length} driver(s) found • {selectedDrivers.length} driver(s) selected
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedDrivers.length === mockDrivers.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAssignToDriver} 
                      disabled={selectedDrivers.length !== 1}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Assign to driver
                    </Button>
                    <Button 
                      onClick={handleSendToSelected} 
                      disabled={selectedDrivers.length === 0}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Send to Selected ({selectedDrivers.length})
                    </Button>
                  </div>
                </div>
              </div>
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
