import { Button } from "@mui/material";
import React, { useState,useContext } from "react";
import GeneralContext from "./GeneralContext";


function BuyActionWindow({uid}) {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {};

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
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
      {/* Header / Drag Handle */}
      <div className="bg-blue-600 px-6 py-3 flex justify-between items-center ">
        <h3 className="text-white font-semibold text-lg m-0">Buy Order</h3>
        <span className="text-blue-200 text-xs">{uid}</span>
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
          <span className="font-semibold text-gray-700">₹140.65</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            className="
              flex-1
              !bg-blue-600 hover:!bg-blue-700 
              !text-white !font-semibold 
              !py-3 !rounded-lg
              !text-sm !normal-case
              !shadow-md hover:!shadow-lg
              !transition-all !duration-200
            "
            onClick={handleBuyClick}
          >
            Buy
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



// Margin Requirement=Number of Shares×Price per Share×Margin Rate Percentage