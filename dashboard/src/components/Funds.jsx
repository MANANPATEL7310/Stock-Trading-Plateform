import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <div className="px-2 py-6">
      <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <div className="flex gap-2">
          <button className="bg-emerald-500 text-white px-4 py-1.5 rounded text-xs hover:bg-emerald-600">
            Add funds
          </button>
          <button className="bg-indigo-500 text-white px-4 py-1.5 rounded text-xs hover:bg-indigo-600">
            Withdraw
          </button>
        </div>
      </div>

      {/* Equity Section */}
      <h6 className="text-sm font-medium text-slate-700 mb-2">Equity</h6>

      <div className="border border-slate-200 rounded-md text-sm">
        <div className="divide-y divide-slate-100">
          <div className="flex justify-between px-4 py-2">
            <span>Available margin</span>
            <span className="text-indigo-600 font-medium">4,043.10</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span>Used margin</span>
            <span>3,757.30</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span>Available cash</span>
            <span>4,043.10</span>
          </div>
        </div>

        <div className="border-t border-slate-200 divide-y divide-slate-100">
          <div className="flex justify-between px-4 py-2"><span>Opening Balance</span><span>4,043.10</span></div>
          <div className="flex justify-between px-4 py-2"><span>Opening Balance</span><span>3736.40</span></div>
          <div className="flex justify-between px-4 py-2"><span>Payin</span><span>4064.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>SPAN</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Delivery margin</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Exposure</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Options premium</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Collateral (Liquid funds)</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Collateral (Equity)</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Total Collateral</span><span>0.00</span></div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
