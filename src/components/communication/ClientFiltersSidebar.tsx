import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className={`h-full transition-all duration-300 bg-background border-r ${open ? 'w-[280px]' : 'w-0 overflow-hidden'}`}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Client Filters</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
          
          {/* Status Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Status</h3>
            <div className="space-y-2">
              {allClientStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => {
                      const newStatuses = checked
                        ? [...selectedStatuses, status]
                        : selectedStatuses.filter((s) => s !== status);
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
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cities Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Cities</h3>
            <div className="space-y-2">
              {allCities.map((city) => (
                <div key={city} className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${city}`}
                    checked={selectedCities.includes(city)}
                    onCheckedChange={(checked) => {
                      const newCities = checked
                        ? [...selectedCities, city]
                        : selectedCities.filter((c) => c !== city);
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
                  <label
                    htmlFor={`city-${city}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {city}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* States Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">States</h3>
            <div className="space-y-2">
              {allStates.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={(checked) => {
                      const newStates = checked
                        ? [...selectedStates, state]
                        : selectedStates.filter((s) => s !== state);
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
                  <label
                    htmlFor={`state-${state}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {state}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Profiles Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Profile Type</h3>
            <div className="space-y-2">
              {allProfiles.map((profile) => (
                <div key={profile} className="flex items-center space-x-2">
                  <Checkbox
                    id={`profile-${profile}`}
                    checked={selectedProfiles.includes(profile)}
                    onCheckedChange={(checked) => {
                      const newProfiles = checked
                        ? [...selectedProfiles, profile]
                        : selectedProfiles.filter((p) => p !== profile);
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
                  <label
                    htmlFor={`profile-${profile}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {profile}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Organizations Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Organizations</h3>
            <div className="space-y-2">
              {allOrganizations.map((org) => (
                <div key={org} className="flex items-center space-x-2">
                  <Checkbox
                    id={`org-${org}`}
                    checked={selectedOrganizations.includes(org)}
                    onCheckedChange={(checked) => {
                      const newOrgs = checked
                        ? [...selectedOrganizations, org]
                        : selectedOrganizations.filter((o) => o !== org);
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
                  <label
                    htmlFor={`org-${org}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {org}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
