import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChatInterface } from "@/components/communication/ChatInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  Users,
  UserRound,
  MessageSquare
} from "lucide-react";

const CustomerSupport = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const chats = [
    // Clients (20)
    { 
      id: "client1", 
      name: "Emma Johnson",
      orderId: "909001", // Added order ID
      role: "client", 
      status: "active", 
      lastMessage: "Is my delivery on the way?", 
      timestamp: "9:45 AM",
      unread: 1,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    {
      id: "client2",
      name: "Robert Davis",
      orderId: "909002", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "I need to change my delivery address",
      timestamp: "Yesterday",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "client3",
      name: "Lisa Anderson",
      orderId: "909003", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Can you expedite my delivery?",
      timestamp: "11:30 AM",
      unread: 4,
      priority: "high",
      assignedTo: null
    },
    {
      id: "client4",
      name: "Carlos Rodriguez",
      orderId: "909004", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Package received, thank you!",
      timestamp: "2 days ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "client5",
      name: "Sarah Chen",
      orderId: "909005", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "When will my package arrive?",
      timestamp: "Just now",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "client6",
      name: "Michael Thompson",
      orderId: "909006", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Need urgent delivery status update",
      timestamp: "5 min ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    },
    {
      id: "client7",
      name: "Jessica Lee",
      orderId: "909007", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Wrong delivery address provided",
      timestamp: "15 min ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    {
      id: "client8",
      name: "David Wilson",
      orderId: "909008", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Package damaged during transit",
      timestamp: "30 min ago",
      unread: 1,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "client9",
      name: "Amanda Martinez",
      orderId: "909009", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Need to reschedule delivery",
      timestamp: "1 hour ago",
      unread: 0,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "client10",
      name: "Kevin Brown",
      orderId: "909010", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Thanks for quick delivery",
      timestamp: "2 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "client11",
      name: "Patricia Garcia",
      orderId: "909011", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Missing item in delivery",
      timestamp: "3 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "client12",
      name: "Thomas Wright",
      orderId: "909012", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Need delivery confirmation",
      timestamp: "4 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "client13",
      name: "Elizabeth Taylor",
      orderId: "909013", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Wrong item delivered",
      timestamp: "5 hours ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    {
      id: "client14",
      name: "Christopher Lee",
      orderId: "909014", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Delivery instructions updated",
      timestamp: "6 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "client15",
      name: "Michelle Rodriguez",
      orderId: "909015", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Need urgent delivery",
      timestamp: "7 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    },
    {
      id: "client16",
      name: "Daniel Kim",
      orderId: "909016", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Package not received",
      timestamp: "8 hours ago",
      unread: 4,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    {
      id: "client17",
      name: "Rachel Green",
      orderId: "909017", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Delivery time inquiry",
      timestamp: "9 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "client18",
      name: "Brandon Wilson",
      orderId: "909018", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Need to cancel order",
      timestamp: "10 hours ago",
      unread: 2,
      priority: "high",
      assignedTo: null
    },
    {
      id: "client19",
      name: "Sophia Martinez",
      orderId: "909019", // Added order ID
      role: "client",
      status: "active",
      lastMessage: "Address verification needed",
      timestamp: "11 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "client20",
      name: "William Chang",
      orderId: "909020", // Added order ID
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
      orderId: "808001", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Where should I deliver this package?",
      timestamp: "10:23 AM",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver2",
      name: "David Martinez",
      orderId: "808002", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Traffic is heavy, might be delayed",
      timestamp: "12:15 PM",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver3",
      name: "Emily White",
      orderId: "808003", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Starting my delivery route now",
      timestamp: "Just now",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver4",
      name: "James Wilson",
      orderId: "808004", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Package delivered successfully",
      timestamp: "5 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver5",
      name: "Maria Garcia",
      orderId: "808005", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Vehicle maintenance required",
      timestamp: "10 min ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver6",
      name: "Alex Thompson",
      orderId: "808006", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Loading packages now",
      timestamp: "15 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver7",
      name: "Steven Lee",
      orderId: "808007", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Need route update",
      timestamp: "20 min ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver8",
      name: "Linda Martinez",
      orderId: "808008", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Fuel stop required",
      timestamp: "25 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver9",
      name: "Robert Johnson",
      orderId: "808009", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Customer not available",
      timestamp: "30 min ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver10",
      name: "Sarah Davis",
      orderId: "808010", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Package pickup completed",
      timestamp: "35 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver11",
      name: "Kevin Anderson",
      orderId: "808011", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Route optimization needed",
      timestamp: "40 min ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver12",
      name: "Jennifer Taylor",
      orderId: "808012", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Weather delay expected",
      timestamp: "45 min ago",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver13",
      name: "Michael Brown",
      orderId: "808013", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Last delivery completed",
      timestamp: "50 min ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver14",
      name: "Lisa Rodriguez",
      orderId: "808014", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Starting lunch break",
      timestamp: "55 min ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver15",
      name: "Daniel Wilson",
      orderId: "808015", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Package damaged during handling",
      timestamp: "1 hour ago",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver16",
      name: "Amanda Clark",
      orderId: "808016", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Route completed early",
      timestamp: "1.5 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver17",
      name: "Thomas Wright",
      orderId: "808017", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Need additional packages",
      timestamp: "2 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver18",
      name: "Patricia Lee",
      orderId: "808018", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Vehicle issue resolved",
      timestamp: "2.5 hours ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "driver19",
      name: "George Martinez",
      orderId: "808019", // Added order ID
      role: "driver",
      status: "working",
      lastMessage: "Returning to depot",
      timestamp: "3 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "driver20",
      name: "Sandra Kim",
      orderId: "808020", // Added order ID
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
      orderId: "707001", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "When will my application be reviewed?",
      timestamp: "Yesterday",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved2",
      name: "Jennifer Lee",
      orderId: "707002", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Submitted my documents for review",
      timestamp: "1:20 PM",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved3",
      name: "Mark Thompson",
      orderId: "707003", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Background check status?",
      timestamp: "2 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved4",
      name: "Alice Chen",
      orderId: "707004", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Additional documents submitted",
      timestamp: "3 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved5",
      name: "Ryan Jackson",
      orderId: "707005", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle inspection pending",
      timestamp: "4 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved6",
      name: "Diana Martinez",
      orderId: "707006", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Insurance documents uploaded",
      timestamp: "5 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved7",
      name: "Peter Kim",
      orderId: "707007", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Application status inquiry",
      timestamp: "6 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved8",
      name: "Laura Wilson",
      orderId: "707008", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Driver's license verification",
      timestamp: "7 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved9",
      name: "Chris Davis",
      orderId: "707009", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle registration pending",
      timestamp: "8 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved10",
      name: "Michelle Lee",
      orderId: "707010", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Training completion status",
      timestamp: "9 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved11",
      name: "Brian Taylor",
      orderId: "707011", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Application update needed",
      timestamp: "10 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved12",
      name: "Rachel Green",
      orderId: "707012", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Document verification pending",
      timestamp: "11 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved13",
      name: "Andrew Johnson",
      orderId: "707013", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Background check inquiry",
      timestamp: "12 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved14",
      name: "Emma Rodriguez",
      orderId: "707014", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Vehicle photos submitted",
      timestamp: "13 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved15",
      name: "Justin Wilson",
      orderId: "707015", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Application review timeline",
      timestamp: "14 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved16",
      name: "Sophia Clark",
      orderId: "707016", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Insurance verification needed",
      timestamp: "15 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved17",
      name: "Brandon Lee",
      orderId: "707017", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Document resubmission",
      timestamp: "16 hours ago",
      unread: 1,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved18",
      name: "Victoria Martinez",
      orderId: "707018", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Training schedule request",
      timestamp: "17 hours ago",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    {
      id: "unapproved19",
      name: "Eric Thompson",
      orderId: "707019", // Added order ID
      role: "driver",
      status: "unapproved",
      lastMessage: "Application status check",
      timestamp: "18 hours ago",
      unread: 2,
      priority: "medium",
      assignedTo: null
    },
    {
      id: "unapproved20",
      name: "Hannah Kim",
      orderId: "707020", // Added order ID
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
      orderId: "606001", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "I'm available for deliveries today",
      timestamp: "Yesterday",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "general2",
      name: "Anna Martinez",
      orderId: "606002", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Schedule update request",
      timestamp: "2 days ago",
      unread: 1,
      priority: "low",
      assignedTo: "dispatcher2"
    },
    {
      id: "general3",
      name: "William Davis",
      orderId: "606003", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Tomorrow's availability",
      timestamp: "3 days ago",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    {
      id: "general4",
      name: "Sophie Wilson",
      orderId: "606004", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Route preference update",
      timestamp: "4 days ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general5",
      name: "James Lee",
      orderId: "606005", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle maintenance schedule",
      timestamp: "5 days ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general6",
      name: "Elena Rodriguez",
      orderId: "606006", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Time off request",
      timestamp: "6 days ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general7",
      name: "David Clark",
      orderId: "606007", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Schedule confirmation",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general8",
      name: "Lucy Thompson",
      orderId: "606008", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Route area preference",
      timestamp: "1 week ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general9",
      name: "Henry Wilson",
      orderId: "606009", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Equipment request",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general10",
      name: "Isabella Martinez",
      orderId: "606010", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Availability update",
      timestamp: "1 week ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general11",
      name: "Oliver Brown",
      orderId: "606011", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Schedule adjustment needed",
      timestamp: "1 week ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general12",
      name: "Ava Davis",
      orderId: "606012", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Next week's schedule",
      timestamp: "1 week ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general13",
      name: "Liam Johnson",
      orderId: "606013", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle assignment request",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general14",
      name: "Mia Wilson",
      orderId: "606014", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Training completion notice",
      timestamp: "2 weeks ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general15",
      name: "Noah Lee",
      orderId: "606015", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Schedule preference update",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general16",
      name: "Emma Thompson",
      orderId: "606016", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Vacation request",
      timestamp: "2 weeks ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general17",
      name: "Lucas Martinez",
      orderId: "606017", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Equipment maintenance notice",
      timestamp: "2 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general18",
      name: "Sophia Davis",
      orderId: "606018", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Route assignment inquiry",
      timestamp: "3 weeks ago",
      unread: 1,
      priority: "medium",
      assignedTo: "dispatcher2"
    },
    {
      id: "general19",
      name: "Ethan Wilson",
      orderId: "606019", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Schedule confirmation needed",
      timestamp: "3 weeks ago",
      unread: 0,
      priority: "low",
      assignedTo: "dispatcher1"
    },
    {
      id: "general20",
      name: "Olivia Brown",
      orderId: "606020", // Added order ID
      role: "driver",
      status: "approved",
      lastMessage: "Vehicle condition report",
      timestamp: "3 weeks ago",
      unread: 2,
      priority: "medium",
      assignedTo: "dispatcher2"
    }
  ];

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
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-400";
      case
