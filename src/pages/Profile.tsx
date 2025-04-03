
import { Layout } from "@/components/layout/Layout";
import { UserRound, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
              <h2 className="text-xl font-medium mb-4">System Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Language</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Time Zone</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                        <option value="utc">UTC (GMT+0)</option>
                        <option value="est">Eastern Standard Time (GMT-5)</option>
                        <option value="pst">Pacific Standard Time (GMT-8)</option>
                        <option value="cet">Central European Time (GMT+1)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <input type="checkbox" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Push Notifications</label>
                      <input type="checkbox" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">SMS Notifications</label>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Change Password</label>
                      <div className="space-y-2">
                        <input 
                          type="password" 
                          placeholder="Current Password" 
                          className="w-full px-3 py-2 border border-input rounded-md" 
                        />
                        <input 
                          type="password" 
                          placeholder="New Password" 
                          className="w-full px-3 py-2 border border-input rounded-md" 
                        />
                        <input 
                          type="password" 
                          placeholder="Confirm New Password" 
                          className="w-full px-3 py-2 border border-input rounded-md" 
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                  Save Settings
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
