import React, { useEffect, useState } from "react";
import useStockStore from "../app/stockStore";
import { positions as dummyPositions } from "../data/data";

const Positions = () => {
  const { positions, watchList, fetchPositions, squareOffPosition } = useStockStore();
  const [totalDayPnL, setTotalDayPnL] = useState(0);

  // Determine if we are showing dummy data
  const isDummy = !positions || positions.length === 0;
  const displayPositions = isDummy ? dummyPositions : positions;

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  useEffect(() => {
    let dayPnL = 0;

    displayPositions.forEach((stock) => {
      const qty = stock.qty;
      const avg = stock.avg;
      
      // Find live price from watchList
      const liveStock = watchList.find((s) => s.symbol === stock.name || s.symbol === stock.symbol);
      const price = liveStock ? liveStock.price : (stock.price || avg);
      
      // Calculate Day's P&L (Current Value - Investment)
      // Note: For true intraday P&L, we'd need the previous day's close. 
      // Here we are approximating Day's P&L as Total P&L for simplicity as per user request for "intraday view of holdings"
      const curVal = qty * price;
      const investment = qty * avg;
      dayPnL += (curVal - investment);
    });

    setTotalDayPnL(dayPnL);
  }, [displayPositions, watchList]);

  const handleExit = async (symbol) => {
    if (window.confirm(`Are you sure you want to exit your position in ${symbol}?`)) {
      const result = await squareOffPosition(symbol);
      if (result.success) {
        alert(result.message);
        fetchPositions(); // Refresh
      } else {
        alert("Error: " + result.message);
      }
    }
  };



  return (
    <div className="px-2 py-6">
      {/* ... (warnings) */}

      <h3 className="text-sm font-medium text-slate-700 mb-3">Positions ({displayPositions.length})</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700 border-collapse">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-center">Qty.</th>
              <th className="px-3 py-2 text-center">Avg.</th>
              <th className="px-3 py-2 text-center">LTP</th>
              <th className="px-3 py-2 text-center">P&L</th>
              <th className="px-3 py-2 text-center">Chg.</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayPositions.map((stock, idx) => {
              const liveStock = watchList.find((s) => s.symbol === stock.name || s.symbol === stock.symbol);
              const ltp = liveStock ? liveStock.price : (stock.price || stock.avg);
              const curVal = stock.qty * ltp;
              const pnl = curVal - stock.qty * stock.avg;
              const dayChg = liveStock ? parseFloat(liveStock.percent) : (parseFloat(stock.day) || 0);
              
              const pnlClass = pnl >= 0 ? "text-emerald-600" : "text-red-500";
              const dayClass = dayChg >= 0 ? "text-emerald-600" : "text-red-500";

              return (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-left text-slate-500 text-xs">{stock.product || "CNC"}</td>
                  <td className="px-3 py-2 text-left font-medium">{stock.name || stock.symbol}</td>
                  <td className="px-3 py-2 text-center">{stock.qty}</td>
                  <td className="px-3 py-2 text-center">{stock.avg.toFixed(2)}</td>
                  <td className="px-3 py-2 text-center">{ltp.toFixed(2)}</td>
                  <td className={`px-3 py-2 text-center ${pnlClass}`}>
                    {pnl.toFixed(2)}
                  </td>
                  <td className={`px-3 py-2 text-center ${dayClass}`}>
                    {dayChg.toFixed(2)}%
                  </td>
                  <td className="px-3 py-2 text-center">
                    {!isDummy && (
                      <button 
                        onClick={() => handleExit(stock.symbol)}
                        className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 transition"
                      >
                        Exit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className="border-t border-slate-200 bg-slate-50">
            <tr>
              <td colSpan="5"></td>
              <td className="px-3 py-2 text-right font-medium text-slate-500">Total P&L</td>
              <td className={`px-3 py-2 text-center font-medium ${totalDayPnL >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                {totalDayPnL >= 0 ? "+" : ""}{totalDayPnL.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Positions;
