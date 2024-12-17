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

const OrderForm = () => {
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (side: "buy" | "sell") => {
    console.log("Order submitted:", { side, orderType, quantity, price });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Place Order</h2>
      
      <Select value={orderType} onValueChange={setOrderType}>
        <SelectTrigger>
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
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {orderType !== "market" && (
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleSubmit("buy")}
          className="bg-positive hover:bg-positive/90"
        >
          Buy
        </Button>
        <Button
          onClick={() => handleSubmit("sell")}
          className="bg-negative hover:bg-negative/90"
        >
          Sell
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;