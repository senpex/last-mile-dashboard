
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Headphones, Users, MessageSquare, Filter, UserRound, Clock, Package } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { ChatInterface } from "@/components/communication/ChatInterface";

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - would be fetched from your API
  const chats = [
    { 
      id: "chat1", 
      name: "John Smith", 
      role: "driver", 
      status: "working", 
      lastMessage: "Where should I deliver this package?", 
      timestamp: "10:23 AM",
      unread: 2,
      priority: "high",
      assignedTo: "dispatcher1"
    },
    { 
      id: "chat2", 
      name: "Emma Johnson", 
      role: "client", 
      status: "active", 
      lastMessage: "Is my delivery on the way?", 
      timestamp: "9:45 AM",
      unread: 1,
      priority: "high",
      assignedTo: "dispatcher2"
    },
    { 
      id: "chat3", 
      name: "Michael Brown", 
      role: "driver", 
      status: "approved", 
      lastMessage: "I'm available for deliveries today", 
      timestamp: "Yesterday",
      unread: 0,
      priority: "medium",
      assignedTo: "dispatcher1"
    },
    { 
      id: "chat4", 
      name: "Sarah Wilson", 
      role: "driver", 
      status: "unapproved", 
      lastMessage: "When will my application be reviewed?", 
      timestamp: "Yesterday",
      unread: 0,
      priority: "low",
      assignedTo: null
    },
    { 
      id: "chat5", 
      name: "Robert Davis", 
      role: "client", 
      status: "active", 
      lastMessage: "I need to change my delivery address", 
      timestamp: "Yesterday",
      unread: 3,
      priority: "high",
      assignedTo: "dispatcher1"
    },
  ];
  
  // Filter chats based on active tab and filter status
  const filteredChats = chats.filter(chat => {
    if (activeTab === "assigned" && chat.assignedTo !== "dispatcher1") return false;
    if (activeTab === "unassigned" && chat.assignedTo !== null) return false;
    
    if (filterStatus === "client" && chat.role !== "client") return false;
    if (filterStatus === "driver" && chat.role !== "driver") return false;
    if (filterStatus === "high" && chat.priority !== "high") return false;
    if (filterStatus === "working-drivers" && !(chat.role === "driver" && chat.status === "working")) return false;
    if (filterStatus === "unapproved-drivers" && !(chat.role === "driver" && chat.status === "unapproved")) return false;
    
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-400";
      case "low": return "bg-blue-400";
      default: return "bg-gray-400";
    }
  };

  const getRoleBadge = (role: string, status: string) => {
    if (role === "client") {
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Client</Badge>;
    } else if (role === "driver") {
      switch (status) {
        case "working":
          return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Working Driver</Badge>;
        case "approved":
          return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Approved Driver</Badge>;
        case "unapproved":
          return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Unapproved Driver</Badge>;
        default:
          return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Driver</Badge>;
      }
    }
    return null;
  };

  return (
    <Layout>
      <div className="container mx-auto p-0 h-[calc(100vh-80px)]">
        <div className="flex h-full">
          {/* Left sidebar - Chat List */}
          <div className="w-1/3 border-r pr-4 h-full flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <Headphones className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Communication</h1>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-1" />
                  Online (5)
                </Button>
              </div>
            </div>

            <div className="flex items-center pb-3">
              <Input 
                placeholder="Search chats..." 
                className="mr-2" 
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="assigned">Assigned</TabsTrigger>
                <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 overflow-x-auto pb-3">
              <Button 
                variant={filterStatus === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === "client" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("client")}
              >
                Clients
              </Button>
              <Button 
                variant={filterStatus === "driver" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("driver")}
              >
                Drivers
              </Button>
              <Button 
                variant={filterStatus === "high" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("high")}
              >
                High Priority
              </Button>
              <Button 
                variant={filterStatus === "working-drivers" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("working-drivers")}
              >
                Working Drivers
              </Button>
              <Button 
                variant={filterStatus === "unapproved-drivers" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("unapproved-drivers")}
              >
                Unapproved
              </Button>
            </div>

            <UsersTableContainer className="flex-1 overflow-auto">
              <div className="divide-y">
                {filteredChats.map(chat => (
                  <div 
                    key={chat.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedChat === chat.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center`}>
                          <UserRound className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getPriorityColor(chat.priority)} border-2 border-white`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mt-0.5">
                          {getRoleBadge(chat.role, chat.status)}
                          {chat.assignedTo && (
                            <Badge variant="outline" className="bg-gray-100 border-gray-300">Assigned</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                      </div>
                      
                      {chat.unread > 0 && (
                        <div className="flex-shrink-0">
                          <Badge variant="default" className="rounded-full">{chat.unread}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </UsersTableContainer>
          </div>

          {/* Right side - Chat Interface */}
          <div className="w-2/3 h-full pl-4">
            {selectedChat ? (
              <ChatInterface 
                chatId={selectedChat}
                user={chats.find(chat => chat.id === selectedChat)!}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                  <MessageSquare className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No chat selected</h2>
                  <p className="text-gray-600">Select a conversation from the list to start chatting or use the filters to find a specific conversation.</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSupport;
