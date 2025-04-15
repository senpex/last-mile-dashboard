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
  const [transportTypes, setTransportTypes] = useState<{
    [key: string]: string;
  }>({});
  const [transportIcons, setTransportIcons] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [statusDictionary, setStatusDictionary] = useState<{
    [key: string]: string;
  }>({});
  const [hireStatusDictionary, setHireStatusDictionary] = useState<{
    [key: string]: string;
  }>({});
  const [hireStatusColors, setHireStatusColors] = useState<{
    [key: string]: string;
  }>({});
  const [statusColors, setStatusColors] = useState<{
    [key: string]: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  const [drivers, setDrivers] = useState([{
    id: 5432,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    status: "online",
    hireStatus: "hired",
    transports: ["1", "3", "pickup_truck", "9ft_cargo_van"],
    rating: 4.8,
    stripeStatus: 'verified' as StripeStatus,
    zipcode: "94105",
    notes: "Excellent driver, always on time."
  }, {
    id: 6543,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(123) 456-7891",
    status: "offline",
    hireStatus: "contact_again",
    transports: ["2"],
    rating: 3.5,
    stripeStatus: 'unverified' as StripeStatus,
    zipcode: "90210",
    notes: "Prefers weekend shifts."
  }, {
    id: 7654,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "(123) 456-7892",
    status: "busy",
    hireStatus: "blacklist",
    transports: ["4", "5"],
    rating: 5.0,
    stripeStatus: 'pending' as StripeStatus,
    zipcode: "10001",
    notes: "Not available on Mondays."
  }, {
    id: 8001,
    name: "Alice Williams",
    email: "alice.w@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8002,
    name: "Robert Miller",
    email: "robert.m@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8003,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8004,
    name: "James Wilson",
    email: "james.w@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8005,
    name: "Sarah Taylor",
    email: "sarah.t@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8006,
    name: "Daniel Anderson",
    email: "daniel.a@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8007,
    name: "Olivia Thomas",
    email: "olivia.t@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8008,
    name: "Matthew Jackson",
    email: "matthew.j@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8009,
    name: "Sophia White",
    email: "sophia.w@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8010,
    name: "David Harris",
    email: "david.h@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8011,
    name: "Emma Martin",
    email: "emma.m@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8012,
    name: "Andrew Thompson",
    email: "andrew.t@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8013,
    name: "Isabella Garcia",
    email: "isabella.g@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8014,
    name: "Joshua Martinez",
    email: "joshua.m@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8015,
    name: "Charlotte Robinson",
    email: "charlotte.r@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8016,
    name: "Christopher Clark",
    email: "chris.c@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8017,
    name: "Amelia Rodriguez",
    email: "amelia.r@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8018,
    name: "Joseph Lewis",
    email: "joseph.l@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8019,
    name: "Mia Walker",
    email: "mia.w@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8020,
    name: "Ethan Hall",
    email: "ethan.h@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8021,
    name: "Harper Young",
    email: "harper.y@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8022,
    name: "Alexander Allen",
    email: "alex.a@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8023,
    name: "Abigail King",
    email: "abigail.k@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8024,
    name: "Benjamin Wright",
    email: "ben.w@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8025,
    name: "Sofia Scott",
    email: "sofia.s@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8026,
    name: "William Green",
    email: "william.g@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8027,
    name: "Elizabeth Baker",
    email: "elizabeth.b@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8028,
    name: "Michael Adams",
    email: "michael.a@example.com",
    phone: getRandomPhone(),
    status: "online",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8029,
    name: "Camila Nelson",
    email: "camila.n@example.com",
    phone: getRandomPhone(),
    status: "busy",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }, {
    id: 8030,
    name: "Jacob Hill",
    email: "jacob.h@example.com",
    phone: getRandomPhone(),
    status: "offline",
    hireStatus: generateRandomHireStatus(),
    transports: generateRandomTransports(),
    rating: generateRandomRating(),
    stripeStatus: generateRandomStripeStatus(),
    zipcode: getRandomZipcode(),
    notes: ""
  }]);
  const availableColumns: ColumnOption[] = [{
    id: "id",
    label: "ID",
    default: true
  }, {
    id: "name",
    label: "Name",
    default: true
  }, {
    id: "email",
    label: "Email",
    default: true
  }, {
    id: "phone",
    label: "Phone",
    default: true
  }, {
    id: "zipcode",
    label: "Zipcode",
    default: true
  }, {
    id: "transport",
    label: "Transport",
    default: true
  }, {
    id: "rating",
    label: "Rating",
    default: true
  }, {
    id: "status",
    label: "Status",
    default: true
  }, {
    id: "hireStatus",
    label: "Hire Status",
    default: true
  }, {
    id: "stripeStatus",
    label: "Stripe Status",
    default: true
  }, {
    id: "notes",
    label: "Notes",
    default: true
  }, {
    id: "actions",
    label: "Actions",
    default: true
  }];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(availableColumns.filter(col => col.default).map(col => col.id));
  const [columnOrder, setColumnOrder] = useState<string[]>(availableColumns.filter(col => col.default).map(col => col.id));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 30, 50];
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const totalItems = filteredDrivers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDrivers.slice(startIndex, endIndex);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [driversWithMessages, setDriversWithMessages] = useState<number[]>([]);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<any>(undefined);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [activeView, setActiveView] = useState("main");

  // ... rest of the functions remain the same

  return <Layout showFooter={false}>
    <div className="flex flex-col h-screen w-full">
      <div className="px-0 py-6 flex-1 overflow-auto">
        <div className="space-y-4 w-full">
          <div className="px-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">Drivers Management</h1>
                <Button size="sm" className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 h-7">
                  <Plus className="w-3 h-3" />
                  Add Driver
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
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
          </div>

          <div className="border rounded-md mx-6">
            <div className="flex h-full py-4">
              {isFilterSidebarOpen && <div className="min-w-[240px] max-w-[240px] border-r bg-background mr-5">
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
    </div>
  </Layout>;
};

export default DriversPage;
