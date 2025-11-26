import React, { useEffect, useState, useRef } from "react";
import useStockStore from "../app/stockStore";
import { holdings as dummyHoldings } from "../data/data";
import { Tooltip, Grow, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

// Sub-component for animated row
const HoldingsRow = ({ stock, watchList, isDummy, handleOpenGTT }) => {
  const liveStock = watchList.find((s) => s.symbol === stock.name || s.symbol === stock.symbol);
  const ltp = liveStock ? liveStock.price : (stock.price || stock.avg);
  const curVal = stock.qty * ltp;
  const pnl = curVal - stock.qty * stock.avg;
  const netChg = ((ltp - stock.avg) / stock.avg) * 100;
  
  const pnlClass = pnl >= 0 ? "text-emerald-600" : "text-red-500";
  
  // Animation State
  const prevLtpRef = useRef(ltp);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    if (prevLtpRef.current !== ltp) {
      if (ltp > prevLtpRef.current) {
        setFlashClass("bg-emerald-100 transition-colors duration-500");
      } else if (ltp < prevLtpRef.current) {
        setFlashClass("bg-red-100 transition-colors duration-500");
      }
      
      prevLtpRef.current = ltp;

      const timer = setTimeout(() => {
        setFlashClass("transition-colors duration-1000"); // Fade out
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [ltp]);

  const hasGTT = stock.target || stock.stopLoss;

  return (
    <tr className={`hover:bg-slate-50 ${flashClass} ${hasGTT ? "bg-blue-50/40 border-l-4 border-blue-500" : "border-l-4 border-transparent"}`}>
      <td className="px-3 py-2 text-left font-medium">{stock.name || stock.symbol}</td>
      <td className="px-3 py-2 text-center">{stock.qty}</td>
      <td className="px-3 py-2 text-center">{stock.avg.toFixed(2)}</td>
      <td className="px-3 py-2 text-center">₹{ltp.toFixed(2)}</td>
      <td className="px-3 py-2 text-center">₹{curVal.toFixed(2)}</td>
      <td className={`px-3 py-2 text-center ${pnlClass}`}>
        {pnl.toFixed(2)}
      </td>
      <td className={`px-3 py-2 text-center ${pnlClass}`}>
        {netChg.toFixed(2)}%
      </td>
      <td className="px-3 py-2 text-center">
        {!isDummy && (
          <button 
            onClick={() => handleOpenGTT(stock)}
            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
          >
            {stock.target || stock.stopLoss ? "Edit GTT" : "Set GTT"}
          </button>
        )}
        {(stock.target || stock.stopLoss) && (
          <div className="text-[10px] text-slate-500 mt-1">
            {stock.target && <span>T: {stock.target} </span>}
            {stock.stopLoss && <span>SL: {stock.stopLoss}</span>}
          </div>
        )}
      </td>
    </tr>
  );
};

const Holdings = () => {
  const { holdings, watchList, fetchHoldings, setTriggers } = useStockStore();
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);
  
  // GTT Modal State
  const [openGTT, setOpenGTT] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [targetPrice, setTargetPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");

  // Determine if we are showing dummy data
  const isDummy = !holdings || holdings.length === 0;
  const displayHoldings = isDummy ? dummyHoldings : holdings;

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  useEffect(() => {
    let investment = 0;
    let currVal = 0;

    displayHoldings.forEach((stock) => {
      const qty = stock.qty;
      const avg = stock.avg;
      investment += qty * avg;
      
      const liveStock = watchList.find((s) => s.symbol === stock.name || s.symbol === stock.symbol);
      const price = liveStock ? liveStock.price : (stock.price || avg); 
      currVal += qty * price;
    });

    setTotalInvestment(investment);
    setCurrentValue(currVal);
    setTotalPnL(currVal - investment);
  }, [displayHoldings, watchList]);

  const handleOpenGTT = (holding) => {
    setSelectedHolding(holding);
    setTargetPrice(holding.target || "");
    setStopLossPrice(holding.stopLoss || "");
    setOpenGTT(true);
  };

  const handleCloseGTT = () => {
    setOpenGTT(false);
    setSelectedHolding(null);
  };

  const handleSaveGTT = async () => {
    if (!selectedHolding) return;

    const result = await setTriggers({
      holdingId: selectedHolding._id,
      target: targetPrice ? parseFloat(targetPrice) : null,
      stopLoss: stopLossPrice ? parseFloat(stopLossPrice) : null,
    });

    if (result.success) {
      alert("GTT Triggers Set Successfully!");
      fetchHoldings(); // Refresh data
      handleCloseGTT();
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="px-2 py-6">
      {isDummy && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fa-solid fa-circle-exclamation text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">
                This is dummy data. Place an order to see real GTT features.
              </p>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-sm font-medium text-slate-700 mb-3">Holdings ({displayHoldings.length})</h3>

      <div className="overflow-x-auto">
        <div className="max-h-125 overflow-y-auto">
          <table className="w-full text-sm text-slate-700 border-collapse">
            <thead className="sticky top-0 bg-white border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left">Instrument</th>
                <th className="px-3 py-2 text-center">Qty.</th>
                <th className="px-3 py-2 text-center">Avg. cost</th>
                <th className="px-3 py-2 text-center">LTP</th>
                <th className="px-3 py-2 text-center">Cur. val</th>
                <th className="px-3 py-2 text-center">P&L</th>
                <th className="px-3 py-2 text-center">Net chg.</th>
                <th className="px-3 py-2 text-center">GTT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayHoldings.map((stock, idx) => (
                <HoldingsRow 
                  key={idx} 
                  stock={stock} 
                  watchList={watchList} 
                  isDummy={isDummy} 
                  handleOpenGTT={handleOpenGTT} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-12 mt-6 text-center mt-12 border-t pt-6">
        <div>
          <h5 className="text-xl font-light text-slate-800">
            ₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p className="text-medium text-slate-500">Total investment</p>
        </div>

        <div>
          <h5 className="text-xl font-light text-slate-800">
            ₹{currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p className="text-medium text-slate-500">Current value</p>
        </div>

        <div>
          <h5 className={`text-xl font-light ${totalPnL >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p className="text-medium text-slate-500">Total P&L</p>
        </div>
      </div>

      {/* GTT Modal */}
      <Dialog open={openGTT} onClose={handleCloseGTT}>
        <DialogTitle>Set GTT Triggers for {selectedHolding?.symbol}</DialogTitle>
        <DialogContent>
          <p className="text-sm text-slate-500 mb-4">
            Automatically sell this stock if the price hits the Target or Stop Loss.
          </p>
          <div className="flex flex-col gap-4">
            <TextField
              label="Target Price (Upper Limit)"
              type="number"
              fullWidth
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              helperText="Sell if price goes ABOVE this value"
            />
            <TextField
              label="Stop Loss Price (Lower Limit)"
              type="number"
              fullWidth
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(e.target.value)}
              helperText="Sell if price goes BELOW this value"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGTT} color="inherit">Cancel</Button>
          <Button onClick={handleSaveGTT} variant="contained" color="primary">Save Triggers</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Holdings;
