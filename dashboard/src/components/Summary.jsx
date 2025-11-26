import React, { useEffect, useState } from "react";
import useStockStore from "../app/stockStore";

const Summary = () => {
  const { funds, holdings, watchList, user, fetchFunds, fetchHoldings, fetchUser } = useStockStore();
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);
  const [pnlPercent, setPnlPercent] = useState(0);

  useEffect(() => {
    fetchFunds();
    fetchHoldings();
    if (!user) fetchUser();
  }, [fetchFunds, fetchHoldings, fetchUser, user]);

  useEffect(() => {
    let investment = 0;
    let currVal = 0;

    holdings.forEach((stock) => {
      investment += stock.qty * stock.avg;
      
      const liveStock = watchList.find((s) => s.symbol === stock.symbol);
      const price = liveStock ? liveStock.price : stock.avg;
      
      currVal += stock.qty * price;
    });

    setTotalInvestment(investment);
    setCurrentValue(currVal);
    
    const pnl = currVal - investment;
    setTotalPnL(pnl);
    
    const percent = investment > 0 ? (pnl / investment) * 100 : 0;
    setPnlPercent(percent);

  }, [holdings, watchList]);

  return (
    <>
    <div className="flex flex-col gap-4 justify-center">
      <h6 className="text-2xl font-medium text-slate-700">Hi, {user ? user.username : "User"}!</h6>
      <hr className="my-4 border-slate-200" />

      {/* Equity Section */}
      <section className="border-b border-slate-200 py-20">
        <h6 className="text-xl font-medium text-slate-600 mb-6 flex gap-2 items-center">
          <i className="fa-regular fa-clock"></i>Equity
        </h6>

        <div className="flex items-center gap-8">
          <div>
            <h3 className="text-4xl font-base text-slate-800">
              ₹{(funds / 1000).toFixed(2)}k
            </h3>
            <p className="text-xs text-slate-500 mt-1">Margin available</p>
          </div>

          <div className="h-12 w-px bg-slate-200" />

          <div className="text-sm text-slate-500">
            <p>Margins used <span className="text-slate-700">0</span></p>
            <p>Opening balance <span className="text-slate-700">₹{(funds / 1000).toFixed(2)}k</span></p>
          </div>
        </div>
      </section>

      {/* Holdings Section */}
      <section className="py-20 ">
        <h6 className="text-xl font-medium text-slate-600 mb-6 flex gap-2 items-center">
          <i className="fa-regular fa-calendar"></i>Holdings ({holdings.length})
        </h6>

        <div className="flex items-center gap-8">
          <div>
            <h3 className={`text-4xl font-base ${totalPnL >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {totalPnL >= 0 ? "+" : ""}₹{(Math.abs(totalPnL) / 1000).toFixed(2)}k 
              <small className="text-xs font-base ml-2">{pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%</small>
            </h3>
            <p className="text-xs text-slate-500 mt-1">P&L</p>
          </div>

          <div className="h-12 w-px bg-slate-200" />

          <div className="text-sm text-slate-500">
            <p>Current Value <span className="text-slate-700">₹{(currentValue / 1000).toFixed(2)}k</span></p>
            <p>Investment <span className="text-slate-700">₹{(totalInvestment / 1000).toFixed(2)}k</span></p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Summary;
