
import { useState } from "react";
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
  };
}

// Define MessageType to ensure consistency across components
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

export const ChatInterface = ({ chatId, user }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>>([]);
  const [noteText, setNoteText] = useState("");

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

  const handleAddNote = () => {
    if (noteText.trim()) {
      console.log("Adding note:", noteText);
      setNoteText("");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <>
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
          </>
        );
      case 'history':
        return <ChatHistory userId={user.id} />;
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
    <div className="flex gap-4 h-full">
      <div className="flex-1 flex flex-col rounded-lg border bg-card shadow-sm overflow-hidden">
        <ChatHeader 
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {renderContent()}
        </div>
      </div>

      <div className="w-80 rounded-lg border bg-card shadow-sm overflow-hidden">
        <OrderDetails orderData={orderData} />
      </div>
    </div>
  );
};
