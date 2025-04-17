
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface CommunicationSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CommunicationSidebar({
  open,
  onClose
}: CommunicationSidebarProps) {
  const [recipientSearchTerm, setRecipientSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const recipientTypes = [
    { id: 'driver', value: 'Drivers', count: 45 },
    { id: 'client', value: 'Clients', count: 32 },
    { id: 'dispatcher', value: 'Dispatchers', count: 12 }
  ];

  const handleResetFilters = () => {
    setSelectedTypes([]);
  };

  const handleSaveFilters = () => {
    onClose();
  };

  return (
    <div className={`h-full bg-background border-r shadow-lg transition-all duration-300 ${open ? 'w-[275px] max-w-[80vw]' : 'w-0 overflow-hidden'}`}>
      <div className="p-6 w-full h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="recipient-type">
              <AccordionTrigger className="text-sm font-medium">
                Recipient Type
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search recipient type..."
                      value={recipientSearchTerm}
                      onChange={(e) => setRecipientSearchTerm(e.target.value)}
                      className="mb-2 pl-8 h-9 transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
                    />
                  </div>
                  {recipientTypes
                    .filter(type => type.value.toLowerCase().includes(recipientSearchTerm.toLowerCase()))
                    .map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type.id}`}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={() => {
                            if (selectedTypes.includes(type.id)) {
                              setSelectedTypes(selectedTypes.filter(t => t !== type.id));
                            } else {
                              setSelectedTypes([...selectedTypes, type.id]);
                            }
                          }}
                        />
                        <label
                          htmlFor={`type-${type.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-1 items-center justify-between"
                        >
                          <span>{type.value}</span>
                          <Badge variant="outline" className="ml-auto">{type.count}</Badge>
                        </label>
                      </div>
                    ))}
                  {recipientTypes.filter(type => type.value.toLowerCase().includes(recipientSearchTerm.toLowerCase())).length === 0 && (
                    <p className="text-sm text-muted-foreground">No matching recipient types found</p>
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
