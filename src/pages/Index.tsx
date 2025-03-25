
import { useState, useMemo } from "react";
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
import { Columns, Download, Filter, RotateCw, Search, Globe } from "lucide-react";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-03-24T00:00:00"),
    to: new Date("2025-03-24T23:59:59")
  });
  const [currentTimeZone, setCurrentTimeZone] = useState<string>("America/Los_Angeles");
  
  // Common timezones
  const timeZones = [
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Anchorage", label: "Alaska Time" },
    { value: "Pacific/Honolulu", label: "Hawaii Time" },
    { value: "Europe/London", label: "GMT/UTC" },
    { value: "Europe/Paris", label: "Central European Time" },
    { value: "Asia/Tokyo", label: "Japan Standard Time" },
    { value: "Asia/Shanghai", label: "China Standard Time" },
    { value: "Asia/Kolkata", label: "India Standard Time" },
    { value: "Australia/Sydney", label: "Australian Eastern Time" },
  ];
  
  // Get timezone display text
  const getTimeZoneDisplayText = () => {
    const zone = timeZones.find(tz => tz.value === currentTimeZone);
    return zone ? zone.label : currentTimeZone;
  };
  
  const availableColumns: ColumnOption[] = [
    { id: "status", label: "Status", default: true },
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
  
  const deliveries = [
    {
      id: 1,
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Dropoff Complete":
        return "success";
      case "Canceled By Customer":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          <div className="animate-fade-in px-4 py-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Deliveries</h1>
                <span className="text-sm text-muted-foreground">
                  All times are displayed using {getTimeZoneDisplayText()} timezone
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
                    />
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9" title="Change timezone">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] p-2">
                      <div className="text-sm font-medium mb-2">Select Timezone</div>
                      <Select value={currentTimeZone} onValueChange={setCurrentTimeZone}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((timezone) => (
                            <SelectItem key={timezone.value} value={timezone.value} className="text-xs">
                              {timezone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  
                  <ColumnSelector 
                    columns={availableColumns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                  />
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {visibleColumns.includes("status") && (
                        <TableHead className="w-[140px]">Status</TableHead>
                      )}
                      {visibleColumns.includes("pickupTime") && (
                        <TableHead>Pickup Time</TableHead>
                      )}
                      {visibleColumns.includes("pickupLocation") && (
                        <TableHead>Pickup Location</TableHead>
                      )}
                      {visibleColumns.includes("dropoffTime") && (
                        <TableHead>Dropoff Time</TableHead>
                      )}
                      {visibleColumns.includes("dropoffLocation") && (
                        <TableHead>Dropoff Location</TableHead>
                      )}
                      {visibleColumns.includes("price") && (
                        <TableHead>Price</TableHead>
                      )}
                      {visibleColumns.includes("tip") && (
                        <TableHead>Tip</TableHead>
                      )}
                      {visibleColumns.includes("fees") && (
                        <TableHead>Fees</TableHead>
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
                    {deliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        {visibleColumns.includes("status") && (
                          <TableCell>
                            <Badge 
                              variant={delivery.status === "Canceled By Customer" ? "destructive" : "outline"}
                              className={`${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
                            >
                              {delivery.status}
                            </Badge>
                          </TableCell>
                        )}
                        {visibleColumns.includes("pickupTime") && (
                          <TableCell>{delivery.pickupTime}</TableCell>
                        )}
                        {visibleColumns.includes("pickupLocation") && (
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.pickupLocation.name}</span>
                              <span className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</span>
                            </div>
                          </TableCell>
                        )}
                        {visibleColumns.includes("dropoffTime") && (
                          <TableCell>{delivery.dropoffTime}</TableCell>
                        )}
                        {visibleColumns.includes("dropoffLocation") && (
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.dropoffLocation.name}</span>
                              <span className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</span>
                            </div>
                          </TableCell>
                        )}
                        {visibleColumns.includes("price") && (
                          <TableCell>{delivery.price}</TableCell>
                        )}
                        {visibleColumns.includes("tip") && (
                          <TableCell>{delivery.tip}</TableCell>
                        )}
                        {visibleColumns.includes("fees") && (
                          <TableCell>{delivery.fees}</TableCell>
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
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Total <span className="bg-muted px-2 py-1 rounded">{deliveries.length}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page</span>
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
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Page 1 of 1</span>
                  </div>
                  
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
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
