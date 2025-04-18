import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeliveryStatus } from "@/types/delivery";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
interface DriversSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: (statuses: DeliveryStatus[]) => void;
  allDeliveryStatuses: DeliveryStatus[];
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
  allCities: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allStates: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  onFiltersAdd: (filters: {
    statuses: DeliveryStatus[];
    zipcodes: string[];
    cities: string[];
    states: string[];
    profiles?: string[];
    transports?: string[];
    hireStatuses?: string[];
  }) => void;
}
export function DriversSidebar({
  open,
  onClose,
  selectedStatuses,
  setSelectedStatuses,
  allDeliveryStatuses,
  allZipcodes,
  selectedZipcodes,
  setSelectedZipcodes,
  allCities,
  selectedCities,
  setSelectedCities,
  allStates,
  selectedStates,
  setSelectedStates,
  onFiltersAdd
}: DriversSidebarProps) {
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [transportTypes, setTransportTypes] = useState<{
    id: string;
    value: string;
    icon?: string;
  }[]>([]);
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [transportSearchTerm, setTransportSearchTerm] = useState("");
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");
  const [hireStatusSearchTerm, setHireStatusSearchTerm] = useState("");
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [hireStatusOptions, setHireStatusOptions] = useState<{
    id: string;
    value: string;
    description?: string;
  }[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('drivers');
  useEffect(() => {
    const transportDict = getDictionary("2");
    const hireStatusDict = getDictionary("1455");
    if (transportDict) {
      setTransportTypes(transportDict.items);
    }
    if (hireStatusDict) {
      setHireStatusOptions(hireStatusDict.items);
    }
  }, []);
  useEffect(() => {
    updateFilters();
  }, [selectedStatuses, selectedZipcodes, selectedCities, selectedStates, selectedProfiles, selectedTransports, selectedHireStatuses]);
  const handleStatusChange = (status: DeliveryStatus) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  const handleTransportChange = (transportId: string) => {
    if (selectedTransports.includes(transportId)) {
      setSelectedTransports(selectedTransports.filter(t => t !== transportId));
    } else {
      setSelectedTransports([...selectedTransports, transportId]);
    }
  };
  const handleZipcodeChange = (zipcode: string) => {
    if (selectedZipcodes.includes(zipcode)) {
      setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
    } else {
      setSelectedZipcodes([...selectedZipcodes, zipcode]);
    }
  };
  const handleHireStatusChange = (status: string) => {
    if (selectedHireStatuses.includes(status)) {
      setSelectedHireStatuses(selectedHireStatuses.filter(s => s !== status));
    } else {
      setSelectedHireStatuses([...selectedHireStatuses, status]);
    }
  };
  const handleProfileChange = (profile: string, checked: boolean) => {
    if (checked) {
      setSelectedProfiles([...selectedProfiles, profile]);
    } else {
      setSelectedProfiles(selectedProfiles.filter(p => p !== profile));
    }
  };
  const handleCityChange = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };
  const handleStateChange = (state: string) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter(s => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };
  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedTransports([]);
    setSelectedZipcodes([]);
    setSelectedProfiles([]);
    setSelectedCities([]);
    setSelectedStates([]);
    setSelectedHireStatuses([]);
  };
  const updateFilters = () => {
    onFiltersAdd({
      statuses: selectedStatuses,
      zipcodes: selectedZipcodes,
      cities: selectedCities,
      states: selectedStates,
      profiles: selectedProfiles,
      transports: selectedTransports,
      hireStatuses: selectedHireStatuses
    });
  };
  const handleSaveFilters = () => {
    updateFilters();
  };
  const getProfileCount = (profileId: string) => {
    return Math.floor(Math.random() * 20) + 1;
  };
  const getStatusCount = (status: DeliveryStatus) => {
    return allDeliveryStatuses.filter(s => s === status).length;
  };
  const getZipcodeCount = (zipcode: string) => {
    return allZipcodes.filter(z => z === zipcode).length;
  };
  const getTransportCount = (transportId: string) => {
    return transportTypes.filter(t => t.id === transportId).length;
  };
  const getCityCount = (city: string) => {
    return Math.floor(Math.random() * 20) + 1;
  };
  const getStateCount = (state: string) => {
    return Math.floor(Math.random() * 20) + 1;
  };
  const getHireStatusCount = (statusId: string) => {
    return Math.floor(Math.random() * 15) + 1;
  };
  const filteredDeliveryStatuses = allDeliveryStatuses.filter(status => !["Picking Up", "In Transit", "Arrived For Pickup", "Dropoff Complete", "Scheduled Order", "Canceled By Customer", "Cancelled By Admin"].includes(status) && status.toLowerCase().includes(statusSearchTerm.toLowerCase()));
  const filteredTransportTypes = transportTypes.filter(transport => transport.value.toLowerCase().includes(transportSearchTerm.toLowerCase()));
  const filteredZipcodes = allZipcodes.filter(zipcode => zipcode.toLowerCase().includes(zipcodeSearchTerm.toLowerCase()));
  const hireStatuses = [{
    id: 'active',
    value: 'Active'
  }, {
    id: 'pending',
    value: 'Pending'
  }, {
    id: 'suspended',
    value: 'Suspended'
  }, {
    id: 'inactive',
    value: 'Inactive'
  }];
  const filteredHireStatuses = hireStatusOptions.filter(status => status.value.toLowerCase().includes(hireStatusSearchTerm.toLowerCase()));
  const driverProfiles = [{
    id: 'courier',
    value: 'Courier'
  }, {
    id: 'mover',
    value: 'Mover'
  }, {
    id: 'helper',
    value: 'Helper'
  }];
  const filteredProfiles = driverProfiles.filter(profile => profile.value.toLowerCase().includes(profileSearchTerm.toLowerCase()));
  const filteredCities = allCities.filter(city => city.toLowerCase().includes(citySearchTerm.toLowerCase()));
  const filteredStates = allStates.filter(state => state.toLowerCase().includes(stateSearchTerm.toLowerCase()));
  const getTitle = () => {
    switch (activeTab) {
      case 'drivers':
        return 'Filter Drivers';
      case 'clients':
        return 'Filter Clients';
      case 'groups':
        return 'Filter Dispatchers';
      default:
        return 'Filter';
    }
  };
  return <div className={cn("h-full bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all duration-300", "border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md", open ? "w-[275px] max-w-[80vw] opacity-100 visible" : "w-0 opacity-0 invisible overflow-hidden")}>
    <div className="p-6 w-full h-full flex flex-col overflow-y-auto mx-0 px-[20px]">
      <h2 className="text-lg font-semibold mb-4 px-0 py-[15px] my-[9px]">{getTitle()}</h2>
      
      <ScrollArea className="flex-1 -mr-4 pr-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="profile" className="border-b">
            <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
              Profile Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search profiles..." value={profileSearchTerm} onChange={e => setProfileSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredProfiles.map(profile => <div key={profile.id} className="flex items-center space-x-2">
                    <Checkbox id={`profile-${profile.id}`} checked={selectedProfiles.includes(profile.id)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedProfiles([...selectedProfiles, profile.id]);
                    } else {
                      setSelectedProfiles(selectedProfiles.filter(p => p !== profile.id));
                    }
                  }} />
                    <Label htmlFor={`profile-${profile.id}`} className="flex flex-1 items-center justify-between">
                      <span>{profile.value}</span>
                      <Badge variant="outline" className="ml-auto">{getProfileCount(profile.id)}</Badge>
                    </Label>
                  </div>)}
                {filteredProfiles.length === 0 && <p className="text-sm text-muted-foreground">No matching profiles found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="status-filters">
            <AccordionTrigger className="text-sm font-medium">
              Status
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search status..." value={statusSearchTerm} onChange={e => setStatusSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredDeliveryStatuses.map(status => <div key={status} className="flex items-center space-x-2">
                    <Checkbox id={`status-${status}`} checked={selectedStatuses.includes(status)} onCheckedChange={() => handleStatusChange(status)} />
                    <label htmlFor={`status-${status}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                      <span>{status}</span>
                      <Badge variant="outline" className="ml-auto">{getStatusCount(status)}</Badge>
                    </label>
                  </div>)}
                {filteredDeliveryStatuses.length === 0 && <p className="text-sm text-muted-foreground">No matching statuses found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hireStatus">
            <AccordionTrigger className="text-sm font-medium">
              Hire Status
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search hire status..." value={hireStatusSearchTerm} onChange={e => setHireStatusSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredHireStatuses.map(status => <div key={status.id} className="flex items-center space-x-2">
                    <Checkbox id={`hire-status-${status.id}`} checked={selectedHireStatuses.includes(status.id)} onCheckedChange={() => handleHireStatusChange(status.id)} />
                    <label htmlFor={`hire-status-${status.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between" title={status.description || ''}>
                      <span>{status.value}</span>
                      <Badge variant="outline" className="ml-auto">{getHireStatusCount(status.id)}</Badge>
                    </label>
                  </div>)}
                {filteredHireStatuses.length === 0 && <p className="text-sm text-muted-foreground">No hire statuses match your search</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transport-filters">
            <AccordionTrigger className="text-sm font-medium">
              Transport Types
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transport type..." value={transportSearchTerm} onChange={e => setTransportSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredTransportTypes.map(transport => <div key={transport.id} className="flex items-center space-x-2">
                    <Checkbox id={`transport-${transport.id}`} checked={selectedTransports.includes(transport.id)} onCheckedChange={() => handleTransportChange(transport.id)} />
                    <label htmlFor={`transport-${transport.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                      <span className="flex items-center gap-2">
                        {transport.icon && <TransportIcon transportType={transport.icon as TransportType} size={16} className="shrink-0" />}
                        {transport.value}
                      </span>
                      <Badge variant="outline" className="ml-auto shrink-0">{getTransportCount(transport.id)}</Badge>
                    </label>
                  </div>)}
                {filteredTransportTypes.length === 0 && <p className="text-sm text-muted-foreground">No matching transport types found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="city-filters">
            <AccordionTrigger className="text-sm font-medium">
              Cities
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search cities..." value={citySearchTerm} onChange={e => setCitySearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredCities.map(city => <div key={city} className="flex items-center space-x-2">
                    <Checkbox id={`city-${city}`} checked={selectedCities.includes(city)} onCheckedChange={() => {
                    if (selectedCities.includes(city)) {
                      setSelectedCities(selectedCities.filter(c => c !== city));
                    } else {
                      setSelectedCities([...selectedCities, city]);
                    }
                  }} />
                    <label htmlFor={`city-${city}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                      <span>{city}</span>
                      <Badge variant="outline" className="ml-auto">{getCityCount(city)}</Badge>
                    </label>
                  </div>)}
                {filteredCities.length === 0 && <p className="text-sm text-muted-foreground">No matching cities found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="state-filters">
            <AccordionTrigger className="text-sm font-medium">
              States
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search states..." value={stateSearchTerm} onChange={e => setStateSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredStates.map(state => <div key={state} className="flex items-center space-x-2">
                    <Checkbox id={`state-${state}`} checked={selectedStates.includes(state)} onCheckedChange={() => {
                    if (selectedStates.includes(state)) {
                      setSelectedStates(selectedStates.filter(s => s !== state));
                    } else {
                      setSelectedStates([...selectedStates, state]);
                    }
                  }} />
                    <label htmlFor={`state-${state}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                      <span>{state}</span>
                      <Badge variant="outline" className="ml-auto">{getStateCount(state)}</Badge>
                    </label>
                  </div>)}
                {filteredStates.length === 0 && <p className="text-sm text-muted-foreground">No matching states found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="zipcode-filters">
            <AccordionTrigger className="text-sm font-medium">
              Zipcodes
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search zipcode..." value={zipcodeSearchTerm} onChange={e => setZipcodeSearchTerm(e.target.value)} className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                </div>
                {filteredZipcodes.map(zipcode => <div key={zipcode} className="flex items-center space-x-2">
                    <Checkbox id={`zipcode-${zipcode}`} checked={selectedZipcodes.includes(zipcode)} onCheckedChange={() => {
                    if (selectedZipcodes.includes(zipcode)) {
                      setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
                    } else {
                      setSelectedZipcodes([...selectedZipcodes, zipcode]);
                    }
                  }} />
                    <label htmlFor={`zipcode-${zipcode}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                      <span>{zipcode}</span>
                      <Badge variant="outline" className="ml-auto">{getZipcodeCount(zipcode)}</Badge>
                    </label>
                  </div>)}
                {filteredZipcodes.length === 0 && <p className="text-sm text-muted-foreground">No matching zipcodes found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="mt-4 pt-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1 gap-1" onClick={handleResetFilters}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button className="flex-1 gap-1" onClick={handleSaveFilters}>
          <Save className="h-4 w-4" />
          Apply
        </Button>
      </div>
    </div>
  </div>;
}