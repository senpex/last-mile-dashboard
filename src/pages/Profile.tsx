import { Layout } from "@/components/layout/Layout";
import { UserRound, Settings, AlertTriangle, Bot, Lock, Eye, EyeOff, Plus, Pencil, Calendar, Clock, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageTemplates, messageTemplates } from "@/components/communication/MessageTemplates";
import React, { useState } from 'react';
interface AttentionRule {
  name: string;
  query: string;
}
interface Automation {
  name: string;
  description: string;
}
const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = useState(false);
  const [isAddAutomationDialogOpen, setIsAddAutomationDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [ruleName, setRuleName] = useState('');
  const [newAutomation, setNewAutomation] = useState('');
  const [automationName, setAutomationName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRuleIndex, setEditRuleIndex] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('');
  const [attentionRules, setAttentionRules] = useState<AttentionRule[]>([{
    name: "Late Orders",
    query: "Driver is going late for more than 15 minutes"
  }, {
    name: "Incomplete Orders",
    query: "Show last minute cancelled orders by driver"
  }, {
    name: "High Value Orders",
    query: "value of the order is more than $10000"
  }]);
  const [automations, setAutomations] = useState<Automation[]>([{
    name: "Auto Assign",
    description: "Automatically assign orders to available couriers"
  }, {
    name: "Send Reminder",
    description: "Send reminder notification when order is 15 minutes late"
  }]);
  const [workingShifts, setWorkingShifts] = useState([{
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    active: true
  }, {
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    active: true
  }, {
    day: "Wednesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    active: true
  }, {
    day: "Thursday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    active: true
  }, {
    day: "Friday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    active: true
  }, {
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "03:00 PM",
    active: false
  }, {
    day: "Sunday",
    startTime: "10:00 AM",
    endTime: "03:00 PM",
    active: false
  }]);
  const togglePasswordVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };
  const handleAddRule = () => {
    if (isEditMode && editRuleIndex !== null) {
      const updatedRules = [...attentionRules];
      updatedRules[editRuleIndex] = {
        name: ruleName,
        query: newRule
      };
      setAttentionRules(updatedRules);
    } else {
      setAttentionRules([...attentionRules, {
        name: ruleName || `Rule ${attentionRules.length + 1}`,
        query: newRule
      }]);
    }
    setNewRule('');
    setRuleName('');
    setIsEditMode(false);
    setEditRuleIndex(null);
    setIsAddRuleDialogOpen(false);
  };
  const handleAddAutomation = () => {
    setAutomations([...automations, {
      name: automationName || `Automation ${automations.length + 1}`,
      description: newAutomation
    }]);
    setNewAutomation('');
    setAutomationName('');
    setIsAddAutomationDialogOpen(false);
  };
  const handleEditRule = (index: number) => {
    setNewRule(attentionRules[index].query);
    setRuleName(attentionRules[index].name);
    setIsEditMode(true);
    setEditRuleIndex(index);
    setIsAddRuleDialogOpen(true);
  };
  const updateWorkingShift = (index: number, field: 'startTime' | 'endTime' | 'active', value: string | boolean) => {
    const updatedShifts = [...workingShifts];
    updatedShifts[index] = {
      ...updatedShifts[index],
      [field]: value
    };
    setWorkingShifts(updatedShifts);
  };
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find(t => t.id === templateId);
    setSelectedTemplateContent(template?.content || '');
  };
  return <Layout>
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
                      <input type="text" className="w-full px-3 py-2 border border-input rounded-md" defaultValue="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Last Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-input rounded-md" defaultValue="Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-input rounded-md" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Phone</label>
                      <input type="tel" className="w-full px-3 py-2 border border-input rounded-md" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Bio</label>
                    <textarea className="w-full px-3 py-2 border border-input rounded-md min-h-[100px]" defaultValue="Delivery manager with 5+ years of experience in logistics and transportation." />
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
                          <input type={showCurrentPassword ? "text" : "password"} className="w-full px-3 py-2 border border-input rounded-md pr-10" placeholder="Enter current password" />
                          <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => togglePasswordVisibility(setShowCurrentPassword)}>
                            {showCurrentPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2"></div>
                      
                      <div className="relative">
                        <label className="text-sm font-medium block mb-1">New Password</label>
                        <div className="relative">
                          <input type={showNewPassword ? "text" : "password"} className="w-full px-3 py-2 border border-input rounded-md pr-10" placeholder="Enter new password" />
                          <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => togglePasswordVisibility(setShowNewPassword)}>
                            {showNewPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="text-sm font-medium block mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} className="w-full px-3 py-2 border border-input rounded-md pr-10" placeholder="Confirm new password" />
                          <button type="button" className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => togglePasswordVisibility(setShowConfirmPassword)}>
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
                  <TabsTrigger value="working-shifts" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Working Shifts
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Templates
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="attention-required">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Attention Required Orders</h3>
                      <div className="space-y-4">
                        {attentionRules.map((rule, index) => <div key={index} className="flex items-center">
                            <div className="flex-1 flex items-center space-x-2">
                              <Checkbox id={`rule-${index}`} />
                              <label htmlFor={`rule-${index}`} className="text-sm font-medium">
                                {rule.name}: {rule.query}
                              </label>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleEditRule(index)} className="ml-2">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </div>)}
                        <div className="mt-4">
                          <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                          setIsEditMode(false);
                          setNewRule('');
                          setRuleName('');
                          setIsAddRuleDialogOpen(true);
                        }}>
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
                        {automations.map((automation, index) => <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={`auto-${index}`} />
                            <label htmlFor={`auto-${index}`} className="text-sm font-medium">
                              {automation.name}: {automation.description}
                            </label>
                          </div>)}
                        <div className="mt-4">
                          <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                          setNewAutomation('');
                          setAutomationName('');
                          setIsAddAutomationDialogOpen(true);
                        }}>
                            <Plus className="w-4 h-4" />
                            Add Automation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="working-shifts">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Working Hours</h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4 mb-2 font-medium text-sm text-muted-foreground">
                          <div>Day</div>
                          <div>Start Time</div>
                          <div>End Time</div>
                          <div>Active</div>
                        </div>
                        
                        {workingShifts.map((shift, index) => <div key={index} className="grid grid-cols-4 gap-4 items-center">
                            <div className="font-medium">{shift.day}</div>
                            <div className="relative">
                              <Input value={shift.startTime} onChange={e => updateWorkingShift(index, 'startTime', e.target.value)} className="pr-8" />
                              <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="relative">
                              <Input value={shift.endTime} onChange={e => updateWorkingShift(index, 'endTime', e.target.value)} className="pr-8" />
                              <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Checkbox checked={shift.active} onCheckedChange={checked => updateWorkingShift(index, 'active', checked === true)} id={`shift-${index}`} />
                              <label htmlFor={`shift-${index}`} className="ml-2 text-sm font-medium">
                                {shift.active ? 'Active' : 'Inactive'}
                              </label>
                            </div>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="templates">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Message Templates</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-[180px]">
                            <MessageTemplates onSelectTemplate={handleTemplateSelect} />
                          </div>
                          <div className="flex-1">
                            <Textarea value={selectedTemplateContent} readOnly className="min-h-[100px]" placeholder="Select a template to view its content" />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                          // Template creation logic will go here
                        }}>
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end pt-6">
                
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddRuleDialogOpen} onOpenChange={setIsAddRuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Rule" : "New Rule"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="rule-name" className="text-sm font-medium block mb-2">
                Rule Name
              </label>
              <Input id="rule-name" placeholder="Enter rule name..." value={ruleName} onChange={e => setRuleName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="new-rule" className="text-sm font-medium block mb-2">
                Text to SQL
              </label>
              <Textarea id="new-rule" placeholder="Write SQL query or description..." value={newRule} onChange={e => setNewRule(e.target.value)} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
            setIsAddRuleDialogOpen(false);
            setIsEditMode(false);
            setNewRule('');
            setRuleName('');
          }}>
              Cancel
            </Button>
            <Button onClick={handleAddRule}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddAutomationDialogOpen} onOpenChange={setIsAddAutomationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Automation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="automation-name" className="text-sm font-medium block mb-2">
                Automation Name
              </label>
              <Input id="automation-name" placeholder="Enter automation name..." value={automationName} onChange={e => setAutomationName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="new-automation" className="text-sm font-medium block mb-2">
                Description
              </label>
              <Textarea id="new-automation" placeholder="Describe what this automation should do..." value={newAutomation} onChange={e => setNewAutomation(e.target.value)} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
            setIsAddAutomationDialogOpen(false);
            setNewAutomation('');
            setAutomationName('');
          }}>
              Cancel
            </Button>
            <Button onClick={handleAddAutomation}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>;
};
export default Profile;