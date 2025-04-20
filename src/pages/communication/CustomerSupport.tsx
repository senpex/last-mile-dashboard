import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChatInterface } from "@/components/communication/ChatInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Users, UserRound, MessageSquare } from "lucide-react";

const CustomerSupport = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const chats = [
    // Clients (20)
    {
      id: "client1",
      name: "Emma Johnson",
      role: "client",
      status: "active",
      lastMessage: "Is my delivery on the way?",
      timestamp: "9:45 AM",
      unread: 1,
      priority: "high",
      assignedTo: "dispatcher2"
    }, {
      id: "client2",
      name: "Robert Davis",
      role: "client",
      status: "active",
      lastMessage: "I need to change my delivery address",
      timestamp: "Yesterday",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "client3",
      name: "Lisa Anderson",
      role: "client",
      status: "active",
      lastMessage: "Can you expedite my delivery?",
      timestamp: "11:30 AM",
      unread: 4,
      priority: "high",
      assignedTo: null
    }, {
      id: "client4",
      name: "Carlos Rodriguez",
      role: "client",
      status: "active",
      lastMessage: "Package received, thank you!",
      timestamp: "2 days ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "client5",
      name: "Sarah Chen",
      role: "client",
      status: "active",
      lastMessage: "When will my package arrive?",
      timestamp: "Just now",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "client6",
      name: "Michael Thompson",
      role: "client",
      status: "active",
      lastMessage: "Need urgent delivery status update",
      timestamp: "5 min ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    }, {
      id: "client7",
      name: "Jessica Lee",
      role: "client",
      status: "active",
      lastMessage: "Wrong delivery address provided",
      timestamp: "15 min ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher2"
    }, {
      id: "client8",
      name: "David Wilson",
      role: "client",
      status: "active",
      lastMessage: "Package damaged during transit",
      timestamp: "30 min ago",
      unread: 1,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "client9",
      name: "Amanda Martinez",
      role: "client",
      status: "active",
      lastMessage: "Need to reschedule delivery",
      timestamp: "1 hour ago",
      unread: 0,
      priority: "medium",
      assignedTo: null
    }, {
      id: "client10",
      name: "Kevin Brown",
      role: "client",
      status: "active",
      lastMessage: "Thanks for quick delivery",
      timestamp: "2 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "client11",
      name: "Patricia Garcia",
      role: "client",
      status: "active",
      lastMessage: "Missing item in delivery",
      timestamp: "3 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "client12",
      name: "Thomas Wright",
      role: "client",
      status: "active",
      lastMessage: "Need delivery confirmation",
      timestamp: "4 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "client13",
      name: "Elizabeth Taylor",
      role: "client",
      status: "active",
      lastMessage: "Wrong item delivered",
      timestamp: "5 hours ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher2"
    }, {
      id: "client14",
      name: "Christopher Lee",
      role: "client",
      status: "active",
      lastMessage: "Delivery instructions updated",
      timestamp: "6 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "client15",
      name: "Michelle Rodriguez",
      role: "client",
      status: "active",
      lastMessage: "Need urgent delivery",
      timestamp: "7 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    }, {
      id: "client16",
      name: "Daniel Kim",
      role: "client",
      status: "active",
      lastMessage: "Package not received",
      timestamp: "8 hours ago",
      unread: 4,
      priority: "high",
      assignedTo: "dispatcher2"
    }, {
      id: "client17",
      name: "Rachel Green",
      role: "client",
      status: "active",
      lastMessage: "Delivery time inquiry",
      timestamp: "9 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "client18",
      name: "Brandon Wilson",
      role: "client",
      status: "active",
      lastMessage: "Need to cancel order",
      timestamp: "10 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    }, {
      id: "client19",
      name: "Sophia Martinez",
      role: "client",
      status: "active",
      lastMessage: "Address verification needed",
      timestamp: "11 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "client20",
      name: "William Chang",
      role: "client",
      status: "active",
      lastMessage: "Requesting refund",
      timestamp: "12 hours ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    // Working Drivers (20)
    {
      id: "driver1",
      name: "John Smith",
      orderId: "ORD-2341",
      role: "driver",
      status: "working",
      lastMessage: "Where should I deliver this package?",
      timestamp: "10:23 AM",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "driver2",
      name: "David Martinez",
      orderId: "ORD-2342",
      role: "driver",
      status: "working",
      lastMessage: "Traffic is heavy, might be delayed",
      timestamp: "12:15 PM",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "driver3",
      name: "Emily White",
      role: "driver",
      status: "working",
      lastMessage: "Starting my delivery route now",
      timestamp: "Just now",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "driver4",
      name: "James Wilson",
      role: "driver",
      status: "working",
      lastMessage: "Package delivered successfully",
      timestamp: "5 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "driver5",
      name: "Maria Garcia",
      role: "driver",
      status: "working",
      lastMessage: "Vehicle maintenance required",
      timestamp: "10 min ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "driver6",
      name: "Alex Thompson",
      role: "driver",
      status: "working",
      lastMessage: "Loading packages now",
      timestamp: "15 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "driver7",
      name: "Steven Lee",
      role: "driver",
      status: "working",
      lastMessage: "Need route update",
      timestamp: "20 min ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "driver8",
      name: "Linda Martinez",
      role: "driver",
      status: "working",
      lastMessage: "Fuel stop required",
      timestamp: "25 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "driver9",
      name: "Robert Johnson",
      role: "driver",
      status: "working",
      lastMessage: "Customer not available",
      timestamp: "30 min ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "driver10",
      name: "Sarah Davis",
      role: "driver",
      status: "working",
      lastMessage: "Package pickup completed",
      timestamp: "35 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "driver11",
      name: "Kevin Anderson",
      role: "driver",
      status: "working",
      lastMessage: "Route optimization needed",
      timestamp: "40 min ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "driver12",
      name: "Jennifer Taylor",
      role: "driver",
      status: "working",
      lastMessage: "Weather delay expected",
      timestamp: "45 min ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher2"
    }, {
      id: "driver13",
      name: "Michael Brown",
      role: "driver",
      status: "working",
      lastMessage: "Last delivery completed",
      timestamp: "50 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "driver14",
      name: "Elizabeth Taylor",
      role: "driver",
      status: "working",
      lastMessage: "Starting lunch break",
      timestamp: "55 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "driver15",
      name: "Daniel Wilson",
      role: "driver",
      status: "working",
      lastMessage: "Package damaged during handling",
      timestamp: "1 hour ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    }, {
      id: "driver16",
      name: "Amanda Clark",
      role: "driver",
      status: "working",
      lastMessage: "Route completed early",
      timestamp: "1.5 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "driver17",
      name: "Thomas Wright",
      role: "driver",
      status: "working",
      lastMessage: "Need additional packages",
      timestamp: "2 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "driver18",
      name: "Patricia Lee",
      role: "driver",
      status: "working",
      lastMessage: "Vehicle issue resolved",
      timestamp: "2.5 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "driver19",
      name: "George Martinez",
      role: "driver",
      status: "working",
      lastMessage: "Returning to depot",
      timestamp: "3 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "driver20",
      name: "Sandra Kim",
      role: "driver",
      status: "working",
      lastMessage: "Route adjustment needed",
      timestamp: "3.5 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    // Unapproved Drivers (20)
    {
      id: "unapproved1",
      name: "Sarah Wilson",
      role: "driver",
      status: "unapproved",
      lastMessage: "When will my application be reviewed?",
      timestamp: "Yesterday",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved2",
      name: "Jennifer Lee",
      role: "driver",
      status: "unapproved",
      lastMessage: "Submitted my documents for review",
      timestamp: "1:20 PM",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved3",
      name: "Mark Thompson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Background check status?",
      timestamp: "2 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved4",
      name: "Alice Chen",
      role: "driver",
      status: "unapproved",
      lastMessage: "Additional documents submitted",
      timestamp: "3 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved5",
      name: "Ryan Jackson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle inspection pending",
      timestamp: "4 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved6",
      name: "Diana Martinez",
      role: "driver",
      status: "unapproved",
      lastMessage: "Insurance documents uploaded",
      timestamp: "5 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved7",
      name: "Peter Kim",
      role: "driver",
      status: "unapproved",
      lastMessage: "Application status inquiry",
      timestamp: "6 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved8",
      name: "Laura Wilson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Driver's license verification",
      timestamp: "7 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved9",
      name: "Chris Davis",
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle registration pending",
      timestamp: "8 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved10",
      name: "Michelle Lee",
      role: "driver",
      status: "unapproved",
      lastMessage: "Training completion status",
      timestamp: "9 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved11",
      name: "Brian Taylor",
      role: "driver",
      status: "unapproved",
      lastMessage: "Application update needed",
      timestamp: "10 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved12",
      name: "Rachel Green",
      role: "driver",
      status: "unapproved",
      lastMessage: "Document verification pending",
      timestamp: "11 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved13",
      name: "Andrew Johnson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Background check inquiry",
      timestamp: "12 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved14",
      name: "Emma Rodriguez",
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle photos submitted",
      timestamp: "13 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved15",
      name: "Justin Wilson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Application review timeline",
      timestamp: "14 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved16",
      name: "Sophia Clark",
      role: "driver",
      status: "unapproved",
      lastMessage: "Insurance verification needed",
      timestamp: "15 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved17",
      name: "Brandon Lee",
      role: "driver",
      status: "unapproved",
      lastMessage: "Document resubmission",
      timestamp: "16 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved18",
      name: "Victoria Martinez",
      role: "driver",
      status: "unapproved",
      lastMessage: "Training schedule request",
      timestamp: "17 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    }, {
      id: "unapproved19",
      name: "Eric Thompson",
      role: "driver",
      status: "unapproved",
      lastMessage: "Application status check",
      timestamp: "18 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    }, {
      id: "unapproved20",
      name: "Hannah Kim",
      role: "driver",
      status: "unapproved",
      lastMessage: "Document verification status",
      timestamp: "19 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    // Drivers General (20)
    {
      id: "general1",
      name: "Michael Brown",
      role: "driver",
      status: "approved",
      lastMessage: "I'm available for deliveries today",
      timestamp: "Yesterday",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "general2",
      name: "Anna Martinez",
      role: "driver",
      status: "approved",
      lastMessage: "Schedule update request",
      timestamp: "2 days ago",
      unread: 1,
      priority: "low",
      assignedTo: "dispatcher2"
    }, {
      id: "general3",
      name: "William Davis",
      role: "driver",
      status: "approved",
      lastMessage: "Tomorrow's availability",
      timestamp: "3 days ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    }, {
      id: "general4",
      name: "Sophie Wilson",
      role: "driver",
      status: "approved",
      lastMessage: "Route preference update",
      timestamp: "4 days ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general5",
      name: "James Lee",
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle maintenance schedule",
      timestamp: "5 days ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general6",
      name: "Elena Rodriguez",
      role: "driver",
      status: "approved",
      lastMessage: "Time off request",
      timestamp: "6 days ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general7",
      name: "David Clark",
      role: "driver",
      status: "approved",
      lastMessage: "Schedule confirmation",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general8",
      name: "Lucy Thompson",
      role: "driver",
      status: "approved",
      lastMessage: "Route area preference",
      timestamp: "1 week ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general9",
      name: "Henry Wilson",
      role: "driver",
      status: "approved",
      lastMessage: "Equipment request",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general10",
      name: "Isabella Martinez",
      role: "driver",
      status: "approved",
      lastMessage: "Availability update",
      timestamp: "1 week ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general11",
      name: "Oliver Brown",
      role: "driver",
      status: "approved",
      lastMessage: "Schedule adjustment needed",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general12",
      name: "Ava Davis",
      role: "driver",
      status: "approved",
      lastMessage: "Next week's schedule",
      timestamp: "1 week ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general13",
      name: "Liam Johnson",
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle assignment request",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general14",
      name: "Mia Wilson",
      role: "driver",
      status: "approved",
      lastMessage: "Training completion notice",
      timestamp: "2 weeks ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general15",
      name: "Noah Lee",
      role: "driver",
      status: "approved",
      lastMessage: "Schedule preference update",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general16",
      name: "Emma Thompson",
      role: "driver",
      status: "approved",
      lastMessage: "Vacation request",
      timestamp: "2 weeks ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general17",
      name: "Lucas Martinez",
      role: "driver",
      status: "approved",
      lastMessage: "Equipment maintenance notice",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general18",
      name: "Sophia Davis",
      role: "driver",
      status: "approved",
      lastMessage: "Route assignment inquiry",
      timestamp: "3 weeks ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    }, {
      id: "general19",
      name: "Ethan Wilson",
      role: "driver",
      status: "approved",
      lastMessage: "Schedule confirmation needed",
      timestamp: "3 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    }, {
      id: "general20",
      name: "Olivia Brown",
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle condition report",
      timestamp: "3 weeks ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }];
  const filteredChats = chats.filter(chat => {
    if (activeTab === "assigned" && chat.assignedTo !== "dispatcher1") return false;
    if (activeTab === "unassigned" && chat.assignedTo !== null) return false;
    if (filterStatus === "client" && chat.role !== "client") return false;
    if (filterStatus === "drivers-general" && chat.role !== "driver") return false;
    if (filterStatus === "working-drivers" && !(chat.role === "driver" && chat.status === "working")) return false;
    if (filterStatus === "unapproved-drivers" && !(chat.role === "driver" && chat.status === "unapproved")) return false;
    return true;
  });
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-400";
      case "low":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  };
  const onlineUsers = ["John Smith", "Emma Johnson", "Mike Wilson", "Sarah Davis", "Robert Taylor"];
  return <Layout>
      <div className="flex items-center gap-2 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-2xl font-semibold">Customer Support</h1>
      </div>

      <div className="container mx-auto p-4 h-[calc(100vh-8rem)] bg-background" style={{
      marginLeft: 'calc(240px - 240px)'
    }}>
        <div className="flex h-full gap-4">
          <div className="w-[410px] flex-shrink-0 flex flex-col rounded-lg border bg-card shadow-sm mx-0 px-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">Messages</h2>
                </div>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Users className="h-4 w-4 mr-1" />
                      Online (5)
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-48">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Online Users</h4>
                      <div className="text-sm space-y-1">
                        {onlineUsers.map((user, index) => <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>{user}</span>
                          </div>)}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Input placeholder="Search chats..." className="h-9 flex-1" />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-2">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-md h-10 p-1 gap-1">
                  <TabsTrigger value="all" className="inline-flex items-center justify-center rounded-sm h-8 px-3 text-sm font-medium transition-colors hover:bg-background/80 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                    My
                  </TabsTrigger>
                  <TabsTrigger value="unassigned" className="inline-flex items-center justify-center rounded-sm h-8 px-3 text-sm font-medium transition-colors hover:bg-background/80 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                    Unassigned
                  </TabsTrigger>
                  <TabsTrigger value="assigned" className="inline-flex items-center justify-center rounded-sm h-8 px-3 text-sm font-medium transition-colors hover:bg-background/80 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                    Closed
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
                <Button variant={filterStatus === "working-drivers" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("working-drivers")} className="h-8">
                  Working Drivers
                </Button>
                <Button variant={filterStatus === "client" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("client")} className="h-8">
                  Clients
                </Button>
                <Button variant={filterStatus === "unapproved-drivers" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("unapproved-drivers")} className="h-8">
                  Unapproved Drivers
                </Button>
                <Button variant={filterStatus === "drivers-general" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("drivers-general")} className="h-8">
                  Drivers General
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="divide-y">
                {filteredChats.map(chat => <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${selectedChat === chat.id ? 'bg-muted' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <UserRound className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getPriorityColor(chat.priority)} border-2 border-background`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate text-sm">
                            {chat.name}
                            {chat.role === 'driver' && chat.status === 'working' && chat.orderId && (
                              <span className="ml-1 text-muted-foreground">({chat.orderId})</span>
                            )}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.timestamp}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {chat.lastMessage}
                        </p>
                      </div>
                      
                      {chat.unread > 0 && <div className="flex-shrink-0">
                          <Badge variant="default" className="rounded-full h-5 min-w-[20px]">
                            {chat.unread}
                          </Badge>
                        </div>}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {selectedChat ? <ChatInterface chatId={selectedChat} user={chats.find(chat => chat.id === selectedChat)!} /> : <div className="h-full flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No chat selected</h2>
                  <p className="text-muted-foreground">
                    Select a conversation from the list to start chatting or use the filters to find a specific conversation.
                  </p>
                </Card>
              </div>}
          </div>
        </div>
      </div>
    </Layout>;
};

export default CustomerSupport;
