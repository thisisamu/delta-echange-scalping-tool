import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MarketDepth = () => {
  const [data, setData] = useState([
    { price: 39000, bids: 10, asks: 0 },
    { price: 39500, bids: 15, asks: 5 },
    { price: 40000, bids: 20, asks: 10 },
    { price: 40500, bids: 5, asks: 15 },
    { price: 41000, bids: 0, asks: 20 },
  ]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="price" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="bids"
            stackId="1"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="asks"
            stackId="1"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketDepth;