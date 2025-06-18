
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Save, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DeliveryStatus } from "@/types/delivery";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface CommunicationFiltersSidebarProps {
  activeTab: string;
  onFiltersAdd: (filters: any) => void;
  open: boolean;
  onClose: () => void;
  
  // Driver filters
  selectedStatuses?: DeliveryStatus[];
  setSelectedStatuses?: (statuses: DeliveryStatus[]) => void;
  selectedZipcodes?: string[];
  setSelectedZipcodes?: (zipcodes: string[]) => void;
  selectedCities?: string[];
  setSelectedCities?: (cities: string[]) => void;
  selectedStates?: string[];
  setSelectedStates?: (states: string[]) => void;
  selectedProfiles?: string[];
  setSelectedProfiles?: (profiles: string[]) => void;
  selectedTransports?: string[];
  setSelectedTransports?: (transports: string[]) => void;
  selectedHireStatuses?: string[];
  setSelectedHireStatuses?: (hireStatuses: string[]) => void;
  selectedRadius?: number;
  setSelectedRadius?: (radius: number) => void;
  selectedNames?: string[];
  setSelectedNames?: (names: string[]) => void;
  
  // Client filters
  selectedOrganizations?: string[];
  setSelectedOrganizations?: (organizations: string[]) => void;
  selectedClientNames?: string[];
  setSelectedClientNames?: (names: string[]) => void;
  
  // Dispatcher filters
  selectedDispatchers?: string[];
  setSelectedDispatchers?: (dispatchers: string[]) => void;
  
  // Data arrays
  allDeliveryStatuses?: DeliveryStatus[];
  allZipcodes?: string[];
  allCities?: string[];
  allStates?: string[];
  allOrganizations?: string[];
  allDispatchers?: string[];
  allClientNames?: string[];
}

