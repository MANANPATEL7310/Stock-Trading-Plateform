import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useStockStore from "../app/stockStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const WatchListChart = () => {
  const watchlist = useStockStore((state) => state.watchList);

  // Data: All Stocks (Price)
  const labels = watchlist.map((s) => s.symbol);
  const prices = watchlist.map((s) => s.price);

  // Generate colors dynamically
  const backgroundColors = watchlist.map((_, i) => `hsl(${(i * 360) / watchlist.length}, 70%, 60%)`);
  const borderColors = watchlist.map((_, i) => `hsl(${(i * 360) / watchlist.length}, 70%, 50%)`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price (₹)",
        data: prices,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Show legend
        position: 'right', // Place on the right
        labels: {
          boxWidth: 10,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ₹${context.raw}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Stock Prices',
        font: {
          size: 14,
          weight: 'normal'
        },
        color: '#64748b'
      }
    },
    cutout: '60%',
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 h-[300px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default WatchListChart;
