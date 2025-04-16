
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DeliveryStatus } from "@/types/delivery";
import { Dictionary, DictionaryItem } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, MapPin, Building, ArrowUpFromLine, ArrowDownToLine, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DeliverySidebarProps {
  open: boolean;
  onClose: () => void;
  deliveryStatuses: DeliveryStatus[];
  selectedStatuses: DeliveryStatus[];
  onStatusChange: (statuses: DeliveryStatus[]) => void;
  organizations: string[];
  selectedOrganizations: string[];
  onOrganizationChange: (organizations: string[]) => void;
  couriers: string[];
  selectedCouriers: string[];
  onCourierChange: (couriers: string[]) => void;
  zipcodes: string[];
  selectedZipcodes: string[];
  onZipcodeChange: (zipcodes: string[]) => void;
  
  cities: string[];
  selectedCities: string[];
  onCityChange: (cities: string[]) => void;
  states: string[];
  selectedStates: string[];
  onStateChange: (states: string[]) => void;
  pickupAddresses: string[];
  selectedPickupAddresses: string[];
  onPickupAddressChange: (addresses: string[]) => void;
  dropoffAddresses: string[];
  selectedDropoffAddresses: string[];
  onDropoffAddressChange: (addresses: string[]) => void;
  senderNames: string[];
  selectedSenderNames: string[];
  onSenderNameChange: (names: string[]) => void;
  recipientNames: string[];
  selectedRecipientNames: string[];
  onRecipientNameChange: (names: string[]) => void;
}

