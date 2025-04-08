
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DeliveryStatus } from "@/types/delivery";
import { Dictionary, DictionaryItem } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";

interface DeliverySidebarProps {
  open: boolean;
  onClose: () => void;
  deliveryStatuses: DeliveryStatus[];
  selectedStatuses: DeliveryStatus[];
  onStatusChange: (statuses: DeliveryStatus[]) => void;
}

export function DeliverySidebar({
  open,
  onClose,
  selectedStatuses,
  onStatusChange
}: DeliverySidebarProps) {
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [statusItems, setStatusItems] = useState<DictionaryItem[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState<string>("");

  useEffect(() => {
    // Load the same status dictionary (ID 19) used in the Deliveries table
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      setStatusItems(dictionary.items);
      console.log("Loaded status dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, []);

  const handleStatusChange = (statusValue: string, checked: boolean) => {
    if (checked) {
      onStatusChange([...selectedStatuses, statusValue as DeliveryStatus]);
    } else {
      onStatusChange(selectedStatuses.filter(s => s !== statusValue));
    }
  };

  return <div className={`h-full bg-background border-r shadow-lg transition-all duration-300 ${open ? 'w-[250px] max-w-[80vw]' : 'w-0 overflow-hidden'}`}>
      <div className="p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        <Accordion 
          type="single" 
          collapsible 
          className="w-full" 
          defaultValue=""
          value={isAccordionOpen}
          onValueChange={setIsAccordionOpen}
        >
          <AccordionItem value="status" className="border-b">
            <AccordionTrigger className="py-4 w-full text-left justify-between pr-4">
              <span className="mr-[100px]">Status</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3 py-2">
                {statusItems.map(item => <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={`status-${item.id}`} checked={selectedStatuses.includes(item.value as DeliveryStatus)} onCheckedChange={checked => handleStatusChange(item.value, checked === true)} />
                    <Label htmlFor={`status-${item.id}`} className="flex flex-1 items-center justify-between" title={item.description || ''}>
                      <span>{item.value}</span>
                    </Label>
                  </div>)}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>;
}
