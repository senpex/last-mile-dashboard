import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreVertical, User, UserRound, X, UserX, UserCheck } from "lucide-react";

interface ChatHeaderProps {
  user: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
    orderId?: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose?: () => void;
}

export const ChatHeader = ({ user, activeTab, setActiveTab, onClose }: ChatHeaderProps) => {
  const onlineUsers = [
    "John Smith",
    "Emma Johnson",
    "Mike Wilson",
    "Sarah Davis",
    "Robert Taylor"
  ];

  const profileType = user.role === 'driver' ? 'Driver' : 'Customer';

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="p-4 border-b bg-card">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <UserRound className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-medium">
              {user.name}
              {user.role === 'driver' && user.orderId && (
                <span className="ml-1 text-muted-foreground font-bold">({user.orderId})</span>
              )}
            </h2>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {profileType} • 
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
                <UserX className="h-4 w-4 mr-2" />
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClose} className="text-red-600">
                <X className="h-4 w-4 mr-2" />
                Close Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="h-9">
            <TabsTrigger value="opened" className="text-sm">Opened Chats</TabsTrigger>
            <TabsTrigger value="chat" className="text-sm">Chat</TabsTrigger>
            <TabsTrigger value="notes" className="text-sm">Notes</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">Chat History</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
