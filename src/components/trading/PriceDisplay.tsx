import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { connectWebSocket } from "@/lib/deltaClient";

const PriceDisplay = () => {
  const [price, setPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  useEffect(() => {
    const ws = connectWebSocket((data) => {
      if (data.type === "v2/ticker") {
        const newPrice = parseFloat(data.mark_price);
        setPriceChange(newPrice - price);
        setPrice(newPrice);
        setLastUpdateTime(new Date().toLocaleTimeString());
      }
    });

    return () => {
      ws.close();
    };
  }, [price]);

  return (
    <Card className="p-6 bg-secondary/50 backdrop-blur-sm border-accent">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bitcoin (BTC/USDT)</h2>
          <span className="text-xs text-muted-foreground">Last update: {lastUpdateTime}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold font-mono">
            ${price.toFixed(2)}
          </span>
          <div 
            className={`flex items-center gap-1 ${
              priceChange >= 0 ? 'text-positive' : 'text-negative'
            } animate-pulse`}
          >
            {priceChange >= 0 ? (
              <ArrowUp className="w-5 h-5" />
            ) : (
              <ArrowDown className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              ${Math.abs(priceChange).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDisplay;