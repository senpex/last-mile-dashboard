
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Send, Circle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "driver";
  timestamp: Date;
}

interface Driver {
  id: number;
  name: string;
  rating: number;
  status: string;
  location: string;
  distance: string;
  eta: string;
  phone: string;
  avatar?: string;
  transportType: string;
  totalDeliveries: number;
}

interface DriverChatModalProps {
  open: boolean;
  onClose: () => void;
  driver: Driver | null;
}

const DriverChatModal: React.FC<DriverChatModalProps> = ({ 
  open, 
  onClose, 
  driver 
}) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm available for the delivery. Any special instructions?",
      sender: "driver",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !driver) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Simulate driver response
    setTimeout(() => {
      const driverReply: Message = {
        id: (Date.now() + 1).toString(),
        content: `Got it! I'll make sure to handle this delivery properly.`,
        sender: "driver",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, driverReply]);
    }, 1500);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[500px] p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={driver.avatar} />
                <AvatarFallback className="text-xs">{getInitials(driver.name)}</AvatarFallback>
              </Avatar>
              <DialogTitle className="flex items-center gap-2 text-sm">
                {driver.name}
                <Circle 
                  className="text-green-500 fill-green-500" 
                  size={8} 
                  strokeWidth={0}
                />
              </DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 h-[350px]">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs">{message.content}</p>
                    <span className="text-xs opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 h-8 text-xs"
            />
            <Button size="sm" onClick={handleSendMessage} className="h-8 w-8 p-0">
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DriverChatModal;
