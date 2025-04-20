import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    customerChats: 8,
    ezCaterNewOrders: 4,
    ezCaterModifications: 2,
    profitability: 16
  };

  const companies = [
    { name: "Acme Corp", count: 5 },
    { name: "TechStart Inc", count: 3 },
    { name: "Global Logistics", count: 7 }
  ];

  const [ordersPeriod, setOrdersPeriod] = useState("lifetime");
  const [profitabilityPeriod, setProfitabilityPeriod] = useState("lifetime");

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
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
                  <h3 className="text-2xl font-bold text-right">{stats.orders}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Profitability</p>
                    <Select value={profitabilityPeriod} onValueChange={setProfitabilityPeriod}>
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
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <h3 className="text-2xl font-bold">{stats.profitability}%</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Action Required</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">My AR Orders</p>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate('/ar-orders')}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-bold text-right">{stats.arOrders}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Working Drivers Chats</p>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate('/communication/support')}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-bold text-right">{stats.workingDriversChats}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Customer Chats</p>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate('/communication/support')}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-bold text-right">{stats.customerChats}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">eZcater Requests</p>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate('/ezcater')}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Orders</span>
                      <span className="text-xl font-bold">{stats.ezCaterNewOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Modifications</span>
                      <span className="text-xl font-bold">{stats.ezCaterModifications}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Batching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {companies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <p className="text-sm font-medium">{company.name}</p>
                      <span className="text-sm font-bold">{company.count}</span>
                    </div>
                  ))}
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
