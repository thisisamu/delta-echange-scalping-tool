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

  const handleSubmit = async (side: "buy" | "sell") => {
    try {
      console.log("Order submitted:", { side, orderType, quantity, price });
      
      toast({
        title: "Order Submitted",
        description: `${side.toUpperCase()} ${quantity} BTC at ${price || 'market price'}`,
      });
      
      // Reset form
      setQuantity("");
      setPrice("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order",
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
          onClick={() => handleSubmit("buy")}
          className="bg-positive hover:bg-positive/90 text-white font-semibold"
          size="lg"
        >
          Buy / Long
        </Button>
        <Button
          onClick={() => handleSubmit("sell")}
          className="bg-negative hover:bg-negative/90 text-white font-semibold"
          size="lg"
        >
          Sell / Short
        </Button>
      </div>
    </Card>
  );
};

export default OrderForm;