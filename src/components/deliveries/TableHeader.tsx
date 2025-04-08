
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GripVertical } from "lucide-react";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface TableHeaderProps {
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
}

export function TableHeaderComponent({
  sortedColumns,
  availableColumns,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop
}: TableHeaderProps) {
  return (
    <TableHeader className="bg-muted/50">
      <TableRow>
        {sortedColumns.map(columnId => {
          const column = availableColumns.find(col => col.id === columnId);
          if (!column) return null;
          return (
            <TableHead 
              key={columnId} 
              draggable={true} 
              onDragStart={e => handleDragStart(e, columnId)} 
              onDragOver={e => handleDragOver(e, columnId)} 
              onDragEnd={handleDragEnd} 
              onDrop={e => handleDrop(e, columnId)} 
              className={`${columnId === "distance" || columnId === "couriersEarnings" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
            >
              <div className="flex items-center gap-1 overflow-hidden">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                <span className="truncate">{column.label}</span>
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
