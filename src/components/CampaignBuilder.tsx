
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Users, Send, Sparkles } from "lucide-react";

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
  connector?: 'AND' | 'OR';
}

const CampaignBuilder = () => {
  const [campaignName, setCampaignName] = useState("");
  const [rules, setRules] = useState<Rule[]>([
    { id: "1", field: "totalSpend", operator: ">", value: "10000" }
  ]);
  const [message, setMessage] = useState("");
  const [audienceSize, setAudienceSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fieldOptions = [
    { value: "totalSpend", label: "Total Spend (₹)" },
    { value: "visits", label: "Number of Visits" },
    { value: "lastVisit", label: "Days Since Last Visit" },
    { value: "age", label: "Age" },
    { value: "city", label: "City" },
    { value: "segment", label: "Customer Segment" }
  ];

  const operatorOptions = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: "=", label: "Equals" },
    { value: "!=", label: "Not equals" },
    { value: "contains", label: "Contains" }
  ];

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      field: "totalSpend",
      operator: ">",
      value: "",
      connector: "AND"
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const calculateAudienceSize = useCallback(() => {
    // Mock calculation based on rules
    let baseSize = 2847; // Total customers
    const complexity = rules.length;
    const calculatedSize = Math.max(50, Math.floor(baseSize / (complexity * 2) + Math.random() * 500));
    setAudienceSize(calculatedSize);
  }, [rules]);

  const generateAIMessage = async () => {
    setIsLoading(true);
    try {
      // Mock AI message generation
      const suggestions = [
        "Hi {name}, we miss you! Here's 15% off your next purchase. Shop now and save big! 🛍️",
        "Hello {name}! Thanks for being a valued customer. Enjoy 20% off on your favorite items! ✨",
        "Hey {name}, your exclusive offer awaits: 10% off + free shipping on orders above ₹999! 🚚"
      ];
      
      setTimeout(() => {
        const randomMessage = suggestions[Math.floor(Math.random() * suggestions.length)];
        setMessage(randomMessage);
        setIsLoading(false);
        toast.success("AI-generated message suggestion ready!");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate AI message");
    }
  };

  const previewAudience = () => {
    calculateAudienceSize();
    toast.success(`Audience size calculated: ${audienceSize} customers`);
  };

  const createCampaign = async () => {
    if (!campaignName || !message || rules.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Mock campaign creation
      setTimeout(() => {
        const campaign = {
          id: Date.now().toString(),
          name: campaignName,
          rules,
          message,
          audienceSize,
          status: "active",
          created: new Date().toISOString(),
          delivered: 0,
          failed: 0
        };

        // Store in localStorage for demo
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        campaigns.unshift(campaign);
        localStorage.setItem('campaigns', JSON.stringify(campaigns));

        setIsLoading(false);
        toast.success("Campaign created successfully!");
        
        // Reset form
        setCampaignName("");
        setMessage("");
        setRules([{ id: "1", field: "totalSpend", operator: ">", value: "10000" }]);
        setAudienceSize(0);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Campaign
          </CardTitle>
          <CardDescription>
            Build targeted campaigns with intelligent audience segmentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="e.g., Spring Sale 2024"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          {/* Audience Rules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Audience Rules</Label>
              <Button onClick={addRule} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-3">
              {rules.map((rule, index) => (
                <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                  {index > 0 && (
                    <div className="flex justify-center">
                      <Select
                        value={rule.connector}
                        onValueChange={(value) => updateRule(rule.id, 'connector', value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AND">AND</SelectItem>
                          <SelectItem value="OR">OR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                    <div>
                      <Label>Field</Label>
                      <Select
                        value={rule.field}
                        onValueChange={(value) => updateRule(rule.id, 'field', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Operator</Label>
                      <Select
                        value={rule.operator}
                        onValueChange={(value) => updateRule(rule.id, 'operator', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Value</Label>
                      <Input
                        placeholder="Enter value"
                        value={rule.value}
                        onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={() => removeRule(rule.id)}
                      variant="outline"
                      size="sm"
                      disabled={rules.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={previewAudience} variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Preview Audience
              </Button>
              {audienceSize > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {audienceSize} customers match your criteria
                </Badge>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message">Campaign Message</Label>
              <Button
                onClick={generateAIMessage}
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Suggest
              </Button>
            </div>
            <Textarea
              id="message"
              placeholder="Hi {name}, here's a special offer just for you!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-sm text-gray-600">
              Use {"{name}"} to personalize messages with customer names
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={createCampaign} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignBuilder;
