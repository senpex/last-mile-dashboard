
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, Calendar, Clock, Truck, CreditCard, MessageSquare, User, DollarSign } from "lucide-react";
import { EmailsSentTable } from "./EmailsSentTable";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (statusId: string) => React.ReactElement;
  renderStripeStatus: (status: "verified" | "unverified" | "pending") => React.ReactElement;
  renderHireStatus: (statusId: string) => React.ReactElement;
}

export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus,
  renderHireStatus
}: DriverDetailsSheetProps) => {
  if (!driver) return null;

  // Mock delivery data
  const mockDeliveries = [
    {
      id: "123456",
      customerName: "John Smith",
      pickupAddress: "123 Main St, City, State",
      dropoffAddress: "456 Oak Ave, City, State",
      price: 25.50,
      status: "delivered",
      date: "2024-01-15"
    },
    {
      id: "123457", 
      customerName: "Jane Doe",
      pickupAddress: "789 Pine St, City, State",
      dropoffAddress: "321 Elm St, City, State", 
      price: 18.75,
      status: "in_progress",
      date: "2024-01-14"
    }
  ];

  const totalEarnings = mockDeliveries.reduce((sum, delivery) => sum + delivery.price, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Driver Details - {driver.firstName} {driver.lastName}
          </SheetTitle>
          <SheetDescription>
            Complete information about this driver including profile, deliveries, and communication history.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="profile" className="h-[calc(100vh-120px)] flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="communication">Emails sent</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-6 p-1">
                {/* Basic Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-sm">{driver.firstName} {driver.lastName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Driver ID</label>
                        <p className="text-sm font-mono">{driver.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <p className="text-sm">{driver.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <p className="text-sm">{driver.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="mt-1">
                          {renderStatus(driver.status)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hire Status</label>
                        <div className="mt-1">
                          {renderHireStatus(driver.hireStatus)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Stripe Status</label>
                        <div className="mt-1">
                          {renderStripeStatus(driver.stripeStatus)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-sm">{driver.city}, {driver.state} {driver.zipcode}</p>
                      </div>
                    </div>

                    {driver.rating && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Rating</label>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{driver.rating}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Transport & Vehicle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Transport & Vehicle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Transport Types</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {driver.transports?.map((transportId: string) => (
                            <Badge key={transportId} variant="outline">
                              {transportTypes[transportId] || `Transport ${transportId}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Registration Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Registration Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Registration Date</label>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <p className="text-sm">{driver.registrationDate || 'Not available'}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Activity</label>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <p className="text-sm">{driver.lastActivity || 'Not available'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="deliveries" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4 p-1">
                {/* Earnings Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Earnings Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Total Earnings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{mockDeliveries.length}</p>
                        <p className="text-sm text-gray-500">Total Deliveries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">${(totalEarnings / mockDeliveries.length).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Avg per Delivery</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Deliveries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Deliveries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDeliveries.map((delivery) => (
                        <div key={delivery.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Order #{delivery.id}</p>
                              <p className="text-sm text-gray-500">{delivery.customerName}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">${delivery.price}</p>
                              <Badge variant={delivery.status === 'delivered' ? 'default' : 'secondary'}>
                                {delivery.status === 'delivered' ? 'Delivered' : 'In Progress'}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-500">From:</span>
                              <span>{delivery.pickupAddress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-500">To:</span>
                              <span>{delivery.dropoffAddress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-500">Date:</span>
                              <span>{delivery.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="communication" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-1">
                <EmailsSentTable />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
