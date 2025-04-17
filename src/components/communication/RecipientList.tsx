
import React from 'react';
import { cn } from "@/lib/utils";
import { Recipient } from './types';
import { DeliveryStatus } from '@/types/delivery';

interface FilterGroup {
  type: string;
  values: string[];
}

interface RecipientListProps {
  selectedRecipients: Recipient[];
  onRemoveRecipient: (recipient: Recipient) => void;
  selectedFilters?: {
    statuses?: DeliveryStatus[];
    cities?: string[];
    states?: string[];
    zipcodes?: string[];
    organizations?: string[];
    pickupAddresses?: string[];
    dropoffAddresses?: string[];
    senderNames?: string[];
    recipientNames?: string[];
    profiles?: string[];
    transports?: string[];
    hireStatuses?: string[];
  };
}

export const RecipientList: React.FC<RecipientListProps> = ({
  selectedRecipients,
  onRemoveRecipient,
  selectedFilters
}) => {
  const getFilterGroups = (): FilterGroup[] => {
    if (!selectedFilters) return [];
    
    const groups: FilterGroup[] = [];
    
    if (selectedFilters.statuses?.length) {
      groups.push({ type: "Status", values: selectedFilters.statuses });
    }
    if (selectedFilters.cities?.length) {
      groups.push({ type: "City", values: selectedFilters.cities });
    }
    if (selectedFilters.states?.length) {
      groups.push({ type: "State", values: selectedFilters.states });
    }
    if (selectedFilters.zipcodes?.length) {
      groups.push({ type: "Zipcode", values: selectedFilters.zipcodes });
    }
    if (selectedFilters.organizations?.length) {
      groups.push({ type: "Organization", values: selectedFilters.organizations });
    }
    if (selectedFilters.pickupAddresses?.length) {
      groups.push({ type: "Pickup", values: selectedFilters.pickupAddresses });
    }
    if (selectedFilters.dropoffAddresses?.length) {
      groups.push({ type: "Dropoff", values: selectedFilters.dropoffAddresses });
    }
    if (selectedFilters.senderNames?.length) {
      groups.push({ type: "Sender", values: selectedFilters.senderNames });
    }
    if (selectedFilters.recipientNames?.length) {
      groups.push({ type: "Recipient", values: selectedFilters.recipientNames });
    }
    // Add the new filter types
    if (selectedFilters.profiles?.length) {
      groups.push({ type: "Profile", values: selectedFilters.profiles });
    }
    if (selectedFilters.transports?.length) {
      groups.push({ type: "Transport", values: selectedFilters.transports });
    }
    if (selectedFilters.hireStatuses?.length) {
      groups.push({ type: "Hire Status", values: selectedFilters.hireStatuses });
    }

    return groups;
  };

  const filterGroups = getFilterGroups();

  if (selectedRecipients.length === 0 && filterGroups.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-sm">No recipients selected</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
      {selectedRecipients.map(recipient => (
        <div 
          key={recipient.id} 
          className="bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-3 text-sm flex items-center"
        >
          <span className="text-foreground dark:text-gray-300">{recipient.name}</span>
          <button 
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" 
            onClick={() => onRemoveRecipient(recipient)}
          >
            &times;
          </button>
        </div>
      ))}
      
      {filterGroups.map((group) => (
        <div key={group.type} className="flex items-center gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {group.type}:
          </span>
          {group.values.map((value, index) => (
            <div 
              key={`${group.type}-${value}`}
              className="bg-blue-100 dark:bg-blue-900 rounded-md py-1 px-2 text-sm text-blue-700 dark:text-blue-200"
            >
              {value}
              {index < group.values.length - 1 && ", "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
