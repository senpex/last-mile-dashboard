
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  pickupAddress: z.string(),
  pickupLat: z.string(),
  pickupLng: z.string(),
  pickupDescription: z.string().optional(),
  dropoffAddress: z.string(),
  dropoffLat: z.string(),
  dropoffLng: z.string(),
  dropoffDescription: z.string().optional(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  distance: z.string(),
  completionTime: z.string(),
  orderName: z.string(),
  courierNotes: z.string().optional(),
  orderFee: z.string(),
  courierEarnings: z.string(),
  courierTip: z.string(),
  itemValue: z.string(),
  totalTip: z.string(),
  senderId: z.string(),
  pickupTime: z.string(),
  paddingTime: z.string(),
  pickupTimeZone: z.string(),
  deliveryTime: z.string(),
  bagRequirement: z.string().optional()
});

interface CreateOrderSheetProps {
  onClose: () => void;
}

export function CreateOrderSheet({
  onClose
}: CreateOrderSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "120 Tremont St, Boston, MA 02108",
      pickupLat: "42.3573",
      pickupLng: "-71.0613",
      pickupDescription: "Restaurant entrance is on the side of the building. Ask for order #3245.",
      dropoffAddress: "1 Financial Center, Boston, MA 02111",
      dropoffLat: "42.3552",
      dropoffLng: "-71.0559",
      dropoffDescription: "Deliver to reception desk on the 22nd floor. Check in with security first.",
      receiverName: "Sarah Johnson",
      receiverPhone: "(617) 555-0182",
      distance: "0.8",
      completionTime: "45",
      orderName: "Financial District Office Lunch",
      courierNotes: "Large catering order. Bring large delivery bag and cart if available.",
      orderFee: "89.50",
      courierEarnings: "25.00",
      courierTip: "18.00",
      itemValue: "350.00",
      totalTip: "52.50",
      senderId: "EZ-12345",
      pickupTime: "2025-05-01T11:30",
      paddingTime: "15",
      pickupTimeZone: "America/New_York",
      deliveryTime: "2025-05-01T12:15",
      bagRequirement: "catering"
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onClose();
  }
  
  // Generate padding time options from 15 to 120 with 5 minute increments
  const paddingTimeOptions = Array.from({ length: 22 }, (_, i) => (15 + i * 5).toString());

  return <div className="h-full overflow-auto">
      <div className="p-6 max-w-5xl mx-auto">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Pickup Address Section - Modified to put address, lat, lng on one line */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Pickup Information</h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Input id="pickupAddress" {...form.register("pickupAddress")} />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="pickupLat">Latitude</Label>
                  <Input id="pickupLat" {...form.register("pickupLat")} />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="pickupLng">Longitude</Label>
                  <Input id="pickupLng" {...form.register("pickupLng")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupDescription">Pickup Description</Label>
                <Textarea id="pickupDescription" {...form.register("pickupDescription")} className="min-h-[24px] h-[38px] py-2" />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Dropoff Address Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Dropoff Information</h3>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 space-y-2">
                  <Label htmlFor="dropoffAddress">Dropoff Address</Label>
                  <Input id="dropoffAddress" {...form.register("dropoffAddress")} />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="dropoffLat">Latitude</Label>
                  <Input id="dropoffLat" {...form.register("dropoffLat")} />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="dropoffLng">Longitude</Label>
                  <Input id="dropoffLng" {...form.register("dropoffLng")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffDescription">Dropoff Description</Label>
                <Textarea id="dropoffDescription" {...form.register("dropoffDescription")} className="min-h-[24px] h-[38px] py-2" />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Receiver Information */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Receiver Information</h3>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="receiverName">Name</Label>
                  <Input id="receiverName" {...form.register("receiverName")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="receiverPhone">Phone Number</Label>
                  <Input id="receiverPhone" {...form.register("receiverPhone")} />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Delivery Details</h3>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="senderId">Sender ID</Label>
                  <Input id="senderId" {...form.register("senderId")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="distance">Distance (miles)</Label>
                  <Input id="distance" {...form.register("distance")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="completionTime">Completion Time (mins)</Label>
                  <Input id="completionTime" {...form.register("completionTime")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderName">Order Name</Label>
                <Input id="orderName" {...form.register("orderName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courierNotes">Courier Notes</Label>
                <Textarea id="courierNotes" {...form.register("courierNotes")} className="min-h-[24px] h-[38px] py-2" />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Financial Information</h3>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="orderFee">Order Fee</Label>
                  <Input id="orderFee" {...form.register("orderFee")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="courierEarnings">Courier Earnings</Label>
                  <Input id="courierEarnings" {...form.register("courierEarnings")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="courierTip">Courier Tip</Label>
                  <Input id="courierTip" {...form.register("courierTip")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="totalTip">Total Tip</Label>
                  <Input id="totalTip" {...form.register("totalTip")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="itemValue">Item Value</Label>
                  <Input id="itemValue" {...form.register("itemValue")} />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Time Information - Modified to put all fields on one line */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Time Information</h3>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Input id="pickupTime" type="datetime-local" {...form.register("pickupTime")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input id="deliveryTime" type="datetime-local" {...form.register("deliveryTime")} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="paddingTime">Padding Time (mins)</Label>
                  <Select 
                    defaultValue={form.getValues("paddingTime")} 
                    onValueChange={value => form.setValue("paddingTime", value)}
                  >
                    <SelectTrigger id="paddingTime">
                      <SelectValue placeholder="Select padding time" />
                    </SelectTrigger>
                    <SelectContent>
                      {paddingTimeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="pickupTimeZone">Pickup Time Zone</Label>
                  <Select defaultValue={form.getValues("pickupTimeZone")} onValueChange={value => form.setValue("pickupTimeZone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Bag Requirements */}
            <div className="space-y-2">
              <Label htmlFor="bagRequirement">Bag Requirement</Label>
              <Select 
                defaultValue={form.getValues("bagRequirement")}
                onValueChange={value => form.setValue("bagRequirement", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add bag requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="insulated">Insulated Bag</SelectItem>
                  <SelectItem value="cooler">Cooler</SelectItem>
                  <SelectItem value="pizza">Pizza Bag</SelectItem>
                  <SelectItem value="catering">Catering Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Create Order</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>;
}
