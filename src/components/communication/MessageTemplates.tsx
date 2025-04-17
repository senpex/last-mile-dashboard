
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type MessageTemplate = {
  id: string;
  name: string;
  content: string;
};

const messageTemplates: MessageTemplate[] = [{
  id: "template1",
  name: "Order Arriving",
  content: "Your order is arriving soon. Please be ready to receive it."
}, {
  id: "template2",
  name: "Driver Delayed",
  content: "Your driver is delayed due to traffic. We apologize for the inconvenience."
}, {
  id: "template3",
  name: "Confirm Availability",
  content: "Please confirm your availability for the scheduled delivery."
}, {
  id: "template4",
  name: "Delivery Completed",
  content: "Your delivery has been completed. Thank you for using our service!"
}];

interface MessageTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export const MessageTemplates: React.FC<MessageTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <Select onValueChange={onSelectTemplate}>
      <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
        <SelectValue placeholder="Select template" />
      </SelectTrigger>
      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
        {messageTemplates.map(template => (
          <SelectItem 
            key={template.id} 
            value={template.id} 
            className="dark:hover:bg-gray-700 dark:text-gray-300"
          >
            {template.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { messageTemplates };
