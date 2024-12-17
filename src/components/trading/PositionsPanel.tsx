import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PositionsPanel = () => {
  const positions = [
    {
      symbol: "BTCUSDT",
      size: "0.1",
      entryPrice: "40000",
      markPrice: "40500",
      pnl: "50",
      roe: "1.25",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Open Positions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Mark Price</TableHead>
            <TableHead>PnL</TableHead>
            <TableHead>ROE%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position, index) => (
            <TableRow key={index}>
              <TableCell>{position.symbol}</TableCell>
              <TableCell>{position.size}</TableCell>
              <TableCell>${position.entryPrice}</TableCell>
              <TableCell>${position.markPrice}</TableCell>
              <TableCell className={Number(position.pnl) >= 0 ? "text-positive" : "text-negative"}>
                ${position.pnl}
              </TableCell>
              <TableCell className={Number(position.roe) >= 0 ? "text-positive" : "text-negative"}>
                {position.roe}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PositionsPanel;