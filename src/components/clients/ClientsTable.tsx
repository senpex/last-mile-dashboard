
import React, { useRef } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, GripVertical } from "lucide-react";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface ClientsTableProps {
  currentItems: any[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  editingNotes: number | null;
  draggedColumn: string | null;
  dragOverColumn: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDragEnd: () => void;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
  handleNotesClick: (clientId: number) => void;
  handleNotesChange: (clientId: number, notes: string) => void;
  saveNotes: (clientId: number) => void;
  className?: string;
  sortConfig: {
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  };
  requestSort: (key: string) => void;
  renderStatus: (status: string) => JSX.Element;
}

export function ClientsTable({
  currentItems,
  sortedColumns,
  availableColumns,
  editingNotes,
  draggedColumn,
  dragOverColumn,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  renderStripeStatus,
  handleNotesClick,
  handleNotesChange,
  saveNotes,
  className = '',
  sortConfig,
  requestSort,
  renderStatus
}: ClientsTableProps) {
  return (
    <UsersTableContainer className={className}>
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0 border-b-0 m-0 p-0">
          <TableRow className="border-b-0">
            {sortedColumns.map(columnId => {
              const column = availableColumns.find(col => col.id === columnId);
              if (!column) return null;
              
              const sortable = ['id', 'name', 'email', 'status', 'company'].includes(columnId);
              
              return (
                <TableHead
                  key={columnId}
                  className={`whitespace-nowrap min-w-[100px] ${columnId === 'actions' ? 'w-[80px]' : ''}`}
                  dragOver={dragOverColumn === columnId}
                  sortable={sortable}
                  sortDirection={sortConfig.key === columnId ? sortConfig.direction : null}
                  onSort={() => requestSort(columnId)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      draggable={columnId !== 'actions'}
                      onDragStart={e => onDragStart(e, columnId)}
                      onDragOver={e => onDragOver(e, columnId)}
                      onDragEnd={onDragEnd}
                      onDrop={e => onDrop(e, columnId)}
                      className="cursor-grab"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                    <span>{column.label}</span>
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={sortedColumns.length} className="text-center py-8">
                No clients found
              </TableCell>
            </TableRow>
          )}
          {currentItems.map(client => (
            <TableRow key={client.id}>
              {sortedColumns.map(columnId => {
                if (!availableColumns.find(col => col.id === columnId)) return null;
                
                return (
                  <TableCell key={`${client.id}-${columnId}`} className="align-top">
                    {columnId === 'id' && client.id}
                    {columnId === 'name' && client.name}
                    {columnId === 'email' && <a href={`mailto:${client.email}`} className="text-blue-500 hover:underline">{client.email}</a>}
                    {columnId === 'phone' && client.phone}
                    {columnId === 'company' && client.company}
                    {columnId === 'address' && client.address}
                    {columnId === 'zipcode' && client.zipcode}
                    {columnId === 'status' && renderStatus(client.status)}
                    {columnId === 'stripeStatus' && renderStripeStatus(client.stripeStatus)}
                    {columnId === 'totalOrders' && (
                      <span className="font-medium">{client.totalOrders}</span>
                    )}
                    {columnId === 'notes' && (
                      <>
                        {editingNotes === client.id ? (
                          <div className="flex flex-col gap-2">
                            <Textarea
                              value={client.notes}
                              onChange={(e) => handleNotesChange(client.id, e.target.value)}
                              className="min-h-[80px] text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex gap-1 self-end"
                              onClick={() => saveNotes(client.id)}
                            >
                              <Check className="h-4 w-4" /> Save
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer min-h-[24px]"
                            onClick={() => handleNotesClick(client.id)}
                          >
                            {client.notes || <span className="text-muted-foreground italic">Click to add notes</span>}
                          </div>
                        )}
                      </>
                    )}
                    {columnId === 'actions' && (
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    )}
                    {columnId === 'lastOrderDate' && (
                      <span className="text-sm text-muted-foreground">
                        {new Date(client.lastOrderDate).toLocaleDateString()}
                      </span>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UsersTableContainer>
  );
}
