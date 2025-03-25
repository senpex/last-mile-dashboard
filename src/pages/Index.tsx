import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Clock, Columns, Filter, GripVertical, Search } from "lucide-react";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimezonePicker } from "@/components/TimezonePicker";
import { getDictionary } from "@/lib/storage";
import { Dictionary, DictionaryItem } from "@/types/dictionary";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-03-24T00:00:00"),
    to: new Date("2025-03-24T23:59:59")
  });
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredDeliveries, setFilteredDeliveries] = useState<any[]>([]);

  const deliveries = [
    {
      id: 1,
      packageId: "WMT-10042501",
      orderName: "Grocery Delivery",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 12:49 PM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Saranya Natarajan",
        address: "1600 Emmerson St, Centerton, AR 72719, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "GARY BURTON",
      organization: "Walmart US Stores",
      distance: "6.9 mi"
    },
    {
      id: 2,
      packageId: "WMT-10042502",
      orderName: "Weekly Essentials",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Roma Solis",
        address: "1051 Little Osage Ave, Bentonville, AR 72713, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "GARY BURTON",
      organization: "Walmart US Stores",
      distance: "4.1 mi"
    },
    {
      id: 3,
      packageId: "WMT-10042503",
      orderName: "Pantry Restock",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Juan Galarraga",
        address: "3511 SW Awakening Ave, Bentonville, AR 72713, US"
      },
      price: "$25.00",
      tip: "$0.00",
      fees: "",
      courier: "Michael Groves",
      organization: "Walmart US Stores",
      distance: "6.1 mi"
    },
    {
      id: 4,
      packageId: "WMT-10042504",
      orderName: "Home Essentials",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:34 AM",
      pickupLocation: {
        name: "Walmart 0100 - Bentonville, AR",
        address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
      },
      dropoffTime: "03/24/2025 08:00 PM",
      dropoffLocation: {
        name: "Wendy Lancaster",
        address: "6305 SW Brush Blvd, Bentonville, AR 72713, US"
      },
      price: "$33.00",
      tip: "$0.00",
      fees: "",
      courier: "Laura Ramirez",
      organization: "Walmart US Stores",
      distance: "7.4 mi"
    },
    {
      id: 5,
      packageId: "CUN-21980357",
      orderName: "Lunch Order",
      status: "Canceled By Customer",
      pickupTime: "03/24/2025 11:20 AM",
      pickupLocation: {
        name: "Curry Up Now - Palo Alto",
        address: "321 Hamilton Ave, Palo Alto, CA 94301, US"
      },
      dropoffTime: "03/24/2025 11:40 AM",
      dropoffLocation: {
        name: "Duane Morris LLP",
        address: "260 Homer Ave Ste 202, Palo Alto, CA 94301, USA"
      },
      price: "$0.00",
      tip: "$5.00",
      fees: "",
      courier: "",
      organization: "Curry Up Now",
      distance: "0.2 mi"
    }
  ];

  useEffect(() => {
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      console.log("Loaded status dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, []);

  useEffect(() => {
    setFilteredDeliveries(deliveries);
    console.log("Initial deliveries loaded:", deliveries.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 4 || searchTerm.length === 0) {
        setDebouncedSearchTerm(searchTerm);
        console.log("Search term debounced:", searchTerm);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 4) {
      console.log("Performing search for:", debouncedSearchTerm);

      const searchResults = deliveries.filter(delivery => {
        const searchableFields = [
          delivery.packageId,
          delivery.orderName,
          delivery.status,
          delivery.pickupTime,
          delivery.pickupLocation.name,
          delivery.pickupLocation.address,
          delivery.dropoffTime,
          delivery.dropoffLocation.name,
          delivery.dropoffLocation.address,
          delivery.price,
          delivery.tip,
          delivery.fees,
          delivery.courier,
          delivery.organization,
          delivery.distance
        ];

        return searchableFields.some(field => 
          field && field.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      });

      console.log(`Found ${searchResults.length} results for "${debouncedSearchTerm}"`);
      setFilteredDeliveries(searchResults);
    } else if (debouncedSearchTerm.length === 0) {
      setFilteredDeliveries(deliveries);
    }
  }, [debouncedSearchTerm, deliveries]);

  const availableColumns: ColumnOption[] = [
    { id: "status", label: "Status", default: true },
    { id: "packageId", label: "ID", default: true },
    { id: "orderName", label: "Order name", default: true },
    { id: "pickupTime", label: "Pickup Time", default: true },
    { id: "pickupLocation", label: "Pickup Location", default: true },
    { id: "dropoffTime", label: "Dropoff Time", default: true },
    { id: "dropoffLocation", label: "Dropoff Location", default: true },
    { id: "price", label: "Price", default: true },
    { id: "tip", label: "Tip", default: true },
    { id: "fees", label: "Fees", default: false },
    { id: "courier", label: "Courier", default: true },
    { id: "organization", label: "Organization", default: true },
    { id: "distance", label: "Distance", default: true },
  ];
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

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

  const statusMapping: Record<string, string> = {
    "Dropoff Complete": "completed",
    "Canceled By Customer": "cancelled_order",
    "In Transit": "in_transit",
    "Picking Up": "started_working",
    "Arrived For Pickup": "arrived_for_pickup"
  };

  const getStatusDisplay = (statusValue: string): string => {
    if (!statusDictionary) return statusValue;
    
    const dictionaryId = statusMapping[statusValue];
    if (!dictionaryId) return statusValue;
    
    const dictionaryItem = statusDictionary.items.find(item => 
      item.id === dictionaryId
    );
    
    return dictionaryItem ? dictionaryItem.value : statusValue;
  };

  const getStatusBadgeVariant = (status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "in_transit":
        return "default";
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-background flex h-screen overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="px-4 py-6 flex-1 overflow-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Deliveries</h1>
                <span className="text-sm text-muted-foreground">
                  All times are displayed using {timezone.replace('_', ' ')} timezone
                </span>
              </div>
              
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <DateRangePicker 
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                  />
                  
                  <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Type to search"
                      className="pl-8 h-9 w-[240px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <TimezonePicker 
                    selectedTimezone={timezone}
                    onTimezoneChange={setTimezone}
                  />
                  
                  <ColumnSelector 
                    columns={availableColumns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                  />
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden mb-4">
                <ScrollArea orientation="horizontal">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {sortedColumns.map(columnId => {
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
                              className={`${columnId === "distance" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
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
                      {filteredDeliveries.length > 0 ? (
                        filteredDeliveries.map((delivery) => (
                          <TableRow key={delivery.id}>
                            {sortedColumns.map(columnId => {
                              switch (columnId) {
                                case "status":
                                  return (
                                    <TableCell key={columnId}>
                                      <Badge 
                                        variant={getStatusBadgeVariant(delivery.status) as any}
                                        className={`${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
                                      >
                                        {getStatusDisplay(delivery.status)}
                                      </Badge>
                                    </TableCell>
                                  );
                                case "packageId":
                                  return (
                                    <TableCell key={columnId}>
                                      <span className="font-mono text-sm">{delivery.packageId}</span>
                                    </TableCell>
                                  );
                                case "orderName":
                                  return <TableCell key={columnId}>{delivery.orderName}</TableCell>;
                                case "pickupTime":
                                  return <TableCell key={columnId}>{delivery.pickupTime}</TableCell>;
                                case "pickupLocation":
                                  return (
                                    <TableCell key={columnId}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{delivery.pickupLocation.name}</span>
                                        <span className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</span>
                                      </div>
                                    </TableCell>
                                  );
                                case "dropoffTime":
                                  return <TableCell key={columnId}>{delivery.dropoffTime}</TableCell>;
                                case "dropoffLocation":
                                  return (
                                    <TableCell key={columnId}>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{delivery.dropoffLocation.name}</span>
                                        <span className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</span>
                                      </div>
                                    </TableCell>
                                  );
                                case "price":
                                  return <TableCell key={columnId}>{delivery.price}</TableCell>;
                                case "tip":
                                  return <TableCell key={columnId}>{delivery.tip}</TableCell>;
                                case "fees":
                                  return <TableCell key={columnId}>{delivery.fees}</TableCell>;
                                case "courier":
                                  return <TableCell key={columnId}>{delivery.courier}</TableCell>;
                                case "organization":
                                  return <TableCell key={columnId}>{delivery.organization}</TableCell>;
                                case "distance":
                                  return <TableCell key={columnId} className="text-right">{delivery.distance}</TableCell>;
                                default:
                                  return <TableCell key={columnId}></TableCell>;
                              }
                            })}
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
                </ScrollArea>
              </div>
            </div>
          </div>
          
          <div className="border-t bg-background px-4 py-3 flex justify-between items-center shadow-sm">
            <div className="text-sm text-muted-foreground">
              Total <span className="bg-muted px-2 py-1 rounded">{filteredDeliveries.length}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              
              
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    >
                      <span className="sr-only">First page</span>
                      ⟪
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className="cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    >
                      <span className="sr-only">Last page</span>
                      ⟫
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
