
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
            ? "bg-red-600 !text-white" 
            : "bg-red-100 text-black dark:bg-red-800 dark:text-gray-300 hover:bg-red-200 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200"
          }
        >
          <Smartphone className={`mr-1 h-4 w-4 ${channels.includes('sms') ? 'text-white' : 'text-black dark:text-gray-300'}`} />
          <span>SMS</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="email" 
          aria-label="Toggle Email" 
          className={channels.includes('email') 
            ? "bg-red-600 !text-white" 
            : "bg-red-100 text-black dark:bg-red-800 dark:text-gray-300 hover:bg-red-200 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200"
          }
        >
          <Mail className={`mr-1 h-4 w-4 ${channels.includes('email') ? 'text-white' : 'text-black dark:text-gray-300'}`} />
          <span>Email</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="inapp" 
          aria-label="Toggle In-App" 
          className={channels.includes('inapp') 
            ? "bg-red-600 !text-white" 
            : "bg-red-100 text-black dark:bg-red-800 dark:text-gray-300 hover:bg-red-200 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200"
          }
        >
          <MessageSquare className={`mr-1 h-4 w-4 ${channels.includes('inapp') ? 'text-white' : 'text-black dark:text-gray-300'}`} />
          <span>In-App</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