export function DeliverySidebar({
  open,
  onClose,
  deliveryStatuses,
  selectedStatuses,
  onStatusChange,
  organizations,
  selectedOrganizations,
  onOrganizationChange,
  couriers,
  selectedCouriers,
  onCourierChange,
  zipcodes,
  selectedZipcodes,
  onZipcodeChange,
  cities,
  selectedCities,
  onCityChange,
  states,
  selectedStates,
  onStateChange,
  pickupAddresses,
  selectedPickupAddresses,
  onPickupAddressChange,
  dropoffAddresses,
  selectedDropoffAddresses,
  onDropoffAddressChange,
  senderNames,
  selectedSenderNames,
  onSenderNameChange,
  recipientNames,
  selectedRecipientNames,
  onRecipientNameChange
}: DeliverySidebarProps) {
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [statusItems, setStatusItems] = useState<DictionaryItem[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState<string>("");
  const [statusMapping, setStatusMapping] = useState<Record<string, string>>({});
  
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [organizationSearchTerm, setOrganizationSearchTerm] = useState("");
  const [courierSearchTerm, setCourierSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [pickupAddressSearchTerm, setPickupAddressSearchTerm] = useState("");
  const [dropoffAddressSearchTerm, setDropoffAddressSearchTerm] = useState("");
  const [senderNameSearchTerm, setSenderNameSearchTerm] = useState("");
  const [recipientNameSearchTerm, setRecipientNameSearchTerm] = useState("");

  const getStatusCount = (status: string): number => {
    console.log(`Counting status: "${status}" in:`, deliveryStatuses);
    return deliveryStatuses.filter(s => 
      s.toLowerCase() === status.toLowerCase()
    ).length;
  };
  
  const getOrganizationCount = (org: string): number => {
    return organizations.filter(o => o === org).length;
  };
  
  const getCourierCount = (courier: string): number => {
    return couriers.filter(c => c === courier).length;
  };
  
  const getZipcodeCount = (zipcode: string): number => {
    return zipcodes.filter(z => z === zipcode).length;
  };

  const getCityCount = (city: string): number => {
    return cities.filter(c => c === city).length;
  };
  
  const getStateCount = (state: string): number => {
    return states.filter(s => s === state).length;
  };
  
  const getPickupAddressCount = (address: string): number => {
    return pickupAddresses.filter(a => a === address).length;
  };
  
  const getDropoffAddressCount = (address: string): number => {
    return dropoffAddresses.filter(a => a === address).length;
  };
  
  const getSenderNameCount = (name: string): number => {
    return senderNames.filter(n => n === name).length;
  };
  
  const getRecipientNameCount = (name: string): number => {
    return recipientNames.filter(n => n === name).length;
  };

  const truncateAddress = (address: string, limit: number = 18): string => {
    return address.length > limit ? `${address.substring(0, limit)}...` : address;
  };

  useEffect(() => {
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      setStatusItems(dictionary.items);
      
      const mapping: Record<string, string> = {};
      dictionary.items.forEach(item => {
        if (item.id === "completed") mapping[item.value] = "Dropoff Complete";
        else if (item.id === "cancelled_order") mapping[item.value] = "Canceled By Customer";
        else if (item.id === "cancelled_by_admin") mapping[item.value] = "Cancelled By Admin";
        else if (item.id === "in_transit") mapping[item.value] = "In Transit";
        else if (item.id === "started_working") mapping[item.value] = "Picking Up";
        else if (item.id === "arrived_for_pickup") mapping[item.value] = "Arrived For Pickup";
        else mapping[item.value] = item.value;
      });
      
      setStatusMapping(mapping);
      console.log("Loaded status dictionary:", dictionary);
      console.log("Status mapping:", mapping);
      console.log("Available delivery statuses:", deliveryStatuses);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, [deliveryStatuses]);

  const handleStatusChange = (statusValue: string, checked: boolean) => {
    const actualStatus = statusMapping[statusValue];
    
    if (checked) {
      onStatusChange([...selectedStatuses, actualStatus as DeliveryStatus]);
    } else {
      onStatusChange(selectedStatuses.filter(s => s !== actualStatus));
    }
  };

  const handleOrganizationChange = (org: string, checked: boolean) => {
    if (checked) {
      onOrganizationChange([...selectedOrganizations, org]);
    } else {
      onOrganizationChange(selectedOrganizations.filter(o => o !== org));
    }
  };

  const handleCourierChange = (courier: string, checked: boolean) => {
    if (checked) {
      onCourierChange([...selectedCouriers, courier]);
    } else {
      onCourierChange(selectedCouriers.filter(c => c !== courier));
    }
  };
  
  const handleZipcodeChange = (zipcode: string, checked: boolean) => {
    if (checked) {
      onZipcodeChange([...selectedZipcodes, zipcode]);
    } else {
      onZipcodeChange(selectedZipcodes.filter(z => z !== zipcode));
    }
  };

  const handleCityChange = (city: string, checked: boolean) => {
    if (checked) {
      onCityChange([...selectedCities, city]);
    } else {
      onCityChange(selectedCities.filter(c => c !== city));
    }
  };

  const handleStateChange = (state: string, checked: boolean) => {
    if (checked) {
      onStateChange([...selectedStates, state]);
    } else {
      onStateChange(selectedStates.filter(s => s !== state));
    }
  };

  const handlePickupAddressChange = (address: string, checked: boolean) => {
    if (checked) {
      onPickupAddressChange([...selectedPickupAddresses, address]);
    } else {
      onPickupAddressChange(selectedPickupAddresses.filter(a => a !== address));
    }
  };

  const handleDropoffAddressChange = (address: string, checked: boolean) => {
    if (checked) {
      onDropoffAddressChange([...selectedDropoffAddresses, address]);
    } else {
      onDropoffAddressChange(selectedDropoffAddresses.filter(a => a !== address));
    }
  };

  const handleSenderNameChange = (name: string, checked: boolean) => {
    if (checked) {
      onSenderNameChange([...selectedSenderNames, name]);
    } else {
      onSenderNameChange(selectedSenderNames.filter(n => n !== name));
    }
  };

  const handleRecipientNameChange = (name: string, checked: boolean) => {
    if (checked) {
      onRecipientNameChange([...selectedRecipientNames, name]);
    } else {
      onRecipientNameChange(selectedRecipientNames.filter(n => n !== name));
    }
  };

  const handleSaveFilters = () => {
    console.log("Saving filters:", {
      statuses: selectedStatuses,
      organizations: selectedOrganizations,
      couriers: selectedCouriers,
      zipcodes: selectedZipcodes,
      cities: selectedCities,
      states: selectedStates,
      pickupAddresses: selectedPickupAddresses,
      dropoffAddresses: selectedDropoffAddresses,
      senderNames: selectedSenderNames,
      recipientNames: selectedRecipientNames
    });
  };

  const handleResetFilters = () => {
    onStatusChange([]);
    onOrganizationChange([]);
    onCourierChange([]);
    onZipcodeChange([]);
    onCityChange([]);
    onStateChange([]);
    onPickupAddressChange([]);
    onDropoffAddressChange([]);
    onSenderNameChange([]);
    onRecipientNameChange([]);
  };

  const getFilteredStatusItems = () => {
    if (!statusItems.length) return [];
    
    return [...statusItems]
      .filter(item => {
        const actualStatus = statusMapping[item.value];
        if (!actualStatus) return false;
        const count = getStatusCount(actualStatus);
        if (count === 0) return false;
        
        if (statusSearchTerm) {
          return item.value.toLowerCase().includes(statusSearchTerm.toLowerCase());
        }
        
        return true;
      })
      .sort((a, b) => {
        const statusA = statusMapping[a.value];
        const statusB = statusMapping[b.value];
        
        if (!statusA || !statusB) return 0;
        
        const countA = getStatusCount(statusA);
        const countB = getStatusCount(statusB);
        
        return countB - countA;
      });
  };

  const getFilteredOrganizations = () => {
    return [...new Set(organizations)]
      .filter(Boolean)
      .filter(org => 
        organizationSearchTerm ? 
          org.toLowerCase().includes(organizationSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getOrganizationCount(a);
        const countB = getOrganizationCount(b);
        return countB - countA;
      });
  };

  const getFilteredCouriers = () => {
    return [...new Set(couriers)]
      .filter(Boolean)
      .filter(courier => 
        courierSearchTerm ? 
          courier.toLowerCase().includes(courierSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getCourierCount(a);
        const countB = getCourierCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredZipcodes = () => {
    return [...new Set(zipcodes)]
      .filter(Boolean)
      .filter(zipcode => 
        zipcodeSearchTerm ? zipcode.includes(zipcodeSearchTerm) : true
      )
      .sort((a, b) => {
        const countA = getZipcodeCount(a);
        const countB = getZipcodeCount(b);
        return countB - countA;
      });
  };

  const getFilteredCities = () => {
    return [...new Set(cities)]
      .filter(Boolean)
      .filter(city => 
        citySearchTerm ? 
          city.toLowerCase().includes(citySearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getCityCount(a);
        const countB = getCityCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredStates = () => {
    return [...new Set(states)]
      .filter(Boolean)
      .filter(state => 
        stateSearchTerm ? 
          state.toLowerCase().includes(stateSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getStateCount(a);
        const countB = getStateCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredPickupAddresses = () => {
    return [...new Set(pickupAddresses)]
      .filter(Boolean)
      .filter(address => 
        pickupAddressSearchTerm ? 
          address.toLowerCase().includes(pickupAddressSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getPickupAddressCount(a);
        const countB = getPickupAddressCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredDropoffAddresses = () => {
    return [...new Set(dropoffAddresses)]
      .filter(Boolean)
      .filter(address => 
        dropoffAddressSearchTerm ? 
          address.toLowerCase().includes(dropoffAddressSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getDropoffAddressCount(a);
        const countB = getDropoffAddressCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredSenderNames = () => {
    return [...new Set(senderNames)]
      .filter(Boolean)
      .filter(name => 
        senderNameSearchTerm ? 
          name.toLowerCase().includes(senderNameSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getSenderNameCount(a);
        const countB = getSenderNameCount(b);
        return countB - countA;
      });
  };
  
  const getFilteredRecipientNames = () => {
    return [...new Set(recipientNames)]
      .filter(Boolean)
      .filter(name => 
        recipientNameSearchTerm ? 
          name.toLowerCase().includes(recipientNameSearchTerm.toLowerCase()) : 
          true
      )
      .sort((a, b) => {
        const countA = getRecipientNameCount(a);
        const countB = getRecipientNameCount(b);
        return countB - countA;
      });
  };

  return (
    <div className={`h-full bg-background border-r border-r-[#8E9196] shadow-lg transition-all duration-300 ease-in-out ${open ? 'w-[275px] max-w-[80vw]' : 'w-0 overflow-hidden'}`}>
      <div className="p-6 w-full h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full" 
            defaultValue=""
            value={isAccordionOpen}
            onValueChange={setIsAccordionOpen}
          >
            <AccordionItem value="status" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Status</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search statuses..."
                    value={statusSearchTerm}
                    onChange={(e) => setStatusSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredStatusItems().map(item => {
                    const actualStatus = statusMapping[item.value];
                    if (!actualStatus) return null;
                    
                    const count = getStatusCount(actualStatus);
                    
                    if (count === 0) return null;
                    
                    return (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${item.id}`} 
                          checked={selectedStatuses.includes(actualStatus as DeliveryStatus)} 
                          onCheckedChange={checked => handleStatusChange(item.value, checked === true)} 
                        />
                        <Label 
                          htmlFor={`status-${item.id}`} 
                          className="flex flex-1 items-center justify-between" 
                          title={item.description || ''}
                        >
                          <span>{item.value}</span>
                          <Badge variant="outline" className="ml-auto">{count}</Badge>
                        </Label>
                      </div>
                    );
                  })}
                  {getFilteredStatusItems().length === 0 && (
                    <div className="text-sm text-muted-foreground">No statuses match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="zipcode" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Zipcode</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search zipcodes..."
                    value={zipcodeSearchTerm}
                    onChange={(e) => setZipcodeSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredZipcodes().map(zipcode => (
                    <div key={zipcode} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`zipcode-${zipcode}`} 
                        checked={selectedZipcodes.includes(zipcode)} 
                        onCheckedChange={checked => handleZipcodeChange(zipcode, checked === true)} 
                      />
                      <Label 
                        htmlFor={`zipcode-${zipcode}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{zipcode}</span>
                        <Badge variant="outline" className="ml-auto">{getZipcodeCount(zipcode)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredZipcodes().length === 0 && (
                    <div className="text-sm text-muted-foreground">No zipcodes match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="city" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">City</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search cities..."
                    value={citySearchTerm}
                    onChange={(e) => setCitySearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredCities().map(city => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`city-${city}`} 
                        checked={selectedCities.includes(city)} 
                        onCheckedChange={checked => handleCityChange(city, checked === true)} 
                      />
                      <Label 
                        htmlFor={`city-${city}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{city}</span>
                        <Badge variant="outline" className="ml-auto">{getCityCount(city)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredCities().length === 0 && (
                    <div className="text-sm text-muted-foreground">No cities match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="state" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">State</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search states..."
                    value={stateSearchTerm}
                    onChange={(e) => setStateSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredStates().map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`state-${state}`} 
                        checked={selectedStates.includes(state)} 
                        onCheckedChange={checked => handleStateChange(state, checked === true)} 
                      />
                      <Label 
                        htmlFor={`state-${state}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{state}</span>
                        <Badge variant="outline" className="ml-auto">{getStateCount(state)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredStates().length === 0 && (
                    <div className="text-sm text-muted-foreground">No states match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="pickupAddress" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Pickup Address</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search pickup addresses..."
                    value={pickupAddressSearchTerm}
                    onChange={(e) => setPickupAddressSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredPickupAddresses().map(address => (
                    <div key={address} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`pickup-${address}`} 
                        checked={selectedPickupAddresses.includes(address)} 
                        onCheckedChange={checked => handlePickupAddressChange(address, checked === true)} 
                      />
                      <Label 
                        htmlFor={`pickup-${address}`} 
                        className="flex flex-1 items-center justify-between"
                        title={address}
                      >
                        <span className="truncate pr-2">{truncateAddress(address)}</span>
                        <Badge variant="outline" className="ml-auto shrink-0">{getPickupAddressCount(address)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredPickupAddresses().length === 0 && (
                    <div className="text-sm text-muted-foreground">No pickup addresses match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="dropoffAddress" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Dropoff Address</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search dropoff addresses..."
                    value={dropoffAddressSearchTerm}
                    onChange={(e) => setDropoffAddressSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredDropoffAddresses().map(address => (
                    <div key={address} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dropoff-${address}`} 
                        checked={selectedDropoffAddresses.includes(address)} 
                        onCheckedChange={checked => handleDropoffAddressChange(address, checked === true)} 
                      />
                      <Label 
                        htmlFor={`dropoff-${address}`} 
                        className="flex flex-1 items-center justify-between"
                        title={address}
                      >
                        <span className="truncate pr-2">{truncateAddress(address)}</span>
                        <Badge variant="outline" className="ml-auto shrink-0">{getDropoffAddressCount(address)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredDropoffAddresses().length === 0 && (
                    <div className="text-sm text-muted-foreground">No dropoff addresses match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="senderName" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Sender Name</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search sender names..."
                    value={senderNameSearchTerm}
                    onChange={(e) => setSenderNameSearchTerm(e.target.value)}
                    className="mb-2 w-[90%]"
                  />
                  {getFilteredSenderNames().map(name => (
                    <div key={name} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sender-${name}`} 
                        checked={selectedSenderNames.includes(name)} 
                        onCheckedChange={checked => handleSenderNameChange(name, checked === true)} 
                      />
                      <Label 
                        htmlFor={`sender-${name}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{name}</span>
                        <Badge variant="outline" className="ml-auto">{getSenderNameCount(name)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredSenderNames().length === 0 && (
                    <div className="text-sm text-muted-foreground">No sender names match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="recipientName" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Recipient Name</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search recipient names..."
                    value={recipientNameSearchTerm}
                    onChange={(e) => setRecipientNameSearchTerm(e.target.value)}
                    className="mb-2 w-[90%]"
                  />
                  {getFilteredRecipientNames().map(name => (
                    <div key={name} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`recipient-${name}`} 
                        checked={selectedRecipientNames.includes(name)} 
                        onCheckedChange={checked => handleRecipientNameChange(name, checked === true)} 
                      />
                      <Label 
                        htmlFor={`recipient-${name}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{name}</span>
                        <Badge variant="outline" className="ml-auto">{getRecipientNameCount(name)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredRecipientNames().length === 0 && (
                    <div className="text-sm text-muted-foreground">No recipient names match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="organization" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Organization</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search organizations..."
                    value={organizationSearchTerm}
                    onChange={(e) => setOrganizationSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredOrganizations().map(org => (
                    <div key={org} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`org-${org}`} 
                        checked={selectedOrganizations.includes(org)} 
                        onCheckedChange={checked => handleOrganizationChange(org, checked === true)} 
                      />
                      <Label 
                        htmlFor={`org-${org}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{org}</span>
                        <Badge variant="outline" className="ml-auto">{getOrganizationCount(org)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredOrganizations().length === 0 && (
                    <div className="text-sm text-muted-foreground">No organizations match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="courier" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                <span className="flex-grow">Courier</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  <Input
                    placeholder="Search couriers..."
                    value={courierSearchTerm}
                    onChange={(e) => setCourierSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {getFilteredCouriers().map(courier => (
                    <div key={courier} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`courier-${courier}`} 
                        checked={selectedCouriers.includes(courier)} 
                        onCheckedChange={checked => handleCourierChange(courier, checked === true)} 
                      />
                      <Label 
                        htmlFor={`courier-${courier}`} 
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{courier}</span>
                        <Badge variant="outline" className="ml-auto">{getCourierCount(courier)}</Badge>
                      </Label>
                    </div>
                  ))}
                  {getFilteredCouriers().length === 0 && (
                    <div className="text-sm text-muted-foreground">No couriers match your search</div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 gap-1" 
            onClick={handleResetFilters}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            className="flex-1 gap-1" 
            onClick={handleSaveFilters}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
