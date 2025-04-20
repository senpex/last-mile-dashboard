import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic, X } from "lucide-react";
interface ChatInputProps {
  onSendMessage: () => void;
  message: string;
  setMessage: (message: string) => void;
  attachedFiles: Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>;
  setAttachedFiles: React.Dispatch<React.SetStateAction<Array<{
    file: File;
    type: 'image' | 'document' | 'spreadsheet' | 'pdf';
  }>>>;
}
export const ChatInput = ({
  onSendMessage,
  message,
  setMessage,
  attachedFiles,
  setAttachedFiles
}: ChatInputProps) => {
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
  const getFileType = (file: File): 'image' | 'document' | 'spreadsheet' | 'pdf' => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
    if (['xls', 'xlsx'].includes(extension || '')) return 'spreadsheet';
    if (extension === 'pdf') return 'pdf';
    return 'document';
  };
  const removeFile = (index: number) => {
    setAttachedFiles(files => files.filter((_, i) => i !== index));
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  return <div className="p-4 border-t bg-background px-[15px] py-0 my-0">
      {attachedFiles.length > 0 && <div className="flex flex-wrap gap-2 mb-2 p-2 bg-muted rounded-md">
          {attachedFiles.map((file, index) => <div key={index} className="flex items-center gap-1 bg-background px-2 py-1 rounded-md text-xs">
              <span className="max-w-[100px] truncate">{file.file.name}</span>
              <button onClick={() => removeFile(index)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </div>)}
        </div>}
      
      <div className="flex items-end gap-2">
        <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message here..." className="min-h-[80px]" onKeyDown={handleKeyPress} />
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="icon" onClick={handleFileAttachment}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button size="icon" onClick={onSendMessage} disabled={message.trim() === '' && attachedFiles.length === 0}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>;
};