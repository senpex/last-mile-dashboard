
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChatHistoryProps {
  userId: string;
}

export const ChatHistory = ({
  userId
}: ChatHistoryProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  
  // Mock data for chat history
  const chatHistory = [{
    id: 1,
    date: "April 15, 2025",
    messages: 12,
    summary: "Delivery address confusion resolved",
    time: "2:30 PM",
    conversation: [
      { sender: "client", message: "Hi, I think the delivery address is wrong in the system", time: "2:15 PM" },
      { sender: "dispatcher", message: "Let me check that for you. What is the correct address?", time: "2:17 PM" },
      { sender: "client", message: "It should be 123 Main St, Apt 4B", time: "2:20 PM" },
      { sender: "dispatcher", message: "Thank you, I've updated the address in our system", time: "2:25 PM" },
      { sender: "client", message: "Great, thanks for your help!", time: "2:30 PM" }
    ]
  }, {
    id: 2,
    date: "April 14, 2025",
    messages: 8,
    summary: "Package pickup location updated",
    time: "11:20 AM",
    conversation: [
      { sender: "client", message: "I need to change the pickup location", time: "11:00 AM" },
      { sender: "dispatcher", message: "No problem, what's the new location?", time: "11:05 AM" },
      { sender: "client", message: "The office at 456 Business Ave", time: "11:10 AM" },
      { sender: "dispatcher", message: "Got it, I've updated the pickup location", time: "11:15 AM" }
    ]
  }, {
    id: 3,
    date: "April 13, 2025",
    messages: 15,
    summary: "Delivery time rescheduled",
    time: "4:15 PM",
    conversation: [
      { sender: "client", message: "Can we reschedule the delivery? I won't be home", time: "3:30 PM" },
      { sender: "dispatcher", message: "Of course, what time works better for you?", time: "3:35 PM" },
      { sender: "client", message: "How about tomorrow morning?", time: "3:40 PM" },
      { sender: "dispatcher", message: "We can do 10:00 AM tomorrow", time: "3:45 PM" },
      { sender: "client", message: "Perfect, thank you!", time: "3:50 PM" },
      { sender: "dispatcher", message: "Appointment confirmed for 10:00 AM tomorrow", time: "4:00 PM" }
    ]
  }];

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId);
  };

  const selectedChatData = selectedChat !== null ? chatHistory.find(chat => chat.id === selectedChat) : null;

  return (
    <>
      <ScrollArea className="flex-1 p-4 my-0 px-0 py-0 -mt-[10px]">
        <div className="space-y-2">
          {chatHistory.map(chat => (
            <div key={chat.id} className="w-full chat-history-item-container">
              <button 
                className="chat-history-btn flex flex-col items-start w-full rounded-lg px-3 py-2 transition-colors duration-150
                  bg-card/40 hover:bg-card/60 border border-border/40 shadow-sm
                  relative group" 
                type="button"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="flex items-center gap-1 mb-0.5 w-full">
                  <span className="text-xs font-semibold text-foreground mr-1">
                    {chat.date}
                  </span>
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                    {chat.messages} msgs
                  </Badge>
                </div>
                <div className="flex items-center w-full gap-2 text-[11px]">
                  <span className="flex-1 text-left truncate text-muted-foreground">
                    {chat.summary}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={selectedChat !== null} onOpenChange={(open) => !open && setSelectedChat(null)}>
        <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {selectedChatData?.date} - {selectedChatData?.summary}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto mt-2">
            {selectedChatData?.conversation.map((message, index) => (
              <div 
                key={index}
                className={`mb-3 flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'client' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm">{message.message}</div>
                  <div className="text-[10px] mt-1 opacity-70 text-right">{message.time}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
