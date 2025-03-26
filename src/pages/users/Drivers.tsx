
import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DriversPage = () => {
  const drivers = [
    { id: 5432, name: "John Doe", email: "john.doe@example.com", phone: "(123) 456-7890", status: "Active" },
    { id: 6543, name: "Jane Smith", email: "jane.smith@example.com", phone: "(123) 456-7891", status: "On leave" },
    { id: 7654, name: "Mike Johnson", email: "mike.johnson@example.com", phone: "(123) 456-7892", status: "Active" },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Driver
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Drivers</CardTitle>
            <CardDescription>Manage your delivery drivers and their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="font-mono">{driver.id}</td>
                    <td>{driver.name}</td>
                    <td>{driver.email}</td>
                    <td>{driver.phone}</td>
                    <td>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        driver.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}>
                        {driver.status}
                      </div>
                    </td>
                    <td className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DriversPage;
