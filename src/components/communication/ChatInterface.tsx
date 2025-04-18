import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderDetails } from './OrderDetails';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';

interface ChatInterfaceProps {
  chatId: string;
  user: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
  };
}

type MessageType = {
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

export const ChatInterface = ({ chatId, user }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>>([]);

  const messages: MessageType[] = [
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
  ];

  const orderData = {
    id: "ORD-1234",
    status: "active" as "active" | "completed" | "cancelled",
    pickupAddress: "123 Pickup St, City",
    deliveryAddress: "456 Delivery Ave, City",
    driverName: user.role === 'driver' ? user.name : "Alex Driver",
    clientName: user.role === 'client' ? user.name : "Maria Client",
    eta: "15 minutes",
    createdAt: "Today at 9:30 AM"
  };

  const handleSendMessage = () => {
    if (message.trim() === '' && attachedFiles.length === 0) return;
    console.log("Sending message:", message, attachedFiles);
    setMessage('');
    setAttachedFiles([]);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card shadow-sm overflow-hidden">
      <ChatHeader 
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden flex flex-col m-0">
            <ScrollArea className="flex-1 p-4">
              <ChatMessages messages={messages} />
            </ScrollArea>
            
            <ChatInput 
              onSendMessage={handleSendMessage}
              message={message}
              setMessage={setMessage}
              attachedFiles={attachedFiles}
              setAttachedFiles={setAttachedFiles}
            />
          </div>
        </div>
        
        <div className="w-80 border-l bg-muted/30">
          <OrderDetails orderData={orderData} />
        </div>
      </div>
    </div>
  );
};
