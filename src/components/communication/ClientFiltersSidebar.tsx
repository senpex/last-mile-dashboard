
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
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  allClientStatuses: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allCities: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  allStates: string[];
  selectedProfiles: string[];
  setSelectedProfiles: (profiles: string[]) => void;
  allProfiles: string[];
  selectedOrganizations: string[];
  setSelectedOrganizations: (organizations: string[]) => void;
  allOrganizations: string[];
  onFiltersAdd: (filters: any) => void;
  open: boolean;
  onClose: () => void;
}

export const ClientFiltersSidebar = ({
  selectedStatuses,
  setSelectedStatuses,
  allClientStatuses,
  selectedCities,
  setSelectedCities,
  allCities,
  selectedStates,
  setSelectedStates,
  allStates,
  selectedProfiles,
  setSelectedProfiles,
  allProfiles,
  selectedOrganizations,
  setSelectedOrganizations,
  allOrganizations,
  onFiltersAdd,
  open,
  onClose
}: ClientFiltersSidebarProps) => {
  return (
    <div 
      className={cn(
        "h-full bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all duration-300",
        open ? "w-[275px] max-w-[80vw]" : "w-0 overflow-hidden"
      )}
    >
      <div className="p-6 w-full h-full flex flex-col overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Client Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="status" className="border-b">
              <AccordionTrigger className="py-4 w-full text-left flex justify-between pr-1 text-[0.88em]">
                Status
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  {allClientStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={() => {
                          const newStatuses = selectedStatuses.includes(status)
                            ? selectedStatuses.filter(s => s !== status)
                            : [...selectedStatuses, status];
                          setSelectedStatuses(newStatuses);
                          onFiltersAdd({
                            statuses: newStatuses,
                            cities: selectedCities,
                            states: selectedStates,
                            profiles: selectedProfiles,
                            organizations: selectedOrganizations
                          });
                        }}
                      />
                      <Label
                        htmlFor={`status-${status}`}
                        className="flex flex-1 items-center justify-between"
                      >
                        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="profile">
              <AccordionTrigger className="text-sm font-medium">
                Profile Type
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {allProfiles.map((profile) => (
                    <div key={profile} className="flex items-center space-x-2">
                      <Checkbox
                        id={`profile-${profile}`}
                        checked={selectedProfiles.includes(profile)}
                        onCheckedChange={() => {
                          const newProfiles = selectedProfiles.includes(profile)
                            ? selectedProfiles.filter(p => p !== profile)
                            : [...selectedProfiles, profile];
                          setSelectedProfiles(newProfiles);
                          onFiltersAdd({
                            statuses: selectedStatuses,
                            cities: selectedCities,
                            states: selectedStates,
                            profiles: newProfiles,
                            organizations: selectedOrganizations
                          });
                        }}
                      />
                      <Label
                        htmlFor={`profile-${profile}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                      >
                        <span>{profile}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cities">
              <AccordionTrigger className="text-sm font-medium">
                Cities
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cities..."
                      className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                      onChange={(e) => {
                        // City search functionality can be added here
                      }}
                    />
                  </div>
                  {allCities.map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox
                        id={`city-${city}`}
                        checked={selectedCities.includes(city)}
                        onCheckedChange={() => {
                          const newCities = selectedCities.includes(city)
                            ? selectedCities.filter(c => c !== city)
                            : [...selectedCities, city];
                          setSelectedCities(newCities);
                          onFiltersAdd({
                            statuses: selectedStatuses,
                            cities: newCities,
                            states: selectedStates,
                            profiles: selectedProfiles,
                            organizations: selectedOrganizations
                          });
                        }}
                      />
                      <Label
                        htmlFor={`city-${city}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                      >
                        <span>{city}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
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
                      className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                      onChange={(e) => {
                        // State search functionality can be added here
                      }}
                    />
                  </div>
                  {allStates.map((state) => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox
                        id={`state-${state}`}
                        checked={selectedStates.includes(state)}
                        onCheckedChange={() => {
                          const newStates = selectedStates.includes(state)
                            ? selectedStates.filter(s => s !== state)
                            : [...selectedStates, state];
                          setSelectedStates(newStates);
                          onFiltersAdd({
                            statuses: selectedStatuses,
                            cities: selectedCities,
                            states: newStates,
                            profiles: selectedProfiles,
                            organizations: selectedOrganizations
                          });
                        }}
                      />
                      <Label
                        htmlFor={`state-${state}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                      >
                        <span>{state}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="organizations">
              <AccordionTrigger className="text-sm font-medium">
                Organizations
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {allOrganizations.map((org) => (
                    <div key={org} className="flex items-center space-x-2">
                      <Checkbox
                        id={`org-${org}`}
                        checked={selectedOrganizations.includes(org)}
                        onCheckedChange={() => {
                          const newOrgs = selectedOrganizations.includes(org)
                            ? selectedOrganizations.filter(o => o !== org)
                            : [...selectedOrganizations, org];
                          setSelectedOrganizations(newOrgs);
                          onFiltersAdd({
                            statuses: selectedStatuses,
                            cities: selectedCities,
                            states: selectedStates,
                            profiles: selectedProfiles,
                            organizations: newOrgs
                          });
                        }}
                      />
                      <Label
                        htmlFor={`org-${org}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                      >
                        <span>{org}</span>
                        <Badge variant="outline" className="ml-auto">{Math.floor(Math.random() * 20) + 1}</Badge>
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
            onClick={() => {
              setSelectedStatuses([]);
              setSelectedCities([]);
              setSelectedStates([]);
              setSelectedProfiles([]);
              setSelectedOrganizations([]);
              onFiltersAdd({
                statuses: [],
                cities: [],
                states: [],
                profiles: [],
                organizations: []
              });
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            className="flex-1 gap-1" 
            onClick={() => {
              onFiltersAdd({
                statuses: selectedStatuses,
                cities: selectedCities,
                states: selectedStates,
                profiles: selectedProfiles,
                organizations: selectedOrganizations
              });
            }}
          >
            <Save className="h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
