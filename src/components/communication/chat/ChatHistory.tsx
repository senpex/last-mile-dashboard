
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatMessages } from './ChatMessages';
import { MessageType } from '../ChatInterface';

interface ChatHistoryProps {
  userId: string;
  onSelectHistoryChat?: (messages: MessageType[]) => void;
}

export const ChatHistory = ({
  userId,
  onSelectHistoryChat
}: ChatHistoryProps) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  
  // Mock data for chat history
  const chatHistory = [{
    id: 1,
    date: "April 15, 2025",
    messages: 12,
    summary: "Delivery address confusion resolved",
    time: "2:30 PM",
    chatMessages: [
      {
        id: '101',
        senderId: 'client1',
        senderName: 'Emma Johnson',
        senderRole: 'client',
        content: "Hi, I think my delivery address is incorrect.",
        timestamp: '2:15 PM'
      },
      {
        id: '102',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "Let me check that for you. What is the correct address?",
        timestamp: '2:16 PM'
      },
      {
        id: '103',
        senderId: 'client1',
        senderName: 'Emma Johnson',
        senderRole: 'client',
        content: "It should be 742 Evergreen Terrace, not 724.",
        timestamp: '2:18 PM'
      },
      {
        id: '104',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "I've updated it in our system. The driver will be notified of the change.",
        timestamp: '2:20 PM'
      },
      {
        id: '105',
        senderId: 'client1',
        senderName: 'Emma Johnson',
        senderRole: 'client',
        content: "Thank you so much!",
        timestamp: '2:21 PM'
      },
      {
        id: '106',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "You're welcome. Your delivery is still on track for today.",
        timestamp: '2:22 PM'
      }
    ]
  }, {
    id: 2,
    date: "April 14, 2025",
    messages: 8,
    summary: "Package pickup location updated",
    time: "11:20 AM",
    chatMessages: [
      {
        id: '201',
        senderId: 'client2',
        senderName: 'Robert Davis',
        senderRole: 'client',
        content: "I need to change where my package is being picked up from.",
        timestamp: '11:05 AM'
      },
      {
        id: '202',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "I can help with that. What's the new pickup location?",
        timestamp: '11:07 AM'
      },
      {
        id: '203',
        senderId: 'client2',
        senderName: 'Robert Davis',
        senderRole: 'client',
        content: "My office instead of my home. 555 Business Ave, Suite 200.",
        timestamp: '11:09 AM'
      },
      {
        id: '204',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "Got it. I'll update that right away. Is there a specific entrance to use?",
        timestamp: '11:11 AM'
      }
    ]
  }, {
    id: 3,
    date: "April 13, 2025",
    messages: 15,
    summary: "Delivery time rescheduled",
    time: "4:15 PM",
    chatMessages: [
      {
        id: '301',
        senderId: 'client3',
        senderName: 'Lisa Anderson',
        senderRole: 'client',
        content: "Is it possible to reschedule my delivery for tomorrow?",
        timestamp: '4:00 PM'
      },
      {
        id: '302',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "Let me check our schedule. What time would work for you tomorrow?",
        timestamp: '4:02 PM'
      },
      {
        id: '303',
        senderId: 'client3',
        senderName: 'Lisa Anderson',
        senderRole: 'client',
        content: "Anytime after 2 PM would be great.",
        timestamp: '4:05 PM'
      },
      {
        id: '304',
        senderId: 'dispatcher1',
        senderName: 'Jane Dispatcher',
        senderRole: 'dispatcher',
        content: "I can schedule it for 3:30 PM tomorrow. Would that work?",
        timestamp: '4:07 PM'
      },
      {
        id: '305',
        senderId: 'client3',
        senderName: 'Lisa Anderson',
        senderRole: 'client',
        content: "That's perfect, thank you!",
        timestamp: '4:08 PM'
      }
    ]
  }];

  const handleChatClick = (chatId: number) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat && onSelectHistoryChat) {
      onSelectHistoryChat(selectedChat.chatMessages);
    }
    setSelectedChatId(chatId);
  };

  if (selectedChatId && !onSelectHistoryChat) {
    const selectedChat = chatHistory.find(chat => chat.id === selectedChatId);
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-3 border-b">
          <button 
            onClick={() => setSelectedChatId(null)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to history
          </button>
          <span className="text-sm font-medium">
            {selectedChat?.date} - {selectedChat?.time}
          </span>
        </div>
        <ScrollArea className="flex-1 p-4">
          {selectedChat && <ChatMessages messages={selectedChat.chatMessages} />}
        </ScrollArea>
      </div>
    );
  }

  return (
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
  );
};
