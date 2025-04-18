
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Smartphone, Mail, MessageSquare } from "lucide-react";

interface CommunicationChannelsProps {
  channels: string[];
  onChannelToggle: (value: string[]) => void;
}

export const CommunicationChannels: React.FC<CommunicationChannelsProps> = ({
  channels,
  onChannelToggle
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
        Select Communication Channels:
      </label>
      <ToggleGroup type="multiple" variant="outline" className="justify-start" value={channels} onValueChange={onChannelToggle}>
        <ToggleGroupItem 
          value="sms" 
          aria-label="Toggle SMS" 
          className={channels.includes('sms') 
            ? "bg-blue-600 !text-white" 
            : "bg-blue-100 text-foreground dark:bg-blue-800 dark:text-gray-300 hover:bg-blue-200 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-200"
          }
        >
          <Smartphone className={`mr-1 h-4 w-4 ${channels.includes('sms') ? 'text-white' : ''}`} />
          <span>SMS</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="email" 
          aria-label="Toggle Email" 
          className={channels.includes('email') 
            ? "bg-blue-600 !text-white" 
            : "bg-blue-100 text-foreground dark:bg-blue-800 dark:text-gray-300 hover:bg-blue-200 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-200"
          }
        >
          <Mail className={`mr-1 h-4 w-4 ${channels.includes('email') ? 'text-white' : ''}`} />
          <span>Email</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="inapp" 
          aria-label="Toggle In-App" 
          className={channels.includes('inapp') 
            ? "bg-blue-600 !text-white" 
            : "bg-blue-100 text-foreground dark:bg-blue-800 dark:text-gray-300 hover:bg-blue-200 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-200"
          }
        >
          <MessageSquare className={`mr-1 h-4 w-4 ${channels.includes('inapp') ? 'text-white' : ''}`} />
          <span>In-App</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
