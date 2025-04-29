import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const EZcaterOrders = () => {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Sample data for eZcater orders
  const orders = [{
    id: "EZ-2023-001",
    customer: "Corporate Office Inc.",
    date: "2023-04-29",
    time: "12:30 PM",
    status: "pending",
    location: "Boston, MA",
    value: "$245.50",
    items: 12
  }, {
    id: "EZ-2023-002",
    customer: "Tech Startup LLC",
    date: "2023-04-29",
    time: "1:45 PM",
    status: "confirmed",
    location: "Cambridge, MA",
    value: "$189.75",
    items: 8
  }, {
    id: "EZ-2023-003",
    customer: "Downtown Law Firm",
    date: "2023-04-30",
    time: "11:15 AM",
    status: "in-transit",
    location: "Boston, MA",
    value: "$325.00",
    items: 15
  }, {
    id: "EZ-2023-004",
    customer: "Medical Conference Center",
    date: "2023-04-30",
    time: "12:00 PM",
    status: "delivered",
    location: "Worcester, MA",
    value: "$520.25",
    items: 24
  }, {
    id: "EZ-2023-005",
    customer: "University Department Meeting",
    date: "2023-05-01",
    time: "2:30 PM",
    status: "cancelled",
    location: "Cambridge, MA",
    value: "$175.00",
    items: 10
  }];
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "secondary";
      case "in-transit":
        return "default";
      case "delivered":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
  const handleViewOrder = (id: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for order ${id}`
    });
  };
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const statusOptions = ["pending", "confirmed", "in-transit", "delivered", "cancelled"];
  return <Layout>
      <div className="px-4 py-6 md:px-6 max-w-7xl ml-5 w-full overflow-x-hidden mx-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">eZcater Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all eZcater platform delivery orders
            </p>
          </div>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>

        <Card className="p-4 mt-6 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search orders by ID, customer, or location..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => <Badge key={status} variant={selectedStatus === status ? getStatusBadgeVariant(status) : "outline"} className="cursor-pointer capitalize" onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}>
                  {status.replace('-', ' ')}
                </Badge>)}
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{`${order.date} ${order.time}`}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleViewOrder(order.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>)}
                {filteredOrders.length === 0 && <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
                      No orders found matching your filters.
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Layout>;
};
export default EZcaterOrders;