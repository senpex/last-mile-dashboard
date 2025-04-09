
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { DataTableContainer } from "@/components/ui/data-table-container";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface DriversTableProps {
  currentItems: any[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  dragOverColumn: string | null;
}

const DriversTable = ({
  currentItems,
  sortedColumns,
  availableColumns,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  dragOverColumn
}: DriversTableProps) => {
  return (
    <div className="border rounded-md">
      <DataTableContainer>
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {sortedColumns.map((columnId) => {
                const column = availableColumns.find(col => col.id === columnId);
                if (!column) return null;
                
                return (
                  <TableHead 
                    key={columnId}
                    draggable={true}
                    dragOver={dragOverColumn === columnId}
                    onDragStart={(e) => handleDragStart(e, columnId)}
                    onDragOver={(e) => handleDragOver(e, columnId)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, columnId)}
                    className="whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                      <span>{column.label}</span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((driver) => (
                <TableRow key={driver.id}>
                  {sortedColumns.includes("id") && (
                    <TableCell className="font-mono">{driver.id}</TableCell>
                  )}
                  {sortedColumns.includes("name") && (
                    <TableCell>{driver.name}</TableCell>
                  )}
                  {sortedColumns.includes("email") && (
                    <TableCell>{driver.email}</TableCell>
                  )}
                  {sortedColumns.includes("phone") && (
                    <TableCell>{driver.phone}</TableCell>
                  )}
                  {sortedColumns.includes("vehicleType") && (
                    <TableCell>{driver.vehicleType}</TableCell>
                  )}
                  {sortedColumns.includes("license") && (
                    <TableCell>{driver.license}</TableCell>
                  )}
                  {sortedColumns.includes("status") && (
                    <TableCell>
                      <Badge 
                        variant={driver.status === "Active" ? "success" : driver.status === "Inactive" ? "secondary" : "outline"}
                        className="capitalize"
                      >
                        {driver.status}
                      </Badge>
                    </TableCell>
                  )}
                  {sortedColumns.includes("actions") && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={sortedColumns.length} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DataTableContainer>
    </div>
  );
};

export default DriversTable;
