import React, { useState, useRef, useEffect } from "react";
import { Search, Users, User, Send, Clock, Paperclip, X, FileText, FileImage, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { RecipientList } from "./RecipientList";
import { CommunicationChannels } from "./CommunicationChannels";
import { MessageTemplates, messageTemplates } from "./MessageTemplates";
import { Recipient, MessageData } from "./types";
import { DeliveryStatus } from "@/types/delivery";

interface CommunicationPanelProps {
  selectedFilters?: {
    statuses?: DeliveryStatus[] | string[];
    zipcodes?: string[];
    cities?: string[];
    states?: string[];
    profiles?: string[];
    transports?: string[];
    hireStatuses?: string[];
    organizations?: string[];
    dispatchers?: string[];
    radius?: number;
    names?: string[];
  };
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const generateRandomDrivers = (count: number, startId: number = 10000): any[] => {
  const firstNames = ["John", "Jane", "Michael", "Emma", "David"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  return Array.from({
    length: count
  }, (_, i) => {
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

const generateRandomClients = (count: number, startId: number = 20000): any[] => {
  const companyNames = ["ABC Corp", "XYZ Ltd", "123 Industries", "Tech Solutions", "Global Services"];
  const contacts = ["John Smith", "Jane Doe", "Michael Brown", "Emma Wilson", "David Miller"];
  return Array.from({
    length: count
  }, (_, i) => {
    const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    const contact = contacts[Math.floor(Math.random() * contacts.length)];
    const email = `${contact.toLowerCase().replace(' ', '.')}@${companyName.toLowerCase().replace(' ', '')}.com`;
    const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    return {
      id: startId + i,
      name: companyName,
      contactName: contact,
      email,
      phone,
      status: "active"
    };
  });
};

const mockClients = generateRandomClients(20);

const CommunicationPanel = ({
  activeTab,
  setActiveTab,
  selectedFilters
}: CommunicationPanelProps) => {
  const {
    toast
  } = useToast();
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<string[]>(["sms", "email", "inapp"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    file: File;
    type: 'excel' | 'doc' | 'pdf' | 'image';
  }>>([]);

  const getFileType = (file: File): 'excel' | 'doc' | 'pdf' | 'image' => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['xls', 'xlsx'].includes(extension || '')) return 'excel';
    if (['doc', 'docx'].includes(extension || '')) return 'doc';
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png'].includes(extension || '')) return 'image';
    return 'doc'; // fallback
  };

  const handleFileAttachment = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png';
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles = Array.from(target.files).map(file => ({
          file,
          type: getFileType(file)
        }));
        setAttachedFiles(prev => [...prev, ...newFiles]);
      }
    };
    fileInput.click();
  };

  const removeFile = (index: number) => {
    setAttachedFiles(files => files.filter((_, i) => i !== index));
  };

  const FileIcon = ({
    type
  }: {
    type: 'excel' | 'doc' | 'pdf' | 'image';
  }) => {
    switch (type) {
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'doc':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'image':
        return <FileImage className="h-4 w-4 text-purple-600" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDrivers = searchQuery.length >= 3 ? mockDrivers.filter(driver => {
    const nameMatch = driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = driver.email.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = driver.phone.includes(searchQuery);
    const idMatch = driver.id.toString().includes(searchQuery);
    return nameMatch || emailMatch || phoneMatch || idMatch;
  }) : [];

  const filteredClients = searchQuery.length >= 3 ? mockClients.filter(client => {
    const nameMatch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const contactMatch = client.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = client.phone.includes(searchQuery);
    const idMatch = client.id.toString().includes(searchQuery);
    return nameMatch || contactMatch || emailMatch || phoneMatch || idMatch;
  }) : [];

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
    const messageData: MessageData = {
      message: message,
      recipients: selectedRecipients,
      channels: channels,
      timestamp: new Date().toISOString()
    };
    console.log("Sending message:", messageData);
    toast({
      title: "Message sent",
      description: `Message sent to ${selectedRecipients.length} recipients and ${hasAnyFilters ? 'filtered audiences' : ''}`
    });
    setMessage("");
  };

  const hasAnyFilters = selectedFilters && (
    (selectedFilters.statuses && selectedFilters.statuses.length > 0) ||
    (selectedFilters.zipcodes && selectedFilters.zipcodes.length > 0) ||
    (selectedFilters.cities && selectedFilters.cities.length > 0) ||
    (selectedFilters.states && selectedFilters.states.length > 0) ||
    (selectedFilters.profiles && selectedFilters.profiles.length > 0) ||
    (selectedFilters.transports && selectedFilters.transports.length > 0) ||
    (selectedFilters.hireStatuses && selectedFilters.hireStatuses.length > 0) ||
    (selectedFilters.organizations && selectedFilters.organizations.length > 0) ||
    (selectedFilters.dispatchers && selectedFilters.dispatchers.length > 0) ||
    (selectedFilters.radius && selectedFilters.radius !== 15) ||
    (selectedFilters.names && selectedFilters.names.length > 0)
  );

  return <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 my-0 flex flex-col h-[calc(100vh-180px)] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 light:border-2 light:border-gray-300 light:hover:border-gray-400 px-[20px]">
    <div className="flex-none">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={value => {
        if (setActiveTab) {
          setActiveTab(value);
        }
      }}>
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
          <div className="mt-4 mb-4" ref={searchRef}>
            <label htmlFor="contact-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Find contact:
            </label>
            <div className="relative">
              <Input id="contact-search" value={searchQuery} onChange={e => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length >= 3);
              }} placeholder="Search drivers" className="w-full pl-8" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              
              {showDropdown && searchQuery.length >= 3 && <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {filteredDrivers.length > 0 ? filteredDrivers.map(driver => <div key={driver.id} onClick={() => handleSelectRecipient(driver)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">ID: {driver.id}</span>
                          <div className="font-medium">{driver.name}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{driver.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{driver.phone}</div>
                      </div>
                      {selectedRecipients.some(r => r.id === driver.id) && <Check className="h-4 w-4 text-green-500" />}
                    </div>) : <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                      No results found
                    </div>}
              </div>}
            </div>
          </div>

          <div className="mb-4 h-[105px] overflow-y-auto my-0 py-[5px]">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300">
                Selected Recipients
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedRecipients.length} Selected
              </span>
            </div>
            <RecipientList selectedRecipients={selectedRecipients} onRemoveRecipient={handleSelectRecipient} selectedFilters={selectedFilters} />
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="mt-4 mb-4" ref={searchRef}>
            <label htmlFor="client-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Find contact:
            </label>
            <div className="relative">
              <Input id="client-search" value={searchQuery} onChange={e => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length >= 3);
              }} placeholder="Search clients" className="w-full pl-8" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />

              {showDropdown && searchQuery.length >= 3 && <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {filteredClients.length > 0 ? filteredClients.map(client => <div key={client.id} onClick={() => handleSelectRecipient(client)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">ID: {client.id}</span>
                          <div className="font-medium">{client.name}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{client.contactName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{client.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{client.phone}</div>
                      </div>
                      {selectedRecipients.some(r => r.id === client.id) && <Check className="h-4 w-4 text-green-500" />}
                    </div>) : <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                      No results found
                    </div>}
              </div>}
            </div>
          </div>

          <div className="mb-4 h-[120px] overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300">
                Selected Recipients
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedRecipients.length} Selected
              </span>
            </div>
            <RecipientList selectedRecipients={selectedRecipients} onRemoveRecipient={handleSelectRecipient} selectedFilters={selectedFilters} />
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="mt-4 mb-6">
            <label htmlFor="dispatcher-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Find contact:
            </label>
            <div className="relative">
              <Input id="dispatcher-search" value={searchQuery} onChange={e => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length >= 3);
              }} placeholder="Search dispatchers" className="w-full pl-8" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="mb-4 h-[140px]">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-foreground dark:text-gray-300">
                Selected Recipients
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedRecipients.length} Selected
              </span>
            </div>
            <RecipientList selectedRecipients={selectedRecipients} onRemoveRecipient={handleSelectRecipient} selectedFilters={selectedFilters} />
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <div className="flex-1 min-h-[20px]" />

    <div className="flex-none mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3 my-0 py-[16px]">
      <CommunicationChannels channels={channels} onChannelToggle={setChannels} />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground dark:text-gray-300">
            Message:
          </label>
          <MessageTemplates onSelectTemplate={handleSelectTemplate} />
        </div>
        <div className="relative">
          <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message here..." className="min-h-[100px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300" />
          {attachedFiles.length > 0 && <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 bg-background/80 p-2 rounded-md">
              {attachedFiles.map((file, index) => <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs">
                  <FileIcon type={file.type} />
                  <span className="max-w-[100px] truncate">{file.file.name}</span>
                  <button onClick={() => removeFile(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </div>)}
            </div>}
        </div>

        <div className="flex justify-between items-center space-x-4 mt-3">
          <Button variant="ghost" size="icon" onClick={handleFileAttachment} title="Attach files" className="hover:bg-accent">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center gap-1 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              <Clock className="h-4 w-4 dark:text-gray-300" />
              Schedule
            </Button>
            <Button onClick={handleSendMessage} className={`flex items-center gap-1 ${message.trim() !== "" && (selectedRecipients.length > 0 || hasAnyFilters) && channels.length > 0 ? "bg-green-600 text-white hover:bg-green-700" : ""}`} disabled={message.trim() === "" || !selectedRecipients.length && !hasAnyFilters || channels.length === 0}>
              <Send className="h-4 w-4" />
              Send Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default CommunicationPanel;
