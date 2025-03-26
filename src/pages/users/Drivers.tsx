import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type StripeStatus = 'Unverified' | 'Pending' | 'Verified';

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [statusDictionary, setStatusDictionary] = useState<{[key: string]: string}>({});
  const [statusColors, setStatusColors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "transport", label: "Transport", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "status", label: "Status", default: true },
    { id: "stripe", label: "Stripe", default: true },
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
    loadStatusDictionary();
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

  const getRandomStripeStatus = (): StripeStatus => {
    const statuses: StripeStatus[] = ['Unverified', 'Pending', 'Verified'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const drivers = [
    { 
      id: 5432, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "(123) 456-7890", 
      status: "online",
      transports: ["1", "3", "pickup_truck", "9ft_cargo_van"],
      rating: 4.8,
      stripe: getRandomStripeStatus()
    },
    { 
      id: 6543, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "(123) 456-7891", 
      status: "offline",
      transports: ["2"],
      rating: 3.5,
      stripe: getRandomStripeStatus()
    },
    { 
      id: 7654, 
      name: "Mike Johnson", 
      email: "mike.johnson@example.com", 
      phone: "(123) 456-7892", 
      status: "busy",
      transports: ["4", "5"],
      rating: 5.0,
      stripe: getRandomStripeStatus()
    },
  ];

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = drivers.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.id.toString().includes(searchTerm)
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchTerm]);

  useEffect(() => {
    setFilteredDrivers(drivers);
  }, []);

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

  const loadStatusDictionary = () => {
    const statusDict = getDictionary("6");
    
    if (statusDict && statusDict.items.length > 0) {
      console.log("Status Dictionary Items:", statusDict.items);
      const statuses: {[key: string]: string} = {};
      const colors: {[key: string]: string} = {};
      
      statusDict.items.forEach(item => {
        statuses[item.id] = item.value;
        
        if (item.value.toLowerCase().includes('online')) {
          colors[item.id] = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        } else if (item.value.toLowerCase().includes('busy')) {
          colors[item.id] = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        } else if (item.value.toLowerCase().includes('offline')) {
          colors[item.id] = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        } else {
          colors[item.id] = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        }
      });
      
      setStatusDictionary(statuses);
      setStatusColors(colors);
      console.log("Loaded status types:", statuses);
    } else {
      console.log("Status dictionary not found or empty for ID: 6");
    }
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

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderStripeStatus = (status: StripeStatus) => {
    let badgeVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "default";
    
    switch(status) {
      case "Verified":
        badgeVariant = "success";
        break;
      case "Pending":
        badgeVariant = "warning";
        break;
      case "Unverified":
        badgeVariant = "outline";
        break;
    }
    
    return (
      <Badge variant={badgeVariant}>
        {status}
      </Badge>
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

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center h-9 gap-2">
              <Button size="sm" className="flex items-center gap-1 text-xs px-2 py-1 h-9">
                <Plus className="w-3 h-3" />
                Add Driver
              </Button>
            </div>
            <div className="flex items-center h-9 gap-2">
              <div className="relative h-9">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drivers..."
                  className="w-[200px] pl-8 text-xs h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ColumnSelector
                columns={availableColumns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
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
                  {filteredDrivers.map((driver) => (
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
                      {sortedColumns.includes("stripe") && (
                        <TableCell>
                          {renderStripeStatus(driver.stripe)}
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
      </div>
    </Layout>
  );
};

export default DriversPage;
