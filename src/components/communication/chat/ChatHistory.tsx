
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatHistoryProps {
  userId: string;
  onChatSelected?: (chatData: any) => void;
}

export const ChatHistory = ({
  userId,
  onChatSelected
}: ChatHistoryProps) => {
  // Mock data for chat history
  const chatHistory = [{
    id: 1,
    date: "April 15, 2025",
    messages: 24,
    summary: "Delivery address confusion resolved",
    time: "2:30 PM",
    conversation: [
      { sender: "client", message: "Hi, I think the delivery address is wrong in the system", time: "2:15 PM" },
      { sender: "dispatcher", message: "Let me check that for you. What is the correct address?", time: "2:17 PM" },
      { sender: "client", message: "It should be 123 Main St, Apt 4B", time: "2:20 PM" },
      { sender: "dispatcher", message: "Thank you, I've updated the address in our system", time: "2:25 PM" },
      { sender: "client", message: "Great, thanks for your help!", time: "2:30 PM" },
      { sender: "dispatcher", message: "You're welcome! Is there anything else I can help you with?", time: "2:32 PM" },
      { sender: "client", message: "Actually yes, can I also update the delivery instructions?", time: "2:33 PM" },
      { sender: "dispatcher", message: "Of course, what would you like to add?", time: "2:34 PM" },
      { sender: "client", message: "Please leave the package by the side door, not the front door", time: "2:35 PM" },
      { sender: "dispatcher", message: "No problem, I've added those instructions to your order", time: "2:36 PM" },
      { sender: "client", message: "And is there a way to get a notification when the driver is nearby?", time: "2:38 PM" },
      { sender: "dispatcher", message: "Yes, you'll receive a text message when the driver is about 10 minutes away", time: "2:39 PM" },
      { sender: "client", message: "Perfect! That's all I needed", time: "2:40 PM" },
      { sender: "dispatcher", message: "Great! Have a wonderful day!", time: "2:41 PM" },
      { sender: "client", message: "You too, thanks again for your help", time: "2:42 PM" },
      { sender: "dispatcher", message: "It's been my pleasure assisting you today", time: "2:43 PM" }
    ]
  }, {
    id: 2,
    date: "April 14, 2025",
    messages: 16,
    summary: "Package pickup location updated",
    time: "11:20 AM",
    conversation: [
      { sender: "client", message: "I need to change the pickup location", time: "11:00 AM" },
      { sender: "dispatcher", message: "No problem, what's the new location?", time: "11:05 AM" },
      { sender: "client", message: "The office at 456 Business Ave", time: "11:10 AM" },
      { sender: "dispatcher", message: "Got it, I've updated the pickup location", time: "11:15 AM" },
      { sender: "client", message: "Thanks! Also, is there a specific time I should have the package ready?", time: "11:16 AM" },
      { sender: "dispatcher", message: "Yes, please have it ready by 2:00 PM for pickup", time: "11:17 AM" },
      { sender: "client", message: "And who should I ask for when the driver arrives?", time: "11:18 AM" },
      { sender: "dispatcher", message: "The driver's name is Alex, and they'll be wearing a blue uniform", time: "11:19 AM" },
      { sender: "client", message: "Perfect, thank you!", time: "11:20 AM" },
      { sender: "dispatcher", message: "Is there anything else you need assistance with?", time: "11:21 AM" },
      { sender: "client", message: "No, that's all for now", time: "11:22 AM" },
      { sender: "dispatcher", message: "Great! Have a wonderful day!", time: "11:23 AM" }
    ]
  }, {
    id: 3,
    date: "April 13, 2025",
    messages: 25,
    summary: "Delivery time rescheduled",
    time: "4:15 PM",
    conversation: [
      { sender: "client", message: "Can we reschedule the delivery? I won't be home", time: "3:30 PM" },
      { sender: "dispatcher", message: "Of course, what time works better for you?", time: "3:35 PM" },
      { sender: "client", message: "How about tomorrow morning?", time: "3:40 PM" },
      { sender: "dispatcher", message: "We can do 10:00 AM tomorrow", time: "3:45 PM" },
      { sender: "client", message: "Perfect, thank you!", time: "3:50 PM" },
      { sender: "dispatcher", message: "Appointment confirmed for 10:00 AM tomorrow", time: "4:00 PM" },
      { sender: "client", message: "Great! Is there a way I can track the delivery?", time: "4:05 PM" },
      { sender: "dispatcher", message: "Yes, you'll receive a text message with a tracking link when the driver is en route", time: "4:07 PM" },
      { sender: "client", message: "Excellent. And what if I need to step out briefly?", time: "4:10 PM" },
      { sender: "dispatcher", message: "The driver can wait up to 5 minutes, or you can specify a safe place to leave the package", time: "4:12 PM" },
      { sender: "client", message: "Let's do that - they can leave it behind the planter on the porch", time: "4:14 PM" },
      { sender: "dispatcher", message: "Perfect, I've added those instructions", time: "4:15 PM" },
      { sender: "client", message: "One more thing - the package needs to be handled carefully, it's fragile", time: "4:17 PM" },
      { sender: "dispatcher", message: "I've marked it as fragile in our system, the driver will take extra care", time: "4:19 PM" },
      { sender: "client", message: "Wonderful, thank you so much for your help", time: "4:20 PM" },
      { sender: "dispatcher", message: "You're welcome! Anything else I can assist with?", time: "4:21 PM" },
      { sender: "client", message: "That's all for now, thanks!", time: "4:22 PM" },
      { sender: "dispatcher", message: "Have a great day ahead!", time: "4:23 PM" }
    ]
  }];

  const handleChatClick = (chatData: any) => {
    if (onChatSelected) {
      onChatSelected(chatData);
    }
  };

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
                onClick={() => handleChatClick(chat)}
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
    </>
  );
};
