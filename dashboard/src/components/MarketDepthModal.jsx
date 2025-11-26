import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import useStockStore from "../app/stockStore";

const MarketDepthModal = ({ open, onClose, symbol }) => {
  const watchList = useStockStore((state) => state.watchList);
  const stock = watchList.find((s) => s.symbol === symbol);
  
  const [bids, setBids] = useState([]);
  const [offers, setOffers] = useState([]);

  // Generate mock depth data based on current price
  useEffect(() => {
    if (open && stock) {
      const price = stock.price;
      
      // Generate 5 Bids (Lower than price)
      const newBids = Array.from({ length: 5 }).map((_, i) => ({
        price: (price - (i + 1) * 0.05 - Math.random() * 0.1).toFixed(2),
        qty: Math.floor(Math.random() * 1000) + 10,
        orders: Math.floor(Math.random() * 20) + 1,
      }));

      // Generate 5 Offers (Higher than price)
      const newOffers = Array.from({ length: 5 }).map((_, i) => ({
        price: (price + (i + 1) * 0.05 + Math.random() * 0.1).toFixed(2),
        qty: Math.floor(Math.random() * 1000) + 10,
        orders: Math.floor(Math.random() * 20) + 1,
      }));

      setBids(newBids);
      setOffers(newOffers);
    }
  }, [stock?.price, open]); // Update when price changes

  if (!stock) return null;

  const totalBidQty = bids.reduce((acc, b) => acc + b.qty, 0);
  const totalOfferQty = offers.reduce((acc, o) => acc + o.qty, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-slate-800">{stock.name}</span>
          <span className="text-xs text-slate-500">Market Depth (Level 2)</span>
        </div>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="p-0">
        <div className="flex text-xs">
          {/* Bids (Buy Orders) */}
          <div className="flex-1 border-r border-slate-100">
            <div className="grid grid-cols-3 bg-slate-50 p-2 font-semibold text-slate-500 border-b border-slate-200">
              <span>Bid</span>
              <span className="text-center">Orders</span>
              <span className="text-right">Qty</span>
            </div>
            {bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 p-2 border-b border-slate-50 text-emerald-600">
                <span>{bid.price}</span>
                <span className="text-center text-slate-600">{bid.orders}</span>
                <span className="text-right text-slate-600">{bid.qty}</span>
              </div>
            ))}
            <div className="flex justify-between p-2 bg-emerald-50 font-bold text-emerald-700 mt-2">
              <span>Total</span>
              <span>{totalBidQty}</span>
            </div>
          </div>

          {/* Offers (Sell Orders) */}
          <div className="flex-1">
            <div className="grid grid-cols-3 bg-slate-50 p-2 font-semibold text-slate-500 border-b border-slate-200">
              <span>Offer</span>
              <span className="text-center">Orders</span>
              <span className="text-right">Qty</span>
            </div>
            {offers.map((offer, i) => (
              <div key={i} className="grid grid-cols-3 p-2 border-b border-slate-50 text-red-500">
                <span>{offer.price}</span>
                <span className="text-center text-slate-600">{offer.orders}</span>
                <span className="text-right text-slate-600">{offer.qty}</span>
              </div>
            ))}
            <div className="flex justify-between p-2 bg-red-50 font-bold text-red-700 mt-2">
              <span>Total</span>
              <span>{totalOfferQty}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketDepthModal;
