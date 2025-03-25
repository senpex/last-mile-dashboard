import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Sidebar from "@/components/layout/Sidebar";

const Dictionaries = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          <h1 className="text-2xl font-bold tracking-tight">Dictionaries</h1>
          <p className="text-muted-foreground mt-1">Manage your reference data.</p>
          
          {/* Actions */}
          <div className="mt-4 flex justify-end">
            <Button>Add Dictionary</Button>
          </div>
          
          {/* List of dictionaries */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
                <CardDescription>List of supported colors.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="colors" defaultChecked />
                  <Label htmlFor="colors">Enabled</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Available sizes for products.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="sizes" />
                  <Label htmlFor="sizes">Enabled</Label>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Materials</CardTitle>
                <CardDescription>Acceptable product materials.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="materials" defaultChecked />
                  <Label htmlFor="materials">Enabled</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionaries;
