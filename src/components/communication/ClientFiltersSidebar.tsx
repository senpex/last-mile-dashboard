import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Save, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
interface ClientFiltersSidebarProps {
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allCities: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  allStates: string[];
  selectedOrganizations: string[];
  setSelectedOrganizations: (organizations: string[]) => void;
  allOrganizations: string[];
  onFiltersAdd: (filters: any) => void;
  open: boolean;
  onClose: () => void;
}
export const ClientFiltersSidebar = ({
  selectedCities,
  setSelectedCities,
  allCities,
  selectedStates,
  setSelectedStates,
  allStates,
  selectedOrganizations,
  setSelectedOrganizations,
  allOrganizations,
  onFiltersAdd,
  open,
  onClose
}: ClientFiltersSidebarProps) => {
  return <div className={cn("h-full bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all duration-300 p-6 w-full", "border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md", "light:border-2 light:border-gray-300 light:hover:border-gray-400", open ? "w-[275px] max-w-[80vw]" : "w-0 overflow-hidden")}>
      <div className="p-6 w-full h-full flex flex-col overflow-y-auto px-0 mx-0">
        <h2 className="text-lg font-semibold mb-4">Client Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cities">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                Cities
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search cities..." className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" onChange={e => {
                    // City search functionality can be added here
                  }} />
                  </div>
                  {allCities.map(city => <div key={city} className="flex items-center space-x-2">
                      <Checkbox id={`city-${city}`} checked={selectedCities.includes(city)} onCheckedChange={() => {
                    const newCities = selectedCities.includes(city) ? selectedCities.filter(c => c !== city) : [...selectedCities, city];
                    setSelectedCities(newCities);
                    onFiltersAdd({
                      cities: newCities,
                      states: selectedStates,
                      organizations: selectedOrganizations
                    });
                  }} />
                      <Label htmlFor={`city-${city}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                        <span>{city}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>)}
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
                    <Input placeholder="Search states..." className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" onChange={e => {
                    // State search functionality can be added here
                  }} />
                  </div>
                  {allStates.map(state => <div key={state} className="flex items-center space-x-2">
                      <Checkbox id={`state-${state}`} checked={selectedStates.includes(state)} onCheckedChange={() => {
                    const newStates = selectedStates.includes(state) ? selectedStates.filter(s => s !== state) : [...selectedStates, state];
                    setSelectedStates(newStates);
                    onFiltersAdd({
                      cities: selectedCities,
                      states: newStates,
                      organizations: selectedOrganizations
                    });
                  }} />
                      <Label htmlFor={`state-${state}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                        <span>{state}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="organizations">
              <AccordionTrigger className="text-sm font-medium">
                Organizations
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {allOrganizations.map(org => <div key={org} className="flex items-center space-x-2">
                      <Checkbox id={`org-${org}`} checked={selectedOrganizations.includes(org)} onCheckedChange={() => {
                    const newOrgs = selectedOrganizations.includes(org) ? selectedOrganizations.filter(o => o !== org) : [...selectedOrganizations, org];
                    setSelectedOrganizations(newOrgs);
                    onFiltersAdd({
                      cities: selectedCities,
                      states: selectedStates,
                      organizations: newOrgs
                    });
                  }} />
                      <Label htmlFor={`org-${org}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between">
                        <span>{org}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1 gap-1" onClick={() => {
          setSelectedCities([]);
          setSelectedStates([]);
          setSelectedOrganizations([]);
          onFiltersAdd({
            cities: [],
            states: [],
            organizations: []
          });
        }}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button className="flex-1 gap-1" onClick={() => {
          onFiltersAdd({
            cities: selectedCities,
            states: selectedStates,
            organizations: selectedOrganizations
          });
        }}>
            <Save className="h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </div>;
};