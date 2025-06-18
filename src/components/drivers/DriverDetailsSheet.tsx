import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Mail, MapPin, Calendar, Eye, Star, Clock, CreditCard, FileText, Truck } from "lucide-react";
import { DocumentViewerModal } from './DocumentViewerModal';
import { StatusBadge } from '../communication/order-views/StatusBadge';

interface Driver {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  hireDate: string;
  licenseNumber: string;
  vehicle: string;
  performanceScore: number;
  documents: Document[];
}

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
}

interface DriverDetailsSheetProps {
  driver: Driver;
  isOpen: boolean;
  onClose: () => void;
}

const sampleDocuments = [
  {
    id: 1,
    name: "Driver License",
    type: "image/jpeg",
    uploadDate: "2023-03-15",
    status: "active"
  },
  {
    id: 2,
    name: "Vehicle Registration",
    type: "image/png",
    uploadDate: "2023-04-20",
    status: "active"
  },
  {
    id: 3,
    name: "Insurance Policy",
    type: "application/pdf",
    uploadDate: "2023-05-01",
    status: "pending"
  }
];

const sampleOrders = [
  {
    id: "ORD-2024-001",
    pickupDate: "2024-01-15",
    status: "active" as const
  },
  {
    id: "ORD-2024-002", 
    pickupDate: "2024-01-16",
    status: "active" as const
  },
  {
    id: "ORD-2024-003",
    pickupDate: "2024-01-14", 
    status: "completed" as const
  },
  {
    id: "ORD-2024-004",
    pickupDate: "2024-01-17",
    status: "active" as const
  }
];

export const DriverDetailsSheet = ({ driver, isOpen, onClose }: DriverDetailsSheetProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const closeDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader className="pb-6">
            <SheetTitle className="flex items-center gap-3">
              <Truck className="h-5 w-5" />
              <span>Driver Details</span>
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Driver Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{driver.address}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Birth Date: {driver.birthDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Hire Date: {driver.hireDate}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Vehicle: {driver.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>License Number: {driver.licenseNumber}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Performance Score: {driver.performanceScore}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleDocuments.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium">{document.name}</TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.uploadDate}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{document.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleDocumentClick(document)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    <span className="hidden sm:inline">Orders on hands</span>
                    <span className="sm:hidden">Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Pickup Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.pickupDate}</TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <DocumentViewerModal
        isOpen={isDocumentModalOpen}
        onClose={closeDocumentModal}
        document={selectedDocument}
      />
    </>
  );
};
