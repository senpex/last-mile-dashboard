
import React from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ClientsSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  allClientStatuses: string[];
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
  allCities: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allStates: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
}

export function ClientsSidebar({
  open,
  onClose,
  selectedStatuses,
  setSelectedStatuses,
  allClientStatuses,
  allZipcodes,
  selectedZipcodes,
  setSelectedZipcodes,
  allCities,
  selectedCities,
  setSelectedCities,
  allStates,
  selectedStates,
  setSelectedStates
}: ClientsSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] p-0 bg-background">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <p className="text-sm text-muted-foreground">
              Filter clients by status, location, etc.
            </p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="status">
                <AccordionTrigger className="text-sm">Status</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {allClientStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStatuses([...selectedStatuses, status]);
                          } else {
                            setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                          }
                        }} 
                      />
                      <Label htmlFor={`status-${status}`} className="capitalize">
                        {status}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="zipcode">
                <AccordionTrigger className="text-sm">Zipcode</AccordionTrigger>
                <AccordionContent className="space-y-2 max-h-[200px] overflow-y-auto">
                  {allZipcodes.map((zipcode) => (
                    <div key={zipcode} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`zipcode-${zipcode}`} 
                        checked={selectedZipcodes.includes(zipcode)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedZipcodes([...selectedZipcodes, zipcode]);
                          } else {
                            setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
                          }
                        }} 
                      />
                      <Label htmlFor={`zipcode-${zipcode}`}>
                        {zipcode}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="city">
                <AccordionTrigger className="text-sm">City</AccordionTrigger>
                <AccordionContent className="space-y-2 max-h-[200px] overflow-y-auto">
                  {allCities.map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`city-${city}`} 
                        checked={selectedCities.includes(city)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCities([...selectedCities, city]);
                          } else {
                            setSelectedCities(selectedCities.filter(c => c !== city));
                          }
                        }} 
                      />
                      <Label htmlFor={`city-${city}`}>
                        {city}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="state">
                <AccordionTrigger className="text-sm">State</AccordionTrigger>
                <AccordionContent className="space-y-2 max-h-[200px] overflow-y-auto">
                  {allStates.map((state) => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`state-${state}`} 
                        checked={selectedStates.includes(state)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStates([...selectedStates, state]);
                          } else {
                            setSelectedStates(selectedStates.filter(s => s !== state));
                          }
                        }} 
                      />
                      <Label htmlFor={`state-${state}`}>
                        {state}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
