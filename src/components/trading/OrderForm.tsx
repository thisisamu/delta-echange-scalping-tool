import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const OrderForm = () => {
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const placeOrder = async (side: "buy" | "sell") => {
    const apiKey = localStorage.getItem("delta_api_key");
    const apiSecret = localStorage.getItem("delta_api_secret");

    if (!apiKey || !apiSecret) {
      toast({
        title: "Error",
        description: "Please configure your API credentials first",
        variant: "destructive",
      });
      return;
    }

    if (!quantity) {
      toast({
        title: "Error",
        description: "Please enter a quantity",
        variant: "destructive",
      });
      return;
    }

    if (orderType !== "market" && !price) {
      toast({
        title: "Error",
        description: "Please enter a price for limit order",
        variant: "destructive",
      });
      return;
    }

    try {
      const timestamp = Date.now();
      const signature = await generateSignature(apiSecret, timestamp, {
        side,
        orderType,
        quantity,
        price,
      });

      const response = await fetch("https://api.delta.exchange/v2/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
          "timestamp": timestamp.toString(),
          "signature": signature,
        },
        body: JSON.stringify({
          symbol: "BTC_USDT",
          size: quantity,
          type: orderType.toUpperCase(),
          price: price || undefined,
          side: side.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Failed to place order");
      }

      toast({
        title: "Order Placed",
        description: `${side.toUpperCase()} ${quantity} BTC at ${price || "market price"}`,
      });

      // Reset form
      setQuantity("");
      setPrice("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to place order",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="space-y-4 p-6 bg-secondary/50 backdrop-blur-sm">
      <h2 className="text-lg font-semibold">Place Order</h2>
      
      <Select value={orderType} onValueChange={setOrderType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Order Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="market">Market</SelectItem>
          <SelectItem value="limit">Limit</SelectItem>
          <SelectItem value="stop">Stop</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Quantity (BTC)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="font-mono"
      />

      {orderType !== "market" && (
        <Input
          type="number"
          placeholder="Price (USDT)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="font-mono"
        />
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => placeOrder("buy")}
          className="bg-positive hover:bg-positive/90 text-white font-semibold"
          size="lg"
        >
          Buy / Long
        </Button>
        <Button
          onClick={() => placeOrder("sell")}
          className="bg-negative hover:bg-negative/90 text-white font-semibold"
          size="lg"
        >
          Sell / Short
        </Button>
      </div>
    </Card>
  );
};

// Helper function to generate signature for Delta Exchange API
const generateSignature = async (apiSecret: string, timestamp: number, params: any) => {
  const message = timestamp + JSON.stringify(params);
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const key = encoder.encode(apiSecret);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    data
  );
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export default OrderForm;