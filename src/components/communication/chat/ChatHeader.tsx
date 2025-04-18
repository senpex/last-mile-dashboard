import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreVertical, User, UserRound, X, UserOff, UserCheck } from "lucide-react";

interface ChatHeaderProps {
  user: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ChatHeader = ({ user, activeTab, setActiveTab }: ChatHeaderProps) => {
  const onlineUsers = [
    "John Smith",
    "Emma Johnson",
    "Mike Wilson",
    "Sarah Davis",
    "Robert Taylor"
  ];

  return (
    <div className="p-4 border-b bg-card">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <UserRound className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-medium">{user.name}</h2>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {user.role === 'driver' ? 'Driver' : 'Client'} • 
              <span className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              {user.status === 'online' ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
        
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <UserCheck className="h-4 w-4 mr-1" />
              Assign Chat
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserOff className="h-4 w-4 mr-2" />
              Not assigned
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserCheck className="h-4 w-4 mr-2" />
              Assigned to me
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Online Users</DropdownMenuLabel>
            {onlineUsers.map((name, index) => (
              <DropdownMenuItem key={index}>
                <User className="h-4 w-4 mr-2" />
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
          
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Reassign Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <X className="h-4 w-4 mr-2" />
              Close Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
      
      <div className="mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-9">
            <TabsTrigger value="chat" className="text-sm">Chat</TabsTrigger>
            <TabsTrigger value="notes" className="text-sm">Notes</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">Chat History</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
