import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/components/layout/Sidebar";
import { Link } from "react-router-dom";

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [volume, setVolume] = useState(50);
  const [inputVolume, setInputVolume] = useState(50);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main content area - adjusted margin to match smaller sidebar */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          collapsed ? "ml-[56px]" : "ml-[192px]" // Updated from 70px/240px to 56px/192px
        )}
      >
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Deliveries</h1>
          <p className="text-muted-foreground mt-1">View and manage your package deliveries.</p>
          
          {/* Filters and controls */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <Label htmlFor="volume">Volume</Label>
                <Slider
                  id="volume"
                  defaultValue={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                />
                <Input
                  type="number"
                  value={inputVolume}
                  onChange={(e) => setInputVolume(Number(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>
          </div>
          
          {/* Deliveries Table */}
          <div className="mt-4 bg-card rounded-md border shadow-sm">
            <Table>
              <TableCaption>A list of your deliveries.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV20240101</TableCell>
                  <TableCell>Shipped</TableCell>
                  <TableCell>UPS Ground</TableCell>
                  <TableCell className="text-right">$10.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV20240102</TableCell>
                  <TableCell>Delivered</TableCell>
                  <TableCell>USPS Priority</TableCell>
                  <TableCell className="text-right">$20.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV20240103</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>FedEx</TableCell>
                  <TableCell className="text-right">$30.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$60.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
