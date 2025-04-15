
import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search, MessageCircle, ChevronDown, Check, X, Clock, Pencil, FileText, Filter } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis, PaginationInfo, PaginationSize } from "@/components/ui/pagination";
import CourierChat from '@/components/chat/CourierChat';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DeliveryFilters } from '@/components/deliveries/DeliveryFilters';

type StripeStatus = 'verified' | 'unverified' | 'pending';

const getRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

const getRandomZipcode = (): string => {
  return String(Math.floor(Math.random() * 90000) + 10000);
};

const generateRandomTransports = (): string[] => {
  const transportIds = ['1', '2', '3', '4', '5', 'pickup_truck', '9ft_cargo_van', '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'];
  const count = Math.floor(Math.random() * 3) + 1;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * transportIds.length);
    const transportId = transportIds[randomIndex];
    if (!result.includes(transportId)) {
      result.push(transportId);
    }
  }
  return result;
};

const generateRandomRating = (): number => {
  return Number((Math.random() * 2 + 3).toFixed(1));
};

const generateRandomHireStatus = (): string => {
  const hireStatuses = ['hired', 'left_vm', 'contact_again', 'not_interested', 'blacklist', 'out_of_service'];
  const randomIndex = Math.floor(Math.random() * hireStatuses.length);
  return hireStatuses[randomIndex];
};

const generateRandomStripeStatus = (): StripeStatus => {
  const statuses: StripeStatus[] = ['verified', 'unverified', 'pending'];
  const randomIndex = Math.floor(Math.random() * 3);
  return statuses[randomIndex];
};

