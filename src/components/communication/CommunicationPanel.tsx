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
  drivers: [],
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
  </div>;
};

export default CommunicationPanel;
