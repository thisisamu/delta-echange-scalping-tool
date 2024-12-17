import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TradingVolume = () => {
  const [data, setData] = useState([
    { time: "09:00", volume: 100, price: 40000 },
    { time: "10:00", volume: 150, price: 40100 },
    { time: "11:00", volume: 80, price: 40050 },
    { time: "12:00", volume: 200, price: 40200 },
    { time: "13:00", volume: 120, price: 40150 },
  ]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="volume" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="price" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingVolume;