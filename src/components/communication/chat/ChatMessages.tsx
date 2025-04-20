
import React, { useRef, useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, FileSpreadsheet, ImageIcon, Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePlayVoice = (attachmentId: string, url: string) => {
    if (!audioRefs.current[attachmentId]) {
      audioRefs.current[attachmentId] = new Audio(url);
      audioRefs.current[attachmentId].addEventListener('ended', () => {
        setPlayingAudio(null);
      });
    }

    if (playingAudio === attachmentId) {
      audioRefs.current[attachmentId].pause();
      audioRefs.current[attachmentId].currentTime = 0;
      setPlayingAudio(null);
    } else {
      if (playingAudio) {
        audioRefs.current[playingAudio].pause();
        audioRefs.current[playingAudio].currentTime = 0;
      }
      audioRefs.current[attachmentId].play();
      setPlayingAudio(attachmentId);
    }
  };

  return (
    <>
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`mb-4 flex ${msg.senderRole === 'dispatcher' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`
              max-w-[75%] 
              ${msg.senderRole === 'dispatcher' 
                ? 'bg-primary/80 text-primary-foreground' 
                : 'bg-muted/70 text-foreground'}
              rounded-lg p-3
              dark:bg-gray-700/60 
              dark:text-gray-200
            `}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm dark:text-gray-300">{msg.senderName}</span>
              <span className="text-xs opacity-70 dark:text-gray-400">{msg.timestamp}</span>
            </div>
            <p className="mt-1">{msg.content}</p>
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.attachments.map(attachment => (
                  <div 
                    key={attachment.id}
                    className="
                      flex items-center gap-1 
                      bg-background/50 
                      dark:bg-gray-800/50 
                      px-2 py-1 
                      rounded 
                      text-xs
                    "
                  >
                    {attachment.type === 'voice' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => handlePlayVoice(attachment.id, attachment.url)}
                      >
                        {playingAudio === attachment.id ? (
                          <span>Playing...</span>
                        ) : (
                          <Play className="h-4 w-4 mr-1" />
                        )}
                        Voice Message
                      </Button>
                    ) : (
                      <>
                        <FileIcon type={attachment.type} />
                        <span className="max-w-[120px] truncate">{attachment.name}</span>
                      </>
                    )}
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
