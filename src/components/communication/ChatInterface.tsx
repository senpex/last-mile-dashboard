import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Paperclip, 
  Mic, 
  MapPin, 
  MoreVertical, 
  User, 
  Clock, 
  Package, 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  X,
  ChevronUp,
  ChevronDown,
  UserRound,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { OrderDetails } from './OrderDetails';

type User = {
  id: string;
  name: string;
  role: string;
  status: string;
  priority: string;
};

interface ChatInterfaceProps {
  chatId: string;
  user: User;
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

type OrderType = {
  id: string;
  status: 'active' | 'completed' | 'cancelled';
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
  clientName: string;
  eta: string;
  createdAt: string;
};

type NoteType = {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
};

export const ChatInterface = ({ chatId, user }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [orderDetailsExpanded, setOrderDetailsExpanded] = useState(true);
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleFileAttachment = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.gif';
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

  const handleSendMessage = () => {
    if (message.trim() === '' && attachedFiles.length === 0) return;
    console.log("Sending message:", message, attachedFiles);
    setMessage('');
    setAttachedFiles([]);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const FileIcon = ({ type }: { type: 'image' | 'document' | 'spreadsheet' | 'pdf' | 'voice' }) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4 text-purple-600" />;
      case 'document':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'voice':
        return <Mic className="h-4 w-4 text-amber-600" />;
    }
  };

  const StatusBadge = ({ status }: { status: 'active' | 'completed' | 'cancelled' }) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
    }
  };
  
  const orderData: OrderType = {
    id: "ORD-1234",
    status: "active",
    pickupAddress: "123 Pickup St, City",
    deliveryAddress: "456 Delivery Ave, City",
    driverName: user.role === 'driver' ? user.name : "Alex Driver",
    clientName: user.role === 'client' ? user.name : "Maria Client",
    eta: "15 minutes",
    createdAt: "Today at 9:30 AM"
  };

  const notes: NoteType[] = [
    {
      id: "note1",
      content: "Customer called earlier about delivery instructions",
      createdBy: "Jane Dispatcher",
      createdAt: "9:45 AM"
    },
    {
      id: "note2",
      content: "Driver was previously sent to wrong address",
      createdBy: "John Dispatcher",
      createdAt: "9:50 AM"
    }
  ];

  const getFileType = (file: File): 'image' | 'document' | 'spreadsheet' | 'pdf' => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
    if (['xls', 'xlsx'].includes(extension || '')) return 'spreadsheet';
    if (extension === 'pdf') return 'pdf';
    return 'document'; // fallback for doc, docx, etc.
  };

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-card">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <UserRound className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-medium">{user.name}</h2>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                {user.role === 'driver' ? 'Driver' : 'Client'} • 
                <span className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                {user.status === 'online' ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Reassign Chat
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <X className="h-4 w-4 mr-2" />
                  Close Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-9">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="history">Chat History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} className="flex-1 flex flex-col">
            <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col m-0">
              <ScrollArea className="flex-1 p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 flex ${msg.senderRole === 'dispatcher' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${msg.senderRole === 'dispatcher' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{msg.senderName}</span>
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                      </div>
                      <p className="mt-1">{msg.content}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {msg.attachments.map(attachment => (
                            <div 
                              key={attachment.id}
                              className="flex items-center gap-1 bg-background/80 px-2 py-1 rounded text-xs"
                            >
                              <FileIcon type={attachment.type} />
                              <span className="max-w-[120px] truncate">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </ScrollArea>
              
              <div className="p-4 border-t bg-background">
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2 p-2 bg-muted rounded-md">
                    {attachedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1 bg-background px-2 py-1 rounded-md text-xs"
                      >
                        <FileIcon type={file.type} />
                        <span className="max-w-[100px] truncate">{file.file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-end gap-2">
                  <Textarea 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Type your message here..." 
                    className="min-h-[80px]"
                    onKeyDown={handleKeyPress}
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="icon" onClick={handleFileAttachment}>
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage} disabled={message.trim() === '' && attachedFiles.length === 0}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="flex-1 overflow-auto p-4 m-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Notes</h3>
                  <Button size="sm">Add Note</Button>
                </div>
                
                {notes.map(note => (
                  <Card key={note.id} className="mb-3">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{note.createdBy}</span>
                        <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p>{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="flex-1 overflow-auto p-4 m-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Previous Conversations</h3>
                  
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} className="cursor-pointer hover:bg-muted/50">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</span>
                            <Badge variant="outline">12 messages</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            Last message: Thanks for your help with the delivery issue...
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-80 border-l bg-muted/30">
          <OrderDetails orderData={orderData} />
          <Separator />
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Contact Info</h3>
              <Button variant="ghost" size="sm" onClick={() => setNotesExpanded(!notesExpanded)}>
                {notesExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {notesExpanded && (
              <div className="space-y-3">
                {user.role === 'driver' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>D</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{orderData.driverName}</div>
                        <div className="text-xs text-gray-500">Driver</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-3 w-3" />
                        <span>+1 (123) 456-7890</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">driver@example.com</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{orderData.clientName}</div>
                        <div className="text-xs text-gray-500">Client</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-3 w-3" />
                        <span>+1 (234) 567-8901</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">client@example.com</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-auto p-4">
            <div className="flex justify-between mb-2">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
