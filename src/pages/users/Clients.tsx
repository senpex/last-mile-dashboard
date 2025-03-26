import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ClientsPage = () => {
  const clients = [
    { id: 1234, name: "Acme Corp", contact: "Alex Johnson", email: "alex@acmecorp.com", phone: "(123) 456-7890", type: "Business" },
    { id: 23456, name: "TechStart", contact: "Sarah Lee", email: "sarah@techstart.com", phone: "(123) 456-7891", type: "Business" },
    { id: 34567, name: "Robert Brown", contact: "Robert Brown", email: "robert.brown@example.com", phone: "(123) 456-7892", type: "Individual" },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Clients Management</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Manage your client accounts and information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="font-sans font-mono">{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.contact}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        client.type === "Business" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      }`}>
                        {client.type}
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

export default ClientsPage;
