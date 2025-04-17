
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const CommunicationPanel = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("drivers");
  const [channels, setChannels] = useState<string[]>(["sms", "email", "inapp"]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredRecipients = searchQuery.length > 0 
    ? mockRecipients[activeTab as keyof typeof mockRecipients]
        .filter(recipient => recipient.name.toLowerCase().includes(searchQuery.toLowerCase())) 
    : [];

  const handleSelectRecipient = (recipient: Recipient) => {
    const isAlreadySelected = selectedRecipients.some(r => r.id === recipient.id);
    if (isAlreadySelected) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
    setSearchQuery("");
    setIsSearchOpen(false);
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
            <div className="mt-4 mb-6">
              <label htmlFor="contact-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Find contact:
              </label>
              <div className="relative">
                <DropdownMenu open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                  <DropdownMenuTrigger asChild>
                    <div className="w-full">
                      <Input 
                        id="contact-search"
                        value={searchQuery} 
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsSearchOpen(!!e.target.value);
                        }}
                        placeholder="Search drivers" 
                        className="w-full pl-8" 
                      />
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-[--radix-dropdown-menu-trigger-width] max-h-[300px] overflow-hidden bg-popover" 
                    align="start"
                  >
                    {searchQuery && (
                      <ScrollArea className="max-h-[300px]">
                        {filteredRecipients.length > 0 ? (
                          <div className="py-2">
                            {filteredRecipients.map((recipient) => (
                              <button
                                key={recipient.id}
                                onClick={() => handleSelectRecipient(recipient)}
                                className={cn(
                                  "w-full px-4 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                  selectedRecipients.some(r => r.id === recipient.id) && "bg-accent"
                                )}
                              >
                                {recipient.name}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="py-2 px-4 text-sm text-muted-foreground">
                            No results found
                          </div>
                        )}
                      </ScrollArea>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mb-4">
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
              <SearchInput 
                id="client-search"
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search clients" 
                className="w-full" 
              />
            </div>

            <div className="mb-4">
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
              <SearchInput 
                id="dispatcher-search"
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search dispatchers" 
                className="w-full" 
              />
            </div>

            <div className="mb-4">
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

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4 mt-[160px]">
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
