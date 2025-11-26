import React, { useState, useEffect } from "react";
import useStockStore from "../app/stockStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Funds = () => {
  const { funds, fetchFunds, withdrawFunds } = useStockStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive amount.");
      return;
    }
    if (amount > funds) {
      toast.error("Insufficient funds.");
      return;
    }

    const result = await withdrawFunds(amount);
    if (result.success) {
      toast.success("Withdrawal successful! Funds deducted.");
      setShowWithdrawModal(false);
      setWithdrawAmount("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="px-2 py-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 text-white px-4 py-1.5 rounded text-xs hover:bg-emerald-600 transition"
          >
            Add funds
          </button>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="bg-indigo-500 text-white px-4 py-1.5 rounded text-xs hover:bg-indigo-600 transition"
          >
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
            <span className="text-indigo-600 font-medium text-lg">₹{funds.toFixed(2)}</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span>Used margin</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span>Available cash</span>
            <span>₹{funds.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-slate-200 divide-y divide-slate-100">
          <div className="flex justify-between px-4 py-2"><span>Opening Balance</span><span>₹{funds.toFixed(2)}</span></div>
          <div className="flex justify-between px-4 py-2"><span>Payin</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>SPAN</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Delivery margin</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Exposure</span><span>0.00</span></div>
          <div className="flex justify-between px-4 py-2"><span>Options premium</span><span>0.00</span></div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Add Funds</h3>
            <p className="text-sm text-gray-600 mb-4">
              We will implement the add funds feature shortly. Still enjoy the demo credits (₹10,000)!
            </p>
            <button 
              onClick={() => setShowAddModal(false)}
              className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Withdraw Funds</h3>
            <p className="text-sm text-gray-600 mb-2">Available Balance: ₹{funds.toFixed(2)}</p>
            <input 
              type="number" 
              placeholder="Enter amount" 
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleWithdraw}
                className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
