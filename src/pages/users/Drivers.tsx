
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableContainer,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Copy, Edit, Trash, Mail, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import CourierChat from "@/components/chat/CourierChat";

const Drivers = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Gary Burton",
      email: "gary.burton@example.com",
      phone: "555-123-4567",
      status: "Active",
      location: "Bentonville, AR",
    },
    {
      id: 2,
      name: "Laura Ramirez",
      email: "laura.ramirez@example.com",
      phone: "555-987-6543",
      status: "Inactive",
      location: "Rogers, AR",
    },
    {
      id: 3,
      name: "Michael Groves",
      email: "michael.groves@example.com",
      phone: "555-246-8013",
      status: "Active",
      location: "Fayetteville, AR",
    },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const filteredDrivers = drivers.filter((driver) => {
    const searchRegex = new RegExp(search, "i");
    const statusMatch = statusFilter ? driver.status === statusFilter : true;
    return (
      searchRegex.test(driver.name) &&
      statusMatch
    );
  });

  const pageCount = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const handleChatOpen = (courierName) => {
    setSelectedCourier(courierName);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setSelectedCourier(null);
  };

  const getPageNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= pageCount; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <Input
          type="search"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-[200px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="w-[200px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="w-[150px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
              <th className="w-[100px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="w-[150px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
              <th className="w-[180px] h-12 px-4 text-left align-middle font-medium text-muted-foreground">Organization</th>
              <th className="w-[100px] h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedDrivers.map((driver) => (
              <tr key={driver.id} className="bg-card hover:bg-muted/50 transition-colors">
                <td className="p-4 align-middle font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 mr-2 flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${driver.id}`} />
                        <AvatarFallback>{driver.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="truncate">{driver.name}</span>
                  </div>
                </td>
                <td className="p-4 align-middle truncate">{driver.email}</td>
                <td className="p-4 align-middle">{driver.phone}</td>
                <td className="p-4 align-middle">
                  <Badge
                    variant={driver.status === "Active" ? "outline" : "secondary"}
                  >
                    {driver.status}
                  </Badge>
                </td>
                <td className="p-4 align-middle truncate">{driver.location}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center space-x-1">
                    <span className="truncate max-w-[140px]">Walmart Inc.</span>
                    <div className="flex-shrink-0 w-4 h-4">
                      <MessageCircle size={16} className="text-blue-500" />
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleChatOpen(driver.name)}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy info
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit driver
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete driver
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
          <SelectTrigger className="w-[75px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {getPageNumbers().map((pageNum, i) => (
              <PaginationItem key={i}>
                {pageNum === -1 || pageNum === -2 ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pageNum === page}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(page + 1)}
                className={page === pageCount ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {chatOpen && selectedCourier && (
        <CourierChat
          open={chatOpen}
          onClose={handleChatClose}
          courierName={selectedCourier}
        />
      )}
    </div>
  );
};

export default Drivers;
