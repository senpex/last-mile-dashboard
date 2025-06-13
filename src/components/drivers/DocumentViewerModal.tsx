
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Upload, X } from "lucide-react";
import { toast } from "sonner";
interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
}
interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}
export const DocumentViewerModal = ({
  isOpen,
  onClose,
  document
}: DocumentViewerModalProps) => {
  if (!document) return null;
  const handleUpload = () => {
    // Simulate file upload
    const link = window.document.createElement('a');
    link.href = '#'; // In a real app, this would be the actual file URL
    link.download = `${document.name}.${document.type.toLowerCase()}`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    toast.success(`Uploaded ${document.name}`);
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image className="h-5 w-5 text-muted-foreground" />
              <div>
                <DialogTitle className="text-lg">{document.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Image • Uploaded {document.uploadDate}
                  </span>
                  <Badge variant={document.status === 'Verified' ? 'default' : 'secondary'}>
                    {document.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6">
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-gray-600 mb-2">Document Preview</p>
              <p className="text-sm text-gray-500">
                Document preview would be displayed here
              </p>
              
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
