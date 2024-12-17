import { useEffect, useState } from "react";
import PriceDisplay from "@/components/trading/PriceDisplay";
import OrderForm from "@/components/trading/OrderForm";
import PositionsPanel from "@/components/trading/PositionsPanel";
import OrdersHistory from "@/components/trading/OrdersHistory";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize connection status
    setConnected(true);
    toast({
      title: "Connected to Delta Exchange",
      description: "Ready to trade",
    });
  }, []);

  return (
    <div className="min-h-screen p-4 space-y-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Delta Exchange Trading</h1>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-positive' : 'bg-negative'}`}></div>
          <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 col-span-1 lg:col-span-2">
          <PriceDisplay />
        </Card>
        <Card className="p-4">
          <OrderForm />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <PositionsPanel />
        </Card>
        <Card className="p-4">
          <OrdersHistory />
        </Card>
      </div>
    </div>
  );
};

export default Index;