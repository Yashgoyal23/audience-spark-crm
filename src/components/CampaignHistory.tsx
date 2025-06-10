
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, CheckCircle, XCircle, Eye } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  audienceSize: number;
  delivered: number;
  failed: number;
  status: string;
  created: string;
  message: string;
}

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Load campaigns from localStorage
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    
    // Add mock campaigns if none exist
    if (storedCampaigns.length === 0) {
      const mockCampaigns = [
        {
          id: "1",
          name: "Summer Sale 2024",
          audienceSize: 1247,
          delivered: 1186,
          failed: 61,
          status: "completed",
          created: new Date(Date.now() - 86400000).toISOString(),
          message: "Hi {name}, enjoy 25% off on summer collection! Limited time offer."
        },
        {
          id: "2", 
          name: "Win-back Inactive Users",
          audienceSize: 892,
          delivered: 850,
          failed: 42,
          status: "completed",
          created: new Date(Date.now() - 172800000).toISOString(),
          message: "We miss you {name}! Come back with 15% off your next order."
        },
        {
          id: "3",
          name: "VIP Customer Appreciation",
          audienceSize: 156,
          delivered: 152,
          failed: 4,
          status: "completed", 
          created: new Date(Date.now() - 259200000).toISOString(),
          message: "Thank you {name} for being a VIP customer! Exclusive 30% off awaits."
        }
      ];
      setCampaigns(mockCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(mockCampaigns));
    } else {
      setCampaigns(storedCampaigns);
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDeliveryRate = (delivered: number, total: number) => {
    return total > 0 ? Math.round((delivered / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Campaign History
          </CardTitle>
          <CardDescription>
            View all your past campaigns and their performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600">Create your first campaign to see it here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">
                          Created {new Date(campaign.created).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(campaign.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Audience Size</p>
                          <p className="text-lg font-semibold">{campaign.audienceSize.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Delivered</p>
                          <p className="text-lg font-semibold text-green-600">{campaign.delivered.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Failed</p>
                          <p className="text-lg font-semibold text-red-600">{campaign.failed.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Success Rate</p>
                          <p className="text-lg font-semibold text-purple-600">
                            {getDeliveryRate(campaign.delivered, campaign.audienceSize)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Delivery Progress</span>
                        <span>{getDeliveryRate(campaign.delivered, campaign.audienceSize)}%</span>
                      </div>
                      <Progress 
                        value={getDeliveryRate(campaign.delivered, campaign.audienceSize)} 
                        className="h-2"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Campaign Message:</p>
                      <p className="text-sm font-medium">{campaign.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignHistory;
