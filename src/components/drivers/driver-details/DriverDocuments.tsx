
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Upload, FileText } from "lucide-react";
import { DocumentViewerModal } from "../DocumentViewerModal";

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
}

interface DriverDocumentsProps {
  driver: any;
}

export const DriverDocuments: React.FC<DriverDocumentsProps> = ({ driver }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);

  const mockDocuments: Document[] = [
    {
      id: 1,
      name: "Driver's License",
      type: "PDF",
      uploadDate: "2024-01-15",
      status: "approved"
    },
    {
      id: 2,
      name: "Insurance Certificate",
      type: "PDF",
      uploadDate: "2024-01-16",
      status: "pending"
    },
    {
      id: 3,
      name: "Vehicle Registration",
      type: "PDF",
      uploadDate: "2024-01-17",
      status: "approved"
    }
  ];

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDocumentViewerOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {document.type} • Uploaded {document.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusBadgeVariant(document.status)}>
                    {document.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleViewDocument(document)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DocumentViewerModal
        isOpen={isDocumentViewerOpen}
        onClose={() => setIsDocumentViewerOpen(false)}
        document={selectedDocument}
      />
    </>
  );
};
