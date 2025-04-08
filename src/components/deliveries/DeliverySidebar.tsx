
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
  onStatusChange,
}: DeliverySidebarProps) {
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [statusItems, setStatusItems] = useState<DictionaryItem[]>([]);

  useEffect(() => {
    // Load the Package - Pickup statuses dictionary
    const dictionary = getDictionary("1401");
    if (dictionary) {
      setStatusDictionary(dictionary);
      setStatusItems(dictionary.items);
      console.log("Loaded Package - Pickup statuses dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 1401 not found");
    }
  }, []);

  const handleStatusChange = (statusValue: string, checked: boolean) => {
    if (checked) {
      onStatusChange([...selectedStatuses, statusValue as DeliveryStatus]);
    } else {
      onStatusChange(selectedStatuses.filter(s => s !== statusValue));
    }
  };

  return (
    <div 
      className={`h-full bg-background border-r shadow-lg transition-all duration-300 ${open ? 'w-72' : 'w-0 overflow-hidden'}`}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Filter Deliveries</h2>
        
        <Accordion type="single" collapsible className="w-full" defaultValue="status">
          <AccordionItem value="status" className="border-b">
            <AccordionTrigger className="py-4">Status</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3 py-2">
                {statusItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-${item.id}`} 
                      checked={selectedStatuses.includes(item.value as DeliveryStatus)}
                      onCheckedChange={(checked) => 
                        handleStatusChange(item.value, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`status-${item.id}`}
                      className="flex flex-1 items-center justify-between"
                      title={item.description || ''}
                    >
                      <span>{item.value}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
