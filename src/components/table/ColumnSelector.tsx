
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
  isVisible: boolean;
  default?: boolean;
};

type ColumnSelectorProps = {
  columns: ColumnOption[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
  size?: "default" | "sm" | "lg" | "icon";
};

const ColumnSelector = ({
  columns,
  visibleColumns,
  setVisibleColumns,
  size = "icon",
}: ColumnSelectorProps) => {
  const toggleColumn = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      // Don't allow removing the last visible column
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
      }
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  const resetToDefaults = () => {
    setVisibleColumns(columns.filter(col => col.default).map(col => col.id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} className={size === "icon" ? "h-9 w-9" : ""}>
          <Columns className="h-4 w-4" />
          {size !== "icon" && <span className="ml-2">Columns</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Table Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibleColumns.includes(column.id)}
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
