
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, MessageSquare, Users, TrendingUp, Lightbulb } from "lucide-react";

const AIAssistant = () => {
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [generatedRules, setGeneratedRules] = useState<any[]>([]);
  const [messagePrompt, setMessagePrompt] = useState("");
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [campaignInsight, setCampaignInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const parseNaturalLanguage = async () => {
    if (!naturalLanguageQuery.trim()) {
      toast.error("Please enter a query");
      return;
    }

    setIsLoading(true);
    try {
      // Mock AI parsing - in real implementation, this would call an AI API
      setTimeout(() => {
        const mockRules = [
          {
            field: "lastVisit",
            operator: ">",
            value: "180",
            label: "Haven't shopped in 6 months"
          },
          {
            field: "totalSpend", 
            operator: ">",
            value: "5000",
            label: "Spent over ₹5K",
            connector: "AND"
          }
        ];
        
        setGeneratedRules(mockRules);
        setIsLoading(false);
        toast.success("AI successfully parsed your query into rules!");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to parse query");
    }
  };

  const generateMessages = async () => {
    if (!messagePrompt.trim()) {
      toast.error("Please describe your campaign objective");
      return;
    }

    setIsLoading(true);
    try {
      // Mock AI message generation
      setTimeout(() => {
        const messages = [
          "Hi {name}, we miss you! Come back with 20% off your next purchase. Your favorites are waiting! 🛍️",
          "Hello {name}, it's been a while! Here's an exclusive 25% discount just for you. Shop now! ✨",
          "Hey {name}, we've got something special for you! Enjoy 15% off + free shipping on your return order! 🚚"
        ];
        
        setSuggestedMessages(messages);
        setIsLoading(false);
        toast.success("AI generated message suggestions!");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate messages");
    }
  };

  const generateInsight = () => {
    setIsLoading(true);
    setTimeout(() => {
      const insight = "Your recent 'Summer Sale 2024' campaign reached 1,247 users with a 95% delivery rate. High-value customers (>₹10K spend) showed exceptional engagement with 98% delivery success. Consider targeting similar demographics for future campaigns. The campaign generated an estimated ₹2.1L in revenue with customers averaging 2.3 purchases post-campaign.";
      setCampaignInsight(insight);
      setIsLoading(false);
      toast.success("AI insight generated!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI-Powered CRM Assistant
          </CardTitle>
          <CardDescription>
            Leverage artificial intelligence to enhance your campaign management
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Natural Language to Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Natural Language Audience Builder
          </CardTitle>
          <CardDescription>
            Describe your target audience in plain English and let AI create the rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe your target audience:</label>
            <Textarea
              placeholder="e.g., People who haven't shopped in 6 months and spent over ₹5K"
              value={naturalLanguageQuery}
              onChange={(e) => setNaturalLanguageQuery(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={parseNaturalLanguage}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? "Processing..." : "Generate Rules"}
          </Button>

          {generatedRules.length > 0 && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium mb-3">AI Generated Rules:</h4>
              <div className="space-y-2">
                {generatedRules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline">{rule.label}</Badge>
                    {rule.connector && (
                      <span className="text-sm text-gray-600">{rule.connector}</span>
                    )}
                  </div>
                ))}
              </div>
              <Button size="sm" className="mt-3" variant="outline">
                Apply to Campaign Builder
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Message Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Message Generator
          </CardTitle>
          <CardDescription>
            Get AI-powered message suggestions based on your campaign objective
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Campaign Objective:</label>
            <Input
              placeholder="e.g., bring back inactive users, promote new product launch"
              value={messagePrompt}
              onChange={(e) => setMessagePrompt(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={generateMessages}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Messages"}
          </Button>

          {suggestedMessages.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medium">AI Suggested Messages:</h4>
              {suggestedMessages.map((message, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm">{message}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Use This Message
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaign Performance AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Campaign Performance AI Insights
          </CardTitle>
          <CardDescription>
            Get intelligent summaries and recommendations for your campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Generate comprehensive insights about your campaign performance, customer behavior, and optimization recommendations.
          </p>
          
          <Button 
            onClick={generateInsight}
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {isLoading ? "Analyzing..." : "Generate Insights"}
          </Button>

          {campaignInsight && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                AI Performance Insight:
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{campaignInsight}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Available AI Features</CardTitle>
          <CardDescription>Explore all AI-powered capabilities in your CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🎯 Smart Audience Targeting</h4>
              <p className="text-sm text-gray-600">Convert natural language descriptions into precise audience rules</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">💬 Message Optimization</h4>
              <p className="text-sm text-gray-600">Generate personalized messages based on campaign objectives</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">📊 Performance Analytics</h4>
              <p className="text-sm text-gray-600">Get intelligent insights and recommendations from campaign data</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🔮 Predictive Suggestions</h4>
              <p className="text-sm text-gray-600">AI-powered recommendations for optimal campaign timing and targeting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
