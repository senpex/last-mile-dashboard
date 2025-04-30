
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, Play, Pause, FileText } from "lucide-react";
import { MessageType } from '../ChatInterface';
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: MessageType[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const [playing, setPlaying] = React.useState<string | null>(null);
  const audioRefs = React.useRef<{ [key: string]: HTMLAudioElement }>({});

  React.useEffect(() => {
    // Cleanup audio playback when component unmounts
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const togglePlayPause = (id: string, url: string) => {
    // If this is first time playing this audio
    if (!audioRefs.current[id]) {
      const audio = new Audio(url);
      audioRefs.current[id] = audio;
      
      audio.addEventListener('ended', () => {
        setPlaying(null);
      });
    }
    
    const audio = audioRefs.current[id];
    
    if (playing === id) {
      audio.pause();
      setPlaying(null);
    } else {
      // Pause any currently playing audio
      if (playing) {
        audioRefs.current[playing].pause();
      }
      
      audio.play();
      setPlaying(id);
    }
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        // Check if it's a note to display differently
        if (message.isNote) {
          return (
            <div key={message.id} className="flex justify-center my-6">
              <div className="max-w-[85%] bg-yellow-100 border border-yellow-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Note from {message.senderName}</span>
                </div>
                <div className="text-sm text-yellow-900">{message.content}</div>
                <div className="text-right text-xs text-yellow-600 mt-2">{message.timestamp}</div>
              </div>
            </div>
          );
        }

        const isCurrentUser = message.senderId === 'driver1';
        
        return (
          <div 
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isCurrentUser && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {message.senderName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2", 
                isCurrentUser 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}
            >
              {!isCurrentUser && (
                <div className="text-xs font-medium mb-1">
                  {message.senderName}
                </div>
              )}
              
              {message.content && (
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              )}
              
              {message.attachments && message.attachments.map(attachment => {
                if (attachment.type === 'image') {
                  return (
                    <div key={attachment.id} className="mt-2">
                      <img 
                        src={attachment.url} 
                        alt={attachment.name}
                        className="max-w-full rounded-md"
                      />
                    </div>
                  );
                } else if (attachment.type === 'voice') {
                  return (
                    <div key={attachment.id} className="mt-2 flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => togglePlayPause(attachment.id, attachment.url)}
                      >
                        {playing === attachment.id ? 
                          <Pause className="h-4 w-4" /> : 
                          <Play className="h-4 w-4" />
                        }
                      </Button>
                      <div className="text-xs">Voice Message</div>
                    </div>
                  );
                } else {
                  return (
                    <div key={attachment.id} className="mt-2 bg-card/50 border rounded-md p-2 flex items-center justify-between">
                      <div className="text-xs truncate flex-1">
                        {attachment.name}
                      </div>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                }
              })}
              
              <div className="text-[10px] opacity-70 mt-1 text-right">
                {message.timestamp}
              </div>
            </div>
            
            {isCurrentUser && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {message.senderName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
    </div>
  );
};
