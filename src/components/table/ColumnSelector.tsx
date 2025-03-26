
import React from "react";
import { Check, Columns } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type ColumnOption = {
  id: string;
  label: string;
  default: boolean;
};

type ColumnSelectorProps = {
  columns: ColumnOption[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
};

const ColumnSelector = ({
  columns,
  visibleColumns,
  setVisibleColumns,
}: ColumnSelectorProps) => {
  const toggleColumn = (columnId: string) => {
    if (visibleColumns && visibleColumns.includes(columnId)) {
      // Don't allow removing the last visible column
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
      }
    } else {
      setVisibleColumns([...(visibleColumns || []), columnId]);
    }
  };

  const resetToDefaults = () => {
    setVisibleColumns(columns.filter(col => col.default).map(col => col.id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Columns className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Table Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibleColumns ? visibleColumns.includes(column.id) : false}
            onCheckedChange={() => toggleColumn(column.id)}
          >
            {column.label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
