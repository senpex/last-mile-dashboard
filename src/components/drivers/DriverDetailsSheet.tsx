
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, MapPin, Star, CreditCard, Package, Truck, Mail as MailIcon, MessageSquare, Activity, ShoppingCart } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => JSX.Element;
}

export const DriverDetailsSheet = ({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus
}: DriverDetailsSheetProps) => {
  const [activeTab, setActiveTab] = React.useState<string>("driver-info");
  const [activeLogTab, setActiveLogTab] = React.useState<string>("payment-transactions");

  if (!driver) return null;

  const getTransportIcon = (transportId: string): TransportType => {
    const transportMap: { [key: string]: TransportType } = {
      '1': 'helper',
      '2': 'car', 
      '3': 'suv',
      '4': 'pickup_truck',
      '5': '9ft_cargo_van',
      'pickup_truck': 'pickup_truck',
      '9ft_cargo_van': '9ft_cargo_van',
      '10ft_box_truck': '10ft_box_truck',
      '15ft_box_truck': '15ft_box_truck',
      '17ft_box_truck': '17ft_box_truck',
      'refrigerated_van': 'refrigerated_van'
    };
    return transportMap[transportId] || 'car';
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl md:max-w-4xl lg:max-w-6xl w-full overflow-hidden p-0 pr-0 mr-0 flex flex-col">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-left text-lg">Driver Details - {driver.name}</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="driver-info" className="w-full flex-1 overflow-hidden" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mx-6 mb-2 mt-2 sticky top-0 z-10 bg-background">
            <TabsTrigger value="driver-info">Driver Info</TabsTrigger>
            <TabsTrigger value="driver-logs">Driver Logs</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="driver-info" className="m-0 h-full">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 space-y-6 pb-96">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <p className="text-sm">{driver.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="text-sm flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {driver.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-sm flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {driver.phone}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Driver ID</label>
                          <p className="text-sm">{driver.id}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <p className="text-sm">{driver.address}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Zipcode</label>
                          <p className="text-sm">{driver.zipcode}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Status Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Current Status</label>
                          <div className="mt-1">
                            {renderStatus(driver.status)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Hire Status</label>
                          <div className="mt-1">
                            <Badge variant="outline">
                              {hireStatusDictionary[driver.hireStatus] || driver.hireStatus}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Stripe Status</label>
                          <div className="mt-1">
                            {renderStripeStatus(driver.stripeStatus)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Rating</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{driver.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transport Types */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Transport Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {driver.transports?.map((transportId: string) => (
                          <Badge key={transportId} variant="secondary" className="flex items-center gap-2">
                            <TransportIcon 
                              transportType={getTransportIcon(transportId)} 
                              size={14} 
                              className="h-[14px] w-[14px]" 
                            />
                            {transportTypes[transportId] || `Transport ${transportId}`}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Types */}
                  {driver.profileTypes && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {driver.profileTypes.map((type: string) => (
                            <Badge key={type} variant="outline">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Notes */}
                  {driver.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{driver.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="driver-logs" className="m-0 h-full">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-6 px-[23px] pt-0 pb-96">
                  <Tabs defaultValue="payment-transactions" value={activeLogTab} onValueChange={setActiveLogTab}>
                    <div className="sticky top-0 z-10 bg-background pt-1 pb-2 min-h-[90px]">
                      <TabsList className="flex flex-wrap bg-transparent p-0 py-3 gap-1 justify-start w-full overflow-visible my-0">
                        <TabsTrigger value="payment-transactions" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                          <CreditCard className="w-4 h-4" /> 
                          <span className="hidden sm:inline">Payment History</span>
                          <span className="sm:hidden">Payments</span>
                        </TabsTrigger>
                        <TabsTrigger value="delivery-history" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                          <Package className="w-4 h-4" /> 
                          <span className="hidden sm:inline">Delivery History</span>
                          <span className="sm:hidden">Deliveries</span>
                        </TabsTrigger>
                        <TabsTrigger value="vehicle-info" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                          <Truck className="w-4 h-4" /> 
                          <span className="hidden sm:inline">Vehicle Info</span>
                          <span className="sm:hidden">Vehicle</span>
                        </TabsTrigger>
                        <TabsTrigger value="communication" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                          <MessageSquare className="w-4 h-4" /> 
                          <span className="hidden sm:inline">Communication</span>
                          <span className="sm:hidden">Messages</span>
                        </TabsTrigger>
                        <TabsTrigger value="activity-log" className="flex items-center gap-1 bg-white/5 border border-gray-200 hover:bg-gray-100 data-[state=active]:bg-primary data-[state=active]:text-white">
                          <Activity className="w-4 h-4" /> 
                          <span className="hidden sm:inline">Activity Log</span>
                          <span className="sm:hidden">Activity</span>
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <TabsContent value="payment-transactions" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Payment History</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">No payment history available for this driver.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="delivery-history" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Delivery History</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">No delivery history available for this driver.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="vehicle-info" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">No vehicle information available for this driver.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="communication" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Communication History</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">No communication history available for this driver.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="activity-log" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">No activity log available for this driver.</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
