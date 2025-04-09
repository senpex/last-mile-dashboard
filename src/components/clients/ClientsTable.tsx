
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { DataTableContainer } from "@/components/ui/data-table-container";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface ClientsTableProps {
  clients: any[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  currentItems: any[];
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  dragOverColumn: string | null;
}

const ClientsTable = ({
  currentItems,
  sortedColumns,
  availableColumns,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  dragOverColumn
}: ClientsTableProps) => {
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
                    className={`${columnId === "id" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
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
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((client) => (
                <TableRow key={client.id}>
                  {sortedColumns.includes("id") && (
                    <TableCell className="font-sans">{client.id}</TableCell>
                  )}
                  {sortedColumns.includes("organization") && (
                    <TableCell>{client.name}</TableCell>
                  )}
                  {sortedColumns.includes("contact") && (
                    <TableCell>{client.contact}</TableCell>
                  )}
                  {sortedColumns.includes("email") && (
                    <TableCell>{client.email}</TableCell>
                  )}
                  {sortedColumns.includes("phone") && (
                    <TableCell>{client.phone}</TableCell>
                  )}
                  {sortedColumns.includes("type") && (
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.type === "Business" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      }`}>
                        {client.type}
                      </div>
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

export default ClientsTable;