const DriversPage = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Define the available columns for the table
  const availableColumns: ColumnOption[] = [
    { id: "id", label: "#", default: true },
    { id: "name", label: "Name", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "zipcode", label: "Zipcode", default: true },
    { id: "transport", label: "Transport", default: true },
    { id: "status", label: "Status", default: true },
    { id: "hireStatus", label: "Hire Status", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "stripeStatus", label: "Stripe", default: true },
    { id: "notes", label: "Notes", default: false },
    { id: "actions", label: "Actions", default: true }
  ];

  // Set initial visible columns
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  // Initial column order based on visible columns
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => visibleColumns.includes(col.id)).map(col => col.id)
  );

  // Status dictionary for labels
  const statusDictionary: Record<string, string> = {
    'online': 'Online',
    'offline': 'Offline',
    'busy': 'Busy'
  };

  // Hire status dictionary for labels
  const hireStatusDictionary: Record<string, string> = {
    'hired': 'Hired',
    'left_vm': 'Left VM',
    'contact_again': 'Contact Again',
    'not_interested': 'Not Interested',
    'blacklist': 'Blacklist',
    'out_of_service': 'Out of Service'
  };

  // Transport types dictionary
  const transportTypes: Record<string, string> = {
    '1': 'Bicycle',
    '2': 'Scooter',
    '3': 'Motorcycle',
    '4': 'Car',
    '5': 'SUV',
    'pickup_truck': 'Pickup Truck',
    '9ft_cargo_van': '9ft Cargo Van',
    '10ft_box_truck': '10ft Box Truck',
    '15ft_box_truck': '15ft Box Truck',
    '17ft_box_truck': '17ft Box Truck',
    'refrigerated_van': 'Refrigerated Van'
  };

  const pageSizeOptions = [10, 25, 50, 100];

  useEffect(() => {
    // Generate sample driver data
    const sampleDrivers = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Driver ${i + 1}`,
      phone: getRandomPhone(),
      zipcode: getRandomZipcode(),
      transport: generateRandomTransports(),
      status: ['online', 'offline', 'busy'][Math.floor(Math.random() * 3)],
      hireStatus: generateRandomHireStatus(),
      rating: generateRandomRating(),
      stripeStatus: generateRandomStripeStatus(),
      notes: Math.random() > 0.7 ? 'Some notes about this driver...' : ''
    }));
    
    setDrivers(sampleDrivers);
    setTotalItems(sampleDrivers.length);
    setTotalPages(Math.ceil(sampleDrivers.length / pageSize));
  }, [pageSize]);

  // Compute the current visible items based on pagination
  const currentItems = React.useMemo(() => {
    let filteredItems = [...drivers];
    
    if (searchTerm) {
      filteredItems = filteredItems.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.zipcode.includes(searchTerm)
      );
    }
    
    // Apply sorting if set
    if (sortConfig.key && sortConfig.direction) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredItems.length);
    
    return filteredItems.slice(startIndex, endIndex);
  }, [drivers, currentPage, pageSize, searchTerm, sortConfig]);

  // Get the sorted columns based on order
  const sortedColumns = React.useMemo(() => {
    return columnOrder.filter(colId => visibleColumns.includes(colId));
  }, [visibleColumns, columnOrder]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Toggle the filter sidebar
  const handleToggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  // Handle chat with courier
  const handleChatOpen = (courierName: string) => {
    setSelectedCourier(courierName);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
  };

  // Sort functionality
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({ key, direction });
  };

  // Column drag and drop functionality
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    
    if (draggedColumn && draggedColumn !== targetColumnId) {
      const newOrder = [...columnOrder];
      const draggedIndex = newOrder.indexOf(draggedColumn);
      const targetIndex = newOrder.indexOf(targetColumnId);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedColumn);
      
      setColumnOrder(newOrder);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Cell content rendering based on column
  const renderCellContent = (driver: any, columnId: string) => {
    switch (columnId) {
      case 'id':
        return <span className="font-mono text-xs text-right">#{driver.id}</span>;
      case 'name':
        return driver.name;
      case 'phone':
        return driver.phone;
      case 'zipcode':
        return driver.zipcode;
      case 'transport':
        return (
          <div className="flex gap-1">
            {driver.transport.map((t: string) => (
              <TransportIcon key={t} type={t as TransportType} className="h-4 w-4" tooltip={transportTypes[t]} />
            ))}
          </div>
        );
      case 'status':
        return (
          <Badge variant={driver.status === 'online' ? 'success' : driver.status === 'busy' ? 'warning' : 'outline'}>
            {statusDictionary[driver.status]}
          </Badge>
        );
      case 'hireStatus':
        return (
          <Badge variant={driver.hireStatus === 'hired' ? 'success' : driver.hireStatus === 'blacklist' ? 'destructive' : 'outline'}>
            {hireStatusDictionary[driver.hireStatus]}
          </Badge>
        );
      case 'rating':
        return (
          <div className="flex items-center">
            <span>{driver.rating}</span>
            <span className="ml-1 text-yellow-400">★</span>
          </div>
        );
      case 'stripeStatus':
        return (
          <Badge variant={driver.stripeStatus === 'verified' ? 'success' : driver.stripeStatus === 'pending' ? 'warning' : 'destructive'}>
            {driver.stripeStatus}
          </Badge>
        );
      case 'notes':
        return driver.notes ? (
          <div className="max-w-[200px] truncate">{driver.notes}</div>
        ) : (
          <span className="text-gray-400">No notes</span>
        );
      case 'actions':
        return (
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleChatOpen(driver.name)}>
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate pagination page numbers
  const getPageNumbers = () => {
    const pages = [];
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
        pages.push(-1); // Represents ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-2); // Represents ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-2); // Represents ellipsis
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1); // Represents ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return <Layout showFooter={false}>
      <div className="flex flex-col h-screen w-full">
        <div className="px-0 py-6 flex-1 overflow-auto">
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">Drivers Management</h1>
                <Button size="sm" className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 h-7">
                  <Plus className="w-3 h-3" />
                  Add Driver
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-6">
              <Button variant={isFilterSidebarOpen ? "default" : "outline"} className={`flex items-center gap-2 text-sm h-9 ${isFilterSidebarOpen ? 'bg-primary text-primary-foreground' : ''}`} onClick={handleToggleFilterSidebar} aria-expanded={isFilterSidebarOpen}>
                <Filter className="h-4 w-4" />
                <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </Button>
              
              <div className="flex items-center h-9 gap-2">
                <div className="relative h-9">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search drivers..." className="w-[200px] pl-8 text-xs h-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <ColumnSelector columns={availableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
              </div>
            </div>

            <div className="border rounded-md mx-6">
              <div className="flex h-full py-4 ml-0">
                {isFilterSidebarOpen && <div className="min-w-[240px] max-w-[240px] border-r bg-background">
                    <div className="p-4">
                      <h3 className="font-medium mb-3">Filter Drivers</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Status</h4>
                          <div className="space-y-2">
                            {['online', 'offline', 'busy'].map(status => <div key={status} className="flex items-center">
                                <input type="checkbox" id={`status-${status}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`status-${status}`} className="text-sm">
                                  {statusDictionary[status] || status}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Hire Status</h4>
                          <div className="space-y-2">
                            {Object.keys(hireStatusDictionary).map(status => <div key={status} className="flex items-center">
                                <input type="checkbox" id={`hire-status-${status}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`hire-status-${status}`} className="text-sm">
                                  {hireStatusDictionary[status]}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Transport Type</h4>
                          <div className="space-y-2">
                            {Object.entries(transportTypes).map(([id, name]) => <div key={id} className="flex items-center">
                                <input type="checkbox" id={`transport-${id}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`transport-${id}`} className="text-sm flex items-center gap-1.5">
                                  <TransportIcon transportType={id as TransportType} size={12} className="h-[12px] w-[12px]" />
                                  {name}
                                </label>
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
                
                <UsersTableContainer stickyHeader={false} className={isFilterSidebarOpen ? 'flex-1' : 'w-full'}>
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        {sortedColumns.map(columnId => {
                        const column = availableColumns.find(col => col.id === columnId);
                        if (!column) return null;
                        return <TableHead key={columnId} dragOver={dragOverColumn === columnId} className={`${columnId === "id" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`} sortable={columnId !== "actions" && columnId !== "transport" && columnId !== "notes"} sortDirection={sortConfig.key === columnId ? sortConfig.direction : null} onSort={() => requestSort(columnId)}>
                            <div className="flex items-center gap-1 overflow-hidden">
                              <div draggable={true} onDragStart={e => handleDragStart(e, columnId)} onDragOver={e => handleDragOver(e, columnId)} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, columnId)} className="cursor-grab">
                                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                              </div>
                              <span className="truncate">{column.label}</span>
                            </div>
                          </TableHead>;
                      })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map(driver => <TableRow key={driver.id}>
                          {sortedColumns.map(columnId => <TableCell key={`${driver.id}-${columnId}`} className={columnId === "id" ? "font-sans" : ""}>
                              {renderCellContent(driver, columnId)}
                            </TableCell>)}
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </UsersTableContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-auto w-full">
          <div className="px-6 py-4 flex justify-between items-center">
            <PaginationInfo total={totalItems} pageSize={pageSize} currentPage={currentPage} />
            
            <Pagination className="flex-1 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(1);
                }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === 1}>
                    <span className="sr-only">First page</span>
                    ⟪
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === 1} />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => <PaginationItem key={i}>
                    {page === -1 || page === -2 ? <PaginationEllipsis /> : <PaginationLink href="#" isActive={page === currentPage} onClick={e => {
                  e.preventDefault();
                  handlePageChange(page);
                }}>
                        {page}
                      </PaginationLink>}
                  </PaginationItem>)}
                
                <PaginationItem>
                  <PaginationNext href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === totalPages} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === totalPages}>
                    <span className="sr-only">Last page</span>
                    ⟫
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <PaginationSize sizes={pageSizeOptions} pageSize={pageSize} onChange={handlePageSizeChange} />
          </div>
        </div>
      </div>
      
      {chatOpen && selectedCourier && <CourierChat open={chatOpen} courierName={selectedCourier} onClose={handleChatClose} hasUnreadMessages={false} />}
    </Layout>;
};

export default DriversPage;
