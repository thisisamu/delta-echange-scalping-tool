import { useEffect, useState } from "react";
import PriceDisplay from "@/components/trading/PriceDisplay";
import OrderForm from "@/components/trading/OrderForm";
import PositionsPanel from "@/components/trading/PositionsPanel";
import OrdersHistory from "@/components/trading/OrdersHistory";
import SettingsPanel from "@/components/trading/SettingsPanel";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("delta_api_key");
    const apiSecret = localStorage.getItem("delta_api_secret");
    
    if (!apiKey || !apiSecret) {
      setShowSettings(true);
      toast({
        title: "Welcome",
        description: "Please configure your API credentials to start trading",
      });
    }
    
    setConnected(true);
  }, []);

  return (
    <div className="min-h-screen p-4 space-y-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Delta Exchange Trading</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-positive' : 'bg-negative'}`}></div>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {showSettings ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <PriceDisplay />
          {showSettings && <SettingsPanel />}
          <PositionsPanel />
          <OrdersHistory />
        </div>
        <div className="lg:col-span-1">
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default Index;