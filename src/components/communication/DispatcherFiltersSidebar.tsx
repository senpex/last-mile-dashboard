import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Save, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DispatcherFiltersSidebarProps {
  selectedDispatchers: string[];
  setSelectedDispatchers: (dispatchers: string[]) => void;
  allDispatchers: string[];
  onFiltersAdd: (filters: any) => void;
  open: boolean;
  onClose: () => void;
}

export const DispatcherFiltersSidebar = ({
  selectedDispatchers,
  setSelectedDispatchers,
  allDispatchers,
  onFiltersAdd,
  open,
  onClose
}: DispatcherFiltersSidebarProps) => {
  return (
    <div 
      className={cn(
        "h-full bg-white dark:bg-gray-900 rounded-lg shadow-md transition-all duration-300",
        "border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
        "light:border-2 light:border-gray-300 light:hover:border-gray-400",
        open ? "w-[275px] opacity-100 max-w-[80vw]" : "w-0 opacity-0 invisible overflow-hidden"
      )}
    >
      <div className="p-4 w-full h-full flex flex-col overflow-y-auto px-3">
        <h2 className="text-lg font-semibold mb-4">Dispatcher Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="dispatchers">
              <AccordionTrigger className="text-sm font-medium">
                Dispatchers
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search dispatchers..." className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input" />
                  </div>
                  {allDispatchers.map(dispatcher => <div key={dispatcher} className="flex items-center space-x-2">
                      <Checkbox id={`dispatcher-${dispatcher}`} checked={selectedDispatchers.includes(dispatcher)} onCheckedChange={() => {
                    const newDispatchers = selectedDispatchers.includes(dispatcher) ? selectedDispatchers.filter(d => d !== dispatcher) : [...selectedDispatchers, dispatcher];
                    setSelectedDispatchers(newDispatchers);
                    onFiltersAdd({
                      dispatchers: newDispatchers
                    });
                  }} />
                      <Label htmlFor={`dispatcher-${dispatcher}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {dispatcher}
                      </Label>
                    </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1 gap-1" onClick={() => {
          setSelectedDispatchers([]);
          onFiltersAdd({
            dispatchers: []
          });
        }}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button className="flex-1 gap-1" onClick={() => {
          onFiltersAdd({
            dispatchers: selectedDispatchers
          });
        }}>
            <Save className="h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
