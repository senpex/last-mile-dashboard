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
import { Label } from "@/components/ui/label";
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
import { ChevronDown, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Copy, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  getDeliveries,
  getDeliveryStats,
  getCustomers,
  getCouriers,
} from "@/lib/api";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SkeletonCard } from "@/components/skeleton-card";
import { SkeletonTable } from "@/components/skeleton-table";
import { SkeletonTotalRevenue } from "@/components/skeleton-total-revenue";
import { SkeletonLatestSales } from "@/components/skeleton-latest-sales";
import { SkeletonTasks } from "@/components/skeleton-tasks";
import { SkeletonBarChart } from "@/components/skeleton-bar-chart";
import { SkeletonLineChart } from "@/components/skeleton-line-chart";
import { SkeletonDoughnutChart } from "@/components/skeleton-doughnut-chart";
import { SkeletonRadarChart } from "@/components/skeleton-radar-chart";
import { SkeletonPieChart } from "@/components/skeleton-pie-chart";
import { SkeletonScatterChart } from "@/components/skeleton-scatter-chart";
import { SkeletonTreeMap } from "@/components/skeleton-tree-map";
import { SkeletonComposedChart } from "@/components/skeleton-composed-chart";
import { SkeletonFunnelChart } from "@/components/skeleton-funnel-chart";
import { SkeletonGaugeChart } from "@/components/skeleton-gauge-chart";
import { SkeletonRadialBarChart } from "@/components/skeleton-radial-bar-chart";
import { SkeletonSankeyChart } from "@/components/skeleton-sankey-chart";
import { SkeletonStreamGraph } from "@/components/skeleton-stream-graph";
import { SkeletonSunburstChart } from "@/components/skeleton-sunburst-chart";
import { SkeletonHeatMap } from "@/components/skeleton-heat-map";
import { SkeletonCalendarChart } from "@/components/skeleton-calendar-chart";
import { SkeletonWordCloud } from "@/components/skeleton-word-cloud";
import { SkeletonChordDiagram } from "@/components/skeleton-chord-diagram";
import { SkeletonNetworkGraph } from "@/components/skeleton-network-graph";
import { SkeletonParallelCoordinates } from "@/components/skeleton-parallel-coordinates";
import { SkeletonBoxPlotChart } from "@/components/skeleton-box-plot-chart";
import { SkeletonBulletChart } from "@/components/skeleton-bullet-chart";
import { SkeletonSparklineChart } from "@/components/skeleton-sparkline-chart";
import { SkeletonBrushChart } from "@/components/skeleton-brush-chart";
import { SkeletonZoomableChart } from "@/components/skeleton-zoomable-chart";
import { SkeletonVoronoiChart } from "@/components/skeleton-voronoi-chart";
import { SkeletonPolarChart } from "@/components/skeleton-polar-chart";
import { SkeletonRadarGrid } from "@/components/skeleton-radar-grid";
import { SkeletonRadarPolarGrid } from "@/components/skeleton-radar-polar-grid";
import { SkeletonReferenceLine } from "@/components/skeleton-reference-line";
import { SkeletonReferenceArea } from "@/components/skeleton-reference-area";
import { SkeletonReferenceDot } from "@/components/skeleton-reference-dot";
import { SkeletonLabel } from "@/components/skeleton-label";
import { SkeletonLegend } from "@/components/skeleton-legend";
import { SkeletonAxis } from "@/components/skeleton-axis";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { SkeletonTooltip } from "@/components/skeleton-tooltip";
import { SkeletonCrosshair } from "@/components/skeleton-crosshair";
import { SkeletonCartesianAxis } from "@/components/skeleton-cartesian-axis";
import { SkeletonPolarAngleAxis } from "@/components/skeleton-polar-angle-axis";
import { SkeletonPolarRadiusAxis } from "@/components/skeleton-polar-radius-axis";
import { SkeletonCustomShape } from "@/components/skeleton-custom-shape";
import { SkeletonCustomContent } from "@/components/skeleton-custom-content";
import { SkeletonCustomLabel } from "@/components/skeleton-custom-label";
import { SkeletonCustomLegend } from "@/components/skeleton-custom-legend";
import { SkeletonCustomTooltip } from "@/components/skeleton-custom-tooltip";
import { SkeletonCustomAxis } from "@/components/skeleton-custom-axis";
import { SkeletonCustomGrid } from "@/components/skeleton-custom-grid";
import { SkeletonCustomReferenceLine } from "@/components/skeleton-custom-reference-line";
import { SkeletonCustomReferenceArea } from "@/components/skeleton-custom-reference-area";
import { SkeletonCustomReferenceDot } from "@/components/skeleton-custom-reference-dot";
import { SkeletonCustomCrosshair } from "@/components/skeleton-custom-crosshair";
import { SkeletonCustomCartesianAxis } from "@/components/skeleton-custom-cartesian-axis";
import { SkeletonCustomPolarAngleAxis } from "@/components/skeleton-custom-polar-angle-axis";
import { SkeletonCustomPolarRadiusAxis } from "@/components/skeleton-custom-polar-radius-axis";
import CourierChat from "@/components/chat/CourierChat";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();

  const [status, setStatus] = React.useState<string | null>(
    searchParams.get("status")
  );
  const [customer, setCustomer] = React.useState<string | null>(
    searchParams.get("customer")
  );
  const [courier, setCourier] = React.useState<string | null>(
    searchParams.get("courier")
  );
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from") as string)
      : undefined,
    to: searchParams.get("to")
      ? new Date(searchParams.get("to") as string)
      : undefined,
  });
  const [page, setPage] = React.useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );
  const [per_page, setPerPage] = React.useState(
    searchParams.get("per_page") ? Number(searchParams.get("per_page")) : 10
  );
  const [sort, setSort] = React.useState<string | null>(
    searchParams.get("sort")
  );
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    searchParams.get("sortDirection") === "asc" ? "asc" : "desc"
  );
  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [customersWithMessages, setCustomersWithMessages] = useState<string[]>([]);
  const [couriersWithMessages, setCouriersWithMessages] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<'courier' | 'customer'>('courier');

  const [open, setOpen] = React.useState(false);
  const session = getKindeServerSession();
  const kindeUser = session.getUser();

  const {
    data: deliveriesData,
    isLoading,
    isError,
  } = useQuery(
    [
      "deliveries",
      page,
      per_page,
      sort,
      sortDirection,
      debouncedSearch,
      status,
      customer,
      courier,
      date?.from,
      date?.to,
    ],
    () =>
      getDeliveries(
        page,
        per_page,
        sort,
        sortDirection,
        debouncedSearch,
        status,
        customer,
        courier,
        date?.from,
        date?.to
      )
  );

  const { data: stats } = useQuery(["stats"], () => getDeliveryStats());
  const { data: customers } = useQuery(["customers"], () => getCustomers());
  const { data: couriers } = useQuery(["couriers"], () => getCouriers());

  const deliveries = deliveriesData?.data || [];
  const total = deliveriesData?.total || 0;

  const [columns] = React.useState([
    {
      id: "id",
      label: "ID",
    },
    {
      id: "customerName",
      label: "Customer Name",
    },
    {
      id: "courier",
      label: "Courier",
    },
    {
      id: "city",
      label: "City",
    },
    {
      id: "status",
      label: "Status",
    },
    {
      id: "deliveryDate",
      label: "Delivery Date",
    },
    {
      id: "total",
      label: "Total",
    },
  ]);

  const [visibleColumns, setVisibleColumns] = React.useState([
    "id",
    "customerName",
    "courier",
    "city",
    "status",
    "deliveryDate",
    "total",
  ]);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (customer) {
      params.append("customer", customer);
    }
    if (courier) {
      params.append("courier", courier);
    }
    if (date?.from) {
      params.append("from", date.from.toISOString());
    }
    if (date?.to) {
      params.append("to", date.to.toISOString());
    }
    if (page) {
      params.append("page", page.toString());
    }
    if (per_page) {
      params.append("per_page", per_page.toString());
    }
    if (sort) {
      params.append("sort", sort);
    }
    if (sortDirection) {
      params.append("sortDirection", sortDirection);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [status, customer, courier, date, page, per_page, sort, sortDirection]);

  const statuses = [
    "pending",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ];

  const currentDeliveries = deliveries;

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatus(value);
  };

  const handleCustomerChange = (value: string) => {
    setPage(1);
    setCustomer(value);
  };

  const handleCourierChange = (value: string) => {
    setPage(1);
    setCourier(value);
  };

  const handleDateChange = (value: DateRange | undefined) => {
    setPage(1);
    setDate(value);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerPageChange = (per_page: number) => {
    setPage(1);
    setPerPage(per_page);
  };

  const handleSortChange = (sort: string) => {
    setPage(1);
    if (sort === "deliveryDate") {
      setSort(sort);
    } else {
      setSort(sort);
    }
  };

  const handleSortDirectionChange = () => {
    setPage(1);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (search: string) => {
    setPage(1);
    setSearch(search);
  };

  useEffect(() => {
    const randomCustomers = deliveries
      .filter(d => d.customerName)
      .filter(() => Math.random() < 0.3)
      .map(d => d.customerName);
    
    const randomCouriers = deliveries
      .filter(d => d.courier)
      .filter(() => Math.random() < 0.3)
      .map(d => d.courier);
    
    setCustomersWithMessages(Array.from(new Set(randomCustomers)));
    setCouriersWithMessages(Array.from(new Set(randomCouriers)));
  }, []);

  const handleChatOpen = (person: string, mode: 'courier' | 'customer') => {
    setSelectedPerson(person);
    setChatMode(mode);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setSelectedPerson(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-w-xs flex-col gap-y-5 overflow-y-auto border-r bg-secondary px-6 pb-4">
          <ul className="mt-6 space-y-1">
            <li>
              <Button variant="ghost" className="justify-start">
                Overview
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="justify-start">
                Customers
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="justify-start">
                Settings
              </Button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          label="Deliveries"
          total={deliveriesData?.total || 0}
        />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="text-2xl font-bold">
                    ${stats.totalRevenue}
                  </div>
                ) : (
                  <SkeletonTotalRevenue />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="text-2xl font-bold">
                    {stats.totalDeliveries}
                  </div>
                ) : (
                  <SkeletonCard />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Delivery Time</CardTitle>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="text-2xl font-bold">
                    {stats.averageDeliveryTime}
                  </div>
                ) : (
                  <SkeletonCard />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                {customers ? (
                  <div className="text-2xl font-bold">{customers.length}</div>
                ) : (
                  <SkeletonCard />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={status} onValueChange={handleStatusChange}>
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

              <Select value={customer} onValueChange={handleCustomerChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {customers?.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={courier} onValueChange={handleCourierChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by courier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {couriers?.map((courier) => (
                    <SelectItem key={courier.id} value={courier.id}>
                      {courier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover open={open} onOpenChange={setOpen}>
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
                    disabled={{ from: new Date(2020, 1, 1) }}
                    numberOfMonths={2}
                    pagedNavigation
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
                        >
                          <span>{column.label}</span>
                          {sort === column.id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="ml-2 h-4 w-4"
                            >
                              {sortDirection === "asc" ? (
                                <>
                                  <path d="M5 12V3M19 12V3" />
                                  <path d="M5 19H19" />
                                </>
                              ) : (
                                <>
                                  <path d="M5 12v9M19 12v9" />
                                  <path d="M5 5H19" />
                                </>
                              )}
                            </svg>
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
                        switch (column.id) {
                          case "id":
                            return <TableCell key={column.id}>{delivery.id}</TableCell>;
                          
                          case "customerName":
                            return (
                              <TableCell 
                                key={column.id}
                                hasMessage={customersWithMessages.includes(delivery.customerName)}
                                onMessageClick={() => handleChatOpen(delivery.customerName, 'customer')}
                              >
                                {delivery.customerName}
                              </TableCell>
                            );
                          
                          case "courier":
                            return (
                              <TableCell 
                                key={column.id}
                                hasMessage={couriersWithMessages.includes(delivery.courier)}
                                onMessageClick={() => handleChatOpen(delivery.courier, 'courier')}
                              >
                                {delivery.courier}
                              </TableCell>
                            );
                          
                          default:
                            return <TableCell key={column.id}>{delivery[column.id]}</TableCell>;
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <Pagination
              page={page}
              per_page={per_page}
              total={total}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
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
