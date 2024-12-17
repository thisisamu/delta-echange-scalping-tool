import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OrdersHistory = () => {
  const orders = [
    {
      time: "2024-01-20 10:30:45",
      symbol: "BTCUSDT",
      type: "Market",
      side: "Buy",
      price: "40000",
      filled: "0.1",
      status: "Filled",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Order History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Filled</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.time}</TableCell>
              <TableCell>{order.symbol}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell className={order.side === "Buy" ? "text-positive" : "text-negative"}>
                {order.side}
              </TableCell>
              <TableCell>${order.price}</TableCell>
              <TableCell>{order.filled}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersHistory;