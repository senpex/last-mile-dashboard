
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
import { timezones } from "@/lib/timezones";

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
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "packageId",
    "orderName",
    "status",
    "pickupTime", 
    "dropoffTime",
    "courier",
    "price"
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  // Column definitions
  const columnOptions: ColumnOption[] = [
    { id: "packageId", label: "Package ID" },
    { id: "orderName", label: "Order Name" },
    { id: "status", label: "Status" },
    { id: "pickupTime", label: "Pickup Time" },
    { id: "dropoffTime", label: "Dropoff Time" },
    { id: "pickupLocation", label: "Pickup Location" },
    { id: "dropoffLocation", label: "Dropoff Location" },
    { id: "price", label: "Price" },
    { id: "tip", label: "Tip" },
    { id: "fees", label: "Fees" },
    { id: "courier", label: "Courier" },
    { id: "organization", label: "Organization" },
    { id: "distance", label: "Distance" }
  ];

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
    },
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
      dropoffTime: "03/24/2025 10:30 AM",
      dropoffLocation: {
        name: "Christine Miller",
        address: "2401 SW Aviation Dr, Bentonville, AR 72712, US"
      },
      price: "$499.99",
      tip: "$50.00",
      fees: "$15.99",
      courier: "Robert Davis",
      organization: "Rooms To Go",
      distance: "7.2 mi"
    }
  ];

  // Fetch status dictionary on component mount
  useEffect(() => {
    const fetchStatusDictionary = async () => {
      try {
        const dictionary = await getDictionary("delivery_statuses");
        setStatusDictionary(dictionary);
      } catch (error) {
        console.error("Failed to load status dictionary:", error);
      }
    };
    
    fetchStatusDictionary();
  }, []);

  // Handle search term debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter deliveries based on search term
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredDeliveries(deliveries);
    } else {
      const lowercaseSearch = debouncedSearchTerm.toLowerCase();
      const filtered = deliveries.filter(delivery => {
        return (
          delivery.packageId.toLowerCase().includes(lowercaseSearch) ||
          delivery.orderName.toLowerCase().includes(lowercaseSearch) ||
          delivery.status.toLowerCase().includes(lowercaseSearch) ||
          (delivery.courier && delivery.courier.toLowerCase().includes(lowercaseSearch)) ||
          (delivery.organization && delivery.organization.toLowerCase().includes(lowercaseSearch))
        );
      });
      setFilteredDeliveries(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [debouncedSearchTerm, deliveries]);

  // Initialize filtered deliveries with all deliveries
  useEffect(() => {
    setFilteredDeliveries(deliveries);
  }, [deliveries]);

  // Handle column visibility change
  const handleColumnVisibilityChange = (columns: string[]) => {
    setVisibleColumns(columns);
  };

  // Get status badge color based on status
  const getStatusBadgeColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "Dropoff Complete": "bg-green-500 hover:bg-green-600",
      "In Transit": "bg-blue-500 hover:bg-blue-600",
      "Picking Up": "bg-yellow-500 hover:bg-yellow-600",
      "Arrived For Pickup": "bg-purple-500 hover:bg-purple-600",
      "Canceled By Customer": "bg-red-500 hover:bg-red-600",
      "Recipient Unavailable": "bg-orange-500 hover:bg-orange-600",
      "Draft Order": "bg-gray-500 hover:bg-gray-600",
      "Paid Order": "bg-emerald-500 hover:bg-emerald-600",
      "Courier Selected": "bg-cyan-500 hover:bg-cyan-600",
      "Item Not Given": "bg-rose-500 hover:bg-rose-600",
      "Reported Order": "bg-pink-500 hover:bg-pink-600",
      "Waiting For Pay": "bg-amber-500 hover:bg-amber-600",
      "Cancelled By Admin": "bg-red-700 hover:bg-red-800",
      "Scheduled Order": "bg-indigo-500 hover:bg-indigo-600",
      "Repeated Order": "bg-teal-500 hover:bg-teal-600",
      "Forgot": "bg-stone-500 hover:bg-stone-600",
      "Started Working": "bg-sky-500 hover:bg-sky-600",
      "Accepted Repeated Order": "bg-lime-500 hover:bg-lime-600"
    };
    
    return statusMap[status] || "bg-gray-500 hover:bg-gray-600";
  };

  // Calculate pagination
  const startIndex = (currentPage - 1) * parseInt(rowsPerPage);
  const endIndex = startIndex + parseInt(rowsPerPage);
  const paginatedDeliveries = filteredDeliveries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDeliveries.length / parseInt(rowsPerPage));

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: sidebarCollapsed ? "70px" : "240px" }}>
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Deliveries</h1>
              <Button>New Delivery</Button>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search deliveries..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <DateRangePicker 
                  date={dateRange} 
                  onDateChange={setDateRange} 
                />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Clock size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h3 className="font-medium">Timezone</h3>
                      <TimezonePicker 
                        timezone={timezone} 
                        setTimezone={setTimezone} 
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filters</h3>
                      <div className="space-y-2">
                        <label className="text-sm">Status</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-transit">In Transit</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <ColumnSelector 
                  options={columnOptions}
                  visibleColumns={visibleColumns}
                  onChange={handleColumnVisibilityChange}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {visibleColumns.includes("packageId") && (
                        <TableHead className="w-[120px]">Package ID</TableHead>
                      )}
                      {visibleColumns.includes("orderName") && (
                        <TableHead>Order Name</TableHead>
                      )}
                      {visibleColumns.includes("status") && (
                        <TableHead>Status</TableHead>
                      )}
                      {visibleColumns.includes("pickupTime") && (
                        <TableHead>Pickup Time</TableHead>
                      )}
                      {visibleColumns.includes("dropoffTime") && (
                        <TableHead>Dropoff Time</TableHead>
                      )}
                      {visibleColumns.includes("pickupLocation") && (
                        <TableHead>Pickup Location</TableHead>
                      )}
                      {visibleColumns.includes("dropoffLocation") && (
                        <TableHead>Dropoff Location</TableHead>
                      )}
                      {visibleColumns.includes("price") && (
                        <TableHead className="text-right">Price</TableHead>
                      )}
                      {visibleColumns.includes("tip") && (
                        <TableHead className="text-right">Tip</TableHead>
                      )}
                      {visibleColumns.includes("fees") && (
                        <TableHead className="text-right">Fees</TableHead>
                      )}
                      {visibleColumns.includes("courier") && (
                        <TableHead>Courier</TableHead>
                      )}
                      {visibleColumns.includes("organization") && (
                        <TableHead>Organization</TableHead>
                      )}
                      {visibleColumns.includes("distance") && (
                        <TableHead className="text-right">Distance</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDeliveries.map((delivery) => (
                      <TableRow key={delivery.id} className="cursor-pointer hover:bg-muted/50">
                        {visibleColumns.includes("packageId") && (
                          <TableCell className="font-medium">{delivery.packageId}</TableCell>
                        )}
                        {visibleColumns.includes("orderName") && (
                          <TableCell>{delivery.orderName}</TableCell>
                        )}
                        {visibleColumns.includes("status") && (
                          <TableCell>
                            <Badge className={getStatusBadgeColor(delivery.status)}>
                              {delivery.status}
                            </Badge>
                          </TableCell>
                        )}
                        {visibleColumns.includes("pickupTime") && (
                          <TableCell>{delivery.pickupTime}</TableCell>
                        )}
                        {visibleColumns.includes("dropoffTime") && (
                          <TableCell>{delivery.dropoffTime}</TableCell>
                        )}
                        {visibleColumns.includes("pickupLocation") && (
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.pickupLocation.name}</span>
                              <span className="text-muted-foreground text-xs">{delivery.pickupLocation.address}</span>
                            </div>
                          </TableCell>
                        )}
                        {visibleColumns.includes("dropoffLocation") && (
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.dropoffLocation.name}</span>
                              <span className="text-muted-foreground text-xs">{delivery.dropoffLocation.address}</span>
                            </div>
                          </TableCell>
                        )}
                        {visibleColumns.includes("price") && (
                          <TableCell className="text-right">{delivery.price}</TableCell>
                        )}
                        {visibleColumns.includes("tip") && (
                          <TableCell className="text-right">{delivery.tip}</TableCell>
                        )}
                        {visibleColumns.includes("fees") && (
                          <TableCell className="text-right">{delivery.fees}</TableCell>
                        )}
                        {visibleColumns.includes("courier") && (
                          <TableCell>{delivery.courier}</TableCell>
                        )}
                        {visibleColumns.includes("organization") && (
                          <TableCell>{delivery.organization}</TableCell>
                        )}
                        {visibleColumns.includes("distance") && (
                          <TableCell className="text-right">{delivery.distance}</TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Rows per page:</span>
                <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue>{rowsPerPage}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredDeliveries.length)} of {filteredDeliveries.length}
                </span>
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          isActive={currentPage === pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
