
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const stats = {
    orders: 12, // Example data
    arOrders: 5,
    workingDriversChats: 3,
    customerChats: 8
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Orders</p>
                  <h3 className="text-2xl font-bold">{stats.orders}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My AR Orders</p>
                  <h3 className="text-2xl font-bold">{stats.arOrders}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Working Drivers Chats</p>
                  <h3 className="text-2xl font-bold">{stats.workingDriversChats}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer Chats</p>
                  <h3 className="text-2xl font-bold">{stats.customerChats}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

