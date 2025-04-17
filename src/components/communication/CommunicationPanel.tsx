import React, { useState } from "react";
import { Search, Users, User, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { RecipientList } from "./RecipientList";
import { CommunicationChannels } from "./CommunicationChannels";
import { MessageTemplates, messageTemplates } from "./MessageTemplates";
import { Recipient, mockRecipients, MessageData } from "./types";

const CommunicationPanel = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");
  const [channels, setChannels] = useState<string[]>(["sms", "email", "inapp"]);

  const filteredRecipients = searchQuery.length > 0 
    ? mockRecipients[activeTab as keyof typeof mockRecipients]
        .filter(recipient => recipient.name.toLowerCase().includes(searchQuery.toLowerCase())) 
    : mockRecipients[activeTab as keyof typeof mockRecipients];

  const handleSelectRecipient = (recipient: Recipient) => {
    const isAlreadySelected = selectedRecipients.some(r => r.id === recipient.id);
    if (isAlreadySelected) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || selectedRecipients.length === 0 || channels.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (message, recipients, and channels)",
        variant: "destructive"
      });
      return;
    }

    const messageData: MessageData = {
      message,
      recipients: selectedRecipients,
      channels,
      timestamp: new Date().toISOString()
    };
    
    console.log("Sending message:", messageData);
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedRecipients.length} recipient(s) via ${channels.join(", ")}`
    });
    setMessage("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 my-0 h-[calc(100vh-180px)] overflow-auto">
      <div className="mb-8">
        <Tabs defaultValue="drivers" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-2 h-14">
            <TabsTrigger value="drivers" className="flex-1 h-full">
              <User className="mr-2 h-4 w-4" />Drivers
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex-1 h-full">
              <User className="mr-2 h-4 w-4" />Clients
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex-1 h-full">
              <Users className="mr-2 h-4 w-4" />Dispatchers
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-[10px] mb-[40px]">
            <label htmlFor="contact-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Find contact:
            </label>
            <SearchInput 
              id="contact-search"
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder={`Search ${activeTab}`} 
              className="w-full" 
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
              Selected Recipients:
            </label>
            <RecipientList 
              selectedRecipients={selectedRecipients}
              onRemoveRecipient={handleSelectRecipient}
            />
          </div>

          <div className="space-y-2">
            {filteredRecipients.map(recipient => (
              <div 
                key={recipient.id} 
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedRecipients.some(r => r.id === recipient.id) ? "bg-gray-200 dark:bg-gray-700" : ""
                }`} 
                onClick={() => handleSelectRecipient(recipient)}
              >
                <span>{recipient.name}</span>
              </div>
            ))}
          </div>
        </Tabs>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
        <CommunicationChannels 
          channels={channels}
          onChannelToggle={setChannels}
        />

        <div className="mb-5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground dark:text-gray-300">
              Message:
            </label>
            <MessageTemplates onSelectTemplate={handleSelectTemplate} />
          </div>
          <Textarea 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            placeholder="Type your message here..." 
            className="mt-2 min-h-[120px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300" 
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="flex items-center gap-1 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <Clock className="h-4 w-4 dark:text-gray-300" />
            Schedule
          </Button>
          <Button 
            onClick={handleSendMessage} 
            className="flex items-center gap-1" 
            disabled={message.trim() === "" || selectedRecipients.length === 0 || channels.length === 0}
          >
            <Send className="h-4 w-4" />
            Send Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;
