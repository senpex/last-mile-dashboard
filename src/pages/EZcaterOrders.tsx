
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { UserFiltersLayout } from "@/components/users/UserFiltersLayout";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { 
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

const mockOrders = [
  {
    id: "EZ-1001",
    customerName: "Acme Corp",
    deliveryDate: "2025-04-30",
    status: "new",
    amount: "$245.50",
    items: 12
  },
  {
    id: "EZ-1002",
    customerName: "Globex Industries",
    deliveryDate: "2025-04-30",
    status: "processing",
    amount: "$189.75",
    items: 8
  },
  {
    id: "EZ-1003",
    customerName: "Stark Enterprises",
    deliveryDate: "2025-05-01",
    status: "ready",
    amount: "$312.25",
    items: 15
  },
  {
    id: "EZ-1004",
    customerName: "Wayne Industries",
    deliveryDate: "2025-05-02",
    status: "delivered",
    amount: "$178.00",
    items: 7
  },
  {
    id: "EZ-1005",
    customerName: "Daily Planet",
    deliveryDate: "2025-05-01",
    status: "cancelled",
    amount: "$95.30",
    items: 4
  }
];

const EZcaterOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "processing": return "secondary";
      case "ready": return "warning"; // Changed from "blue" to "warning"
      case "delivered": return "success";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneInfo = `Current timezone: ${currentTimezone}`;

  return (
    <Layout>
      <UserFiltersLayout
        title="eZcater Orders"
        timezoneInfo={timezoneInfo}
        filterControls={
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export
            </Button>
          </div>
        }
        searchControls={
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search orders..."
            className="w-[250px]"
          />
        }
      />

      <div className="p-4">
        <UsersTableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </UsersTableContainer>
      </div>
    </Layout>
  );
};

export default EZcaterOrders;
