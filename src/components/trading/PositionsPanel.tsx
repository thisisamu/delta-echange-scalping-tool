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

  // Calculate total PnL
  const totalPnL = positions.reduce((sum, position) => sum + Number(position.pnl), 0);

  return (
    <div className="space-y-4 bg-secondary/50 p-6 rounded-lg backdrop-blur-sm border-2 border-primary/20 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Open Positions</h2>
        <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-positive" : "text-negative"} animate-pulse`}>
          Total PnL: ${totalPnL.toFixed(2)}
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-secondary/60">
            <TableHead className="text-primary">Symbol</TableHead>
            <TableHead className="text-primary">Size</TableHead>
            <TableHead className="text-primary">Entry Price</TableHead>
            <TableHead className="text-primary">Mark Price</TableHead>
            <TableHead className="text-right text-primary">PnL</TableHead>
            <TableHead className="text-right text-primary">ROE%</TableHead>
            <TableHead className="text-right text-primary">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position, index) => (
            <TableRow 
              key={index} 
              className="hover:bg-secondary/60 transition-colors"
            >
              <TableCell className="font-bold text-foreground">{position.symbol}</TableCell>
              <TableCell className="font-medium">{position.size}</TableCell>
              <TableCell className="font-medium">${position.entryPrice}</TableCell>
              <TableCell className="font-medium">${position.markPrice}</TableCell>
              <TableCell 
                className={`text-right font-bold ${
                  Number(position.pnl) >= 0 ? "text-positive animate-pulse" : "text-negative"
                }`}
              >
                ${position.pnl}
              </TableCell>
              <TableCell 
                className={`text-right font-medium ${
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
                  className="hover:bg-destructive/90 transition-colors"
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