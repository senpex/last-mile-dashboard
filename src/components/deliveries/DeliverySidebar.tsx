
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
  const [statusMapping, setStatusMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load the same status dictionary (ID 19) used in the Deliveries table
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      setStatusItems(dictionary.items);
      
      // Create a mapping from dictionary ID to delivery status value
      // The problem was likely here - we were using item.value for both key and value
      const mapping: Record<string, string> = {};
      dictionary.items.forEach(item => {
        // Map the dictionary item value to actual delivery status values expected in data
        if (item.id === "completed") mapping[item.value] = "Dropoff Complete";
        else if (item.id === "cancelled_order") mapping[item.value] = "Canceled By Customer";
        else if (item.id === "cancelled_by_admin") mapping[item.value] = "Cancelled By Admin";
        else if (item.id === "in_transit") mapping[item.value] = "In Transit";
        else if (item.id === "started_working") mapping[item.value] = "Picking Up";
        else if (item.id === "arrived_for_pickup") mapping[item.value] = "Arrived For Pickup";
        else mapping[item.value] = item.value; // Default mapping
      });
      
      setStatusMapping(mapping);
      console.log("Loaded status dictionary:", dictionary);
      console.log("Status mapping:", mapping);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, []);

  const handleStatusChange = (statusValue: string, checked: boolean) => {
    // Map the dictionary status to actual delivery status
    const actualStatus = statusMapping[statusValue];
    
    if (checked) {
      onStatusChange([...selectedStatuses, actualStatus as DeliveryStatus]);
    } else {
      onStatusChange(selectedStatuses.filter(s => s !== actualStatus));
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
                {statusItems.map(item => {
                  // Only show items that have a mapping to actual delivery statuses
                  const actualStatus = statusMapping[item.value];
                  if (!actualStatus) return null;
                  
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
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>;
}
