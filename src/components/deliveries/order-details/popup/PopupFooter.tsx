
import React from 'react';
import { Button } from "@/components/ui/button";

interface PopupFooterProps {
  totalDrivers: number;
  selectedCount: number;
  onSelectAll: () => void;
  onCancel: () => void;
  onAssignToDriver: () => void;
  onSendToSelected: () => void;
}

export function PopupFooter({
  totalDrivers,
  selectedCount,
  onSelectAll,
  onCancel,
  onAssignToDriver,
  onSendToSelected
}: PopupFooterProps) {
  return (
    <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {totalDrivers} driver(s) found • {selectedCount} driver(s) selected
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSelectAll}
          >
            {selectedCount === totalDrivers ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={onAssignToDriver} 
            disabled={selectedCount !== 1}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Assign to driver
          </Button>
          <Button 
            onClick={onSendToSelected} 
            disabled={selectedCount === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Send to Selected ({selectedCount})
          </Button>
        </div>
      </div>
    </div>
  );
}
