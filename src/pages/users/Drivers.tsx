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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import CourierChat from '@/components/chat/CourierChat';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DeliveryFilters } from '@/components/deliveries/DeliveryFilters';
import { DateRange } from "react-day-picker";

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [activeView, setActiveView] = useState("main");

  return (
    <Layout>
      <div className="flex h-full">
        {isFilterSidebarOpen && (
          <div className="border-r flex-shrink-0" style={{ width: "300px" }}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filter Drivers</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <DeliveryFilters 
                searchTerm=""
                onSearchChange={() => {}}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                timezone={timezone}
                onTimezoneChange={setTimezone}
                availableColumns={[]}
                visibleColumns={[]}
                onVisibleColumnsChange={() => {}}
                activeView={activeView}
                onActiveViewChange={setActiveView}
                onToggleFilterSidebar={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                isFilterSidebarOpen={isFilterSidebarOpen}
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Drivers</h1>
              <Badge variant="outline" className="ml-2">
                {filteredDrivers.length}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {!isFilterSidebarOpen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterSidebarOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              )}
              
              <div className="flex items-center border rounded-md">
                <Input
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0"
                />
                <Button variant="ghost" className="border-l h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <ColumnSelector
                columns={availableColumns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </div>
          </div>
          
          <UsersTableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  {columnOrder
                    .filter(colId => visibleColumns.includes(colId))
                    .map(colId => {
                      const column = availableColumns.find(col => col.id === colId);
                      return (
                        <TableHead
                          key={colId}
                          className="cursor-pointer"
                          onClick={() => {
                            if (colId === 'actions') return;
                            
                            setSortConfig(prevConfig => ({
                              key: colId,
                              direction:
                                prevConfig.key === colId && prevConfig.direction === 'ascending'
                                  ? 'descending'
                                  : 'ascending'
                            }));
                          }}
                          draggable
                          onDragStart={() => setDraggedColumn(colId)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverColumn(colId);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedColumn && dragOverColumn) {
                              const newOrder = [...columnOrder];
                              const draggedIdx = newOrder.indexOf(draggedColumn);
                              const dropIdx = newOrder.indexOf(dragOverColumn);
                              
                              newOrder.splice(draggedIdx, 1);
                              newOrder.splice(dropIdx, 0, draggedColumn);
                              
                              setColumnOrder(newOrder);
                              setDraggedColumn(null);
                              setDragOverColumn(null);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground drag-handle" />
                            {column?.label || colId}
                            {sortConfig.key === colId && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  sortConfig.direction === 'descending' ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </div>
                        </TableHead>
                      );
                    })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map(driver => (
                  <TableRow key={driver.id}>
                    {columnOrder
                      .filter(colId => visibleColumns.includes(colId))
                      .map(colId => {
                        return (
                          <TableCell key={`${driver.id}-${colId}`}>
                            {colId === 'id' && driver.id}
                            {colId === 'name' && driver.name}
                            {colId === 'email' && driver.email}
                            {colId === 'phone' && driver.phone}
                            {colId === 'zipcode' && driver.zipcode}
                            {colId === 'transport' && (
                              <div className="flex flex-wrap gap-1">
                                {driver.transports.map(transportId => (
                                  <TransportIcon
                                    key={transportId}
                                    transportType={transportId as TransportType}
                                    className="h-6 w-6"
                                  />
                                ))}
                              </div>
                            )}
                            {colId === 'rating' && (
                              <div className="flex items-center">
                                {driver.rating}
                              </div>
                            )}
                            {colId === 'status' && (
                              <Badge
                                variant={
                                  driver.status === 'online'
                                    ? 'success'
                                    : driver.status === 'busy'
                                      ? 'warning'
                                      : 'secondary'
                                }
                                className={cn(
                                  'text-xs',
                                  driver.status === 'online' && 'bg-green-500',
                                  driver.status === 'busy' && 'bg-yellow-500',
                                  driver.status === 'offline' && 'bg-gray-500'
                                )}
                              >
                                {statusDictionary[driver.status] || driver.status}
                              </Badge>
                            )}
                            {colId === 'hireStatus' && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  'border-2',
                                  driver.hireStatus === 'hired' && 'border-green-500 text-green-600',
                                  driver.hireStatus === 'left_vm' && 'border-blue-500 text-blue-600',
                                  driver.hireStatus === 'contact_again' && 'border-yellow-500 text-yellow-600',
                                  driver.hireStatus === 'not_interested' && 'border-orange-500 text-orange-600',
                                  driver.hireStatus === 'blacklist' && 'border-red-500 text-red-600',
                                  driver.hireStatus === 'out_of_service' && 'border-gray-500 text-gray-600'
                                )}
                              >
                                {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                              </Badge>
                            )}
                            {colId === 'stripeStatus' && (
                              <Badge
                                variant={
                                  driver.stripeStatus === 'verified'
                                    ? 'outline'
                                    : driver.stripeStatus === 'pending'
                                      ? 'secondary'
                                      : 'destructive'
                                }
                                className={cn(
                                  'flex items-center gap-1',
                                  driver.stripeStatus === 'verified' && 'border-green-500 text-green-600',
                                  driver.stripeStatus === 'pending' && 'border-yellow-500 text-yellow-600',
                                  driver.stripeStatus === 'unverified' && 'bg-red-100 border-red-500 text-red-600'
                                )}
                              >
                                {driver.stripeStatus === 'verified' ? (
                                  <Check className="h-3 w-3" />
                                ) : driver.stripeStatus === 'pending' ? (
                                  <Clock className="h-3 w-3" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                {driver.stripeStatus}
                              </Badge>
                            )}
                            {colId === 'notes' && (
                              <div className="max-w-xs">
                                {editingNotes === driver.id ? (
                                  <div className="flex items-start gap-2">
                                    <Textarea
                                      value={driver.notes}
                                      onChange={(e) => {
                                        const updatedDrivers = drivers.map(d =>
                                          d.id === driver.id ? { ...d, notes: e.target.value } : d
                                        );
                                        setDrivers(updatedDrivers);
                                        setFilteredDrivers(
                                          updatedDrivers.filter(driver =>
                                            Object.values(driver).some(value =>
                                              String(value)
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase())
                                            )
                                          )
                                        );
                                      }}
                                      className="min-h-[80px] text-sm"
                                    />
                                    <div className="flex flex-col gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingNotes(null)}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingNotes(null)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1 truncate">
                                      {driver.notes || (
                                        <span className="text-gray-400 italic">No notes</span>
                                      )}
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingNotes(driver.id)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                            {colId === 'actions' && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedCourier(driver.name);
                                    setChatOpen(true);
                                  }}
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    <DropdownMenuItem>View Deliveries</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </UsersTableContainer>
          
          <div className="mt-4">
            <Pagination className="flex justify-between">
              <div className="text-sm text-muted-foreground mx-[22px]">
                Total: <span className="bg-muted px-2 py-1 rounded">{totalItems}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 mx-[22px]">
                  <span className="text-sm text-muted-foreground">Items per page</span>
                  <Select 
                    value={String(pageSize)} 
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-16">
                      <SelectValue placeholder={String(pageSize)} />
                    </SelectTrigger>
                    <SelectContent>
                      {pageSizeOptions.map(size => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                    >
                      <span>Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else {
                      if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage + i - 2;
                      }
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                    >
                      <span>Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </div>
            </Pagination>
          </div>
        </div>
      </div>
      
      {chatOpen && selectedCourier && (
        <CourierChat
          courierName={selectedCourier}
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          hasUnreadMessages={driversWithMessages.includes(5432)}
        />
      )}
    </Layout>
  );
};

export default DriversPage;
