import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const PositionsPanel = () => {
  const [positions, setPositions] = useState([
    {
      symbol: "BTCUSDT",
      size: "0.1",
      entryPrice: "40000",
      markPrice: "40500",
      pnl: "50",
      roe: "1.25",
      orderId: "123"
    },
  ]);

  const handleClosePosition = async (orderId: string) => {
    try {
      // Integrate with Delta API here
      toast({
        title: "Position Closed",
        description: `Order ${orderId} has been closed`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to close position",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 bg-secondary/50 p-4 rounded-lg backdrop-blur-sm">
      <h2 className="text-lg font-semibold">Open Positions</h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-secondary/60">
            <TableHead>Symbol</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Mark Price</TableHead>
            <TableHead className="text-right">PnL</TableHead>
            <TableHead className="text-right">ROE%</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position, index) => (
            <TableRow key={index} className="hover:bg-secondary/60">
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell>{position.size}</TableCell>
              <TableCell>${position.entryPrice}</TableCell>
              <TableCell>${position.markPrice}</TableCell>
              <TableCell 
                className={`text-right font-bold ${
                  Number(position.pnl) >= 0 ? "text-positive animate-pulse" : "text-negative"
                }`}
              >
                ${position.pnl}
              </TableCell>
              <TableCell 
                className={`text-right ${
                  Number(position.roe) >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                {position.roe}%
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleClosePosition(position.orderId)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PositionsPanel;