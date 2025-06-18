import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { DriversTable } from '@/components/drivers/DriversTable';
import { DriversPagination } from '@/components/drivers/DriversPagination';
import { DriversFilters } from "@/components/drivers/DriversFilters";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DriverDetailsSheet } from "@/components/drivers/DriverDetailsSheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { getDictionary } from "@/lib/storage";
import CourierChat from '@/components/chat/CourierChat';
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { DeliveryStatus } from "@/types/delivery";
import { Dispatch, SetStateAction } from 'react';

type StripeStatus = 'verified' | 'unverified' | 'pending';
const allDriverStatuses: DeliveryStatus[] = ["Online", "Offline", "Busy", "Picking Up", "In Transit", "Arrived For Pickup", "Dropoff Complete", "Scheduled Order", "Canceled By Customer", "Cancelled By Admin"];
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
const generateRandomProfileTypes = (): string[] => {
  const types = ['Driver', 'Mover', 'Helper'];
  const numTypes = Math.floor(Math.random() * 3) + 1;
  const selectedTypes = [];
  const shuffled = [...types].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numTypes; i++) {
    selectedTypes.push(shuffled[i]);
  }
  return selectedTypes;
};
const getRandomAddress = (): string => {
  const streetNumbers = [123, 456, 789, 1010, 555, 777, 888, 999, 321, 654];
  const streetNames = ["Main St", "Oak Ave", "Pine Rd", "Maple Dr", "Cedar Ln", "Elm Blvd", "Park Ave", "River Rd", "Lake Dr", "Forest Way"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];
  const randomIndex = Math.floor(Math.random() * 10);
  return `${streetNumbers[randomIndex]} ${streetNames[randomIndex]}, ${cities[randomIndex]}, ${states[randomIndex]}`;
};
const generateRandomDrivers = (count: number, startId: number = 10000): any[] => {
  const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sarah", "Robert", "Jennifer", "William", "Elizabeth", "Richard", "Linda", "Joseph", "Barbara", "Thomas", "Susan", "Charles", "Jessica", "Daniel", "Mary", "Matthew", "Patricia", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Emily", "Paul", "Donna", "Andrew", "Michelle", "Joshua", "Dorothy", "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Melissa", "George", "Deborah", "Timothy", "Stephanie", "Ronald", "Rebecca", "Edward", "Sharon"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"];
  const statuses = ["online", "offline", "busy"];
  const hireStatuses = ['hired', 'left_vm', 'contact_again', 'not_interested', 'blacklist', 'out_of_service'];
  const stripeStatuses: StripeStatus[] = ['verified', 'unverified', 'pending'];
  return Array.from({
    length: count
  }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    return {
      id: startId + i,
      name,
      email,
      phone: getRandomPhone(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      hireStatus: hireStatuses[Math.floor(Math.random() * hireStatuses.length)],
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripeStatus: stripeStatuses[Math.floor(Math.random() * stripeStatuses.length)],
      zipcode: getRandomZipcode(),
      address: getRandomAddress(),
      notes: Math.random() > 0.7 ? `Notes for ${name}` : "",
      profileTypes: generateRandomProfileTypes()
    };
  });
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
    address: "123 Main St, San Francisco, CA",
    notes: "Excellent driver, always on time.",
    profileTypes: ["Driver", "Mover"]
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
    address: "456 Oak Ave, Beverly Hills, CA",
    notes: "Prefers weekend shifts.",
    profileTypes: ["Helper"]
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
    address: "789 Pine Rd, New York, NY",
    notes: "Not available on Mondays."
  }]);
  
  // Add new state for driver details sheet
  const [isDriverDetailsOpen, setIsDriverDetailsOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);

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
    default: false
  }, {
    id: "address",
    label: "Address",
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
    id: "profileType",
    label: "Profile Type",
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
  const [activeView, setActiveView] = useState("main");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Add handler for opening driver details
  const handleEditProfile = (driver: any) => {
    setSelectedDriver(driver);
    setIsDriverDetailsOpen(true);
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
  useEffect(() => {
    setDrivers(prevDrivers => prevDrivers.map(driver => ({
      ...driver,
      profileTypes: driver.profileTypes || generateRandomProfileTypes(),
      address: driver.address || getRandomAddress()
    })));
  }, []);
  useEffect(() => {
    setDrivers(prevDrivers => {
      const highestId = Math.max(...prevDrivers.map(d => d.id));
      const newDrivers = generateRandomDrivers(50, highestId + 1);
      return [...prevDrivers, ...newDrivers];
    });
  }, []);
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
    if (direction) {
      const sortedDrivers = [...filteredDrivers].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        if (key === 'rating') {
          return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
        }
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        }
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
      setFilteredDrivers(sortedDrivers);
    } else {
      if (searchTerm.length >= 3) {
        const filtered = drivers.filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || driver.email.toLowerCase().includes(searchTerm.toLowerCase()) || driver.phone.includes(searchTerm) || driver.id.toString().includes(searchTerm));
        setFilteredDrivers(filtered);
      } else {
        setFilteredDrivers(drivers);
      }
    }
  };
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
  const renderStripeStatus = (status: 'verified' | 'unverified' | 'pending') => {
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
  const allCities = React.useMemo(() => {
    const cities = new Set<string>();
    drivers.forEach(driver => {
      const city = `City ${driver.id % 10}`;
      cities.add(city);
    });
    return Array.from(cities).sort();
  }, [drivers]);
  const allStates = React.useMemo(() => {
    const states = new Set<string>(["CA", "NY", "TX", "FL", "IL", "WA", "AZ", "CO", "GA", "NC"]);
    return Array.from(states).sort();
  }, []);
  const allZipcodes = React.useMemo(() => {
    const uniqueZipcodes = new Set<string>();
    drivers.forEach(driver => {
      if (driver.zipcode) {
        uniqueZipcodes.add(driver.zipcode);
      }
    });
    return Array.from(uniqueZipcodes).sort();
  }, [drivers]);
  const handleFiltersAdd = (filters: {
    statuses: DeliveryStatus[];
    zipcodes: string[];
    cities: string[];
    states: string[];
  }) => {
    setSelectedStatuses(filters.statuses);
    setSelectedZipcodes(filters.zipcodes);
    setSelectedCities(filters.cities);
    setSelectedStates(filters.states);
  };

  const updateDriverHireStatus = (driverId: number, newHireStatus: string) => {
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, hireStatus: newHireStatus }
          : driver
      )
    );
    toast.success(`Driver hire status updated to ${hireStatusDictionary[newHireStatus] || newHireStatus}`);
  };

  return <Layout showFooter={false}>
      <div className="flex flex-col h-screen">
        <DriversFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} dateRange={dateRange} onDateRangeChange={setDateRange} timezone={timezone} onTimezoneChange={setTimezone} availableColumns={availableColumns} visibleColumns={visibleColumns} onVisibleColumnsChange={setVisibleColumns} activeView={activeView} onActiveViewChange={setActiveView} onToggleFilterSidebar={handleToggleFilterSidebar} isFilterSidebarOpen={isFilterSidebarOpen} />

        <div className="flex flex-1 w-full overflow-hidden relative">
          <DriversSidebar open={isFilterSidebarOpen} onClose={() => setIsFilterSidebarOpen(false)} selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} allDeliveryStatuses={allDriverStatuses} allZipcodes={allZipcodes} selectedZipcodes={selectedZipcodes} setSelectedZipcodes={setSelectedZipcodes} allCities={allCities} selectedCities={selectedCities} setSelectedCities={setSelectedCities} allStates={allStates} selectedStates={selectedStates} setSelectedStates={setSelectedStates} onFiltersAdd={handleFiltersAdd} />

          <div className={`transition-all duration-300 ${isFilterSidebarOpen ? 'ml-[290px]' : 'ml-[10px]'} flex-1 overflow-hidden`}>
            <div className="px-[10px]">
              <DriversTable 
                currentItems={currentItems} 
                sortedColumns={sortedColumns} 
                availableColumns={availableColumns} 
                transportTypes={transportTypes} 
                statusDictionary={statusDictionary} 
                statusColors={statusColors} 
                editingNotes={editingNotes} 
                draggedColumn={draggedColumn} 
                dragOverColumn={dragOverColumn} 
                onDragStart={handleDragStart} 
                onDragOver={handleDragOver} 
                onDrop={handleDrop} 
                onDragEnd={handleDragEnd} 
                renderRating={renderRating} 
                renderStatus={renderStatus} 
                renderHireStatus={renderHireStatus} 
                renderStripeStatus={renderStripeStatus} 
                handleNotesClick={handleNotesClick} 
                handleNotesChange={handleNotesChange} 
                saveNotes={saveNotes} 
                onEditProfile={handleEditProfile}
                className="mt-[10px]" 
                sortConfig={sortConfig} 
                requestSort={requestSort} 
              />
            </div>
          </div>
        </div>

        <DriversPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} pageSizeOptions={pageSizeOptions} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
        
        {chatOpen && selectedCourier && <CourierChat open={chatOpen} courierName={selectedCourier} onClose={handleChatClose} hasUnreadMessages={false} />}
        
        <DriverDetailsSheet
          isOpen={isDriverDetailsOpen}
          onClose={() => setIsDriverDetailsOpen(false)}
          driver={selectedDriver}
          transportTypes={transportTypes}
          statusDictionary={statusDictionary}
          hireStatusDictionary={hireStatusDictionary}
          renderStatus={renderStatus}
          renderStripeStatus={renderStripeStatus}
          renderHireStatus={renderHireStatus}
        />
      </div>
    </Layout>;
};

export default DriversPage;
