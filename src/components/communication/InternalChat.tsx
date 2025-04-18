
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, MessageSquare, Send, X, Paperclip, Users, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InternalChatProps {
  onClose?: () => void;
  initialExpanded?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface Dispatcher {
  id: string;
  name: string;
  online: boolean;
  avatar?: string;
}

export const InternalChat = ({ onClose, initialExpanded = false }: InternalChatProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<'chat' | 'team'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'disp1',
      senderName: 'Jane Cooper',
      content: 'Hey team, has anyone handled the issue with route 54?',
      timestamp: '10:15 AM'
    },
    {
      id: '2',
      senderId: 'disp2',
      senderName: 'Alex Morgan',
      content: 'I'm on it. Driver got stuck in traffic but should be moving again soon.',
      timestamp: '10:17 AM'
    },
    {
      id: '3',
      senderId: 'disp3',
      senderName: 'Taylor Swift',
      content: 'Thanks Alex! Can you also check on the Smith delivery?',
      timestamp: '10:20 AM'
    }
  ];

  const dispatchers: Dispatcher[] = [
    { id: 'disp1', name: 'Jane Cooper', online: true },
    { id: 'disp2', name: 'Alex Morgan', online: true },
    { id: 'disp3', name: 'Taylor Swift', online: true },
    { id: 'disp4', name: 'Robert Johnson', online: false },
    { id: 'disp5', name: 'Emma Williams', online: false }
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    // Here you would send the message to your backend
    console.log("Sending internal message:", message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isExpanded, messages]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={`fixed right-4 bottom-4 shadow-lg transition-all duration-300 overflow-hidden ${isExpanded ? 'w-80 h-96' : 'w-auto h-auto'}`}>
      {isExpanded ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-3 border-b bg-primary text-primary-foreground flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <h3 className="font-medium">Team Chat</h3>
              <Badge variant="secondary" className="ml-1">{dispatchers.filter(d => d.online).length}</Badge>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground" onClick={handleToggleExpand}>
                <ChevronUp className="h-4 w-4" />
              </Button>
              {onClose && (
                <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Tab Buttons */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'team')}>
            <TabsList className="flex border-b">
              <TabsTrigger 
                value="chat"
                className="flex-1 rounded-none"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="team"
                className="flex-1 rounded-none"
              >
                <Users className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
            </TabsList>

            {/* Chat Content */}
            <TabsContent value="chat">
              <ScrollArea className="flex-1 p-3 h-[calc(100%-90px)]">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-3">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {msg.senderName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{msg.senderName}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm mt-0.5">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="text-sm h-9"
                    onKeyDown={handleKeyPress}
                  />
                  <Button size="icon" className="h-9 w-9" onClick={handleSendMessage} disabled={message.trim() === ''}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Team Content */}
            <TabsContent value="team">
              <ScrollArea className="flex-1 p-3 h-[calc(100%-50px)]">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">ONLINE - {dispatchers.filter(d => d.online).length}</h4>
                  {dispatchers.filter(d => d.online).map(dispatcher => (
                    <div key={dispatcher.id} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {dispatcher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <div className="text-sm">{dispatcher.name}</div>
                      </div>
                      <div className="flex">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <h4 className="text-xs font-medium text-muted-foreground mt-4 mb-2">OFFLINE - {dispatchers.filter(d => !d.online).length}</h4>
                  {dispatchers.filter(d => !d.online).map(dispatcher => (
                    <div key={dispatcher.id} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted">
                              {dispatcher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-gray-400 border-2 border-white"></div>
                        </div>
                        <div className="text-sm text-muted-foreground">{dispatcher.name}</div>
                      </div>
                      <div className="flex">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Button 
          variant="default" 
          className="h-14 rounded-full p-3" 
          onClick={handleToggleExpand}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="ml-2">Team Chat ({dispatchers.filter(d => d.online).length})</span>
        </Button>
      )}
    </Card>
  );
};

export default InternalChat;
