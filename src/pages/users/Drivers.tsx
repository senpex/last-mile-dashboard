import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { DateRange } from "react-day-picker";
import { DeliveryFilters } from "@/components/deliveries/DeliveryFilters";
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

  const updateDriverHireStatus = (driverId: number, newStatus: string) => {
    setDrivers(prevDrivers => prevDrivers.map(driver => driver.id === driverId ? {
      ...driver,
      hireStatus: newStatus
    } : driver));
    const statusLabel = hireStatusDictionary[newStatus] || newStatus;
    toast.success(`Driver status updated to ${statusLabel}`);
  };

  useEffect(() => {
    loadTransportDictionary();
    loadStatusDictionary();
    loadHireStatusDictionary();
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

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = drivers.filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || driver.email.toLowerCase().includes(searchTerm.toLowerCase()) || driver.phone.includes(searchTerm) || driver.id.toString().includes(searchTerm));
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchTerm, drivers]);

  useEffect(() => {
    setFilteredDrivers(drivers);
  }, [drivers]);

  useEffect(() => {
    const randomDrivers = drivers.filter(() => Math.random() < 0.3).map(driver => driver.id);
    setDriversWithMessages(randomDrivers);
  }, [drivers]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }
      if (start > 2) {
        pages.push(-1); // First ellipsis
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push(-2); // Second ellipsis
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const handleCourierClick = (name: string) => {
    setSelectedCourier(name);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setSelectedCourier(null);
  };

  const handleNotesClick = (driverId: number) => {
    setEditingNotes(driverId);
  };

  const handleNotesChange = (driverId: number, notes: string) => {
    setDrivers(prevDrivers => prevDrivers.map(driver => driver.id === driverId ? {
      ...driver,
      notes
    } : driver));
  };

  const saveNotes = (driverId: number) => {
    setEditingNotes(null);
    toast.success("Driver notes updated successfully");
  };

  const handleToggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  const loadTransportDictionary = () => {
    const transportDict = getDictionary("2");
    if (transportDict && transportDict.items.length > 0) {
      console.log("Transport Dictionary Items:", transportDict.items);
      const types: {
        [key: string]: string;
      } = {};
      const icons: {
        [key: string]: string | undefined;
      } = {};
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
      const statuses: {
        [key: string]: string;
      } = {};
      const colors: {
        [key: string]: string;
      } = {};
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

  const loadHireStatusDictionary = () => {
    const hireStatusDict = getDictionary("1455");
    if (hireStatusDict && hireStatusDict.items.length > 0) {
      console.log("Hire Status Dictionary Items:", hireStatusDict.items);
      const statuses: {
        [key: string]: string;
      } = {};
      const colors: {
        [key: string]: string;
      } = {};
      hireStatusDict.items.forEach(item => {
        statuses[item.id] = item.value;
        if (item.id === 'hired') {
          colors[item.id] = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        } else if (item.id === 'blacklist') {
          colors[item.id] = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        } else if (item.id === 'left_vm' || item.id === 'contact_again') {
          colors[item.id] = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        } else if (item.id === 'out_of_service') {
          colors[item.id] = 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        } else if (item.id === 'not_interested') {
          colors[item.id] = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        } else {
          colors[item.id] = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
        }
      });
      setHireStatusDictionary(statuses);
      setHireStatusColors(colors);
      console.log("Loaded hire status types:", statuses);
    } else {
      console.log("Hire status dictionary not found or empty for ID: 1455");
    }
  };

  const getRandomTransportIcon = () => {
    const transportTypes: TransportType[] = ['helper', 'car', 'suv', 'pickup_truck', '9ft_cargo_van', '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'];
    const randomIndex = Math.floor(Math.random() * transportTypes.length);
    const randomType = transportTypes[randomIndex];
    return <div className="flex items-center justify-center">
        <TransportIcon transportType={randomType} size={14} className="h-[14px] w-[14px]" />
      </div>;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
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
    return visibleColumns.filter(column => columnOrder.includes(column)).sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();

  const renderRating = (rating: number) => {
    return <div className="flex items-center">
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>;
  };

  const renderStatus = (statusId: string) => {
    const statusText = statusDictionary[statusId] || `Unknown (${statusId})`;
    const statusColorClass = statusColors[statusId] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorClass}`}>
        {statusText}
      </div>;
  };

  const renderHireStatus = (hireStatusId: string, driverId: number) => {
    const hireStatusText = hireStatusDictionary[hireStatusId] || `Unknown (${hireStatusId})`;
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 w-auto">
            {hireStatusText}
            <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[160px]">
          {Object.entries(hireStatusDictionary).map(([key, value]) => <DropdownMenuItem key={key} onClick={() => updateDriverHireStatus(driverId, key)} className={hireStatusId === key ? "bg-muted" : ""}>
              {value}
            </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>;
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
    return <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${bgColor}`}>
        {icon}
        {text}
      </div>;
  };

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
      case "notes":
        if (editingNotes === driver.id) {
          return <div className="flex flex-col gap-2">
              <Textarea placeholder="Add notes about this driver..." className="min-h-[80px] text-sm" value={driver.notes || ''} onChange={e => handleNotesChange(driver.id, e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => setEditingNotes(null)}>
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

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({
      key,
      direction
    });
  };

  useEffect(() => {
    if (sortConfig.key && sortConfig.direction) {
      const sortedDrivers = [...filteredDrivers].sort((a, b) => {
        if (sortConfig.key === null) return 0;
        let aValue: any;
        let bValue: any;
        switch (sortConfig.key) {
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          case "name":
            aValue = a.name;
            bValue = b.name;
            break;
          case "email":
            aValue = a.email;
            bValue = b.email;
            break;
          case "phone":
            aValue = a.phone;
            bValue = b.phone;
            break;
          case "zipcode":
            aValue = a.zipcode;
            bValue = b.zipcode;
            break;
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          case "hireStatus":
            aValue = a.hireStatus;
            bValue = b.hireStatus;
            break;
          default:
            aValue = a[sortConfig.key as keyof typeof a];
            bValue = b[sortConfig.key as keyof typeof b];
        }
        if (aValue === null || aValue === undefined) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (bValue === null || bValue === undefined) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredDrivers(sortedDrivers);
    }
  }, [sortConfig]);

  return (
    <Layout showFooter={false}>
      <div className="flex flex-col h-screen w-full">
        <DeliveryFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          timezone={timezone}
          onTimezoneChange={setTimezone}
          availableColumns={availableColumns}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
          activeView={activeView}
          onActiveViewChange={setActiveView}
          onToggleFilterSidebar={handleToggleFilterSidebar}
          isFilterSidebarOpen={isFilterSidebarOpen}
          hasAttentionRequiredOrders={false}
        />
        
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
            
            <div className="flex items-center justify-end px-6 gap-2">
              <div className="relative h-9">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search drivers..." 
                  className="w-[200px] pl-8 text-xs h-9" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              <ColumnSelector 
                columns={availableColumns} 
                visibleColumns={visibleColumns} 
                setVisibleColumns={setVisibleColumns} 
              />
            </div>

            <div className="border rounded-md mx-6">
              <UsersTableContainer stickyHeader={false} className="w-full">
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
      
      {chatOpen && selectedCourier && (
        <CourierChat open={chatOpen} courierName={selectedCourier} onClose={handleChatClose} hasUnreadMessages={false} />
      )}
    </Layout>
  );
};

export default DriversPage;
