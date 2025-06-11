
import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RotateCcw, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeliveryStatus } from "@/types/delivery";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface FilterSidebarProps {
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
  onFiltersAdd: (filters: any) => void;
}

export function FilterSidebar({
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
}: FilterSidebarProps) {
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [transportTypes, setTransportTypes] = useState<{ id: string; value: string; icon?: string; }[]>([]);
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [transportSearchTerm, setTransportSearchTerm] = useState("");
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");
  const [hireStatusSearchTerm, setHireStatusSearchTerm] = useState("");
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [hireStatusOptions, setHireStatusOptions] = useState<{ id: string; value: string; description?: string; }[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [profileSearchTerm, setProfileSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");

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

  useEffect(() => {
    onFiltersAdd({
      statuses: selectedStatuses,
      zipcodes: selectedZipcodes,
      cities: selectedCities,
      states: selectedStates,
      profiles: selectedProfiles,
      transports: selectedTransports,
      hireStatuses: selectedHireStatuses,
      radius: selectedRadius,
      names: selectedNames
    });
  }, [selectedStatuses, selectedZipcodes, selectedCities, selectedStates, selectedProfiles, selectedTransports, selectedHireStatuses, selectedRadius, selectedNames, onFiltersAdd]);

  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedTransports([]);
    setSelectedZipcodes([]);
    setSelectedProfiles([]);
    setSelectedCities([]);
    setSelectedStates([]);
    setSelectedHireStatuses([]);
    setSelectedRadius(15);
    setSelectedNames([]);
  };

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
  
  const filteredNames = driverNames.filter(name => 
    name.toLowerCase().includes(nameSearchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filter Drivers</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="radius" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              Radius
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Distance</Label>
                  <Badge variant="outline" className="text-xs">
                    {selectedRadius} miles
                  </Badge>
                </div>
                <Slider
                  value={[selectedRadius]}
                  onValueChange={(value) => setSelectedRadius(value[0])}
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="status" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              Status
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search statuses..." 
                    value={statusSearchTerm} 
                    onChange={e => setStatusSearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredDeliveryStatuses.map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatuses.includes(status)} 
                      onCheckedChange={() => {
                        if (selectedStatuses.includes(status)) {
                          setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                        } else {
                          setSelectedStatuses([...selectedStatuses, status]);
                        }
                      }} 
                    />
                    <Label htmlFor={`status-${status}`} className="flex flex-1 items-center justify-between text-sm">
                      <span>{status}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 20) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transport" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              Transport Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search transport types..." 
                    value={transportSearchTerm} 
                    onChange={e => setTransportSearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredTransportTypes.map(transport => (
                  <div key={transport.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`transport-${transport.id}`} 
                      checked={selectedTransports.includes(transport.id)} 
                      onCheckedChange={() => {
                        if (selectedTransports.includes(transport.id)) {
                          setSelectedTransports(selectedTransports.filter(t => t !== transport.id));
                        } else {
                          setSelectedTransports([...selectedTransports, transport.id]);
                        }
                      }} 
                    />
                    <Label htmlFor={`transport-${transport.id}`} className="flex flex-1 items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <TransportIcon 
                          transportType={transport.value.toLowerCase() as TransportType} 
                          size={16} 
                        />
                        <span>{transport.value}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 15) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="state" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              State
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search states..." 
                    value={stateSearchTerm} 
                    onChange={e => setStateSearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredStates.map(state => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`state-${state}`} 
                      checked={selectedStates.includes(state)} 
                      onCheckedChange={() => {
                        if (selectedStates.includes(state)) {
                          setSelectedStates(selectedStates.filter(s => s !== state));
                        } else {
                          setSelectedStates([...selectedStates, state]);
                        }
                      }} 
                    />
                    <Label htmlFor={`state-${state}`} className="flex flex-1 items-center justify-between text-sm">
                      <span>{state}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 50) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="city" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              City
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search cities..." 
                    value={citySearchTerm} 
                    onChange={e => setCitySearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredCities.map(city => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`city-${city}`} 
                      checked={selectedCities.includes(city)} 
                      onCheckedChange={() => {
                        if (selectedCities.includes(city)) {
                          setSelectedCities(selectedCities.filter(c => c !== city));
                        } else {
                          setSelectedCities([...selectedCities, city]);
                        }
                      }} 
                    />
                    <Label htmlFor={`city-${city}`} className="flex flex-1 items-center justify-between text-sm">
                      <span>{city}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 30) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="zipcode" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              Zipcode
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search zipcodes..." 
                    value={zipcodeSearchTerm} 
                    onChange={e => setZipcodeSearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredZipcodes.map(zipcode => (
                  <div key={zipcode} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`zipcode-${zipcode}`} 
                      checked={selectedZipcodes.includes(zipcode)} 
                      onCheckedChange={() => {
                        if (selectedZipcodes.includes(zipcode)) {
                          setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
                        } else {
                          setSelectedZipcodes([...selectedZipcodes, zipcode]);
                        }
                      }} 
                    />
                    <Label htmlFor={`zipcode-${zipcode}`} className="flex flex-1 items-center justify-between text-sm">
                      <span>{zipcode}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 10) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="name" className="border-b">
            <AccordionTrigger className="py-3 text-sm font-medium">
              Name
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search names..." 
                    value={nameSearchTerm} 
                    onChange={e => setNameSearchTerm(e.target.value)} 
                    className="pl-8 h-9" 
                  />
                </div>
                {filteredNames.map(name => (
                  <div key={name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`name-${name}`} 
                      checked={selectedNames.includes(name)} 
                      onCheckedChange={() => {
                        if (selectedNames.includes(name)) {
                          setSelectedNames(selectedNames.filter(n => n !== name));
                        } else {
                          setSelectedNames([...selectedNames, name]);
                        }
                      }} 
                    />
                    <Label htmlFor={`name-${name}`} className="flex flex-1 items-center justify-between text-sm">
                      <span>{name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {Math.floor(Math.random() * 5) + 1}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={handleResetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
