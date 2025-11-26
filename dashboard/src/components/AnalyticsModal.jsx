import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useStockStore from "../app/stockStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsModal = ({ open, onClose, symbol }) => {
  const watchList = useStockStore((state) => state.watchList);
  const stock = watchList.find((s) => s.symbol === symbol);
  
  // Local history state
  const [history, setHistory] = useState([]);
  const [labels, setLabels] = useState([]);

  // Reset history when symbol changes or modal opens
  useEffect(() => {
    if (open && stock) {
      // Generate 20 mock historical points to start with
      const initialHistory = [];
      const initialLabels = [];
      let currentPrice = stock.price;
      
      for (let i = 19; i >= 0; i--) {
        // Random walk backwards
        const time = new Date(Date.now() - i * 10000).toLocaleTimeString();
        initialLabels.push(time);
        
        // Fluctuate slightly
        const fluctuation = (Math.random() - 0.5) * (stock.price * 0.005);
        initialHistory.push(currentPrice + fluctuation);
      }
      // Ensure the last point is the current price
      initialHistory[initialHistory.length - 1] = stock.price;

      setHistory(initialHistory);
      setLabels(initialLabels);
    }
  }, [open, symbol]);

  // Update history on price change
  useEffect(() => {
    if (open && stock) {
      const time = new Date().toLocaleTimeString();
      setHistory((prev) => {
        const newHistory = [...prev, stock.price];
        if (newHistory.length > 20) return newHistory.slice(newHistory.length - 20);
        return newHistory;
      });
      setLabels((prev) => {
        const newLabels = [...prev, time];
        if (newLabels.length > 20) return newLabels.slice(newLabels.length - 20);
        return newLabels;
      });
    }
  }, [stock?.price]);

  if (!stock) return null;

  const isUp = !stock.isDown;
  const borderColor = isUp ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";
  const backgroundColor = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (isUp) {
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.5)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)");
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.5)");
      gradient.addColorStop(1, "rgba(239, 68, 68, 0.0)");
    }
    return gradient;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: history,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { 
        display: true,
        text: 'Live Price Movement (Last 20 Ticks)',
        color: '#64748b',
        font: { size: 14, weight: 'normal' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: { 
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: '#94a3b8'
        },
        ticks: {
          maxTicksLimit: 5,
          color: '#94a3b8'
        },
        grid: {
          display: false
        }
      }, 
      y: {
        position: "right",
        title: {
          display: true,
          text: 'Price (₹)',
          color: '#94a3b8'
        },
        ticks: {
          color: '#64748b',
          callback: (value) => '₹' + value.toFixed(2)
        },
        grid: { 
          color: "#f1f5f9",
          borderDash: [5, 5]
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: 0, // Disable animation for smooth live updates
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl text-slate-800">{stock.name}</span>
          <span className={`text-lg font-medium ${isUp ? "text-emerald-600" : "text-red-500"}`}>
            ₹{stock.price.toFixed(2)}
          </span>
          <span className={`text-sm px-2 py-1 rounded ${isUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {stock.percent_change}%
          </span>
        </div>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="h-[400px] p-6">
        <div className="h-full w-full">
          {history.length < 2 ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              Waiting for data updates...
            </div>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsModal;
