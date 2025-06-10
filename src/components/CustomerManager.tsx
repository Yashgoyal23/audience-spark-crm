
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, Upload } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  lastVisit: string;
  segment: string;
  city: string;
}

const CustomerManager = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });

  useEffect(() => {
    // Load customers from localStorage or create mock data
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    
    if (storedCustomers.length === 0) {
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "Rahul Sharma",
          email: "rahul.sharma@email.com",
          phone: "+91 98765 43210",
          totalSpend: 25000,
          visits: 15,
          lastVisit: "2024-01-15",
          segment: "VIP",
          city: "Mumbai"
        },
        {
          id: "2", 
          name: "Priya Patel",
          email: "priya.patel@email.com",
          phone: "+91 87654 32109",
          totalSpend: 12000,
          visits: 8,
          lastVisit: "2024-01-10",
          segment: "Regular",
          city: "Delhi"
        },
        {
          id: "3",
          name: "Amit Kumar",
          email: "amit.kumar@email.com", 
          phone: "+91 76543 21098",
          totalSpend: 45000,
          visits: 25,
          lastVisit: "2024-01-18",
          segment: "VIP",
          city: "Bangalore"
        },
        {
          id: "4",
          name: "Sneha Gupta",
          email: "sneha.gupta@email.com",
          phone: "+91 65432 10987",
          totalSpend: 8000,
          visits: 5,
          lastVisit: "2023-12-20",
          segment: "New",
          city: "Chennai"
        },
        {
          id: "5",
          name: "Vikash Singh",
          email: "vikash.singh@email.com",
          phone: "+91 54321 09876",
          totalSpend: 18000,
          visits: 12,
          lastVisit: "2024-01-12",
          segment: "Regular",
          city: "Pune"
        }
      ];
      setCustomers(mockCustomers);
      localStorage.setItem('customers', JSON.stringify(mockCustomers));
    } else {
      setCustomers(storedCustomers);
    }
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const customer: Customer = {
      id: Date.now().toString(),
      ...newCustomer,
      totalSpend: 0,
      visits: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      segment: "New"
    };

    const updatedCustomers = [customer, ...customers];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));

    setNewCustomer({ name: "", email: "", phone: "", city: "" });
    toast.success("Customer added successfully!");
  };

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case "VIP":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>;
      case "Regular":
        return <Badge className="bg-blue-100 text-blue-800">Regular</Badge>;
      case "New":
        return <Badge className="bg-green-100 text-green-800">New</Badge>;
      default:
        return <Badge variant="secondary">{segment}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Customer Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Customer
          </CardTitle>
          <CardDescription>
            Add customers manually or import via API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Customer Name *"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <Input
              placeholder="Email *"
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
            <Input
              placeholder="City"
              value={newCustomer.city}
              onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={addCustomer}>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customer Database
              </CardTitle>
              <CardDescription>
                Manage your customer relationships and data
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Segment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>₹{customer.totalSpend.toLocaleString()}</TableCell>
                  <TableCell>{customer.visits}</TableCell>
                  <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>{getSegmentBadge(customer.segment)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">Try adjusting your search or add new customers.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManager;
