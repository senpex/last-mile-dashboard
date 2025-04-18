
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Dashboard = () => {
  const stats = {
    orders: 12,
    arOrders: 5,
    workingDriversChats: 3,
    customerChats: 8
  };

  // Sample company data - in a real app this would come from an API
  const companies = [
    { name: "Acme Corp", count: 5 },
    { name: "TechStart Inc", count: 3 },
    { name: "Global Logistics", count: 7 }
  ];

  const [ordersPeriod, setOrdersPeriod] = useState("lifetime");

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="space-y-6">
          {/* Statistics Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">My Orders</p>
                      <Select value={ordersPeriod} onValueChange={setOrdersPeriod}>
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                          <SelectItem value="lastMonth">Last Month</SelectItem>
                          <SelectItem value="lastWeek">Last Week</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <h3 className="text-2xl font-bold">{stats.orders}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Required Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Action Required</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Batching Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Batching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {companies.map((company, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm font-medium">{company.name}</p>
                        <span className="text-sm font-bold">{company.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
