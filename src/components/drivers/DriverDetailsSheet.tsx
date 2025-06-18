
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Clock,
  FileText,
  Eye,
  CreditCard,
  Truck,
  Send,
  Activity
} from "lucide-react";
import { EmailsSentList } from "./EmailsSentList";
import { DocumentViewerModal } from "./DocumentViewerModal";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  location: string;
  joinDate: string;
  totalDeliveries: number;
  rating: number;
  earnings: number;
  lastActive: string;
  documents: {
    license: string;
    insurance: string;
    registration: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  paymentHistory: Array<{
    id: string;
    orderId: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    type: 'delivery' | 'bonus' | 'adjustment';
  }>;
  activityLog: Array<{
    id: string;
    action: string;
    timestamp: string;
    details: string;
  }>;
}

interface DriverDetailsSheetProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderDetails: (orderId: string) => void;
}

export const DriverDetailsSheet = ({ driver, isOpen, onClose, onOpenOrderDetails }: DriverDetailsSheetProps) => {
  const [selectedDocument, setSelectedDocument] = React.useState<string | null>(null);
  const [documentViewerOpen, setDocumentViewerOpen] = React.useState(false);

  if (!driver) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDocumentView = (documentUrl: string) => {
    setSelectedDocument(documentUrl);
    setDocumentViewerOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[600px] sm:w-[800px] sm:max-w-[800px] overflow-hidden flex flex-col">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="flex items-center justify-between">
              <span>{driver.name}</span>
              <Badge className={getStatusColor(driver.status)}>
                {driver.status}
              </Badge>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="overview" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="payment-history">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Payment History
                </TabsTrigger>
                <TabsTrigger value="emails-sent">
                  <Send className="w-4 h-4 mr-1" />
                  Emails sent
                </TabsTrigger>
                <TabsTrigger value="activity-log">
                  <Activity className="w-4 h-4 mr-1" />
                  Activity Log
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="overview" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      {/* Basic Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Basic Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{driver.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{driver.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{driver.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">Joined {driver.joinDate}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Performance Stats */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Performance Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{driver.totalDeliveries}</div>
                              <div className="text-sm text-gray-600">Total Deliveries</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{driver.rating}/5</div>
                              <div className="text-sm text-gray-600">Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">${driver.earnings}</div>
                              <div className="text-sm text-gray-600">Total Earnings</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{driver.lastActive}</div>
                              <div className="text-sm text-gray-600">Last Active</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Documents */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Documents
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Driver's License</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentView(driver.documents.license)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span>Insurance</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentView(driver.documents.insurance)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span>Registration</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentView(driver.documents.registration)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="payment-history" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <div className="space-y-4">
                        {driver.paymentHistory.map((payment) => (
                          <Card key={payment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span 
                                      className="font-medium text-blue-600 hover:underline cursor-pointer"
                                      onClick={() => onOpenOrderDetails(payment.orderId)}
                                    >
                                      Order #{payment.orderId}
                                    </span>
                                    <Badge className={getPaymentStatusColor(payment.status)}>
                                      {payment.status}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {payment.type} • {payment.date}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-green-600">
                                    ${payment.amount}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="emails-sent" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <EmailsSentList driverId={driver.id} />
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="activity-log" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <div className="space-y-4">
                        {driver.activityLog.map((activity) => (
                          <Card key={activity.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="font-medium">{activity.action}</div>
                                  <div className="text-sm text-gray-600">{activity.details}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {activity.timestamp}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      <DocumentViewerModal
        isOpen={documentViewerOpen}
        onClose={() => setDocumentViewerOpen(false)}
        documentUrl={selectedDocument}
      />
    </>
  );
};
