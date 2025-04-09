
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableContainer 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Check, X, Clock, ChevronDown } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnOption } from "@/components/table/ColumnSelector";

type StripeStatus = 'verified' | 'unverified' | 'pending';

type DriverTableProps = {
  drivers: any[];
  filteredDrivers: any[];
  currentItems: any[];
  transportTypes: { [key: string]: string };
  transportIcons: { [key: string]: string | undefined };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  hireStatusColors: { [key: string]: string };
  statusColors: { [key: string]: string };
  availableColumns: ColumnOption[];
  visibleColumns: string[];
  columnOrder: string[];
  draggedColumn: string | null;
  dragOverColumn: string | null;
  driversWithMessages: number[];
  setDraggedColumn: (column: string | null) => void;
  setDragOverColumn: (column: string | null) => void;
  updateDriverHireStatus: (driverId: number, newStatus: string) => void;
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, targetColumnId: string) => void;
  handleDragEnd: () => void;
};

const DriversTable: React.FC<DriverTableProps> = ({
  currentItems,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  hireStatusColors,
  statusColors,
  availableColumns,
  visibleColumns,
  columnOrder,
  draggedColumn,
  dragOverColumn,
  driversWithMessages,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  updateDriverHireStatus
}) => {
  
  const getSortedVisibleColumns = () => {
    return visibleColumns
      .filter(column => columnOrder.includes(column))
      .sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();
  
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderStatus = (statusId: string) => {
    const statusText = statusDictionary[statusId] || `Unknown (${statusId})`;
    const statusColorClass = statusColors[statusId] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    
    return (
      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorClass}`}>
        {statusText}
      </div>
    );
  };

  const renderHireStatus = (hireStatusId: string, driverId: number) => {
    const hireStatusText = hireStatusDictionary[hireStatusId] || `Unknown (${hireStatusId})`;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 w-auto">
            {hireStatusText}
            <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[160px]">
          {Object.entries(hireStatusDictionary).map(([key, value]) => (
            <DropdownMenuItem 
              key={key}
              onClick={() => updateDriverHireStatus(driverId, key)}
              className={hireStatusId === key ? "bg-muted" : ""}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderStripeStatus = (status: StripeStatus) => {
    let bgColor = '';
    let icon = null;
    let text = '';

    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        icon = <Check className="h-3.5 w-3.5 mr-1" />;
        text = 'Verified';
        break;
      case 'unverified':
        bgColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        icon = <X className="h-3.5 w-3.5 mr-1" />;
        text = 'Unverified';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        icon = <Clock className="h-3.5 w-3.5 mr-1" />;
        text = 'Pending';
        break;
    }

    return (
      <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${bgColor}`}>
        {icon}
        {text}
      </div>
    );
  };

  return (
    <div className="border rounded-md mx-6">
      <ScrollArea orientation="horizontal">
        <TableContainer stickyHeader={false}>
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
              {currentItems.map((driver) => (
                <TableRow key={driver.id}>
                  {sortedColumns.includes("id") && (
                    <TableCell className="font-sans">{driver.id}</TableCell>
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
                  {sortedColumns.includes("transport") && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {driver.transports.map((transportId: string) => (
                          <div 
                            key={transportId} 
                            className="flex items-center justify-center p-2 rounded-md bg-muted" 
                            title={transportTypes[transportId] || `Transport ID: ${transportId}`}
                          >
                            <TransportIcon 
                              transportType={transportId as TransportType} 
                              size={14} 
                              className="h-[14px] w-[14px]" 
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  )}
                  {sortedColumns.includes("rating") && (
                    <TableCell>
                      {renderRating(driver.rating)}
                    </TableCell>
                  )}
                  {sortedColumns.includes("status") && (
                    <TableCell>
                      {renderStatus(driver.status)}
                    </TableCell>
                  )}
                  {sortedColumns.includes("hireStatus") && (
                    <TableCell>
                      {renderHireStatus(driver.hireStatus, driver.id)}
                    </TableCell>
                  )}
                  {sortedColumns.includes("stripeStatus") && (
                    <TableCell>
                      {renderStripeStatus(driver.stripeStatus)}
                    </TableCell>
                  )}
                  {sortedColumns.includes("actions") && (
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                        View
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollArea>
    </div>
  );
};

export default DriversTable;
