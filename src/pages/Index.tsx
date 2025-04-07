
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CourierChat from "@/components/chat/CourierChat";
import { useDeliveries } from "@/hooks/useDeliveries";

const Index = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<string | null>(null);
  const [customer, setCustomer] = useState<string | null>(null);
  const [courier, setCourier] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [sort, setSort] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState<string>("");
  
  const [customersWithMessages, setCustomersWithMessages] = useState<string[]>([]);
  const [couriersWithMessages, setCouriersWithMessages] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<'courier' | 'customer'>('courier');

  // Get deliveries from our hook
  const { filteredDeliveries } = useDeliveries();

  // Filter and sort the deliveries based on current filters
  const currentDeliveries = React.useMemo(() => {
    let filtered = [...filteredDeliveries];

    // Apply filters
    if (status) {
      filtered = filtered.filter(d => d.status === status);
    }

    if (customer) {
      filtered = filtered.filter(d => d.dropoffLocation.name === customer);
    }

    if (courier) {
      filtered = filtered.filter(d => d.courier === courier);
    }

    if (date?.from) {
      filtered = filtered.filter(d => {
        const deliveryDate = new Date(d.pickupTime);
        return date.from && deliveryDate >= date.from && (!date.to || deliveryDate <= date.to);
      });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(d => 
        d.packageId.toLowerCase().includes(searchLower) ||
        d.orderName.toLowerCase().includes(searchLower) ||
        d.courier.toLowerCase().includes(searchLower) ||
        d.dropoffLocation.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sort) {
      filtered.sort((a, b) => {
        const aValue = a[sort as keyof typeof a];
        const bValue = b[sort as keyof typeof b];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return 0;
      });
    }

    return filtered.slice((page - 1) * per_page, page * per_page);
  }, [filteredDeliveries, status, customer, courier, date, search, sort, sortDirection, page, per_page]);

  const totalDeliveries = filteredDeliveries.length;

  const [columns] = React.useState([
    { id: "id", label: "ID" },
    { id: "packageId", label: "Package ID" },
    { id: "customerName", label: "Customer Name" },
    { id: "courier", label: "Courier" },
    { id: "status", label: "Status" },
    { id: "pickupTime", label: "Pickup Time" },
    { id: "dropoffTime", label: "Dropoff Time" },
    { id: "price", label: "Price" },
  ]);

  const [visibleColumns, setVisibleColumns] = React.useState([
    "id",
    "packageId",
    "customerName",
    "courier",
    "status",
    "pickupTime",
    "dropoffTime",
    "price",
  ]);

  useEffect(() => {
    // Randomly select 30% of records to have message icons
    const randomCustomers = filteredDeliveries
      .filter(d => d.dropoffLocation?.name)
      .filter(() => Math.random() < 0.3)
      .map(d => d.dropoffLocation.name);
    
    const randomCouriers = filteredDeliveries
      .filter(d => d.courier)
      .filter(() => Math.random() < 0.3)
      .map(d => d.courier);
    
    setCustomersWithMessages(Array.from(new Set(randomCustomers)));
    setCouriersWithMessages(Array.from(new Set(randomCouriers)));
  }, [filteredDeliveries]);

  // Available statuses
  const statuses = [
    "pending",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
    "Dropoff Complete",
    "Canceled By Customer",
    "In Transit",
    "Arrived For Pickup",
    "Picking Up",
    "Recipient Unavailable",
    "Draft Order",
    "Paid Order",
    "Courier Selected",
    "Item Not Given",
    "Reported Order",
    "Waiting For Pay",
    "Cancelled By Admin",
    "Scheduled Order",
    "Repeated Order",
    "Forgot",
    "Started Working",
    "Accepted Repeated Order"
  ];

  // Get unique customers
  const customers = React.useMemo(() => {
    return Array.from(
      new Set(filteredDeliveries.map(d => d.dropoffLocation?.name).filter(Boolean))
    );
  }, [filteredDeliveries]);

  // Get unique couriers
  const couriers = React.useMemo(() => {
    return Array.from(
      new Set(filteredDeliveries.map(d => d.courier).filter(Boolean))
    );
  }, [filteredDeliveries]);

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatus(value || null);
  };

  const handleCustomerChange = (value: string) => {
    setPage(1);
    setCustomer(value || null);
  };

  const handleCourierChange = (value: string) => {
    setPage(1);
    setCourier(value || null);
  };

  const handleDateChange = (value: DateRange | undefined) => {
    setPage(1);
    setDate(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPage(1);
    setPerPage(newPerPage);
  };

  const handleSortChange = (column: string) => {
    setPage(1);
    if (sort === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleChatOpen = (person: string, mode: 'courier' | 'customer') => {
    setSelectedPerson(person);
    setChatMode(mode);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setSelectedPerson(null);
  };

  // Calculate stats for cards
  const totalRevenue = React.useMemo(() => {
    return filteredDeliveries.reduce((sum, delivery) => {
      const price = parseFloat(delivery.price.replace('$', '')) || 0;
      return sum + price;
    }, 0).toFixed(2);
  }, [filteredDeliveries]);

  const averageDeliveryTime = "2.5 hours";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-w-xs flex-col gap-y-5 overflow-y-auto border-r bg-secondary px-6 pb-4">
          <div className="flex h-16 items-center">
            <h2 className="text-lg font-semibold">Delivery App</h2>
          </div>
          <ul className="mt-6 space-y-1">
            <li>
              <Button variant="ghost" className="justify-start w-full">
                Overview
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="justify-start w-full">
                Customers
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="justify-start w-full">
                Settings
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <h1 className="text-xl font-semibold">Deliveries</h1>
          <span className="text-sm text-muted-foreground">
            {totalDeliveries} total deliveries
          </span>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${totalRevenue}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalDeliveries}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Delivery Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageDeliveryTime}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={status || ""} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={customer || ""} onValueChange={handleCustomerChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={courier || ""} onValueChange={handleCourierChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by courier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {couriers.map((courier) => (
                    <SelectItem key={courier} value={courier}>
                      {courier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !date?.from && !date?.to && "text-muted-foreground"
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "LLL dd, y")} - ${format(
                          date.to,
                          "LLL dd, y"
                        )}`
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                  side="bottom"
                >
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleDateChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search deliveries..."
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="rounded-md border mt-6">
            <ScrollArea orientation="horizontal">
              <Table>
                <TableHeader className="bg-muted/50">
                  {columns.map((column) => {
                    if (!visibleColumns.includes(column.id)) {
                      return null;
                    }
                    return (
                      <TableHead key={column.id}>
                        <Button
                          variant="ghost"
                          onClick={() => handleSortChange(column.id)}
                          className="flex items-center"
                        >
                          <span>{column.label}</span>
                          {sort === column.id && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </Button>
                      </TableHead>
                    );
                  })}
                </TableHeader>
                <TableBody>
                  {currentDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      {columns.map((column) => {
                        if (!visibleColumns.includes(column.id)) {
                          return null;
                        }
                        
                        if (column.id === "customerName") {
                          const customerName = delivery.dropoffLocation?.name;
                          const hasMessage = customersWithMessages.includes(customerName);
                          
                          return (
                            <TableCell 
                              key={column.id} 
                              hasMessage={hasMessage}
                              onMessageClick={() => handleChatOpen(customerName, 'customer')}
                            >
                              {customerName}
                            </TableCell>
                          );
                        }
                        
                        if (column.id === "courier") {
                          const courierName = delivery.courier;
                          const hasMessage = couriersWithMessages.includes(courierName);
                          
                          return (
                            <TableCell 
                              key={column.id}
                              hasMessage={hasMessage && !!courierName}
                              onMessageClick={courierName ? () => handleChatOpen(courierName, 'courier') : undefined}
                            >
                              {courierName || "—"}
                            </TableCell>
                          );
                        }
                        
                        // For all other columns
                        if (column.id === "id") {
                          return <TableCell key={column.id}>{delivery.id}</TableCell>;
                        } else {
                          const value = delivery[column.id as keyof typeof delivery];
                          return <TableCell key={column.id}>{value || "—"}</TableCell>;
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {(page - 1) * per_page + 1} to {Math.min(page * per_page, totalDeliveries)} of {totalDeliveries} entries
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={String(per_page)}
                  onValueChange={(value) => handlePerPageChange(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={per_page} />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={String(pageSize)}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    className={cn(page === 1 && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, Math.ceil(totalDeliveries / per_page)) }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {Math.ceil(totalDeliveries / per_page) > 5 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(Math.ceil(totalDeliveries / per_page), page + 1))}
                    className={cn(page >= Math.ceil(totalDeliveries / per_page) && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
              </PaginationContent>
            </div>
          </div>
        </div>
      </div>
      
      {chatOpen && selectedPerson && (
        <CourierChat 
          open={chatOpen} 
          courierName={selectedPerson} 
          onClose={handleChatClose} 
          hasUnreadMessages={true} 
        />
      )}
    </div>
  );
};

export default Index;
