import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, User, Phone, Clock, Truck, DollarSign, CalendarClock, MessageSquare, ChevronDown, CreditCard, Package, Mail, Activity, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
}
export const OrderDetailsSheet = ({
  isOpen,
  onClose,
  delivery
}: OrderDetailsSheetProps) => {
  if (!delivery) return null;
  const [status, setStatus] = useState<string>(delivery.status);
  const [activeTab, setActiveTab] = useState<string>("order-info");
  const [activeLogTab, setActiveLogTab] = useState<string>("payment-transactions");
  const statuses: DeliveryStatus[] = ["Dropoff Complete", "Canceled By Customer", "Cancelled By Admin", "In Transit", "Picking Up", "Arrived For Pickup", "Scheduled Order", "Online", "Offline", "Busy", "Not approved", "Available", "On Break"];

  // Add back the missing function
  const getStatusBadgeVariant = (status: string): string => {
    switch (status) {
      case "Dropoff Complete":
        return "success";
      case "In Transit":
      case "Picking Up":
      case "Arrived For Pickup":
        return "default";
      case "Canceled By Customer":
      case "Cancelled By Admin":
        return "destructive";
      case "Scheduled Order":
      case "Not approved":
        return "warning";
      default:
        return "outline";
    }
  };

  // Get color for each status
  const getStatusColor = (statusOption: string): string => {
    switch (statusOption) {
      case "Dropoff Complete":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "In Transit":
      case "Picking Up":
      case "Arrived For Pickup":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Canceled By Customer":
      case "Cancelled By Admin":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Scheduled Order":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Online":
      case "Available":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Offline":
      case "On Break":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Busy":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Not approved":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  const handleStatusChange = (newStatus: DeliveryStatus) => {
    setStatus(newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };

  // Generate additional locations based on delivery ID
  const getAdditionalLocations = () => {
    // Use delivery ID to deterministically generate locations
    const locationSeed = delivery.id % 3; // 0, 1, or 2

    const additionalLocations = [{
      name: "Warehouse Storage",
      address: "1250 Industrial Blvd, Warehouse District, SF 94107",
      description: "Primary storage facility for dry goods",
      distance: "2.5 miles",
      status: "Completed",
      deliveredAt: "10:30 AM"
    }, {
      name: "Processing Center",
      address: "582 Tech Park Way, Innovation District, SF 94158",
      description: "Order verification and processing hub",
      distance: "1.8 miles",
      status: "In Progress",
      deliveredAt: "11:05 AM"
    }, {
      name: "Distribution Hub",
      address: "975 Logistics Avenue, Commerce Park, SF 94124",
      description: "Regional distribution center for all deliveries",
      distance: "3.2 miles",
      status: "Pending",
      deliveredAt: "11:30 AM"
    }, {
      name: "Temporary Holding",
      address: "342 Transit Road, Gateway Center, SF 94103",
      description: "Short-term storage for time-sensitive packages",
      distance: "1.5 miles",
      status: "Completed",
      deliveredAt: "10:45 AM"
    }, {
      name: "Dispatch Center",
      address: "127 Fleet Street, Transport Zone, SF 94110",
      description: "Main dispatch point for courier assignments",
      distance: "2.7 miles",
      status: "Pending",
      deliveredAt: "12:15 PM"
    }];

    // Show different number of additional locations based on delivery ID
    if (locationSeed === 0) {
      return []; // No additional locations
    } else if (locationSeed === 1) {
      return [additionalLocations[delivery.id % additionalLocations.length]]; // One additional location
    } else {
      // Two additional locations
      return [additionalLocations[delivery.id % additionalLocations.length], additionalLocations[(delivery.id + 2) % additionalLocations.length]];
    }
  };
  const additionalLocations = getAdditionalLocations();
  const hasAdditionalLocations = additionalLocations.length > 0;
  return <Sheet open={isOpen} onOpenChange={open => {
    if (!open) onClose();
  }}>
      <SheetContent className="sm:max-w-xl md:max-w-1xl lg:max-w-3xl w-full overflow-hidden p-0 pr-0 mr-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-left text-lg">Order #{delivery.packageId}</SheetTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className={cn(status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-200" : "", getStatusBadgeVariant(status) === "destructive" ? "bg-red-100 text-red-800 hover:bg-red-200" : "", getStatusBadgeVariant(status) === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "", getStatusBadgeVariant(status) === "default" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "", getStatusBadgeVariant(status) === "outline" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "", "rounded-md flex items-center gap-1 py-1 px-3 h-7 justify-between font-medium")}>
                    {status}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-1 bg-popover">
                  <div className="grid gap-1">
                    {statuses.map(statusOption => <Button key={statusOption} variant="ghost" size="sm" className={cn("justify-start text-left font-normal", statusOption === status ? "bg-accent text-accent-foreground" : "", getStatusColor(statusOption))} onClick={() => handleStatusChange(statusOption)}>
                        {statusOption}
                      </Button>)}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <SheetDescription className="text-left text-sm">
            May 6-Food pickup@11:18 AM Delivery time 11:45 AM [5K1-6U4] NORMAL
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="order-info" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mx-6 mb-2 mt-2 sticky top-0 z-10 bg-background">
            <TabsTrigger value="order-info">Order Info</TabsTrigger>
            <TabsTrigger value="order-logs">Order Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="order-info" className="m-0">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> 
                    Route
                  </h3>
                  <div className="rounded-md border bg-card/50 p-0">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[180px]">Locations</TableHead>
                          <TableHead className="w-[220px]">Description</TableHead>
                          <TableHead className="w-[100px]">Distance</TableHead>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead className="w-[120px]">Delivered At</TableHead>
                          <TableHead className="w-[80px]">Action 1</TableHead>
                          <TableHead className="w-[80px]">Action 2</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <p className="text-sm font-medium">{delivery.pickupLocation.name}</p>
                            <p className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">Pickup location for order items</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">0.0 miles</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{delivery.pickupTime}</p>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {hasAdditionalLocations && additionalLocations.map((location, index) => <TableRow key={index}>
                            <TableCell>
                              <p className="text-sm font-medium">{location.name}</p>
                              <p className="text-xs text-muted-foreground">{location.address}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{location.description}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{location.distance}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={location.status === "Completed" ? "bg-green-100 text-green-800" : location.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}>
                                {location.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{location.deliveredAt}</p>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <MapPin className="h-4 w-4" />
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>)}
                        
                        <TableRow>
                          <TableCell>
                            <p className="text-sm font-medium">{delivery.dropoffLocation.name}</p>
                            <p className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">Final destination for delivery</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{delivery.distance}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={status === "Dropoff Complete" ? "bg-green-100 text-green-800" : status === "In Transit" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}>
                              {status === "Dropoff Complete" ? "Completed" : status === "In Transit" ? "In Progress" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{delivery.dropoffTime}</p>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </h3>
                  <div className="rounded-md border bg-card/50 p-4 space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-xs text-muted-foreground mb-1">Pickup Time</h4>
                        <p className="text-sm font-medium">{delivery.pickupTime}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-muted-foreground mb-1">Dropoff Time</h4>
                        <p className="text-sm font-medium">{delivery.dropoffTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Customer
                  </h3>
                  <div className="rounded-md border bg-card/50 p-4">
                    <p className="text-sm font-medium">{delivery.customerName}</p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                      <MessageSquare className="w-3 h-3 mr-2" />
                      Message Customer
                    </Button>
                  </div>
                </div>
                
                {delivery.courier && <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Courier
                    </h3>
                    <div className="rounded-md border bg-card/50 p-4">
                      <p className="text-sm font-medium">{delivery.courier}</p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                        <Phone className="w-3 h-3 mr-2" />
                        Contact Courier
                      </Button>
                    </div>
                  </div>}
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Financial
                  </h3>
                  <div className="rounded-md border bg-card/50 p-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Base Price</p>
                      <p className="text-sm font-medium">{delivery.price}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Tip</p>
                      <p className="text-sm font-medium">{delivery.tip}</p>
                    </div>
                    {delivery.couriersEarnings && <div className="flex justify-between">
                        <p className="text-sm">Courier's Earnings</p>
                        <p className="text-sm font-medium">{delivery.couriersEarnings}</p>
                      </div>}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Notes
                  </h3>
                  <div className="rounded-md border bg-card/50 p-4">
                    <p className="text-sm">
                      {delivery.notes || "No notes available for this order."}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <CalendarClock className="w-4 h-4 mr-2" />
                    Order Details
                  </h3>
                  <div className="rounded-md border bg-card/50 p-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Organization</p>
                      <p className="text-sm font-medium">{delivery.organization}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Distance</p>
                      <p className="text-sm font-medium">{delivery.distance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="order-logs" className="m-0">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-6 px-[23px] pt-0">
                <Tabs defaultValue="payment-transactions" value={activeLogTab} onValueChange={setActiveLogTab}>
                  <div className="sticky top-0 z-10 bg-background pt-1 pb-2 min-h-[90px]">
                    <TabsList className="flex flex-wrap bg-transparent p-0 py-3 gap-1 justify-start w-full overflow-visible my-0">
                      <TabsTrigger value="payment-transactions" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <CreditCard className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Payment Transactions</span>
                        <span className="sm:hidden">Payments</span>
                      </TabsTrigger>
                      <TabsTrigger value="package-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <Package className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Package History</span>
                        <span className="sm:hidden">Package</span>
                      </TabsTrigger>
                      <TabsTrigger value="driver-control" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <Truck className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Driver Control</span>
                        <span className="sm:hidden">Driver</span>
                      </TabsTrigger>
                      <TabsTrigger value="mailing-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <Mail className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Mailing History</span>
                        <span className="sm:hidden">Mail</span>
                      </TabsTrigger>
                      <TabsTrigger value="chat-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <MessageSquare className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Chat History</span>
                        <span className="sm:hidden">Chat</span>
                      </TabsTrigger>
                      <TabsTrigger value="status-change-log" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                        <Activity className="w-4 h-4" /> 
                        <span className="hidden sm:inline">Status Change Log</span>
                        <span className="sm:hidden">Status</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <TabsContent value="payment-transactions" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Payment received</span>
                              <span className="text-sm text-green-600">${delivery.price}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Credit Card</span>
                              <span className="text-xs text-muted-foreground">Today, 10:45 AM</span>
                            </div>
                          </div>
                          <div className="border-b pb-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Tip added</span>
                              <span className="text-sm text-green-600">${delivery.tip}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Credit Card</span>
                              <span className="text-xs text-muted-foreground">Today, 10:50 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="package-history" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-blue-700">1</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Package received at pickup location</p>
                              <p className="text-xs text-muted-foreground">Today, 10:15 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-green-700">2</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Package in transit</p>
                              <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              <span className="text-xs font-medium text-green-700">3</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Package delivered to recipient</p>
                              <p className="text-xs text-muted-foreground">Today, 11:05 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="driver-control" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Driver assigned</span>
                            <span className="text-xs text-muted-foreground">Today, 10:05 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Driver arrived at pickup</span>
                            <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Driver in transit</span>
                            <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Driver arrived at dropoff</span>
                            <span className="text-xs text-muted-foreground">Today, 11:00 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Delivery confirmed</span>
                            <span className="text-xs text-muted-foreground">Today, 11:05 AM</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mailing-history" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <p className="text-sm font-medium">Order confirmation email</p>
                            <p className="text-xs text-muted-foreground">Sent to customer - Today, 10:00 AM</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm font-medium">Pickup notification</p>
                            <p className="text-xs text-muted-foreground">Sent to customer - Today, 10:15 AM</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Delivery confirmation</p>
                            <p className="text-xs text-muted-foreground">Sent to customer - Today, 11:05 AM</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="chat-history" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-3">
                          <div className="bg-muted rounded-lg p-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-medium">Driver</span>
                              <span className="text-xs text-muted-foreground">10:20 AM</span>
                            </div>
                            <p className="text-sm">I've arrived at the pickup location.</p>
                          </div>
                          
                          <div className="bg-primary/10 rounded-lg p-2 ml-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-medium">Customer</span>
                              <span className="text-xs text-muted-foreground">10:22 AM</span>
                            </div>
                            <p className="text-sm">Great! I'll be down in 2 minutes.</p>
                          </div>
                          
                          <div className="bg-muted rounded-lg p-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-medium">Driver</span>
                              <span className="text-xs text-muted-foreground">10:55 AM</span>
                            </div>
                            <p className="text-sm">I'm at the dropoff location now.</p>
                          </div>
                          
                          <div className="bg-primary/10 rounded-lg p-2 ml-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-medium">Customer</span>
                              <span className="text-xs text-muted-foreground">10:56 AM</span>
                            </div>
                            <p className="text-sm">Perfect timing! I'll meet you at the lobby.</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="status-change-log" className="space-y-4">
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Created</span>
                              <Badge variant="outline" className="text-xs">New Order</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">10:00 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Updated</span>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">Picking Up</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">10:15 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Updated</span>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">In Transit</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">10:30 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Updated</span>
                              <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">Dropoff Complete</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">11:05 AM</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>;
};