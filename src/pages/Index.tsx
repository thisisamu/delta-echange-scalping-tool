import { useEffect, useState } from "react";
import PriceDisplay from "@/components/trading/PriceDisplay";
import OrderForm from "@/components/trading/OrderForm";
import PositionsPanel from "@/components/trading/PositionsPanel";
import OrdersHistory from "@/components/trading/OrdersHistory";
import SettingsPanel from "@/components/trading/SettingsPanel";
import { useToast } from "@/components/ui/use-toast";
import { Settings, ChartLine, AlertTriangle } from "lucide-react";
import LiveChart from "@/components/trading/LiveChart";
import PriceAlerts from "@/components/trading/PriceAlerts";

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
    <div className="min-h-screen p-4 space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ChartLine className="w-6 h-6 text-primary" />
          Delta Exchange Trading
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-positive animate-pulse' : 'bg-negative'}`}></div>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showSettings ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>
      </header>

      {showSettings && <SettingsPanel />}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PriceDisplay />
            <PriceAlerts />
          </div>
          
          <LiveChart />

          <PositionsPanel />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <OrderForm />
          <OrdersHistory />
        </div>
      </div>
    </div>
  );
};

export default Index;