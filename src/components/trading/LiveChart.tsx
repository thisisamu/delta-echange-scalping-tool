import { useEffect, useRef } from 'react';
import { createChart, CrosshairMode, IChartApi } from 'lightweight-charts';
import { Card } from '@/components/ui/card';
import { connectWebSocket } from '@/lib/deltaClient';

const LiveChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const candlestickSeries = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: 'rgba(0, 0, 0, 0)' },
          textColor: '#DDD',
        },
        grid: {
          vertLines: { color: 'rgba(70, 130, 180, 0.1)' },
          horzLines: { color: 'rgba(70, 130, 180, 0.1)' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: 'rgba(70, 130, 180, 0.2)',
        },
        timeScale: {
          borderColor: 'rgba(70, 130, 180, 0.2)',
          timeVisible: true,
          secondsVisible: false,
        },
      });

      candlestickSeries.current = chart.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      // Add drawing tools toolbar
      const toolbarDiv = document.createElement('div');
      toolbarDiv.className = 'absolute top-2 left-2 flex gap-2';
      chartContainerRef.current.appendChild(toolbarDiv);

      const tools = ['Line', 'Rectangle', 'Fibonacci'];
      tools.forEach(tool => {
        const button = document.createElement('button');
        button.innerHTML = tool;
        button.className = 'px-3 py-1 text-xs bg-secondary/50 hover:bg-secondary rounded';
        toolbarDiv.appendChild(button);
      });

      // Handle window resize
      const handleResize = () => {
        if (chartContainerRef.current && chart.current) {
          chart.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      // Connect to WebSocket for live data
      const ws = connectWebSocket((data) => {
        if (data.type === "v2/ticker") {
          const timestamp = new Date().getTime() / 1000;
          candlestickSeries.current?.update({
            time: timestamp,
            open: parseFloat(data.mark_price),
            high: parseFloat(data.mark_price) * 1.001, // Simulated high
            low: parseFloat(data.mark_price) * 0.999,  // Simulated low
            close: parseFloat(data.mark_price),
          });
        }
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chart.current) {
          chart.current.remove();
        }
        ws.close();
      };
    }
  }, []);

  return (
    <Card className="p-4 relative">
      <div ref={chartContainerRef} className="w-full h-[500px]" />
    </Card>
  );
};

export default LiveChart;