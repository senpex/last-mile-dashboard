
import React, { useEffect, useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "transport", label: "Transport", default: true },
    { id: "status", label: "Status", default: true },
    { id: "actions", label: "Actions", default: true },
  ];
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  useEffect(() => {
    loadTransportDictionary();
  }, []);

  useEffect(() => {
    setColumnOrder(prevOrder => {
      const newOrder = [...prevOrder];
      
      visibleColumns.forEach(column => {
        if (!newOrder.includes(column)) {
          newOrder.push(column);
        }
      });
      
      return newOrder.filter(column => visibleColumns.includes(column));
    });
  }, [visibleColumns]);

  const loadTransportDictionary = () => {
    const transportDict = getDictionary("2");
    
    if (transportDict && transportDict.items.length > 0) {
      console.log("Transport Dictionary Items:", transportDict.items);
      const types: {[key: string]: string} = {};
      const icons: {[key: string]: string | undefined} = {};
      
      transportDict.items.forEach(item => {
        types[item.id] = item.value;
        icons[item.id] = item.icon;
      });
      
      setTransportTypes(types);
      setTransportIcons(icons);
      console.log("Loaded transport types:", types);
      console.log("Loaded transport icons:", icons);
    } else {
      console.log("Transport dictionary not found or empty for ID: 2");
    }
    setIsLoading(false);
  };

  const getRandomTransportIcon = () => {
    const transportTypes: TransportType[] = [
      'helper', 'car', 'suv', 'pickup_truck', '9ft_cargo_van',
      '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'
    ];
    
    const randomIndex = Math.floor(Math.random() * transportTypes.length);
    const randomType = transportTypes[randomIndex];
    
    return (
      <div className="flex items-center justify-center">
        <TransportIcon 
          transportType={randomType}
          size={14} 
          className="h-[14px] w-[14px]"
        />
      </div>
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    setDraggedColumn(columnId);
    
    e.dataTransfer.setData('text/plain', columnId);
    
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }
    
    const updatedOrder = [...columnOrder];
    const draggedIndex = updatedOrder.indexOf(draggedColumn);
    const targetIndex = updatedOrder.indexOf(targetColumnId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      updatedOrder.splice(draggedIndex, 1);
      updatedOrder.splice(targetIndex, 0, draggedColumn);
      
      setColumnOrder(updatedOrder);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const getSortedVisibleColumns = () => {
    return visibleColumns
      .filter(column => columnOrder.includes(column))
      .sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();

  const drivers = [
    { 
      id: 5432, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "(123) 456-7890", 
      status: "Active",
      transports: ["1", "3"]
    },
    { 
      id: 6543, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "(123) 456-7891", 
      status: "On leave",
      transports: ["2"] 
    },
    { 
      id: 7654, 
      name: "Mike Johnson", 
      email: "mike.johnson@example.com", 
      phone: "(123) 456-7892", 
      status: "Active",
      transports: ["4", "5"]
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          <div className="flex items-center gap-2">
            <ColumnSelector
              columns={availableColumns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Driver
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden mb-4">
          <ScrollArea orientation="horizontal">
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
                {drivers.map((driver) => (
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
                    {sortedColumns.includes("transport") && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {driver.transports.map((transportId) => (
                            <div 
                              key={transportId} 
                              className="flex items-center justify-center p-2 rounded-md bg-muted" 
                              title={transportTypes[transportId] || `Transport ID: ${transportId}`}
                            >
                              {getRandomTransportIcon()}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    )}
                    {sortedColumns.includes("status") && (
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          driver.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}>
                          {driver.status}
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
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default DriversPage;
