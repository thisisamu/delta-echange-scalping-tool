import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const SettingsPanel = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("delta_api_key");
    const savedApiSecret = localStorage.getItem("delta_api_secret");
    if (savedApiKey && savedApiSecret) {
      setApiKey(savedApiKey);
      setApiSecret(savedApiSecret);
      setIsConfigured(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey && apiSecret) {
      localStorage.setItem("delta_api_key", apiKey);
      localStorage.setItem("delta_api_secret", apiSecret);
      setIsConfigured(true);
      toast({
        title: "Settings Saved",
        description: "Your API credentials have been saved",
      });
    }
  };

  return (
    <Card className="p-6 bg-secondary/50 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4">API Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">API Key</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Delta Exchange API key"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">API Secret</label>
          <Input
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter your Delta Exchange API secret"
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Credentials
        </Button>
        {isConfigured && (
          <p className="text-sm text-positive">✓ API credentials configured</p>
        )}
      </div>
    </Card>
  );
};

export default SettingsPanel;