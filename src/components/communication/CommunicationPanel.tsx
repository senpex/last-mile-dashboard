import React, { useState } from "react";
import { Search, Users, User, Send, Clock, MessageSquare, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const messageTemplates = [{
  id: "template1",
  name: "Order Arriving",
  content: "Your order is arriving soon. Please be ready to receive it."
}, {
  id: "template2",
  name: "Driver Delayed",
  content: "Your driver is delayed due to traffic. We apologize for the inconvenience."
}, {
  id: "template3",
  name: "Confirm Availability",
  content: "Please confirm your availability for the scheduled delivery."
}, {
  id: "template4",
  name: "Delivery Completed",
  content: "Your delivery has been completed. Thank you for using our service!"
}];

const mockRecipients = {
  clients: [{
    id: "c2",
    name: "Emma Johnson",
    type: "client"
  }, {
    id: "c3",
    name: "Michael Brown",
    type: "client"
  }],
  drivers: [{
    id: "d2",
    name: "Sarah Wilson",
    type: "driver"
  }, {
    id: "d3",
    name: "James Taylor",
    type: "driver"
  }],
  groups: [{
    id: "g1",
    name: "All Drivers in Zone 3",
    type: "group"
  }, {
    id: "g2",
    name: "Clients with active orders",
    type: "group"
  }, {
    id: "g3",
    name: "Today's Deliveries",
    type: "group"
  }]
};

type Recipient = {
  id: string;
  name: string;
  type: string;
};

const CommunicationPanel = () => {
  const {
    toast
  } = useToast();
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");
  const [channels, setChannels] = useState<string[]>(["sms", "email", "inapp"]);

  const filteredRecipients = searchQuery.length > 0 ? mockRecipients[activeTab as keyof typeof mockRecipients].filter(recipient => recipient.name.toLowerCase().includes(searchQuery.toLowerCase())) : mockRecipients[activeTab as keyof typeof mockRecipients];

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

  const handleChannelToggle = (value: string[]) => {
    console.log("Channel toggled:", value);
    setChannels(value);
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
    const messageData = {
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

  return <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 my-0 h-[calc(100vh-180px)] overflow-auto">
    <div className="mb-6">
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
        
        <div className="mb-6">
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
          {selectedRecipients.length > 0 ? <div className="flex flex-wrap gap-2">
              {selectedRecipients.map(recipient => <div key={recipient.id} className="bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-3 text-sm flex items-center">
                  <span className="text-foreground dark:text-gray-300">{recipient.name}</span>
                  <button className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={() => handleSelectRecipient(recipient)}>
                    &times;
                  </button>
                </div>)}
            </div> : <p className="text-gray-500 dark:text-gray-400 text-sm">No recipients selected</p>}
        </div>

        <div className="space-y-2">
          {filteredRecipients.map(recipient => <div key={recipient.id} className={cn("flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800", selectedRecipients.some(r => r.id === recipient.id) ? "bg-gray-200 dark:bg-gray-700" : "")} onClick={() => handleSelectRecipient(recipient)}>
              <span>{recipient.name}</span>
            </div>)}
        </div>
      </Tabs>
    </div>

    <div className="mb-5">
      <label className="block text-sm font-medium text-foreground dark:text-gray-300 mb-2">
        Select Communication Channels:
      </label>
      <ToggleGroup type="multiple" variant="outline" className="justify-start" value={channels} onValueChange={handleChannelToggle}>
        <ToggleGroupItem value="sms" aria-label="Toggle SMS" className={`${channels.includes('sms') ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-gray-100 text-foreground dark:bg-gray-800 dark:text-gray-300 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200'} transition-colors`}>
          <Smartphone className={`mr-1 h-4 w-4 ${channels.includes('sms') ? 'text-white' : ''}`} />
          <span>SMS</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem value="email" aria-label="Toggle Email" className={`${channels.includes('email') ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-gray-100 text-foreground dark:bg-gray-800 dark:text-gray-300 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200'} transition-colors`}>
          <Mail className={`mr-1 h-4 w-4 ${channels.includes('email') ? 'text-white' : ''}`} />
          <span>Email</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem value="inapp" aria-label="Toggle In-App" className={`${channels.includes('inapp') ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-gray-100 text-foreground dark:bg-gray-800 dark:text-gray-300 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-200'} transition-colors`}>
          <MessageSquare className={`mr-1 h-4 w-4 ${channels.includes('inapp') ? 'text-white' : ''}`} />
          <span>In-App</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <div className="mb-5">
      <div className="flex items-center justify-between my-[40px]">
        <label className="block text-sm font-medium text-foreground dark:text-gray-300">
          Message:
        </label>
        <Select onValueChange={handleSelectTemplate}>
          <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            {messageTemplates.map(template => <SelectItem key={template.id} value={template.id} className="dark:hover:bg-gray-700 dark:text-gray-300">
                {template.name}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message here..." className="mt-2 min-h-[120px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300" />
    </div>

    <div className="flex justify-end space-x-4">
      <Button variant="outline" className="flex items-center gap-1 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
        <Clock className="h-4 w-4 dark:text-gray-300" />
        Schedule
      </Button>
      <Button onClick={handleSendMessage} className="flex items-center gap-1" disabled={message.trim() === "" || selectedRecipients.length === 0 || channels.length === 0}>
        <Send className="h-4 w-4" />
        Send Now
      </Button>
    </div>
  </div>;
};

export default CommunicationPanel;
