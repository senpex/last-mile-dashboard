
import { Layout } from "@/components/layout/Layout";
import { UserRound } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
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
      </div>
    </Layout>
  );
};

export default Profile;
