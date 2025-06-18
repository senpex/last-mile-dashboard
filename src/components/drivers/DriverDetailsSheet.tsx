
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DriverDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
  transportTypes: { [key: string]: string };
  statusDictionary: { [key: string]: string };
  hireStatusDictionary: { [key: string]: string };
  renderStatus: (statusId: string) => JSX.Element;
  renderStripeStatus: (status: "verified" | "unverified" | "pending") => JSX.Element;
}

export function DriverDetailsSheet({
  isOpen,
  onClose,
  driver,
  transportTypes,
  statusDictionary,
  hireStatusDictionary,
  renderStatus,
  renderStripeStatus
}: DriverDetailsSheetProps) {
  const handleDocumentClick = (documentType: string) => {
    alert(`View ${documentType} document`);
  };

  if (!driver) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] max-w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Driver Details - {driver.name}</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={driver.name || ""} readOnly />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={driver.email || ""} readOnly />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={driver.phone || ""} readOnly />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <div className="mt-2">
                  {renderStatus(driver.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Input id="vehicle-type" value="Sedan" readOnly />
              </div>
              <div>
                <Label htmlFor="license-plate">License Plate</Label>
                <Input id="license-plate" value="ABC-123" readOnly />
              </div>
              <div>
                <Label htmlFor="make-model">Make & Model</Label>
                <Input id="make-model" value="Toyota Camry 2020" readOnly />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input id="color" value="Silver" readOnly />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Documents</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4" />
                  <span>Driver's License</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Verified</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDocumentClick('license')}>
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4" />
                  <span>Insurance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Verified</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDocumentClick('insurance')}>
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4" />
                  <span>Vehicle Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">Expired</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDocumentClick('registration')}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="earnings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
              <TabsTrigger value="trips">Trip History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="earnings" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$127.50</div>
                    <p className="text-xs text-muted-foreground">8 trips</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$892.25</div>
                    <p className="text-xs text-muted-foreground">45 trips</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,247.80</div>
                    <p className="text-xs text-muted-foreground">187 trips</p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Payment Section */}
              <div>
                <h4 className="text-md font-semibold mb-3">Upcoming Payment</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Dec 25, 2024</TableCell>
                        <TableCell>$892.25</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>
                          <Badge variant="outline">Pending</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Payment History Section */}
              <div>
                <h4 className="text-md font-semibold mb-3">Payment History</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Dec 18, 2024</TableCell>
                        <TableCell>$756.40</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Paid</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 11, 2024</TableCell>
                        <TableCell>$623.80</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Paid</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 4, 2024</TableCell>
                        <TableCell>$834.25</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Paid</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ratings">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Overall Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{driver.rating || 4.8}</div>
                    <p className="text-xs text-muted-foreground">Based on 235 ratings</p>
                  </CardContent>
                </Card>
                <div>
                  <h4 className="text-md font-semibold mb-3">Recent Ratings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Customer Name</div>
                        <p className="text-xs text-muted-foreground">Dec 20, 2024</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">5 Stars</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Another Customer</div>
                        <p className="text-xs text-muted-foreground">Dec 19, 2024</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">4 Stars</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trips">
              <div>
                <h4 className="text-md font-semibold mb-3">Trip History</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Start Location</TableHead>
                        <TableHead>End Location</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Dec 24, 2024</TableCell>
                        <TableCell>123 Main St</TableCell>
                        <TableCell>456 Elm St</TableCell>
                        <TableCell>$15.20</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 24, 2024</TableCell>
                        <TableCell>789 Oak St</TableCell>
                        <TableCell>101 Pine St</TableCell>
                        <TableCell>$12.50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 23, 2024</TableCell>
                        <TableCell>222 Maple Ave</TableCell>
                        <TableCell>333 Cherry Ln</TableCell>
                        <TableCell>$18.75</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
