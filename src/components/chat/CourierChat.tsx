
import React, { useState } from "react";
import { X, Send, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "courier";
  timestamp: Date;
}

interface CourierChatProps {
  open: boolean;
  onClose: () => void;
  courierName: string;
  hasUnreadMessages?: boolean;
}

const CourierChat: React.FC<CourierChatProps> = ({ 
  open, 
  onClose, 
  courierName, 
  hasUnreadMessages = false 
}) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with the delivery?",
      sender: "courier",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    setTimeout(() => {
      const courierReply: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll check on that right away and get back to you shortly.`,
        sender: "courier",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, courierReply]);
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

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{getInitials(courierName)}</AvatarFallback>
              </Avatar>
              <DrawerTitle className="flex items-center gap-2">
                {courierName}
                {hasUnreadMessages && (
                  <Circle 
                    className="text-red-500 fill-red-500" 
                    size={14} 
                    strokeWidth={0}
                  />
                )}
              </DrawerTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        
        <ScrollArea className="flex-1 p-4 h-[calc(80vh-12rem)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DrawerFooter className="border-t">
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
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CourierChat;
