
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DeliveryStatus } from "@/types/delivery";
import { Star, MapPin, Clock, Phone, X } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  rating: number;
  status: string;
  location: string;
  distance: string;
  eta: string;
  phone: string;
  avatar?: string;
  transportType: string;
  totalDeliveries: number;
}

interface SendOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const SendOrderPopup = ({ isOpen, onClose, orderId }: SendOrderPopupProps) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);

  // Mock drivers data
  const [drivers] = useState<Driver[]>([
    {
      id: 1,
      name: "John Smith",
      rating: 4.8,
      status: "Available",
      location: "Downtown SF",
      distance: "2.1 miles",
      eta: "8 min",
      phone: "+1 (555) 123-4567",
      transportType: "Motorcycle",
      totalDeliveries: 1234
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rating: 4.9,
      status: "Available",
      location: "Mission District",
      distance: "3.5 miles",
      eta: "12 min",
      phone: "+1 (555) 987-6543",
      transportType: "Car",
      totalDeliveries: 856
    },
    {
      id: 3,
      name: "David Chen",
      rating: 4.7,
      status: "Busy",
      location: "SOMA",
      distance: "1.8 miles",
      eta: "15 min",
      phone: "+1 (555) 456-7890",
      transportType: "Bicycle",
      totalDeliveries: 2103
    },
    {
      id: 4,
      name: "Sarah Johnson",
      rating: 4.6,
      status: "Available",
      location: "Financial District",
      distance: "4.2 miles",
      eta: "18 min",
      phone: "+1 (555) 321-0987",
      transportType: "Van",
      totalDeliveries: 678
    }
  ]);

  const allDeliveryStatuses: DeliveryStatus[] = [
    "Available", "Busy", "On Break", "Offline", "Online"
  ];

  const allZipcodes = ["94102", "94103", "94104", "94105", "94107", "94108"];
  const allCities = ["San Francisco", "Oakland", "Berkeley", "Daly City"];
  const allStates = ["California", "Nevada", "Oregon"];

  const handleDriverSelect = (driverId: number) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  const handleSendToSelected = () => {
    if (selectedDrivers.length === 0) {
      alert("Please select at least one driver");
      return;
    }
    
    console.log(`Sending order ${orderId} to drivers:`, selectedDrivers);
    alert(`Order sent to ${selectedDrivers.length} driver(s)`);
    onClose();
  };

  const getStatusColor = (status: string) => {
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
  };

  const onFiltersAdd = (filters: any) => {
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
  };

  const clearFilter = (type: string, value: string) => {
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
    }
  };

  const clearAllFilters = () => {
    setSelectedStatuses([]);
    setSelectedZipcodes([]);
    setSelectedCities([]);
    setSelectedStates([]);
    setSelectedProfiles([]);
    setSelectedTransports([]);
    setSelectedHireStatuses([]);
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedZipcodes.length > 0 || selectedCities.length > 0 || selectedStates.length > 0 || selectedProfiles.length > 0 || selectedTransports.length > 0 || selectedHireStatuses.length > 0;

  return (
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
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Available Drivers ({drivers.length})</h3>
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedDrivers.length}
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs h-6 px-2"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedStatuses.map((status) => (
                      <Badge key={status} variant="secondary" className="text-xs">
                        Status: {status}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('status', status)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedProfiles.map((profile) => (
                      <Badge key={profile} variant="secondary" className="text-xs">
                        Profile: {profile}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('profile', profile)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedTransports.map((transport) => (
                      <Badge key={transport} variant="secondary" className="text-xs">
                        Transport: {transport}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('transport', transport)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedHireStatuses.map((status) => (
                      <Badge key={status} variant="secondary" className="text-xs">
                        Hire Status: {status}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('hireStatus', status)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedCities.map((city) => (
                      <Badge key={city} variant="secondary" className="text-xs">
                        City: {city}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('city', city)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedStates.map((state) => (
                      <Badge key={state} variant="secondary" className="text-xs">
                        State: {state}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('state', state)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedZipcodes.map((zipcode) => (
                      <Badge key={zipcode} variant="secondary" className="text-xs">
                        Zipcode: {zipcode}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-3 w-3 p-0"
                          onClick={() => clearFilter('zipcode', zipcode)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedDrivers.includes(driver.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleDriverSelect(driver.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={driver.avatar} />
                          <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{driver.name}</h4>
                            <Badge variant="outline" className={getStatusColor(driver.status)}>
                              {driver.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{driver.rating}</span>
                            <span>•</span>
                            <span>{driver.totalDeliveries} deliveries</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{driver.location} • {driver.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {driver.eta}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{driver.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {driver.transportType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {selectedDrivers.length} driver(s) selected
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendToSelected}
                    disabled={selectedDrivers.length === 0}
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
  );
};
