
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, FileText } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { UsersTableContainer } from "@/components/ui/users-table-container";

interface DriversTableProps {
  currentItems: any[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  statusColors: { [key: string]: string };
  editingNotes: number | null;
  draggedColumn: string | null;
  dragOverColumn: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onDragEnd: () => void;
  renderRating: (rating: number) => JSX.Element;
  renderStatus: (statusId: string) => JSX.Element;
  renderHireStatus: (hireStatusId: string, driverId: number) => JSX.Element;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
  handleNotesClick: (driverId: number) => void;
  handleNotesChange: (driverId: number, notes: string) => void;
  saveNotes: (driverId: number) => void;
  className?: string;
}

export const DriversTable = ({
  currentItems,
  sortedColumns,
  availableColumns,
  transportTypes,
  statusDictionary,
  statusColors,
  editingNotes,
  draggedColumn,
  dragOverColumn,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  renderRating,
  renderStatus,
  renderHireStatus,
  renderStripeStatus,
  handleNotesClick,
  handleNotesChange,
  saveNotes,
  className
}: DriversTableProps) => {
  const renderCellContent = (driver: any, columnId: string) => {
    switch (columnId) {
      case "id":
        return driver.id;
      case "name":
        return driver.name;
      case "email":
        return driver.email;
      case "phone":
        return <div className="max-w-[150px] truncate" title={driver.phone}>
            {driver.phone}
          </div>;
      case "zipcode":
        return driver.zipcode;
      case "address":
        return <div className="max-w-[200px] truncate" title={driver.address}>
            {driver.address || "No address provided"}
          </div>;
      case "transport":
        return <div className="flex items-center gap-2">
            {driver.transports.map((transportId: string) => <div key={transportId} className="flex items-center justify-center p-2 rounded-md bg-muted" title={transportTypes[transportId] || `Transport ID: ${transportId}`}>
                <TransportIcon transportType={transportId as TransportType} size={14} className="h-[14px] w-[14px]" />
              </div>)}
          </div>;
      case "rating":
        return renderRating(driver.rating);
      case "status":
        return renderStatus(driver.status);
      case "hireStatus":
        return renderHireStatus(driver.hireStatus, driver.id);
      case "stripeStatus":
        return renderStripeStatus(driver.stripeStatus);
      case "profileType":
        return (
          <div className="flex flex-wrap gap-1">
            {driver.profileTypes && Array.isArray(driver.profileTypes) ? 
              driver.profileTypes.map((type: string) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              )) : 
              <span className="text-muted-foreground text-xs">No profiles</span>
            }
          </div>
        );
      case "notes":
        if (editingNotes === driver.id) {
          return <div className="flex flex-col gap-2">
              <Textarea placeholder="Add notes about this driver..." className="min-h-[80px] text-sm" value={driver.notes || ''} onChange={e => handleNotesChange(driver.id, e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => saveNotes(driver.id)}>
                  Cancel
                </Button>
                <Button size="sm" className="h-7 px-2 text-xs" onClick={() => saveNotes(driver.id)}>
                  Save
                </Button>
              </div>
            </div>;
        } else {
          return <div className="relative cursor-pointer group flex items-start gap-1" onClick={() => handleNotesClick(driver.id)}>
              <FileText size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                {driver.notes ? <p className={cn("text-sm max-w-[200px] truncate overflow-hidden whitespace-nowrap", "group-hover:text-primary transition-colors")}>
                    {driver.notes}
                  </p> : <p className="text-muted-foreground italic text-xs group-hover:text-primary transition-colors">
                    Click to add notes
                  </p>}
              </div>
            </div>;
        }
      case "actions":
        return <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
            View
          </Button>;
      default:
        return null;
    }
  };

  return (
    <UsersTableContainer stickyHeader={false} className={cn("w-full mt-1.25", className)}>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {sortedColumns.map(columnId => {
              const column = availableColumns.find(col => col.id === columnId);
              if (!column) return null;
              return (
                <TableHead 
                  key={columnId} 
                  dragOver={dragOverColumn === columnId} 
                  className={`${columnId === "id" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
                >
                  <div className="flex items-center gap-1 overflow-hidden">
                    <div 
                      draggable={true}
                      onDragStart={e => onDragStart(e, columnId)}
                      onDragOver={e => onDragOver(e, columnId)}
                      onDragEnd={onDragEnd}
                      onDrop={e => onDrop(e, columnId)}
                      className="cursor-grab"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                    <span className="truncate">{column.label}</span>
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map(driver => (
            <TableRow key={driver.id}>
              {sortedColumns.map(columnId => (
                <TableCell key={`${driver.id}-${columnId}`} className={columnId === "id" ? "font-sans" : ""}>
                  {renderCellContent(driver, columnId)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UsersTableContainer>
  );
};