export const CommunicationFiltersSidebar = ({
  activeTab,
  onFiltersAdd,
  open,
  onClose,
  selectedStatuses = [],
  setSelectedStatuses,
  selectedZipcodes = [],
  setSelectedZipcodes,
  selectedCities = [],
  setSelectedCities,
  selectedStates = [],
  setSelectedStates,
  selectedProfiles = [],
  setSelectedProfiles,
  selectedTransports = [],
  setSelectedTransports,
  selectedHireStatuses = [],
  setSelectedHireStatuses,
  selectedRadius = 15,
  setSelectedRadius,
  selectedNames = [],
  setSelectedNames,
  selectedOrganizations = [],
  setSelectedOrganizations,
  selectedClientNames = [],
  setSelectedClientNames,
  selectedDispatchers = [],
  setSelectedDispatchers,
  allDeliveryStatuses = [],
  allZipcodes = [],
  allCities = [],
  allStates = [],
  allOrganizations = [],
  allDispatchers = [],
  allClientNames = []
}: CommunicationFiltersSidebarProps) => {
  const [transportTypes, setTransportTypes] = useState<{
    id: string;
    value: string;
    icon?: string;
  }[]>([]);
  const [hireStatusOptions, setHireStatusOptions] = useState<{
    id: string;
    value: string;
    description?: string;
  }[]>([]);

  // Search terms
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [transportSearchTerm, setTransportSearchTerm] = useState("");
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");
  const [hireStatusSearchTerm, setHireStatusSearchTerm] = useState("");
  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [orgSearchTerm, setOrgSearchTerm] = useState("");
  const [dispatcherSearchTerm, setDispatcherSearchTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [clientNameSearchTerm, setClientNameSearchTerm] = useState("");

  // Mock driver names data
  const driverNames = [
    "John Smith", "Maria Rodriguez", "David Chen", "Sarah Johnson", 
    "Michael Brown", "Jennifer Garcia", "Robert Davis", "Lisa Wilson",
    "James Miller", "Ashley Martinez", "Christopher Anderson", "Amanda Taylor"
  ];

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

  // Auto-apply filters when they change
  useEffect(() => {
    if (activeTab === "drivers") {
      onFiltersAdd({
        statuses: selectedStatuses,
        transports: selectedTransports,
        zipcodes: selectedZipcodes,
        profiles: selectedProfiles,
        cities: selectedCities,
        states: selectedStates,
        hireStatuses: selectedHireStatuses,
        names: selectedNames,
        radius: selectedRadius
      });
    } else if (activeTab === "clients") {
      onFiltersAdd({
        cities: selectedCities,
        states: selectedStates,
        zipcodes: selectedZipcodes,
        organizations: selectedOrganizations,
        clientNames: selectedClientNames
      });
    } else if (activeTab === "groups") {
      onFiltersAdd({
        dispatchers: selectedDispatchers
      });
    }
  }, [selectedStatuses, selectedTransports, selectedZipcodes, selectedProfiles, selectedCities, selectedStates, selectedHireStatuses, selectedNames, selectedRadius, selectedOrganizations, selectedClientNames, selectedDispatchers, activeTab, onFiltersAdd]);

  const handleResetFilters = () => {
    if (activeTab === "drivers") {
      setSelectedStatuses?.([]);
      setSelectedTransports?.([]);
      setSelectedZipcodes?.([]);
      setSelectedProfiles?.([]);
      setSelectedCities?.([]);
      setSelectedStates?.([]);
      setSelectedHireStatuses?.([]);
      setSelectedNames?.([]);
      setSelectedRadius?.(15);
    } else if (activeTab === "clients") {
      setSelectedCities?.([]);
      setSelectedStates?.([]);
      setSelectedZipcodes?.([]);
      setSelectedOrganizations?.([]);
      setSelectedClientNames?.([]);
    } else if (activeTab === "groups") {
      setSelectedDispatchers?.([]);
    }
  };

  const handleApplyFilters = () => {
    if (activeTab === "drivers") {
      onFiltersAdd({
        statuses: selectedStatuses,
        transports: selectedTransports,
        zipcodes: selectedZipcodes,
        profiles: selectedProfiles,
        cities: selectedCities,
        states: selectedStates,
        hireStatuses: selectedHireStatuses,
        names: selectedNames,
        radius: selectedRadius
      });
    } else if (activeTab === "clients") {
      onFiltersAdd({
        cities: selectedCities,
        states: selectedStates,
        zipcodes: selectedZipcodes,
        organizations: selectedOrganizations,
        clientNames: selectedClientNames
      });
    } else if (activeTab === "groups") {
      onFiltersAdd({
        dispatchers: selectedDispatchers
      });
    }
  };

  const getCount = () => Math.floor(Math.random() * 20) + 1;

  const filteredDeliveryStatuses = allDeliveryStatuses.filter(status => 
    !["Picking Up", "In Transit", "Arrived For Pickup", "Dropoff Complete", "Scheduled Order", "Canceled By Customer", "Cancelled By Admin"].includes(status) && 
    status.toLowerCase().includes(statusSearchTerm.toLowerCase())
  );

  const filteredTransportTypes = transportTypes.filter(transport => 
    transport.value.toLowerCase().includes(transportSearchTerm.toLowerCase())
  );

  const filteredZipcodes = allZipcodes.filter(zipcode => 
    zipcode.toLowerCase().includes(zipcodeSearchTerm.toLowerCase())
  );

  const filteredHireStatuses = hireStatusOptions.filter(status => 
    status.value.toLowerCase().includes(hireStatusSearchTerm.toLowerCase())
  );

  const driverProfiles = [
    { id: 'courier', value: 'Courier' },
    { id: 'mover', value: 'Mover' },
    { id: 'helper', value: 'Helper' }
  ];

  const filteredProfiles = driverProfiles.filter(profile => 
    profile.value.toLowerCase().includes(profileSearchTerm.toLowerCase())
  );

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  const filteredStates = allStates.filter(state => 
    state.toLowerCase().includes(stateSearchTerm.toLowerCase())
  );

  const filteredOrganizations = allOrganizations.filter(org => 
    org.toLowerCase().includes(orgSearchTerm.toLowerCase())
  );

  const filteredDispatchers = allDispatchers.filter(dispatcher => 
    dispatcher.toLowerCase().includes(dispatcherSearchTerm.toLowerCase())
  );

  const filteredNames = driverNames.filter(name => 
    name.toLowerCase().includes(nameSearchTerm.toLowerCase())
  );

  const filteredClientNames = allClientNames.filter(name => 
    name.toLowerCase().includes(clientNameSearchTerm.toLowerCase())
  );

  const getTitle = () => {
    switch (activeTab) {
      case 'drivers':
        return 'Driver Filters';
      case 'clients':
        return 'Customer Filters';
      case 'groups':
        return 'Dispatcher Filters';
      default:
        return 'Filters';
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md light:border-2 light:border-gray-300 light:hover:border-gray-400">
      <div className="p-6 w-full h-full flex flex-col overflow-y-auto mx-0 px-[24px] py-[29px]">
        <h2 className="text-lg font-semibold mb-4 px-0 py-[15px] my-[9px]">{getTitle()}</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion type="single" collapsible className="w-full">
            {activeTab === "drivers" && (
              <>
                <AccordionItem value="radius">
                  <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                    Radius
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-4 py-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Distance</Label>
                          <Badge variant="outline" className="text-xs">
                            {selectedRadius} miles
                          </Badge>
                        </div>
                        <Slider
                          value={[selectedRadius]}
                          onValueChange={(value) => setSelectedRadius?.(value[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 mile</span>
                          <span>100 miles</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="name">
                  <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                    Name
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-3 py-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search names..." 
                          value={nameSearchTerm} 
                          onChange={e => setNameSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredNames.map(name => (
                        <div key={name} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`name-${name}`} 
                            checked={selectedNames.includes(name)} 
                            onCheckedChange={() => {
                              if (selectedNames.includes(name)) {
                                setSelectedNames?.(selectedNames.filter(n => n !== name));
                              } else {
                                setSelectedNames?.([...selectedNames, name]);
                              }
                            }} 
                          />
                          <Label htmlFor={`name-${name}`} className="flex flex-1 items-center justify-between">
                            <span>{name}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="zipcodes">
                  <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                    Zipcodes
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search zipcodes..." 
                          value={zipcodeSearchTerm} 
                          onChange={e => setZipcodeSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredZipcodes.map(zipcode => (
                        <div key={zipcode} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`zipcode-${zipcode}`} 
                            checked={selectedZipcodes.includes(zipcode)} 
                            onCheckedChange={() => {
                              if (selectedZipcodes.includes(zipcode)) {
                                setSelectedZipcodes?.(selectedZipcodes.filter(z => z !== zipcode));
                              } else {
                                setSelectedZipcodes?.([...selectedZipcodes, zipcode]);
                              }
                            }} 
                          />
                          <Label htmlFor={`zipcode-${zipcode}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{zipcode}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="profiles">
                  <AccordionTrigger className="text-sm font-medium">
                    Profile Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search profile type..." 
                          value={profileSearchTerm} 
                          onChange={e => setProfileSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredProfiles.map(profile => (
                        <div key={profile.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`profile-${profile.id}`} 
                            checked={selectedProfiles.includes(profile.id)} 
                            onCheckedChange={() => {
                              if (selectedProfiles.includes(profile.id)) {
                                setSelectedProfiles?.(selectedProfiles.filter(p => p !== profile.id));
                              } else {
                                setSelectedProfiles?.([...selectedProfiles, profile.id]);
                              }
                            }} 
                          />
                          <Label htmlFor={`profile-${profile.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{profile.value}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
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
                        <Input 
                          placeholder="Search hire status..." 
                          value={hireStatusSearchTerm} 
                          onChange={e => setHireStatusSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredHireStatuses.map(status => (
                        <div key={status.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`hirestatus-${status.id}`} 
                            checked={selectedHireStatuses.includes(status.id)} 
                            onCheckedChange={() => {
                              if (selectedHireStatuses.includes(status.id)) {
                                setSelectedHireStatuses?.(selectedHireStatuses.filter(h => h !== status.id));
                              } else {
                                setSelectedHireStatuses?.([...selectedHireStatuses, status.id]);
                              }
                            }} 
                          />
                          <Label htmlFor={`hirestatus-${status.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{status.value}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="status">
                  <AccordionTrigger className="text-sm font-medium">
                    Status
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search status..." 
                          value={statusSearchTerm} 
                          onChange={e => setStatusSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredDeliveryStatuses.map(status => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`status-${status}`} 
                            checked={selectedStatuses.includes(status)} 
                            onCheckedChange={() => {
                              if (selectedStatuses.includes(status)) {
                                setSelectedStatuses?.(selectedStatuses.filter(s => s !== status));
                              } else {
                                setSelectedStatuses?.([...selectedStatuses, status]);
                              }
                            }} 
                          />
                          <Label htmlFor={`status-${status}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{status}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="transports">
                  <AccordionTrigger className="text-sm font-medium">
                    Transport Types
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search transport type..." 
                          value={transportSearchTerm} 
                          onChange={e => setTransportSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredTransportTypes.map(transport => (
                        <div key={transport.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`transport-${transport.id}`} 
                            checked={selectedTransports.includes(transport.id)} 
                            onCheckedChange={() => {
                              if (selectedTransports.includes(transport.id)) {
                                setSelectedTransports?.(selectedTransports.filter(t => t !== transport.id));
                              } else {
                                setSelectedTransports?.([...selectedTransports, transport.id]);
                              }
                            }} 
                          />
                          <Label htmlFor={`transport-${transport.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span className="flex items-center gap-2">
                              {transport.icon && <TransportIcon transportType={transport.icon as TransportType} size={16} className="shrink-0" />}
                              {transport.value}
                            </span>
                            <Badge variant="outline" className="ml-auto shrink-0">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            )}

            {(activeTab === "drivers" || activeTab === "clients") && (
              <>
                {activeTab === "clients" && (
                  <AccordionItem value="client-zipcodes">
                    <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                      Zipcodes
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Search zipcodes..." 
                            value={zipcodeSearchTerm} 
                            onChange={e => setZipcodeSearchTerm(e.target.value)} 
                            className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                          />
                        </div>
                        {filteredZipcodes.map(zipcode => (
                          <div key={zipcode} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`client-zipcode-${zipcode}`} 
                              checked={selectedZipcodes.includes(zipcode)} 
                              onCheckedChange={() => {
                                if (selectedZipcodes.includes(zipcode)) {
                                  setSelectedZipcodes?.(selectedZipcodes.filter(z => z !== zipcode));
                                } else {
                                  setSelectedZipcodes?.([...selectedZipcodes, zipcode]);
                                }
                              }} 
                            />
                            <Label htmlFor={`client-zipcode-${zipcode}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                              <span>{zipcode}</span>
                              <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="cities">
                  <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                    Cities
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search cities..." 
                          value={citySearchTerm} 
                          onChange={e => setCitySearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredCities.map(city => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`city-${city}`} 
                            checked={selectedCities.includes(city)} 
                            onCheckedChange={() => {
                              if (selectedCities.includes(city)) {
                                setSelectedCities?.(selectedCities.filter(c => c !== city));
                              } else {
                                setSelectedCities?.([...selectedCities, city]);
                              }
                            }} 
                          />
                          <Label htmlFor={`city-${city}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{city}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="states">
                  <AccordionTrigger className="text-sm font-medium">
                    States
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search states..." 
                          value={stateSearchTerm} 
                          onChange={e => setStateSearchTerm(e.target.value)} 
                          className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                        />
                      </div>
                      {filteredStates.map(state => (
                        <div key={state} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`state-${state}`} 
                            checked={selectedStates.includes(state)} 
                            onCheckedChange={() => {
                              if (selectedStates.includes(state)) {
                                setSelectedStates?.(selectedStates.filter(s => s !== state));
                              } else {
                                setSelectedStates?.([...selectedStates, state]);
                              }
                            }} 
                          />
                          <Label htmlFor={`state-${state}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                            <span>{state}</span>
                            <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {activeTab === "clients" && (
                  <>
                    <AccordionItem value="clientNames">
                      <AccordionTrigger className="text-sm font-medium">
                        Name
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Search client names..." 
                              value={clientNameSearchTerm} 
                              onChange={e => setClientNameSearchTerm(e.target.value)} 
                              className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                            />
                          </div>
                          {filteredClientNames.map(name => (
                            <div key={name} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`client-name-${name}`} 
                                checked={selectedClientNames.includes(name)} 
                                onCheckedChange={() => {
                                  if (selectedClientNames.includes(name)) {
                                    setSelectedClientNames?.(selectedClientNames.filter(n => n !== name));
                                  } else {
                                    setSelectedClientNames?.([...selectedClientNames, name]);
                                  }
                                }} 
                              />
                              <Label htmlFor={`client-name-${name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                                <span>{name}</span>
                                <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="organizations">
                      <AccordionTrigger className="text-sm font-medium">
                        Companies
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Search organizations..." 
                              value={orgSearchTerm} 
                              onChange={e => setOrgSearchTerm(e.target.value)} 
                              className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                            />
                          </div>
                          {filteredOrganizations.map(org => (
                            <div key={org} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`org-${org}`} 
                                checked={selectedOrganizations.includes(org)} 
                                onCheckedChange={() => {
                                  if (selectedOrganizations.includes(org)) {
                                    setSelectedOrganizations?.(selectedOrganizations.filter(o => o !== org));
                                  } else {
                                    setSelectedOrganizations?.([...selectedOrganizations, org]);
                                  }
                                }} 
                              />
                              <Label htmlFor={`org-${org}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                                <span className="my-0 px-[15px]">{org}</span>
                                <Badge variant="outline" className="ml-auto">{getCount()}</Badge>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                )}
              </>
            )}

            {activeTab === "groups" && (
              <AccordionItem value="dispatchers">
                <AccordionTrigger className="text-sm font-medium">
                  Dispatchers
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search dispatchers..." 
                        value={dispatcherSearchTerm} 
                        onChange={e => setDispatcherSearchTerm(e.target.value)} 
                        className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" 
                      />
                    </div>
                    {filteredDispatchers.map(dispatcher => (
                      <div key={dispatcher} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dispatcher-${dispatcher}`} 
                          checked={selectedDispatchers.includes(dispatcher)} 
                          onCheckedChange={() => {
                            if (selectedDispatchers.includes(dispatcher)) {
                              setSelectedDispatchers?.(selectedDispatchers.filter(d => d !== dispatcher));
                            } else {
                              setSelectedDispatchers?.([...selectedDispatchers, dispatcher]);
                            }
                          }} 
                        />
                        <Label htmlFor={`dispatcher-${dispatcher}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {dispatcher}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t flex gap-2 my-0">
          <Button variant="outline" className="flex-1 gap-1" onClick={handleResetFilters}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
