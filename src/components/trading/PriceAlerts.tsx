import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Bell, Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Alert {
  id: string;
  price: number;
  type: "above" | "below";
}

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlertPrice, setNewAlertPrice] = useState("");
  const [newAlertType, setNewAlertType] = useState<"above" | "below">("above");

  const addAlert = () => {
    if (!newAlertPrice) {
      toast({
        title: "Error",
        description: "Please enter a price for the alert",
        variant: "destructive",
      });
      return;
    }

    const newAlert: Alert = {
      id: Date.now().toString(),
      price: parseFloat(newAlertPrice),
      type: newAlertType,
    };

    setAlerts([...alerts, newAlert]);
    setNewAlertPrice("");
    
    toast({
      title: "Alert Added",
      description: `Will notify when price goes ${newAlertType} ${newAlertPrice}`,
    });
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card className="p-6 bg-secondary/50 backdrop-blur-sm border-accent">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Price Alerts
          </h2>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Alert Price"
            value={newAlertPrice}
            onChange={(e) => setNewAlertPrice(e.target.value)}
            className="font-mono"
          />
          <select
            value={newAlertType}
            onChange={(e) => setNewAlertType(e.target.value as "above" | "below")}
            className="bg-background border rounded px-2"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <Button onClick={addAlert} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex justify-between items-center p-2 bg-background/50 rounded"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>
                  When price goes {alert.type}{" "}
                  <span className="font-mono font-bold">${alert.price}</span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAlert(alert.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PriceAlerts;