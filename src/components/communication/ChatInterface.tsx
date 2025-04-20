import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderDetails } from './OrderDetails';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { ChatHistory } from './chat/ChatHistory';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine } from "lucide-react";

interface ChatInterfaceProps {
  chatId: string;
  user: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
    orderId?: string;
  };
  onClose?: () => void;
}

export type MessageType = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'dispatcher' | 'driver' | 'client';
  content: string;
  timestamp: string;
  attachments?: Array<{
    id: string;
    name: string;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf' | 'voice';
    url: string;
  }>;
};

export const ChatInterface = ({ chatId, user, onClose }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>>([]);
  const [noteText, setNoteText] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      senderId: 'driver1',
      senderName: user.name,
      senderRole: user.role === 'driver' ? 'driver' : 'client',
      content: 'Hello, I have a question about my delivery.',
      timestamp: '10:15 AM'
    },
    {
      id: '2',
      senderId: 'dispatcher1',
      senderName: 'Jane Dispatcher',
      senderRole: 'dispatcher',
      content: 'Hi there! How can I help you today?',
      timestamp: '10:16 AM'
    },
    {
      id: '3',
      senderId: 'driver1',
      senderName: user.name,
      senderRole: user.role === 'driver' ? 'driver' : 'client',
      content: "I'm not sure where exactly to deliver this package. The address is a bit confusing.",
      timestamp: '10:18 AM'
    },
    {
      id: '4',
      senderId: 'dispatcher1',
      senderName: 'Jane Dispatcher',
      senderRole: 'dispatcher',
      content: 'Let me check the delivery instructions for you.',
      timestamp: '10:19 AM'
    },
    {
      id: '5',
      senderId: 'dispatcher1',
      senderName: 'Jane Dispatcher',
      senderRole: 'dispatcher',
      content: 'The customer has specified to leave the package at the back door. There should be a gate with a keypad. The code is 4532.',
      timestamp: '10:21 AM',
      attachments: [
        {
          id: 'att1',
          name: 'delivery_instructions.jpg',
          type: 'image',
          url: '#'
        }
      ]
    },
    {
      id: '6',
      senderId: 'driver1',
      senderName: user.name,
      senderRole: user.role === 'driver' ? 'driver' : 'client',
      content: 'Got it, thanks! I see the gate now.',
      timestamp: '10:23 AM'
    }
  ]);

  const orderData = user.orderId ? {
    id: user.orderId,
    status: "active" as "active" | "completed" | "cancelled",
    pickupAddress: "123 Pickup St, City",
    deliveryAddress: "456 Delivery Ave, City",
    driverName: user.role === 'driver' ? user.name : "Alex Driver",
    clientName: user.role === 'client' ? user.name : "Maria Client",
    eta: "15 minutes",
    createdAt: "Today at 9:30 AM",
    pickupTime: "10:00 AM",
    dropoffTime: "11:30 AM"
  } : null;

  const showDriverInfo = !(user.role === 'driver' && user.status === 'working');

  const handleSendMessage = () => {
    if (message.trim() === '' && attachedFiles.length === 0) return;
    
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role === 'driver' ? 'driver' : 'client',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      attachments: attachedFiles.map(file => ({
        id: `att-${Date.now()}-${file.file.name}`,
        name: file.file.name,
        type: file.type,
        url: URL.createObjectURL(file.file)
      }))
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setAttachedFiles([]);
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      console.log("Adding note:", noteText);
      setNoteText("");
    }
  };

  const handleSendVoiceMessage = (audioBlob: Blob) => {
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role === 'driver' ? 'driver' : 'client',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      attachments: [{
        id: `voice-${Date.now()}`,
        name: 'Voice Message',
        type: 'voice',
        url: URL.createObjectURL(audioBlob)
      }]
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <>
            <ScrollArea className="flex-1 p-4 overflow-y-auto">
              <ChatMessages messages={messages} />
            </ScrollArea>
            <ChatInput 
              onSendMessage={handleSendMessage}
              message={message}
              setMessage={setMessage}
              attachedFiles={attachedFiles}
              setAttachedFiles={setAttachedFiles}
              onSendVoiceMessage={handleSendVoiceMessage}
            />
          </>
        );
      case 'history':
        return (
          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            <ChatHistory userId={user.id} />
          </ScrollArea>
        );
      case 'notes':
        return (
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Write your note here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <Button
                onClick={handleAddNote}
                className="w-full"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-muted-foreground">No notes available.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`grid ${orderData ? 'grid-cols-[1fr_320px]' : 'grid-cols-[1fr]'} gap-4 h-full`}>
      <div className="flex flex-col rounded-lg border bg-card shadow-sm overflow-hidden">
        <ChatHeader 
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={handleClose}
        />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {renderContent()}
        </div>
      </div>

      {orderData && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <OrderDetails orderData={orderData} showDriverInfo={showDriverInfo} />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
