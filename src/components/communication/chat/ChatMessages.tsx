
import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, FileSpreadsheet, ImageIcon, Mic } from "lucide-react";
import { MessageType } from '../ChatInterface';

interface ChatMessagesProps {
  messages: MessageType[];
}

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

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
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
    </>
  );
};
