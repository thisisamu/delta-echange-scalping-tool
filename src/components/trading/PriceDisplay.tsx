import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const PriceDisplay = () => {
  const [price, setPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);

  useEffect(() => {
    // Simulate price updates - replace with actual WebSocket connection
    const interval = setInterval(() => {
      const newPrice = 40000 + Math.random() * 1000;
      setPriceChange(newPrice - price);
      setPrice(newPrice);
    }, 1000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Bitcoin Price (BTCUSDT)</h2>
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold">${price.toFixed(2)}</span>
        <div className={`flex items-center ${priceChange >= 0 ? 'text-positive' : 'text-negative'}`}>
          {priceChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="text-sm">{Math.abs(priceChange).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;