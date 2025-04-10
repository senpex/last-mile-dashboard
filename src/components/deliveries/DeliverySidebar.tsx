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
import { Save, RotateCcw, MapPin } from "lucide-react";
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
  onZipcodeChange
}: DeliverySidebarProps) {
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [statusItems, setStatusItems] = useState<DictionaryItem[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState<string>("");
  const [statusMapping, setStatusMapping] = useState<Record<string, string>>({});
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");
  
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

  const handleSaveFilters = () => {
    console.log("Saving filters:", {
      statuses: selectedStatuses,
      organizations: selectedOrganizations,
      couriers: selectedCouriers,
      zipcodes: selectedZipcodes
    });
  };

  const handleResetFilters = () => {
    onStatusChange([]);
    onOrganizationChange([]);
    onCourierChange([]);
    onZipcodeChange([]);
  };

  const getSortedStatusItems = () => {
    if (!statusItems.length) return [];
    
    return [...statusItems].sort((a, b) => {
      const statusA = statusMapping[a.value];
      const statusB = statusMapping[b.value];
      
      if (!statusA || !statusB) return 0;
      
      const countA = getStatusCount(statusA);
      const countB = getStatusCount(statusB);
      
      return countB - countA;
    });
  };

  const getSortedOrganizations = () => {
    return [...new Set(organizations)]
      .filter(Boolean)
      .sort((a, b) => {
        const countA = getOrganizationCount(a);
        const countB = getOrganizationCount(b);
        return countB - countA;
      });
  };

  const getSortedCouriers = () => {
    return [...new Set(couriers)]
      .filter(Boolean)
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

  return (
    <div className={`h-full bg-background border-r shadow-lg transition-all duration-300 ${open ? 'w-[275px] max-w-[80vw]' : 'w-0 overflow-hidden'}`}>
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
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 space-x-24">
                <span className="flex-grow">Status</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  {getSortedStatusItems().map(item => {
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
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="zipcode" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 space-x-24">
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
            
            <AccordionItem value="organization" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 space-x-24">
                <span className="flex-grow">Organization</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  {getSortedOrganizations().map(org => (
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
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="courier" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 space-x-24">
                <span className="flex-grow">Courier</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  {getSortedCouriers().map(courier => (
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
