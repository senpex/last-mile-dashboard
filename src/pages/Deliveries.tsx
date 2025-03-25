
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface Delivery {
  id: string;
  packageId: string;
  status: "pending" | "in_transit" | "delivered" | "failed";
  origin: string;
  destination: string;
  estimatedDelivery: string;
  carrier: string;
}

// Sample data
const deliveries: Delivery[] = [
  {
    id: "DEL-001",
    packageId: "PKG-12345",
    status: "pending",
    origin: "New York, NY",
    destination: "San Francisco, CA",
    estimatedDelivery: "2023-11-15",
    carrier: "FedEx"
  },
  {
    id: "DEL-002",
    packageId: "PKG-67890",
    status: "in_transit",
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2023-11-12",
    carrier: "UPS"
  },
  {
    id: "DEL-003",
    packageId: "PKG-24680",
    status: "delivered",
    origin: "Boston, MA",
    destination: "Seattle, WA",
    estimatedDelivery: "2023-11-05",
    carrier: "USPS"
  },
  {
    id: "DEL-004",
    packageId: "PKG-13579",
    status: "failed",
    origin: "Miami, FL",
    destination: "Denver, CO",
    estimatedDelivery: "2023-11-08",
    carrier: "DHL"
  },
  {
    id: "DEL-005",
    packageId: "PKG-97531",
    status: "in_transit",
    origin: "Atlanta, GA",
    destination: "Phoenix, AZ",
    estimatedDelivery: "2023-11-14",
    carrier: "FedEx"
  },
  {
    id: "DEL-006",
    packageId: "PKG-86420",
    status: "pending",
    origin: "Dallas, TX",
    destination: "Portland, OR",
    estimatedDelivery: "2023-11-18",
    carrier: "UPS"
  },
  {
    id: "DEL-007",
    packageId: "PKG-75319",
    status: "delivered",
    origin: "Houston, TX",
    destination: "Minneapolis, MN",
    estimatedDelivery: "2023-11-03",
    carrier: "USPS"
  }
];

const DeliveriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>(deliveries);
  const itemsPerPage = 5;

  useEffect(() => {
    let result = deliveries;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(delivery => 
        delivery.packageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(delivery => delivery.status === statusFilter);
    }

    setFilteredDeliveries(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const renderStatusBadge = (status: Delivery["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "in_transit":
        return <Badge variant="warning">In Transit</Badge>;
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Delivery Tracking</h1>
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search by ID, origin, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Deliveries Table */}
      <Table>
        <TableCaption>A list of your deliveries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Package ID</TableHead>
            <TableHead>Delivery ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Origin</TableHead>
            <TableHead className="hidden md:table-cell">Destination</TableHead>
            <TableHead className="hidden md:table-cell">Est. Delivery</TableHead>
            <TableHead className="hidden lg:table-cell">Carrier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.packageId}</TableCell>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{renderStatusBadge(delivery.status)}</TableCell>
                <TableCell className="hidden md:table-cell">{delivery.origin}</TableCell>
                <TableCell className="hidden md:table-cell">{delivery.destination}</TableCell>
                <TableCell className="hidden md:table-cell">{delivery.estimatedDelivery}</TableCell>
                <TableCell className="hidden lg:table-cell">{delivery.carrier}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No deliveries found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      {filteredDeliveries.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDeliveries.length)} of {filteredDeliveries.length} deliveries
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                // Display current page and adjacent pages
                let pageToShow = currentPage;
                if (i === 0 && currentPage > 1) pageToShow = currentPage - 1;
                if (i === 2 && currentPage < totalPages) pageToShow = currentPage + 1;
                if (totalPages <= 3) pageToShow = i + 1;
                
                return (
                  <PaginationItem key={i}>
                    <Button
                      variant={pageToShow === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageToShow)}
                      className="w-9"
                    >
                      {pageToShow}
                    </Button>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DeliveriesPage;
