
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
import { Clock, Columns, Filter, GripVertical, MessageCircle, Search } from "lucide-react";
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
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const pageSizeOptions = [10, 20, 50, 100];
  
  // Add state to track users with new messages
  const [usersWithMessages, setUsersWithMessages] = useState<{
    customers: string[];
    couriers: string[];
  }>({ customers: [], couriers: [] });

  const deliveries = [
    // Original 5 records
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
      customerName: "Saranya Natarajan",
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
      customerName: "Roma Solis",
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
      customerName: "Juan Galarraga",
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
    },
    // 40 new records with various statuses
    {
      id: 6,
      packageId: "TGT-80031245",
      orderName: "Household Items",
      status: "In Transit",
      pickupTime: "03/24/2025 10:15 AM",
      pickupLocation: {
        name: "Target Store #5372 - Rogers, AR",
        address: "2404 W Pleasant Crossing Dr, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 12:30 PM",
      dropoffLocation: {
        name: "Melissa Parker",
        address: "211 SE Kenwood St, Bentonville, AR 72712, US"
      },
      price: "$42.50",
      tip: "$7.00",
      fees: "$3.99",
      courier: "James Wilson",
      organization: "Target Corporation",
      distance: "5.2 mi"
    },
    {
      id: 7,
      packageId: "WMT-10042505",
      orderName: "Electronics Bundle",
      status: "Arrived For Pickup",
      pickupTime: "03/24/2025 09:30 AM",
      pickupLocation: {
        name: "Walmart Supercenter - Pea Ridge, AR",
        address: "240 Slack St, Pea Ridge, AR 72751, US"
      },
      dropoffTime: "03/24/2025 11:15 AM",
      dropoffLocation: {
        name: "David Thompson",
        address: "345 Lincoln Way, Bella Vista, AR 72714, US"
      },
      price: "$129.99",
      tip: "$15.00",
      fees: "$4.99",
      courier: "Ashley Rodriguez",
      organization: "Walmart US Stores",
      distance: "8.7 mi"
    },
    {
      id: 8,
      packageId: "AMZ-67294531",
      orderName: "Office Supplies",
      status: "Picking Up",
      pickupTime: "03/24/2025 11:00 AM",
      pickupLocation: {
        name: "Amazon Locker - Bentonville",
        address: "3701 SE Dodson Rd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Bentonville Business Center",
        address: "609 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$89.99",
      tip: "$10.00",
      fees: "$2.99",
      courier: "Michael Chen",
      organization: "Amazon Logistics",
      distance: "3.2 mi"
    },
    {
      id: 9,
      packageId: "COS-59127834",
      orderName: "Beauty Products",
      status: "Recipient Unavailable",
      pickupTime: "03/24/2025 01:30 PM",
      pickupLocation: {
        name: "Ulta Beauty - Rogers",
        address: "4208 S Pleasant Crossing Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:15 PM",
      dropoffLocation: {
        name: "Sarah Jenkins",
        address: "412 NE Oak St, Bentonville, AR 72712, US"
      },
      price: "$75.45",
      tip: "$12.00",
      fees: "$5.99",
      courier: "Lisa Martinez",
      organization: "Ulta Beauty",
      distance: "7.8 mi"
    },
    {
      id: 10,
      packageId: "GRB-48293561",
      orderName: "Meal Delivery",
      status: "Draft Order",
      pickupTime: "03/24/2025 05:45 PM",
      pickupLocation: {
        name: "Grubhub - Bentonville",
        address: "1400 SE Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 06:30 PM",
      dropoffLocation: {
        name: "Robert Adams",
        address: "987 NW 3rd St, Bentonville, AR 72712, US"
      },
      price: "$28.75",
      tip: "$5.50",
      fees: "$2.99",
      courier: "",
      organization: "Grubhub",
      distance: "2.5 mi"
    },
    {
      id: 11,
      packageId: "CRB-58291734",
      orderName: "Home Decor",
      status: "Paid Order",
      pickupTime: "03/24/2025 09:15 AM",
      pickupLocation: {
        name: "Crate & Barrel - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 11:30 AM",
      dropoffLocation: {
        name: "Katherine Lewis",
        address: "521 SW Bright Rd, Bentonville, AR 72712, US"
      },
      price: "$189.99",
      tip: "$20.00",
      fees: "$9.99",
      courier: "Marcus Johnson",
      organization: "Crate & Barrel",
      distance: "9.3 mi"
    },
    {
      id: 12,
      packageId: "TRG-95128734",
      orderName: "Pet Supplies",
      status: "Courier Selected",
      pickupTime: "03/24/2025 02:00 PM",
      pickupLocation: {
        name: "PetSmart - Rogers",
        address: "4207 Pleasant Crossing Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:45 PM",
      dropoffLocation: {
        name: "Thomas Wright",
        address: "734 NW Liberty Ave, Bentonville, AR 72712, US"
      },
      price: "$65.95",
      tip: "$8.00",
      fees: "$3.49",
      courier: "Samantha Brown",
      organization: "PetSmart",
      distance: "8.1 mi"
    },
    {
      id: 13,
      packageId: "LWS-45692871",
      orderName: "Hardware Delivery",
      status: "Item Not Given",
      pickupTime: "03/24/2025 10:45 AM",
      pickupLocation: {
        name: "Lowe's Home Improvement - Rogers",
        address: "3721 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:15 PM",
      dropoffLocation: {
        name: "Daniel Brooks",
        address: "832 SW Maplewood Ave, Bentonville, AR 72712, US"
      },
      price: "$112.97",
      tip: "$15.00",
      fees: "$6.99",
      courier: "Frank Torres",
      organization: "Lowe's",
      distance: "7.6 mi"
    },
    {
      id: 14,
      packageId: "BBS-37158246",
      orderName: "Baby Products",
      status: "Reported Order",
      pickupTime: "03/24/2025 11:30 AM",
      pickupLocation: {
        name: "Buy Buy Baby - Rogers",
        address: "2203 Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 01:15 PM",
      dropoffLocation: {
        name: "Jennifer Miller",
        address: "546 NE A St, Bentonville, AR 72712, US"
      },
      price: "$97.45",
      tip: "$12.00",
      fees: "$4.99",
      courier: "Paul Garcia",
      organization: "Buy Buy Baby",
      distance: "8.9 mi"
    },
    {
      id: 15,
      packageId: "WFD-67194238",
      orderName: "Grocery Essentials",
      status: "Waiting For Pay",
      pickupTime: "03/24/2025 03:15 PM",
      pickupLocation: {
        name: "Whole Foods Market - Rogers",
        address: "3425 N Market St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 04:45 PM",
      dropoffLocation: {
        name: "Amanda Williams",
        address: "982 SW Juniper St, Bentonville, AR 72712, US"
      },
      price: "$78.95",
      tip: "",
      fees: "$4.99",
      courier: "",
      organization: "Whole Foods",
      distance: "6.8 mi"
    },
    {
      id: 16,
      packageId: "BBW-42953178",
      orderName: "Home Fragrances",
      status: "Cancelled By Admin",
      pickupTime: "03/24/2025 01:00 PM",
      pickupLocation: {
        name: "Bath & Body Works - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 02:30 PM",
      dropoffLocation: {
        name: "Emily Davis",
        address: "428 SE C St, Bentonville, AR 72712, US"
      },
      price: "$0.00",
      tip: "$0.00",
      fees: "$0.00",
      courier: "",
      organization: "Bath & Body Works",
      distance: "9.1 mi"
    },
    {
      id: 17,
      packageId: "TSC-83921647",
      orderName: "Farm Supplies",
      status: "Scheduled Order",
      pickupTime: "03/25/2025 09:00 AM",
      pickupLocation: {
        name: "Tractor Supply Co. - Bentonville",
        address: "1401 SW Regional Airport Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/25/2025 10:30 AM",
      dropoffLocation: {
        name: "Richard Hayes",
        address: "324 County Road 40, Pea Ridge, AR 72751, US"
      },
      price: "$145.97",
      tip: "$25.00",
      fees: "$7.99",
      courier: "",
      organization: "Tractor Supply",
      distance: "11.3 mi"
    },
    {
      id: 18,
      packageId: "BNS-95713428",
      orderName: "Books & Media",
      status: "Repeated Order",
      pickupTime: "03/24/2025 02:30 PM",
      pickupLocation: {
        name: "Barnes & Noble - Rogers",
        address: "2795 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 04:00 PM",
      dropoffLocation: {
        name: "William Moore",
        address: "765 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$54.95",
      tip: "$7.00",
      fees: "$3.99",
      courier: "",
      organization: "Barnes & Noble",
      distance: "5.7 mi"
    },
    {
      id: 19,
      packageId: "HMD-78321965",
      orderName: "Home Office Setup",
      status: "Forgot",
      pickupTime: "03/24/2025 11:00 AM",
      pickupLocation: {
        name: "Home Depot - Rogers",
        address: "3721 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:30 PM",
      dropoffLocation: {
        name: "Steven Clark",
        address: "983 NW 4th St, Bentonville, AR 72712, US"
      },
      price: "$199.97",
      tip: "$20.00",
      fees: "$8.99",
      courier: "Derek Johnson",
      organization: "Home Depot",
      distance: "6.9 mi"
    },
    {
      id: 20,
      packageId: "CVS-36198245",
      orderName: "Pharmacy Items",
      status: "Started Working",
      pickupTime: "03/24/2025 10:15 AM",
      pickupLocation: {
        name: "CVS Pharmacy - Bentonville",
        address: "100 SW 14th St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 11:00 AM",
      dropoffLocation: {
        name: "Maria Lopez",
        address: "674 SE J St, Bentonville, AR 72712, US"
      },
      price: "$34.95",
      tip: "$5.00",
      fees: "$2.99",
      courier: "Nicole Adams",
      organization: "CVS Health",
      distance: "2.3 mi"
    },
    {
      id: 21,
      packageId: "BKS-42967831",
      orderName: "Bakery Order",
      status: "Accepted Repeated Order",
      pickupTime: "03/24/2025 08:30 AM",
      pickupLocation: {
        name: "The Bakery - Downtown Bentonville",
        address: "104 SW A St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 09:15 AM",
      dropoffLocation: {
        name: "Walmart Corporate Office",
        address: "702 SW 8th St, Bentonville, AR 72712, US"
      },
      price: "$85.00",
      tip: "$15.00",
      fees: "$0.00",
      courier: "Tyler Wilson",
      organization: "The Bakery",
      distance: "0.8 mi"
    },
    {
      id: 22,
      packageId: "ABR-56834219",
      orderName: "Clothing Bundle",
      status: "Draft Order",
      pickupTime: "03/24/2025 03:00 PM",
      pickupLocation: {
        name: "American Eagle - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 04:30 PM",
      dropoffLocation: {
        name: "Rebecca White",
        address: "1233 SW Regional Airport Blvd, Bentonville, AR 72712, US"
      },
      price: "$149.95",
      tip: "",
      fees: "$7.99",
      courier: "",
      organization: "American Eagle",
      distance: "8.7 mi"
    },
    {
      id: 23,
      packageId: "CKR-78321965",
      orderName: "Kitchen Appliances",
      status: "Paid Order",
      pickupTime: "03/24/2025 12:30 PM",
      pickupLocation: {
        name: "Williams-Sonoma - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 02:00 PM",
      dropoffLocation: {
        name: "Elizabeth Scott",
        address: "895 SW Westbury Dr, Bentonville, AR 72712, US"
      },
      price: "$299.99",
      tip: "$30.00",
      fees: "$12.99",
      courier: "Anthony Lee",
      organization: "Williams-Sonoma",
      distance: "9.4 mi"
    },
    {
      id: 24,
      packageId: "SBX-95217834",
      orderName: "Coffee Order",
      status: "In Transit",
      pickupTime: "03/24/2025 09:45 AM",
      pickupLocation: {
        name: "Starbucks - Bentonville Square",
        address: "200 E Central Ave, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 10:15 AM",
      dropoffLocation: {
        name: "Crystal Bridges Museum",
        address: "600 Museum Way, Bentonville, AR 72712, US"
      },
      price: "$43.75",
      tip: "$8.00",
      fees: "$2.99",
      courier: "Jason Kim",
      organization: "Starbucks",
      distance: "1.5 mi"
    },
    {
      id: 25,
      packageId: "APL-38217954",
      orderName: "Tech Accessories",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 11:15 AM",
      pickupLocation: {
        name: "Apple Store - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Matthew Taylor",
        address: "432 SW 14th St, Bentonville, AR 72712, US"
      },
      price: "$158.99",
      tip: "$20.00",
      fees: "$5.99",
      courier: "Rachel Green",
      organization: "Apple Inc.",
      distance: "8.9 mi"
    },
    {
      id: 26,
      packageId: "KHL-45289317",
      orderName: "Department Store Order",
      status: "Courier Selected",
      pickupTime: "03/24/2025 01:45 PM",
      pickupLocation: {
        name: "Kohl's - Rogers",
        address: "4200 W Green Acres Rd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:15 PM",
      dropoffLocation: {
        name: "Patricia Walker",
        address: "743 NW Barrington Rd, Bentonville, AR 72712, US"
      },
      price: "$127.95",
      tip: "$15.00",
      fees: "$6.99",
      courier: "Kevin Martinez",
      organization: "Kohl's",
      distance: "7.8 mi"
    },
    {
      id: 27,
      packageId: "BKW-63791482",
      orderName: "Fast Food Delivery",
      status: "Canceled By Customer",
      pickupTime: "03/24/2025 12:15 PM",
      pickupLocation: {
        name: "Burger King - Bentonville",
        address: "1800 S Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 12:45 PM",
      dropoffLocation: {
        name: "Bentonville High School",
        address: "1801 SE J St, Bentonville, AR 72712, US"
      },
      price: "$0.00",
      tip: "$0.00",
      fees: "$0.00",
      courier: "",
      organization: "Burger King",
      distance: "2.1 mi"
    },
    {
      id: 28,
      packageId: "BBS-75391284",
      orderName: "Sports Equipment",
      status: "Waiting For Pay",
      pickupTime: "03/24/2025 02:30 PM",
      pickupLocation: {
        name: "Dick's Sporting Goods - Rogers",
        address: "2203 Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 04:00 PM",
      dropoffLocation: {
        name: "Andrew Wilson",
        address: "1235 NW Greenville Rd, Bentonville, AR 72712, US"
      },
      price: "$189.95",
      tip: "",
      fees: "$8.99",
      courier: "",
      organization: "Dick's Sporting Goods",
      distance: "8.5 mi"
    },
    {
      id: 29,
      packageId: "OFC-36175249",
      orderName: "Office Supplies",
      status: "Item Not Given",
      pickupTime: "03/24/2025 10:30 AM",
      pickupLocation: {
        name: "Office Depot - Rogers",
        address: "4408 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 12:00 PM",
      dropoffLocation: {
        name: "First National Bank - Bentonville",
        address: "406 SW 5th St, Bentonville, AR 72712, US"
      },
      price: "$76.95",
      tip: "$10.00",
      fees: "$4.99",
      courier: "Victoria Chang",
      organization: "Office Depot",
      distance: "6.4 mi"
    },
    {
      id: 30,
      packageId: "PSY-52978143",
      orderName: "Party Supplies",
      status: "Scheduled Order",
      pickupTime: "03/25/2025 10:00 AM",
      pickupLocation: {
        name: "Party City - Rogers",
        address: "4409 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/25/2025 11:30 AM",
      dropoffLocation: {
        name: "Community Center - Bentonville",
        address: "1101 SW Citizens Cir, Bentonville, AR 72712, US"
      },
      price: "$115.95",
      tip: "$20.00",
      fees: "$7.99",
      courier: "",
      organization: "Party City",
      distance: "6.7 mi"
    },
    {
      id: 31,
      packageId: "MOB-89312675",
      orderName: "Furniture Delivery",
      status: "Repeated Order",
      pickupTime: "03/24/2025 08:00 AM",
      pickupLocation: {
        name: "Rooms To Go - Rogers",
        address: "4408 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 10:00 AM",
      dropoffLocation: {
        name: "Mark Henderson",
        address: "543 NW Oak Ridge Ave, Bentonville, AR 72712, US"
      },
      customerName: "Mark Henderson",
      price: "$599.95",
      tip: "$40.00",
      fees: "$25.99",
      courier: "Christopher Davis",
      organization: "Rooms To Go",
      distance: "6.5 mi"
    }
  ];

  // Define columnOptions for the table
  const columnOptions: ColumnOption[] = [
    { id: "packageId", label: "Package ID", default: true },
    { id: "orderName", label: "Order Name", default: true },
    { id: "status", label: "Status", default: true },
    { id: "pickupTime", label: "Pickup Time", default: true },
    { id: "pickupLocation", label: "Pickup Location", default: true },
    { id: "dropoffTime", label: "Dropoff Time", default: true },
    { id: "dropoffLocation", label: "Dropoff Location", default: true },
    { id: "customerName", label: "Customer Name", default: true },
    { id: "price", label: "Price", default: true },
    { id: "tip", label: "Tip", default: false },
    { id: "fees", label: "Fees", default: false },
    { id: "courier", label: "Courier", default: true },
    { id: "organization", label: "Organization", default: true },
    { id: "distance", label: "Distance", default: false },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columnOptions.filter(col => col.default).map(col => col.id)
  );

  // Define status variants for badges
  const getStatusVariant = (status: string) => {
    if (status.toLowerCase().includes("complete")) return "success";
    if (status.toLowerCase().includes("transit")) return "default";
    if (status.toLowerCase().includes("cancel")) return "destructive";
    if (status.toLowerCase().includes("waiting") || 
        status.toLowerCase().includes("scheduled") ||
        status.toLowerCase().includes("draft")) return "warning";
    return "outline";
  };

  // Get record counts for different status types
  const getRecordCounts = () => {
    const completed = deliveries.filter(d => 
      d.status.toLowerCase().includes("complete")).length;
    const cancelled = deliveries.filter(d => 
      d.status.toLowerCase().includes("cancel")).length;
    const inProgress = deliveries.length - completed - cancelled;
    
    return { completed, cancelled, inProgress, total: deliveries.length };
  };

  const counts = getRecordCounts();

  // Load status dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary("delivery-statuses");
      setStatusDictionary(dict);
    };
    loadDictionary();
    
    // Generate random users with new messages
    const randomCustomers = [...new Set(
      Array.from({length: 3}, () => Math.floor(Math.random() * deliveries.length))
    )].map(index => deliveries[index]?.customerName).filter(Boolean);
    
    const randomCouriers = [...new Set(
      Array.from({length: 2}, () => Math.floor(Math.random() * deliveries.length))
    )].map(index => deliveries[index]?.courier).filter(Boolean);
    
    setUsersWithMessages({
      customers: randomCustomers,
      couriers: randomCouriers
    });
  }, []);

  // Search deliveries
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Filter deliveries based on search term and active view
    let filtered = deliveries;

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = deliveries.filter(d => 
        d.packageId.toLowerCase().includes(searchLower) ||
        d.orderName.toLowerCase().includes(searchLower) ||
        d.courier.toLowerCase().includes(searchLower) ||
        (d.customerName && d.customerName.toLowerCase().includes(searchLower)) ||
        d.status.toLowerCase().includes(searchLower)
      );
    }

    // Filter by view type
    if (activeView === "attention") {
      filtered = filtered.filter(d => 
        d.status.toLowerCase().includes("cancel") || 
        d.status.toLowerCase().includes("not given") ||
        d.status.toLowerCase().includes("forgot") ||
        d.status.toLowerCase().includes("unavailable") ||
        d.status.toLowerCase().includes("reported")
      );
      console.info(`Filtered to ${filtered.length} cancelled deliveries for Attention Required tab`);
    } else if (activeView === "unassigned") {
      filtered = filtered.filter(d => !d.courier);
    }

    setFilteredDeliveries(filtered);
    console.info(`Initial deliveries loaded: ${filtered.length}`);
  }, [debouncedSearchTerm, deliveries, activeView]);

  // Column drag handlers
  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    } else {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (columnId: string) => {
    if (draggedColumn && draggedColumn !== columnId) {
      const newOrder = [...visibleColumns];
      const draggedIndex = newOrder.indexOf(draggedColumn);
      const dropIndex = newOrder.indexOf(columnId);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(dropIndex, 0, draggedColumn);
      
      setVisibleColumns(newOrder);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDragOverColumn(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDeliveries.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredDeliveries.length);
  const currentDeliveries = filteredDeliveries.slice(startIndex, endIndex);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Chat handlers
  const handleOpenChat = (type: 'customer' | 'courier', name: string) => {
    if (type === 'customer') {
      setSelectedCustomer(name);
      setSelectedCourier("");
    } else {
      setSelectedCourier(name);
      setSelectedCustomer("");
    }
    setIsChatOpen(true);
  };
  
  const hasNewMessage = (type: 'customer' | 'courier', name: string) => {
    if (!name) return false;
    
    if (type === 'customer') {
      return usersWithMessages.customers.includes(name);
    } else {
      return usersWithMessages.couriers.includes(name);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-col flex-1 w-full">
        <div className="container mx-auto py-6 max-w-full px-4 space-y-4">
          <div className="flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
              <p className="text-muted-foreground">
                View and manage all delivery requests
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10 gap-1 lg:gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">Date Range</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <DateRangePicker
                    date={dateRange}
                    onChange={setDateRange}
                  />
                </PopoverContent>
              </Popover>
              
              <TimezonePicker 
                timezone={timezone} 
                setTimezone={setTimezone} 
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden lg:inline ml-2">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter Deliveries</h4>
                      <p className="text-sm text-muted-foreground">
                        Narrow down deliveries by specific criteria
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="status">Status</label>
                        <Select defaultValue="all">
                          <SelectTrigger id="status" className="col-span-2 h-8">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="complete">Completed</SelectItem>
                            <SelectItem value="in-transit">In Transit</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="courier">Courier</label>
                        <Select defaultValue="all">
                          <SelectTrigger id="courier" className="col-span-2 h-8">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Couriers</SelectItem>
                            <SelectItem value="assigned">Assigned Only</SelectItem>
                            <SelectItem value="unassigned">Unassigned Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="border rounded-lg shadow-sm bg-background">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search deliveries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 w-[250px] sm:w-[300px] lg:w-[400px]"
                    />
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tabs 
                      defaultValue="main" 
                      value={activeView} 
                      onValueChange={setActiveView}
                      className="w-full"
                    >
                      <TabsList className="ml-0 h-8">
                        <TabsTrigger value="main" className="text-xs">
                          All Deliveries
                        </TabsTrigger>
                        <TabsTrigger value="attention" className="text-xs">
                          Attention Required ({counts.cancelled})
                        </TabsTrigger>
                        <TabsTrigger value="unassigned" className="text-xs">
                          Unassigned
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 md:mt-0">
                  <div className="flex">
                    <div className="pr-4 border-r">
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold">{counts.completed}</p>
                    </div>
                    <div className="px-4 border-r">
                      <p className="text-sm font-medium">In Progress</p>
                      <p className="text-2xl font-bold">{counts.inProgress}</p>
                    </div>
                    <div className="pl-4">
                      <p className="text-sm font-medium">Cancelled</p>
                      <p className="text-2xl font-bold">{counts.cancelled}</p>
                    </div>
                  </div>
                  <ColumnSelector
                    columns={columnOptions}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    size="sm"
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <ScrollArea orientation="both" className="h-[calc(100vh-320px)]">
                  <div className="relative">
                    <Table className="min-w-max">
                      <TableHeader className="sticky top-0 z-10 bg-secondary">
                        <TableRow>
                          {visibleColumns.map((colId) => {
                            const col = columnOptions.find(c => c.id === colId);
                            return (
                              <TableHead 
                                key={colId}
                                draggable
                                dragOver={dragOverColumn === colId}
                                onDragStart={() => handleDragStart(colId)}
                                onDragOver={(e) => handleDragOver(e, colId)}
                                onDrop={() => handleDrop(colId)}
                                onDragEnd={handleDragEnd}
                                className="whitespace-nowrap"
                              >
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  {col?.label || colId}
                                </div>
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentDeliveries.length > 0 ? (
                          currentDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                              {visibleColumns.map((colId) => {
                                if (colId === "status") {
                                  return (
                                    <TableCell key={`${delivery.id}-${colId}`}>
                                      <Badge variant={getStatusVariant(delivery.status)}>
                                        {delivery.status}
                                      </Badge>
                                    </TableCell>
                                  );
                                } else if (colId === "pickupLocation" || colId === "dropoffLocation") {
                                  const location = delivery[colId as keyof typeof delivery] as any;
                                  return (
                                    <TableCell key={`${delivery.id}-${colId}`} className="max-w-[300px]">
                                      <div className="flex flex-col">
                                        <span className="font-medium">{location.name}</span>
                                        <span className="text-muted-foreground text-xs">{location.address}</span>
                                      </div>
                                    </TableCell>
                                  );
                                } else if (colId === "customerName") {
                                  return (
                                    <TableCell key={`${delivery.id}-${colId}`}>
                                      <div className="flex items-center gap-1">
                                        {delivery[colId] ? (
                                          <>
                                            <span>{delivery[colId as keyof typeof delivery]}</span>
                                            {hasNewMessage('customer', delivery[colId as string]) && (
                                              <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-6 w-6 rounded-full"
                                                onClick={() => handleOpenChat('customer', delivery[colId as string])}
                                              >
                                                <MessageCircle className="h-4 w-4 text-blue-500 fill-blue-100" />
                                              </Button>
                                            )}
                                          </>
                                        ) : (
                                          <span className="text-muted-foreground">—</span>
                                        )}
                                      </div>
                                    </TableCell>
                                  );
                                } else if (colId === "courier") {
                                  return (
                                    <TableCell key={`${delivery.id}-${colId}`}>
                                      <div className="flex items-center gap-1">
                                        {delivery[colId] ? (
                                          <>
                                            <span>{delivery[colId as keyof typeof delivery]}</span>
                                            {hasNewMessage('courier', delivery[colId as string]) && (
                                              <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-6 w-6 rounded-full"
                                                onClick={() => handleOpenChat('courier', delivery[colId as string])}
                                              >
                                                <MessageCircle className="h-4 w-4 text-blue-500 fill-blue-100" />
                                              </Button>
                                            )}
                                          </>
                                        ) : (
                                          <span className="text-muted-foreground">Unassigned</span>
                                        )}
                                      </div>
                                    </TableCell>
                                  );
                                } else {
                                  return (
                                    <TableCell key={`${delivery.id}-${colId}`}>
                                      {delivery[colId as keyof typeof delivery] || (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </TableCell>
                                  );
                                }
                              })}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                              No results found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
                
                <Pagination className="p-4 border-t">
                  <div className="flex items-center justify-between w-full">
                    <PaginationInfo 
                      total={filteredDeliveries.length} 
                      pageSize={pageSize}
                      currentPage={currentPage}
                    />
                    
                    <PaginationContent>
                      <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      
                      {/* First page */}
                      {currentPage > 2 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Ellipsis */}
                      {currentPage > 3 && <PaginationEllipsis />}
                      
                      {/* Page before current */}
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                            {currentPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Current page */}
                      <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                      </PaginationItem>
                      
                      {/* Page after current */}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                            {currentPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Ellipsis */}
                      {currentPage < totalPages - 2 && <PaginationEllipsis />}
                      
                      {/* Last page */}
                      {currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationContent>
                    
                    <PaginationSize 
                      sizes={pageSizeOptions} 
                      pageSize={pageSize} 
                      onChange={handlePageSizeChange}
                    />
                  </div>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isChatOpen && (
        <CourierChat 
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          courier={selectedCourier}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default Index;
