import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, User, Phone, Clock, Truck, DollarSign, CalendarClock, MessageSquare, ChevronDown, CreditCard, Package, Mail, Activity, ListOrdered, Edit, Trash2, Map, Settings, Save, Send, Check, CheckCircle, RefreshCw, Timer, Bell, Filter, Plus, AlignLeft, Download, Upload, Printer, Share, Flag, PenTool, Search, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OrderMap } from "@/components/communication/OrderMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
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
      <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
        {/* Main Content with Flex Structure - ReOrdered to show content first, then fixed controls */}
        <div className="flex-1 overflow-hidden flex flex-col">
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
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="order-info" className="m-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="p-6 space-y-6 pb-96">
                    {/* Increased padding-bottom significantly to push content up and ensure Order Details section is fully visible */}
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
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-2" /> 
                          Route
                        </h3>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-8" onClick={() => setIsMapDialogOpen(true)}>
                          <Map className="h-4 w-4" />
                          View Map
                        </Button>
                      </div>
                      <div className="rounded-md border bg-card/50 p-0">
                        <Table>
                          <TableHeader className="bg-muted/50">
                            <TableRow>
                              <TableHead className="w-[180px]">Locations</TableHead>
                              <TableHead className="w-[180px]">Contact</TableHead>
                              <TableHead className="w-[220px]">Description</TableHead>
                              <TableHead className="w-[100px]">Distance</TableHead>
                              <TableHead className="w-[100px]">Status</TableHead>
                              <TableHead className="w-[120px]">Delivered At</TableHead>
                              <TableHead className="w-[100px]">Action 1</TableHead>
                              <TableHead className="w-[100px]">Action 2</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="flex flex-col">
                                  <Badge variant="outline" className="mb-1 w-fit bg-blue-100 text-blue-800 border-blue-200">Pickup point</Badge>
                                  <p className="text-sm font-medium">{delivery.pickupLocation.name}</p>
                                  <p className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm font-medium">John Smith</p>
                                <p className="text-xs text-muted-foreground flex items-center">
                                  <Phone className="h-3 w-3 mr-1" /> (415) 555-1234
                                </p>
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
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                            
                            {hasAdditionalLocations && additionalLocations.map((location, index) => <TableRow key={index}>
                                <TableCell>
                                  <p className="text-sm font-medium">{location.name}</p>
                                  <p className="text-xs text-muted-foreground">{location.address}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-sm font-medium">Staff Member {index + 1}</p>
                                  <p className="text-xs text-muted-foreground flex items-center">
                                    <Phone className="h-3 w-3 mr-1" /> (415) 555-{5000 + index}
                                  </p>
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
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>)}
                            
                            <TableRow>
                              <TableCell>
                                <div className="flex flex-col">
                                  <Badge variant="outline" className="mb-1 w-fit bg-green-100 text-green-800 border-green-200">Dropoff point</Badge>
                                  <p className="text-sm font-medium">{delivery.dropoffLocation.name}</p>
                                  <p className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm font-medium">{delivery.customerName}</p>
                                <p className="text-xs text-muted-foreground flex items-center">
                                  <Phone className="h-3 w-3 mr-1" /> (415) 555-9876
                                </p>
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
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
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
                      <div className="rounded-md border bg-card/50 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                          <div className="w-full">
                            <h4 className="text-xs text-muted-foreground mb-2">Pickup Window</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">Start:</span> {delivery.pickupTime}
                              <span className="font-medium ml-4">End:</span> 
                              {/* Simulate end time 30 minutes after pickup time */}
                              {delivery.pickupTime.replace(/:(\d\d)/, (match, minutes) => {
                              const mins = parseInt(minutes) + 30;
                              return `:${mins >= 60 ? (mins - 60).toString().padStart(2, '0') : mins.toString().padStart(2, '0')}`;
                            })}
                            </div>
                          </div>
                          
                          <div className="w-full">
                            <h4 className="text-xs text-muted-foreground mb-2">Dropoff Window</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">Start:</span> {delivery.dropoffTime}
                              <span className="font-medium ml-4">End:</span>
                              {/* Simulate end time 30 minutes after dropoff time */}
                              {delivery.dropoffTime.replace(/:(\d\d)/, (match, minutes) => {
                              const mins = parseInt(minutes) + 30;
                              return `:${mins >= 60 ? (mins - 60).toString().padStart(2, '0') : mins.toString().padStart(2, '0')}`;
                            })}
                            </div>
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
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium">{delivery.customerName}</p>
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            <MessageSquare className="w-3 h-3 mr-2" />
                            Send message
                          </Button>
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-gray-700">Company: </span>
                            <span className="text-sm ml-1">{delivery.organization || "Not specified"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {delivery.courier && <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Truck className="w-4 h-4 mr-2" />
                          Courier info
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
                        <Truck className="w-4 h-4 mr-2" />
                        Driver info
                      </h3>
                      <div className="rounded-md border bg-card/50 p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Earnings</TableHead>
                              <TableHead>Delivery Fee</TableHead>
                              <TableHead>Extra Service Fee</TableHead>
                              <TableHead>Tip</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Customer Payment</TableCell>
                              <TableCell>{delivery.price}</TableCell>
                              <TableCell>{delivery.price}</TableCell>
                              <TableCell>$0.00</TableCell>
                              <TableCell>{delivery.tip}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Driver Payout</TableCell>
                              <TableCell>{delivery.couriersEarnings || "$10.00"}</TableCell>
                              <TableCell>$8.00</TableCell>
                              <TableCell>$0.00</TableCell>
                              <TableCell>{delivery.tip}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
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
              
              <TabsContent value="order-logs" className="m-0 h-full">
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="p-6 px-[23px] pt-0 pb-96">
                    {/* Increased padding-bottom significantly to push content up and ensure Order Details section is fully visible */}
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
                                <span className="text-sm">Order created</span>
                                <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Status updated to "Scheduled Order"</span>
                                <span className="text-xs text-muted-foreground">Today, 9:35 AM</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Status updated to "Picking Up"</span>
                                <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Status updated to "In Transit"</span>
                                <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Status updated to "Dropoff Complete"</span>
                                <span className="text-xs text-muted-foreground">Today, 11:05 AM</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Control Panel Section - Fixed at bottom */}
        <div className="border-t bg-gray-50 p-4 mt-auto">
          <div className="mb-0">
            <h3 className="text-sm font-medium mb-2">Control Panel</h3>
            <Separator className="mb-3" />
            
            <div className="grid grid-cols-1 gap-3">
              {/* Dropdowns Section */}
              <div className="grid grid-cols-11 gap-2 mb-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Status <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {statuses.map(statusOption => (
                      <DropdownMenuItem key={statusOption} onClick={() => handleStatusChange(statusOption)}>
                        {statusOption}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Driver <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Assign Driver</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>John Smith</DropdownMenuItem>
                    <DropdownMenuItem>Mary Johnson</DropdownMenuItem>
                    <DropdownMenuItem>Robert Lee</DropdownMenuItem>
                    <DropdownMenuItem>Susan Williams</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Priority <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>High</DropdownMenuItem>
                    <DropdownMenuItem>Medium</DropdownMenuItem>
                    <DropdownMenuItem>Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Vehicle <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Car</DropdownMenuItem>
                    <DropdownMenuItem>Van</DropdownMenuItem>
                    <DropdownMenuItem>Bike</DropdownMenuItem>
                    <DropdownMenuItem>Truck</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Payment <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Process Payment</DropdownMenuItem>
                    <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                    <DropdownMenuItem>Add Charge</DropdownMenuItem>
                    <DropdownMenuItem>Apply Discount</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Template <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Email Template</DropdownMenuItem>
                    <DropdownMenuItem>SMS Template</DropdownMenuItem>
                    <DropdownMenuItem>Invoice Template</DropdownMenuItem>
                    <DropdownMenuItem>Label Template</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Labels <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Fragile</DropdownMenuItem>
                    <DropdownMenuItem>VIP</DropdownMenuItem>
                    <DropdownMenuItem>Urgent</DropdownMenuItem>
                    <DropdownMenuItem>Express</DropdownMenuItem>
                    <DropdownMenuItem>Custom Label</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Route <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Optimize Route</DropdownMenuItem>
                    <DropdownMenuItem>Add Waypoint</DropdownMenuItem>
                    <DropdownMenuItem>Edit Route</DropdownMenuItem>
                    <DropdownMenuItem>View Alternatives</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Email Customer</DropdownMenuItem>
                    <DropdownMenuItem>Call Customer</DropdownMenuItem>
                    <DropdownMenuItem>Text Driver</DropdownMenuItem>
                    <DropdownMenuItem>Call Driver</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Documents <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                    <DropdownMenuItem>Create Receipt</DropdownMenuItem>
                    <DropdownMenuItem>Print Waybill</DropdownMenuItem>
                    <DropdownMenuItem>Print Package Labels</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Reports <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>Order Summary</DropdownMenuItem>
                    <DropdownMenuItem>Financial Report</DropdownMenuItem>
                    <DropdownMenuItem>Timeline Report</DropdownMenuItem>
                    <DropdownMenuItem>Performance Stats</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Button Section */}
              <div className="grid grid-cols-8 sm:grid-cols-9 gap-2">
                <Button size="sm" className="flex items-center gap-1">
                  <Save className="h-4 w-4" /> Save
                </Button>
                
                <Button size="sm" variant="destructive" className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" /> Edit
                </Button>
                
                <Button size="sm" variant="secondary" className="flex items-center gap-1">
                  <Send className="h-4 w-4" /> Send
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" /> Print
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Timer className="h-4 w-4" /> Reschedule
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" /> Notify
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" /> Refresh
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> New Task
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" /> Flag
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Share className="h-4 w-4" /> Share
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Approve
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" /> Settings
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Search className="h-4 w-4" /> Search
                </Button>
                
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" /> Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>

      {/* Map Dialog */}
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] w-full max-h-[90vh] p-0 bg-background">
          <DialogTitle className="p-4 border-b">Delivery Route Map</DialogTitle>
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 min-h-[500px] h-[calc(90vh-120px)] rounded-md overflow-hidden">
              {delivery.pickupLocation?.address && delivery.dropoffLocation?.address && <OrderMap pickupAddress={delivery.pickupLocation.address} deliveryAddress={delivery.dropoffLocation.address} driverName={delivery.courier || "Driver"} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>;
};
