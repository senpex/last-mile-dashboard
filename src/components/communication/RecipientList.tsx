
import React from 'react';
import { cn } from "@/lib/utils";
import { Recipient } from './types';

interface RecipientListProps {
  selectedRecipients: Recipient[];
  onRemoveRecipient: (recipient: Recipient) => void;
}

export const RecipientList: React.FC<RecipientListProps> = ({
  selectedRecipients,
  onRemoveRecipient
}) => {
  if (selectedRecipients.length === 0) {
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
    </div>
  );
};
