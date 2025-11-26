import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useStockStore from "../app/stockStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BuyActionWindow({ uid }) {
  const { watchList, placeOrder, setCloseBuyWindow, buyWindow } = useStockStore();
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [mode, setMode] = useState(buyWindow.mode || "BUY"); // Initialize from store

  // Find stock details from watchList
  const stock = watchList.find((s) => s.symbol === uid) || {};

  useEffect(() => {
    if (stock.price) {
      setStockPrice(stock.price);
    }
  }, [stock.price]);

  const handleBuyClick = async () => {
    const qty = parseInt(stockQuantity);
    const price = parseFloat(stockPrice);

    if (qty <= 0 || price <= 0) {
      toast.error("Invalid quantity or price");
      return;
    }

    const result = await placeOrder({
      symbol: uid,
      qty,
      price,
      mode,
    });

    if (result.success) {
      toast.success(`${mode} Order Placed Successfully!`);
      setTimeout(() => {
        setCloseBuyWindow();
      }, 1000);
    } else {
      toast.error(result.message);
    }
  };

  const handleCancelClick = () => {
    setCloseBuyWindow();
  };

  return (
    <div
      id="buy-window"
      className="
        absolute bottom-[50%] left-[35%] 
        w-[25%] min-w-[350px]
        bg-white 
        rounded-xl 
        shadow-2xl 
        border border-gray-200 
        z-[100]
        overflow-hidden
        font-sans
      "
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header / Drag Handle */}
      <div className={`px-6 py-3 flex justify-between items-center ${mode === "BUY" ? "bg-blue-600" : "bg-orange-600"}`}>
        <h3 className="text-white font-semibold text-lg m-0">{mode === "BUY" ? "Buy" : "Sell"} {uid}</h3>
        <div className="flex gap-2">
           <button onClick={() => setMode("BUY")} className={`text-xs px-2 py-1 rounded ${mode === "BUY" ? "bg-white text-blue-600" : "text-white border border-white"}`}>Buy</button>
           <button onClick={() => setMode("SELL")} className={`text-xs px-2 py-1 rounded ${mode === "SELL" ? "bg-white text-orange-600" : "text-white border border-white"}`}>Sell</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          {/* Qty */}
          <div className="flex-1">
            <label htmlFor="qty" className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Quantity
            </label>
            <input
              type="number"
              id="qty"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="
                w-full 
                bg-gray-50 
                border border-gray-300 
                rounded-lg 
                px-4 py-2 
                text-lg font-medium text-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
              "
            />
          </div>

          {/* Price */}
          <div className="flex-1">
            <label htmlFor="price" className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Price
            </label>
            <input
              type="number"
              id="price"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
              className="
                w-full 
                bg-gray-50 
                border border-gray-300 
                rounded-lg 
                px-4 py-2 
                text-lg font-medium text-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* Margin Info */}
        <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
          <span>Margin required</span>
          <span className="font-semibold text-gray-700">₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            className={`
              flex-1
              !text-white !font-semibold 
              !py-3 !rounded-lg
              !text-sm !normal-case
              !shadow-md hover:!shadow-lg
              !transition-all !duration-200
              ${mode === "BUY" ? "!bg-blue-600 hover:!bg-blue-700" : "!bg-orange-600 hover:!bg-orange-700"}
            `}
            onClick={handleBuyClick}
          >
            {mode}
          </Button>

          <Button
            className="
              flex-1
              !bg-white hover:!bg-gray-50 
              !text-gray-600 !font-medium
              !border !border-gray-300
              !py-3 !rounded-lg
              !text-sm !normal-case
              !transition-all !duration-200
            "
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BuyActionWindow;