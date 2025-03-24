import { useState, useEffect } from "react";
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
import { Columns, Download, Filter, Search, RotateCw } from "lucide-react";

type Delivery = {
  id: number;
  status: string;
  pickupTime: string;
  pickupLocation: {
    name: string;
    address: string;
  };
  dropoffTime: string;
  dropoffLocation: {
    name: string;
    address: string;
  };
  price: string;
  tip: string;
  fees: string;
  courier: string;
  organization: string;
  distance: string;
};

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const totalDeliveries = deliveries.length;
  const totalPages = Math.max(1, Math.ceil(totalDeliveries / rowsPerPage));
  
  // Calculated indexes for pagination
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentDeliveries = deliveries.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    const newRowsPerPage = parseInt(value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

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

  // Generate page links array for pagination
  const getPageLinks = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset with ellipsis
      if (currentPage <= 3) {
        // Current page is near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis indicator
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Current page is near the end
        pages.push(1);
        pages.push(-1); // Ellipsis indicator
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Current page is in the middle
        pages.push(1);
        pages.push(-1); // Ellipsis indicator
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis indicator
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col relative">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'} pb-20`}>
          <div className="animate-fade-in px-4 py-6">
            <div className="flex flex-col space-y-4">
              {/* Header and timezone */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Deliveries</h1>
                <span className="text-sm text-muted-foreground">All times are displayed using PDT timezone</span>
              </div>
              
              {/* Filters and actions row */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
                    <span>03/24/2025 12:00 AM - 03/24/2025 11:59 PM</span>
                  </Button>
                  
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
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Columns className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Table */}
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Status</TableHead>
                      <TableHead>Pickup Time</TableHead>
                      <TableHead>Pickup Location</TableHead>
                      <TableHead>Dropoff Time</TableHead>
                      <TableHead>Dropoff Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Tip</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Courier</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead className="text-right">Distance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDeliveries.length > 0 ? (
                      currentDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell>
                            <Badge 
                              variant={delivery.status === "Canceled By Customer" ? "destructive" : "outline"}
                              className={`${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
                            >
                              {delivery.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{delivery.pickupTime}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.pickupLocation.name}</span>
                              <span className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>{delivery.dropoffTime}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{delivery.dropoffLocation.name}</span>
                              <span className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</span>
                            </div>
                          </TableCell>
                          <TableCell>{delivery.price}</TableCell>
                          <TableCell>{delivery.tip}</TableCell>
                          <TableCell>{delivery.fees}</TableCell>
                          <TableCell>{delivery.courier}</TableCell>
                          <TableCell>{delivery.organization}</TableCell>
                          <TableCell className="text-right">{delivery.distance}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={11} className="h-24 text-center">
                          No deliveries found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
        
        {/* Fixed pagination footer */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-md z-10">
          <div className={`flex justify-between items-center p-4 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
            <div className="text-sm text-muted-foreground">
              Total <span className="bg-muted px-2 py-1 rounded">{totalDeliveries}</span> 
              {totalDeliveries > 0 && indexOfFirstItem !== indexOfLastItem && (
                <span className="ml-2">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalDeliveries)} of {totalDeliveries}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select 
                value={rowsPerPage.toString()} 
                onValueChange={handleRowsPerPageChange}
              >
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
                <span className="text-sm">Page {currentPage} of {totalPages}</span>
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(1); }}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
                    >
                      <span className="sr-only">First page</span>
                      ⟪
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {getPageLinks().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === -1 ? (
                        <span className="flex h-9 w-9 items-center justify-center">
                          …
                        </span>
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
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
    </ThemeProvider>
  );
};

export default Index;

