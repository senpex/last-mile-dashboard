
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
      price: "$899.99",
      tip: "$50.00",
      fees: "$49.99",
      courier: "",
      organization: "Rooms To Go",
      distance: "7.3 mi"
    },
    {
      id: 32,
      packageId: "QBD-45678912",
      orderName: "Restaurant Order",
      status: "Accepted Repeated Order",
      pickupTime: "03/24/2025 06:30 PM",
      pickupLocation: {
        name: "Taziki's Mediterranean Cafe - Rogers",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 07:15 PM",
      dropoffLocation: {
        name: "Stephanie Harris",
        address: "987 SW Paddington Ave, Bentonville, AR 72712, US"
      },
      price: "$52.95",
      tip: "$10.00",
      fees: "$3.99",
      courier: "Christopher Allen",
      organization: "Taziki's Mediterranean Cafe",
      distance: "8.9 mi"
    },
    {
      id: 33,
      packageId: "GNC-36789215",
      orderName: "Health Supplements",
      status: "Started Working",
      pickupTime: "03/24/2025 12:45 PM",
      pickupLocation: {
        name: "GNC - Rogers",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 02:15 PM",
      dropoffLocation: {
        name: "Brian Torres",
        address: "834 SW Westpark Dr, Bentonville, AR 72712, US"
      },
      price: "$87.95",
      tip: "$12.00",
      fees: "$4.99",
      courier: "Erica Jenkins",
      organization: "GNC",
      distance: "8.5 mi"
    },
    {
      id: 34,
      packageId: "VRZ-78945612",
      orderName: "Mobile Phone",
      status: "In Transit",
      pickupTime: "03/24/2025 11:30 AM",
      pickupLocation: {
        name: "Verizon Wireless - Rogers",
        address: "4408 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 01:00 PM",
      dropoffLocation: {
        name: "Michelle Parker",
        address: "765 NW Applegate St, Bentonville, AR 72712, US"
      },
      price: "$1,099.99",
      tip: "$50.00",
      fees: "$9.99",
      courier: "Jonathan Lewis",
      organization: "Verizon Wireless",
      distance: "6.8 mi"
    },
    {
      id: 35,
      packageId: "WLG-25896314",
      orderName: "Eyewear Order",
      status: "Arrived For Pickup",
      pickupTime: "03/24/2025 09:15 AM",
      pickupLocation: {
        name: "Warby Parker - Rogers",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 10:45 AM",
      dropoffLocation: {
        name: "Charles Wilson",
        address: "423 SW D St, Bentonville, AR 72712, US"
      },
      price: "$195.00",
      tip: "$25.00",
      fees: "$0.00",
      courier: "Samantha Green",
      organization: "Warby Parker",
      distance: "9.2 mi"
    },
    {
      id: 36,
      packageId: "DLT-36987412",
      orderName: "Meal Delivery",
      status: "Forgotten",
      pickupTime: "03/24/2025 07:00 PM",
      pickupLocation: {
        name: "The Preacher's Son - Bentonville",
        address: "201 NW A St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 07:30 PM",
      dropoffLocation: {
        name: "Laura Johnson",
        address: "432 NW 10th St, Bentonville, AR 72712, US"
      },
      price: "$87.95",
      tip: "$20.00",
      fees: "$4.99",
      courier: "Daniel Martin",
      organization: "The Preacher's Son",
      distance: "1.3 mi"
    },
    {
      id: 37,
      packageId: "CRK-98745631",
      orderName: "Craft Supplies",
      status: "Recipient Unavailable",
      pickupTime: "03/24/2025 01:15 PM",
      pickupLocation: {
        name: "Hobby Lobby - Rogers",
        address: "4409 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 02:45 PM",
      dropoffLocation: {
        name: "Melissa Roberts",
        address: "876 SW Vista Ave, Bentonville, AR 72712, US"
      },
      price: "$65.95",
      tip: "$10.00",
      fees: "$3.99",
      courier: "Patrick Turner",
      organization: "Hobby Lobby",
      distance: "7.1 mi"
    },
    {
      id: 38,
      packageId: "KFC-74125896",
      orderName: "Fast Food Order",
      status: "Waiting For Pay",
      pickupTime: "03/24/2025 05:30 PM",
      pickupLocation: {
        name: "KFC - Bentonville",
        address: "1702 S Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 06:00 PM",
      dropoffLocation: {
        name: "Timothy Nelson",
        address: "546 SW J St, Bentonville, AR 72712, US"
      },
      price: "$32.95",
      tip: "",
      fees: "$2.99",
      courier: "",
      organization: "KFC",
      distance: "1.9 mi"
    },
    {
      id: 39,
      packageId: "XRX-65478932",
      orderName: "Document Delivery",
      status: "Dropoff Complete",
      pickupTime: "03/24/2025 10:00 AM",
      pickupLocation: {
        name: "FedEx Office - Bentonville",
        address: "1400 SE Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 10:45 AM",
      dropoffLocation: {
        name: "Arvest Bank Headquarters",
        address: "201 NE A St, Bentonville, AR 72712, US"
      },
      price: "$15.95",
      tip: "$5.00",
      fees: "$0.00",
      courier: "Jessica Turner",
      organization: "FedEx Office",
      distance: "1.4 mi"
    },
    {
      id: 40,
      packageId: "FLS-32165498",
      orderName: "Floral Arrangement",
      status: "Reported Order",
      pickupTime: "03/24/2025 11:45 AM",
      pickupLocation: {
        name: "Florist - Downtown Bentonville",
        address: "106 SW A St, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 12:30 PM",
      dropoffLocation: {
        name: "The Momentary",
        address: "507 SE E St, Bentonville, AR 72712, US"
      },
      price: "$79.99",
      tip: "$15.00",
      fees: "$4.99",
      courier: "Shannon Miller",
      organization: "Downtown Florist",
      distance: "1.2 mi"
    },
    {
      id: 41,
      packageId: "JWR-15935782",
      orderName: "Jewelry Purchase",
      status: "Paid Order",
      pickupTime: "03/24/2025 02:15 PM",
      pickupLocation: {
        name: "Kay Jewelers - Pinnacle Hills",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 03:45 PM",
      dropoffLocation: {
        name: "Alexander Campbell",
        address: "654 NW Westpark Dr, Bentonville, AR 72712, US"
      },
      price: "$749.99",
      tip: "$75.00",
      fees: "$14.99",
      courier: "Olivia Washington",
      organization: "Kay Jewelers",
      distance: "9.3 mi"
    },
    {
      id: 42,
      packageId: "MSC-75315982",
      orderName: "Music Equipment",
      status: "Draft Order",
      pickupTime: "03/24/2025 03:30 PM",
      pickupLocation: {
        name: "Guitar Center - Rogers",
        address: "3700 N Bloomington St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/24/2025 05:00 PM",
      dropoffLocation: {
        name: "Jacob Murphy",
        address: "987 SW Juniper Way, Bentonville, AR 72712, US"
      },
      price: "$329.95",
      tip: "",
      fees: "$9.99",
      courier: "",
      organization: "Guitar Center",
      distance: "8.3 mi"
    },
    {
      id: 43,
      packageId: "CMS-96325841",
      orderName: "Camera Accessories",
      status: "Scheduled Order",
      pickupTime: "03/25/2025 11:30 AM",
      pickupLocation: {
        name: "Best Buy - Rogers",
        address: "4301 W Walnut St, Rogers, AR 72756, US"
      },
      dropoffTime: "03/25/2025 01:00 PM",
      dropoffLocation: {
        name: "Nathan Peterson",
        address: "543 NW Briar Creek Cir, Bentonville, AR 72712, US"
      },
      price: "$245.99",
      tip: "$25.00",
      fees: "$8.99",
      courier: "",
      organization: "Best Buy",
      distance: "6.9 mi"
    },
    {
      id: 44,
      packageId: "TYS-85274196",
      orderName: "Toy Delivery",
      status: "Courier Selected",
      pickupTime: "03/24/2025 09:30 AM",
      pickupLocation: {
        name: "Toys R Us - Rogers",
        address: "2203 S Promenade Blvd, Rogers, AR 72758, US"
      },
      dropoffTime: "03/24/2025 11:00 AM",
      dropoffLocation: {
        name: "Christina Edwards",
        address: "789 SW 12th St, Bentonville, AR 72712, US"
      },
      price: "$129.99",
      tip: "$15.00",
      fees: "$5.99",
      courier: "Jeremy Black",
      organization: "Toys R Us",
      distance: "8.7 mi"
    },
    {
      id: 45,
      packageId: "PLT-47856321",
      orderName: "Garden Supplies",
      status: "Arrived For Pickup",
      pickupTime: "03/24/2025 10:15 AM",
      pickupLocation: {
        name: "Westwood Gardens - Bentonville",
        address: "807 N Walton Blvd, Bentonville, AR 72712, US"
      },
      dropoffTime: "03/24/2025 11:45 AM",
      dropoffLocation: {
        name: "Angela Foster",
        address: "234 SW Sycamore Dr, Bentonville, AR 72712, US"
      },
      price: "$87.95",
      tip: "$12.00",
      fees: "$7.99",
      courier: "Carlos Ramirez",
      organization: "Westwood Gardens",
      distance: "3.4 mi"
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
    // Apply initial filtering based on the active view
    applyFilters(deliveries, debouncedSearchTerm, activeView);
    console.log("Initial deliveries loaded:", deliveries.length);
  }, [activeView]);

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
    // Apply filtering when search term changes
    applyFilters(deliveries, debouncedSearchTerm, activeView);
  }, [debouncedSearchTerm, activeView]);

  // Function to apply both search and tab filters
  const applyFilters = (items: any[], searchTerm: string, activeTab: string) => {
    let results = [...items];
    
    // First filter by search term if present
    if (searchTerm.length >= 4) {
      console.log("Performing search for:", searchTerm);

      results = results.filter(delivery => {
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
          field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Then filter by the active tab
    if (activeTab === "attention") {
      // Only show items with "Canceled By Customer" or "Cancelled By Admin" status for Attention Required tab
      results = results.filter(delivery => 
        delivery.status === "Canceled By Customer" || 
        delivery.status === "Cancelled By Admin"
      );
      console.log(`Filtered to ${results.length} cancelled deliveries for Attention Required tab`);
    }
    
    setFilteredDeliveries(results);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination calculations
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
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Handle tab change
  const handleViewChange = (view: string) => {
    setActiveView(view);
    // The filtering will be applied by the useEffect that watches activeView
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
        pages.push(-1); // Add ellipsis after first page
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-2); // Add ellipsis before last page
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const availableColumns: ColumnOption[] = [
    { id: "status", label: "Status", default: true },
    { id: "packageId", label: "ID", default: true },
    { id: "orderName", label: "Order name", default: true },
    { id: "customerName", label: "Customer Name", default: true },
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
    if (!courierName) return; // Don't open chat for empty courier names
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
          {/* Fixed header with filters */}
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
          
          {/* Scrollable table area */}
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
                    {currentItems.length > 0 ? (
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
                              case "customerName":
                                return <TableCell key={columnId}>{delivery.customerName || "-"}</TableCell>;
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
                                      <Button 
                                        variant="link" 
                                        className="p-0 h-auto font-normal text-primary" 
                                        onClick={() => handleCourierClick(delivery.courier)}
                                      >
                                        {delivery.courier}
                                      </Button>
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
          
          {/* Fixed footer with pagination */}
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

      {/* Courier Chat Component */}
      <CourierChat 
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        courierName={selectedCourier}
      />
    </ThemeProvider>
  );
};

export default Index;
