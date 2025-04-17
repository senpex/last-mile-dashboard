import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchInput } from "@/components/ui/search-input";
interface ClientsSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedStatuses?: string[];
  setSelectedStatuses?: (statuses: string[]) => void;
  allClientStatuses?: string[];
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
  allCities: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allStates: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  allCompanies: string[];
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
}
export function ClientsSidebar({
  open,
  onClose,
  selectedStatuses = [],
  setSelectedStatuses = () => {},
  allClientStatuses = [],
  allZipcodes = [],
  selectedZipcodes = [],
  setSelectedZipcodes,
  allCities = [],
  selectedCities = [],
  setSelectedCities,
  allStates = [],
  selectedStates = [],
  setSelectedStates,
  allCompanies = [],
  selectedCompanies = [],
  setSelectedCompanies
}: ClientsSidebarProps) {
  const isMobile = useIsMobile();
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [zipcodeSearchTerm, setZipcodeSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const filteredCompanies = allCompanies.filter(company => company.toLowerCase().includes(companySearchTerm.toLowerCase()));
  const filteredZipcodes = allZipcodes.filter(zipcode => zipcode.toLowerCase().includes(zipcodeSearchTerm.toLowerCase()));
  const filteredCities = allCities.filter(city => city.toLowerCase().includes(citySearchTerm.toLowerCase()));
  const filteredStates = allStates.filter(state => state.toLowerCase().includes(stateSearchTerm.toLowerCase()));
  const handleReset = () => {
    setSelectedCompanies([]);
    setSelectedZipcodes([]);
    setSelectedCities([]);
    setSelectedStates([]);
    if (setSelectedStatuses) {
      setSelectedStatuses([]);
    }
  };
  const handleSave = () => {
    // In a real application, this would save the current filter state
    // For now, we'll just close the sidebar
    onClose();
  };
  const filterContent = <div className="h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-medium">Filters</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="company">
            <AccordionTrigger className="text-sm">Company</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <SearchInput placeholder="Search companies..." value={companySearchTerm} onChange={e => setCompanySearchTerm(e.target.value)} />
              <div className="max-h-[200px] overflow-y-auto mt-2">
                {filteredCompanies.length > 0 ? filteredCompanies.map(company => <div key={company} className="flex items-center justify-between space-x-2 py-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`company-${company}`} checked={selectedCompanies.includes(company)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedCompanies([...selectedCompanies, company]);
                    } else {
                      setSelectedCompanies(selectedCompanies.filter(c => c !== company));
                    }
                  }} />
                        <Label htmlFor={`company-${company}`} className="text-sm">
                          {company}
                        </Label>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {allCompanies.filter(c => c === company).length}
                      </span>
                    </div>) : <p className="text-sm text-muted-foreground py-2">No companies found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="zipcode">
            <AccordionTrigger className="text-sm">Zipcode</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <SearchInput placeholder="Search zipcodes..." value={zipcodeSearchTerm} onChange={e => setZipcodeSearchTerm(e.target.value)} />
              <div className="max-h-[200px] overflow-y-auto mt-2">
                {filteredZipcodes.length > 0 ? filteredZipcodes.map(zipcode => <div key={zipcode} className="flex items-center justify-between space-x-2 py-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`zipcode-${zipcode}`} checked={selectedZipcodes.includes(zipcode)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedZipcodes([...selectedZipcodes, zipcode]);
                    } else {
                      setSelectedZipcodes(selectedZipcodes.filter(z => z !== zipcode));
                    }
                  }} />
                        <Label htmlFor={`zipcode-${zipcode}`} className="text-sm">
                          {zipcode}
                        </Label>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {allZipcodes.filter(z => z === zipcode).length}
                      </span>
                    </div>) : <p className="text-sm text-muted-foreground py-2">No zipcodes found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="city">
            <AccordionTrigger className="text-sm">City</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <SearchInput placeholder="Search cities..." value={citySearchTerm} onChange={e => setCitySearchTerm(e.target.value)} />
              <div className="max-h-[200px] overflow-y-auto mt-2">
                {filteredCities.length > 0 ? filteredCities.map(city => <div key={city} className="flex items-center justify-between space-x-2 py-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`city-${city}`} checked={selectedCities.includes(city)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedCities([...selectedCities, city]);
                    } else {
                      setSelectedCities(selectedCities.filter(c => c !== city));
                    }
                  }} />
                        <Label htmlFor={`city-${city}`} className="text-sm">
                          {city}
                        </Label>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {allCities.filter(c => c === city).length}
                      </span>
                    </div>) : <p className="text-sm text-muted-foreground py-2">No cities found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="state">
            <AccordionTrigger className="text-sm">State</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <SearchInput placeholder="Search states..." value={stateSearchTerm} onChange={e => setStateSearchTerm(e.target.value)} />
              <div className="max-h-[200px] overflow-y-auto mt-2">
                {filteredStates.length > 0 ? filteredStates.map(state => <div key={state} className="flex items-center justify-between space-x-2 py-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`state-${state}`} checked={selectedStates.includes(state)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedStates([...selectedStates, state]);
                    } else {
                      setSelectedStates(selectedStates.filter(s => s !== state));
                    }
                  }} />
                        <Label htmlFor={`state-${state}`} className="text-sm">
                          {state}
                        </Label>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                        {allStates.filter(s => s === state).length}
                      </span>
                    </div>) : <p className="text-sm text-muted-foreground py-2">No states found</p>}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t flex gap-2 mx-[23px] py-[24px]">
        <Button variant="outline" className="flex-1 gap-1" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button className="flex-1 gap-1" onClick={handleSave}>
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>;
  if (isMobile) {
    return <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="h-[80vh]">
          {filterContent}
        </DrawerContent>
      </Drawer>;
  }
  return <div className={`h-full transition-all duration-300 bg-background border-r ${open ? 'w-[280px]' : 'w-0 overflow-hidden'}`}>
      {filterContent}
    </div>;
}