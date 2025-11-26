import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useStockStore from "../app/stockStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HoldingsChart = () => {
  const { holdings, watchList } = useStockStore();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    let dataToRender = [];
    let label = "";

    if (holdings && holdings.length > 0) {
      // Show Holdings
      label = "Current Value (₹)";
      dataToRender = holdings.map((h) => {
        const liveStock = watchList.find((s) => s.symbol === h.symbol);
        const currentPrice = liveStock ? liveStock.price : h.avg; 
        return {
          symbol: h.symbol,
          value: h.qty * currentPrice
        };
      });
    } else {
      // Show All Stocks (Fallback)
      label = "Stock Price (₹)";
      dataToRender = watchList.map((s) => ({
        symbol: s.symbol,
        value: s.price
      }));
    }

    const labels = dataToRender.map(d => d.symbol);
    const values = dataToRender.map(d => d.value);

    // Generate colors dynamically
    const backgroundColors = dataToRender.map((_, i) => `hsl(${(i * 360) / dataToRender.length}, 70%, 60%)`);
    const borderColors = dataToRender.map((_, i) => `hsl(${(i * 360) / dataToRender.length}, 70%, 50%)`);

    setChartData({
      labels,
      datasets: [
        {
          label: label,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  }, [holdings, watchList]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Portfolio Value Distribution',
        font: {
            size: 16,
            weight: 'normal'
        },
        color: '#334155'
      },
    },
    scales: {
        y: {
            grid: {
                color: '#f1f5f9'
            },
            ticks: {
                callback: function(value) {
                    return '₹' + value;
                }
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
  };

  // if (!holdings || holdings.length === 0) return null; // Removed to allow fallback chart

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mt-6 h-[350px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HoldingsChart;
