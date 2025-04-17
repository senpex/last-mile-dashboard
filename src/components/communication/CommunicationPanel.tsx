import React, { useState, useRef, useEffect } from "react";
import { Search, Users, User, Send, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { RecipientList } from "./RecipientList";
import { CommunicationChannels } from "./CommunicationChannels";
import { MessageTemplates, messageTemplates } from "./MessageTemplates";
import { Recipient, MessageData } from "./types";

const generateRandomDrivers = (count: number, startId: number = 10000): any[] => {
  const firstNames = ["John", "Jane", "Michael", "Emma", "David"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    return {
      id: startId + i,
      name,
      email,
      phone,
      status: "online",
      transports: ["1", "2"],
      rating: 4.5,
      hireStatus: "hired"
    };
  });
};

const mockDrivers = generateRandomDrivers(20);

const CommunicationPanel = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");
  const [channels, setChannels] = useState<string[]>(["sms", "email", "inapp"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDrivers = searchQuery.length >= 3 
    ? mockDrivers.filter(driver => {
        const nameMatch = driver.name.toLowerCase().includes(searchQuery.toLowerCase());
        const emailMatch = driver.email.toLowerCase().includes(searchQuery.toLowerCase());
        const phoneMatch = driver.phone.includes(searchQuery);
        const idMatch = driver.id.toString().includes(searchQuery);
        return nameMatch || emailMatch || phoneMatch || idMatch;
      })
    : [];

  const handleSelectRecipient = (recipient: Recipient) => {
    const isAlreadySelected = selectedRecipients.some(r => r.id === recipient.id);
    if (isAlreadySelected) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
    setShowDropdown(false);
    setSearchQuery("");
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
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 my-0 h-[calc(100vh-180px)] overflow-auto">
      <div className="mb-6">
        <Tabs defaultValue="drivers" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4 h-14">
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

          <TabsContent value="drivers">
            <div className="mt-4 mb-6" ref={searchRef}>
              <label htmlFor="contact-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Find contact:
              </label>
              <div className="relative">
                <Input
                  id="contact-search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length >= 3);
                  }}
                  placeholder="Search drivers"
                  className="w-full pl-8"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                
                {showDropdown && searchQuery.length >= 3 && (
                  <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    {filteredDrivers.length > 0 ? (
                      filteredDrivers.map((driver) => (
                        <div
                          key={driver.id}
                          onClick={() => handleSelectRecipient(driver)}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">ID: {driver.id}</span>
                              <div className="font-medium">{driver.name}</div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{driver.email}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{driver.phone}</div>
                          </div>
                          {selectedRecipients.some(r => r.id === driver.id) && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 h-[140px]">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
                Selected Recipients:
              </label>
              <RecipientList
                selectedRecipients={selectedRecipients}
                onRemoveRecipient={handleSelectRecipient}
              />
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <div className="mt-4 mb-6">
              <label htmlFor="client-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Find contact:
              </label>
              <div className="relative">
                <Input 
                  id="client-search"
                  value={searchQuery} 
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length >= 3);
                  }}
                  placeholder="Search clients" 
                  className="w-full pl-8" 
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="mb-4 h-[140px]">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
                Selected Recipients:
              </label>
              <RecipientList 
                selectedRecipients={selectedRecipients}
                onRemoveRecipient={handleSelectRecipient}
              />
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <div className="mt-4 mb-6">
              <label htmlFor="dispatcher-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Find contact:
              </label>
              <div className="relative">
                <Input 
                  id="dispatcher-search"
                  value={searchQuery} 
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(e.target.value.length >= 3);
                  }}
                  placeholder="Search dispatchers" 
                  className="w-full pl-8" 
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="mb-4 h-[140px]">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
                Selected Recipients:
              </label>
              <RecipientList 
                selectedRecipients={selectedRecipients}
                onRemoveRecipient={handleSelectRecipient}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4 mt-[45px]">
        <CommunicationChannels 
          channels={channels}
          onChannelToggle={setChannels}
        />
        <div className="space-y-4">
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
            className="min-h-[120px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300" 
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
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
