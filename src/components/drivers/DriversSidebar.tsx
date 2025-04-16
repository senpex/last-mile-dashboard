import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DeliveryStatus } from "@/types/delivery";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Badge } from "@/components/ui/badge";

interface DriversSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: (statuses: DeliveryStatus[]) => void;
  allDeliveryStatuses: DeliveryStatus[];
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
}

export function DriversSidebar({
  open,
  onClose,
  selectedStatuses,
  setSelectedStatuses,
  allDeliveryStatuses,
  allZipcodes,
  selectedZipcodes,
  setSelectedZipcodes
}: DriversSidebarProps) {
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [transportTypes, setTransportTypes] = useState<{ id: string; value: string; icon?: string }[]>([]);
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [transportSearchTerm, setTransportSearchTerm] = useState("");
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState("");

  useEffect(() => {
    const transportDict = getDictionary("2");
    if (transportDict) {
      setTransportTypes(transportDict.items);
    }
  }, []);

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

  const handleSaveFilters = () => {
    // TODO: Implement save functionality
  };

  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedTransports([]);
    setSelectedZipcodes([]);
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

  const filteredDeliveryStatuses = allDeliveryStatuses.filter(status => 
    !["Picking Up", "In Transit", "Arrived For Pickup", "Dropoff Complete", 
      "Scheduled Order", "Canceled By Customer", "Cancelled By Admin"].includes(status) &&
    status.toLowerCase().includes(statusSearchTerm.toLowerCase())
  );

  const filteredTransportTypes = transportTypes.filter(transport =>
    transport.value.toLowerCase().includes(transportSearchTerm.toLowerCase())
  );

  const filteredZipcodes = allZipcodes.filter(zipcode =>
    zipcode.toLowerCase().includes(zipcodeSearchTerm.toLowerCase())
  );

  return (
    <div className={`h-full bg-background border-r shadow-lg transition-all duration-300 ${open ? 'w-[275px] max-w-[80vw]' : 'w-0 overflow-hidden'}`}>
      <div className="p-6 w-full h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="status-filters">
                <AccordionTrigger className="text-sm font-medium">
                  Status
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    <Input
                      placeholder="Search status..."
                      value={statusSearchTerm}
                      onChange={(e) => setStatusSearchTerm(e.target.value)}
                      className="mb-2 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                    />
                    {filteredDeliveryStatuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <label
                          htmlFor={`status-${status}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                        >
                          <span>{status}</span>
                          <Badge variant="outline" className="ml-auto">{getStatusCount(status)}</Badge>
                        </label>
                      </div>
                    ))}
                    {filteredDeliveryStatuses.length === 0 && (
                      <p className="text-sm text-muted-foreground">No matching statuses found</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="transport-filters">
                <AccordionTrigger className="text-sm font-medium">
                  Transport Types
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    <Input
                      placeholder="Search transport type..."
                      value={transportSearchTerm}
                      onChange={(e) => setTransportSearchTerm(e.target.value)}
                      className="mb-2 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                    />
                    {filteredTransportTypes.map((transport) => (
                      <div key={transport.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`transport-${transport.id}`}
                          checked={selectedTransports.includes(transport.id)}
                          onCheckedChange={() => handleTransportChange(transport.id)}
                        />
                        <label
                          htmlFor={`transport-${transport.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            {transport.icon && (
                              <TransportIcon 
                                transportType={transport.icon as TransportType} 
                                size={16} 
                                className="shrink-0"
                              />
                            )}
                            {transport.value}
                          </span>
                          <Badge variant="outline" className="ml-auto shrink-0">{getTransportCount(transport.id)}</Badge>
                        </label>
                      </div>
                    ))}
                    {filteredTransportTypes.length === 0 && (
                      <p className="text-sm text-muted-foreground">No matching transport types found</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="zipcode-filters">
                <AccordionTrigger className="text-sm font-medium">
                  Zipcodes
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-1">
                    <Input
                      placeholder="Search zipcode..."
                      value={zipcodeSearchTerm}
                      onChange={(e) => setZipcodeSearchTerm(e.target.value)}
                      className="mb-2 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                    />
                    {filteredZipcodes.map((zipcode) => (
                      <div key={zipcode} className="flex items-center space-x-2">
                        <Checkbox
                          id={`zipcode-${zipcode}`}
                          checked={selectedZipcodes.includes(zipcode)}
                          onCheckedChange={() => handleZipcodeChange(zipcode)}
                        />
                        <label
                          htmlFor={`zipcode-${zipcode}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                        >
                          <span>{zipcode}</span>
                          <Badge variant="outline" className="ml-auto">{getZipcodeCount(zipcode)}</Badge>
                        </label>
                      </div>
                    ))}
                    {filteredZipcodes.length === 0 && (
                      <p className="text-sm text-muted-foreground">No matching zipcodes found</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
