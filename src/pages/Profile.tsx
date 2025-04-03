import { Layout } from "@/components/layout/Layout";
import { UserRound, Settings, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
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
                  <TabsTrigger value="lorem-ipsum" className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Lorem Ipsum
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
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="lorem-ipsum">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Lorem Ipsum</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Setting One</label>
                          <Input placeholder="Enter value" />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Setting Two</label>
                          <Input placeholder="Enter value" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="option-one" />
                          <label htmlFor="option-one" className="text-sm font-medium">
                            Enable Option One
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="option-two" />
                          <label htmlFor="option-two" className="text-sm font-medium">
                            Enable Option Two
                          </label>
                        </div>
                        <div className="mt-6">
                          <Button>Apply Settings</Button>
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
    </Layout>
  );
};

export default Profile;
