
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRound, MessageSquare } from "lucide-react";

interface ChatHistoryProps {
  userId: string;
}

export const ChatHistory = ({ userId }: ChatHistoryProps) => {
  // Mock data for chat history
  const chatHistory = [
    {
      id: 1,
      date: "April 15, 2025",
      messages: 12,
      summary: "Delivery address confusion resolved",
      time: "2:30 PM"
    },
    {
      id: 2,
      date: "April 14, 2025",
      messages: 8,
      summary: "Package pickup location updated",
      time: "11:20 AM"
    },
    {
      id: 3,
      date: "April 13, 2025",
      messages: 15,
      summary: "Delivery time rescheduled",
      time: "4:15 PM"
    }
  ];

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {chatHistory.map((chat) => (
          <div 
            key={chat.id}
            className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{chat.date}</span>
                  <span className="text-sm text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{chat.summary}</p>
                <div className="flex items-center gap-1 mt-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{chat.messages} messages</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
