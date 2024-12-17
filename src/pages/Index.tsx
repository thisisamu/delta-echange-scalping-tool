import { useEffect, useState } from "react";
import PriceDisplay from "@/components/trading/PriceDisplay";
import OrderForm from "@/components/trading/OrderForm";
import PositionsPanel from "@/components/trading/PositionsPanel";
import OrdersHistory from "@/components/trading/OrdersHistory";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
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
        <div className="lg:col-span-2 space-y-4">
          <PriceDisplay />
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