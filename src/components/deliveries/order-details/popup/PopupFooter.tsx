
import React from 'react';
import { Button } from "@/components/ui/button";

interface PopupFooterProps {
  totalDrivers: number;
  selectedDriversCount: number;
  onSelectAll: () => void;
  onClose: () => void;
  onAssignToDriver: () => void;
  onSendToSelected: () => void;
}

export const PopupFooter = ({
  totalDrivers,
  selectedDriversCount,
  onSelectAll,
  onClose,
  onAssignToDriver,
  onSendToSelected
}: PopupFooterProps) => {
  return (
    <div className="p-4 border-t bg-muted/30 flex-shrink-0">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {totalDrivers} driver(s) found • {selectedDriversCount} driver(s) selected
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSelectAll}
            className="h-8"
          >
            {selectedDriversCount === totalDrivers ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="h-8">
            Cancel
          </Button>
          <Button 
            onClick={onAssignToDriver} 
            disabled={selectedDriversCount !== 1}
            className="bg-green-600 hover:bg-green-700 text-white h-8"
          >
            Assign to driver
          </Button>
          <Button 
            onClick={onSendToSelected} 
            disabled={selectedDriversCount === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-8"
          >
            Send to Selected ({selectedDriversCount})
          </Button>
        </div>
      </div>
    </div>
  );
};
