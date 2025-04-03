
import { Layout } from "@/components/layout/Layout";
import { UserRound, Settings, AlertTriangle, Bot, Lock, Eye, EyeOff, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from 'react';

const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState('');

  const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  const handleAddRule = () => {
    // Here you would normally save the rule to your data store
    // For this example, we'll just close the dialog
    setNewRule('');
    setIsAddRuleDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <Tabs defaultValue="user-profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="user-profile" className="flex items-center gap-2">
              <UserRound className="w-4 h-4" />
              User Profile
            </TabsTrigger>
            <TabsTrigger value="system-settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-profile">
            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <UserRound className="w-16 h-16 text-primary" />
                  </div>
                  <button className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 rounded-md text-sm">Change Photo</button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-md" 
                        defaultValue="John" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-md" 
                        defaultValue="Doe" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-input rounded-md" 
                        defaultValue="john.doe@example.com" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-input rounded-md" 
                        defaultValue="+1 (555) 123-4567" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Bio</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-input rounded-md min-h-[100px]"
                      defaultValue="Delivery manager with 5+ years of experience in logistics and transportation."
                    />
                  </div>
                  
                  <div className="pt-6 border-t">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-primary" />
                      <h3 className="text-md font-medium">Change Password</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="text-sm font-medium block mb-1">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? "text" : "password"} 
                            className="w-full px-3 py-2 border border-input rounded-md pr-10" 
                            placeholder="Enter current password" 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2"></div>
                      
                      <div className="relative">
                        <label className="text-sm font-medium block mb-1">New Password</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"} 
                            className="w-full px-3 py-2 border border-input rounded-md pr-10" 
                            placeholder="Enter new password" 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => togglePasswordVisibility(setShowNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="text-sm font-medium block mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            className="w-full px-3 py-2 border border-input rounded-md pr-10" 
                            placeholder="Confirm new password" 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system-settings">
            <div className="bg-card rounded-lg shadow p-6">
              <Tabs defaultValue="attention-required" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="attention-required" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    AR Orders
                  </TabsTrigger>
                  <TabsTrigger value="automations" className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    Automations
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="attention-required">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Attention Required Criteria</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="order-pickup-notification" />
                          <label htmlFor="order-pickup-notification" className="text-sm font-medium">
                            Flag orders 15 minutes before the pickup with no driver
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="low-stock" />
                          <label htmlFor="low-stock" className="text-sm font-medium">
                            Driver is running late for more than 15 minutes
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="driver-overtime" />
                          <label htmlFor="driver-overtime" className="text-sm font-medium">
                            No drivers found for the order
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="maintenance-due" />
                          <label htmlFor="maintenance-due" className="text-sm font-medium">
                            Orders cancelled by drivers
                          </label>
                        </div>
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2"
                            onClick={() => setIsAddRuleDialogOpen(true)}
                          >
                            <Plus className="w-4 h-4" />
                            Add Rule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="automations">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Automatic Actions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-close-order" />
                          <label htmlFor="auto-close-order" className="text-sm font-medium">
                            Close order automatically after delivery is confirmed
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-commission-increase" />
                          <label htmlFor="auto-commission-increase" className="text-sm font-medium">
                            Increase driver commission by 10% if driver arrives 10 minutes before pickup
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-assign-driver" />
                          <label htmlFor="auto-assign-driver" className="text-sm font-medium">
                            Automatically assign nearest driver when order is created
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-notify-delay" />
                          <label htmlFor="auto-notify-delay" className="text-sm font-medium">
                            Send notification to customer if driver is delayed by more than 5 minutes
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-reschedule" />
                          <label htmlFor="auto-reschedule" className="text-sm font-medium">
                            Attempt to reschedule if order is at risk of cancellation
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end pt-6">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Rule Dialog */}
      <Dialog open={isAddRuleDialogOpen} onOpenChange={setIsAddRuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Attention Required Rule</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="new-rule" className="text-sm font-medium block mb-2">
              Rule Description
            </label>
            <Textarea 
              id="new-rule" 
              placeholder="Describe the condition when attention is required..." 
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRule}>
              Save Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Profile;
