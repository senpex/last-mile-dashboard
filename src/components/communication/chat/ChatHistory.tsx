import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";

interface ChatHistoryProps {
  userId: string;
}

export const ChatHistory = ({
  userId
}: ChatHistoryProps) => {
  // Mock data for chat history
  const chatHistory = [{
    id: 1,
    date: "April 15, 2025",
    messages: 12,
    summary: "Delivery address confusion resolved",
    time: "2:30 PM"
  }, {
    id: 2,
    date: "April 14, 2025",
    messages: 8,
    summary: "Package pickup location updated",
    time: "11:20 AM"
  }, {
    id: 3,
    date: "April 13, 2025",
    messages: 15,
    summary: "Delivery time rescheduled",
    time: "4:15 PM"
  }];

  return <ScrollArea className="flex-1 p-4 my-0 px-0 py-0 -mt-[10px]">
      <div className="space-y-2">
        {chatHistory.map(chat => <div key={chat.id} className="w-full chat-history-item-container">
            <button className="chat-history-btn flex flex-col items-start w-full rounded-lg px-3 py-2 transition-colors duration-150
                bg-card/40 hover:bg-card/60 border border-border/40 shadow-sm
                relative group" type="button">
              <div className="flex items-center gap-1 mb-0.5">
                <MessageSquare className="w-4 h-4 text-muted-foreground mr-1" />
                <span className="text-xs font-semibold text-foreground">
                  {chat.date}
                </span>
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
          </div>)}
      </div>
    </ScrollArea>;
};
