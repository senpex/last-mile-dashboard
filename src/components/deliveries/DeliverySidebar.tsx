
import React from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Delivery, DeliveryStatus } from "@/types/delivery";

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
  deliveryStatuses,
  selectedStatuses,
  onStatusChange,
}: DeliverySidebarProps) {
  const handleStatusChange = (status: DeliveryStatus, checked: boolean) => {
    if (checked) {
      onStatusChange([...selectedStatuses, status]);
    } else {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    }
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent side="left" className="w-80 border-r p-0">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Filter Deliveries</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="status" className="border-b">
              <AccordionTrigger className="py-4">Status</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 py-2">
                  {deliveryStatuses.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => 
                          handleStatusChange(status, checked === true)
                        }
                      />
                      <Label htmlFor={`status-${status}`}>
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
