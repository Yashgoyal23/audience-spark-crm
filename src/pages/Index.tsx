
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Users, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import CampaignBuilder from "@/components/CampaignBuilder";
import CustomerManager from "@/components/CustomerManager";
import OrderManager from "@/components/OrderManager";
import CampaignHistory from "@/components/CampaignHistory";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [campaigns, setCampaigns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Mock data for demo
  const mockAnalytics = [
    { name: 'Jan', campaigns: 12, delivered: 2340, failed: 180 },
    { name: 'Feb', campaigns: 19, delivered: 3200, failed: 240 },
    { name: 'Mar', campaigns: 15, delivered: 2800, failed: 160 },
    { name: 'Apr', campaigns: 22, delivered: 4100, failed: 290 },
    { name: 'May', campaigns: 18, delivered: 3600, failed: 220 },
  ];

  const deliveryStats = [
    { name: 'Delivered', value: 16040, color: '#10b981' },
    { name: 'Failed', value: 1090, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mini CRM</h1>
            <p className="text-gray-600">Intelligent Customer Relationship Management</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setActiveTab("campaign-builder")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="campaign-builder" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Campaign Builder
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86</div>
                  <p className="text-xs opacity-75">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Messages Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16,040</div>
                  <p className="text-xs opacity-75">94% delivery rate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Active Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs opacity-75">+8% growth</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹4.2L</div>
                  <p className="text-xs opacity-75">Campaign driven</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Monthly delivery statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="delivered" fill="#10b981" />
                      <Bar dataKey="failed" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status</CardTitle>
                  <CardDescription>Overall message delivery breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deliveryStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deliveryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Latest campaign activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Spring Sale Promotion", audience: 1247, status: "delivered", time: "2 hours ago" },
                    { name: "Win-back Inactive Users", audience: 892, status: "in-progress", time: "1 day ago" },
                    { name: "VIP Customer Appreciation", audience: 156, status: "delivered", time: "3 days ago" },
                  ].map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">{campaign.audience} customers • {campaign.time}</p>
                      </div>
                      <Badge variant={campaign.status === "delivered" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaign-builder">
            <CampaignBuilder />
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignHistory />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
