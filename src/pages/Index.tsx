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
  PaginationEllipsis,
  PaginationInfo,
  PaginationSize
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Clock, Columns, Filter, GripVertical, Search, Circle } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourierChat from "@/components/chat/CourierChat";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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
  const [activeView, setActiveView] = useState<string>("main");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");
  const pageSizeOptions = [10, 20, 50, 100];
  const [couriersWithMessages, setCouriersWithMessages] = useState<string[]>([]);

  const deliveries = [
    // ... keep existing deliveries array
  ];

  useEffect(() => {
    // ... keep existing useEffect code
  }, []);

  useEffect(() => {
    // ... keep existing useEffect code
  }, [searchTerm]);

  useEffect(() => {
    applyFilters(deliveries, debouncedSearchTerm, activeView);
  }, [debouncedSearchTerm, activeView]);

  const applyFilters = (items: any[], searchTerm: string, activeTab: string) => {
    // ... keep existing applyFilters function
  };

  const totalItems = filteredDeliveries.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDeliveries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const getPageNumbers = (): number[] => {
    if (!totalPages || totalPages <= 0) return [];
    
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-2);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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

  const handleCourierClick = (courierName: string) => {
    if (!courierName) return;
    setSelectedCourier(courierName);
    setIsChatOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="bg-background flex h-screen overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="px-4 py-6 flex-shrink-0 border-b">
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-black mr-2">Views:</h2>
                  <Tabs value={activeView} onValueChange={handleViewChange} className="w-auto">
                    <TabsList className="inline-flex h-8 bg-muted space-x-1">
                      <TabsTrigger 
                        value="main" 
                        className="px-3 text-xs rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Main view
                      </TabsTrigger>
                      <TabsTrigger 
                        value="attention" 
                        className="px-3 text-xs rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        Attention Required
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto px-4">
            <div className="border rounded-md overflow-hidden my-4">
              <ScrollArea orientation="both">
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
                    {currentItems && currentItems.length > 0 ? (
                      currentItems.map((delivery) => (
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
                                    <span className="font-sans text-sm">{delivery.packageId}</span>
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
                                return (
                                  <TableCell key={columnId}>
                                    {delivery.courier ? (
                                      <div className="flex items-center gap-2">
                                        <Button 
                                          variant="link" 
                                          className="p-0 h-auto font-normal text-primary" 
                                          onClick={() => handleCourierClick(delivery.courier)}
                                        >
                                          {delivery.courier}
                                        </Button>
                                        {couriersWithMessages && couriersWithMessages.includes(delivery.courier) && (
                                          <Circle 
                                            className="text-red-500 fill-red-500" 
                                            size={14} 
                                            strokeWidth={0}
                                          />
                                        )}
                                      </div>
                                    ) : (
                                      <span>-</span>
                                    )}
                                  </TableCell>
                                );
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
          
          <div className="border-t bg-background px-4 py-3 flex justify-between items-center shadow-sm flex-shrink-0">
            <PaginationInfo 
              total={totalItems} 
              pageSize={pageSize} 
              currentPage={currentPage} 
            />
            
            <Pagination className="flex-1 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === 1}
                  >
                    <span className="sr-only">First page</span>
                    ⟪
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  <PaginationItem key={i}>
                    {page === -1 || page === -2 ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink 
                        href="#" 
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Last page</span>
                    ⟫
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <PaginationSize
              sizes={pageSizeOptions}
              pageSize={pageSize}
              onChange={handlePageSizeChange}
            />
          </div>
        </main>
      </div>

      <CourierChat 
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        courierName={selectedCourier}
        hasUnreadMessages={couriersWithMessages && couriersWithMessages.includes(selectedCourier)}
      />
    </ThemeProvider>
  );
};

export default Index;
