import React, { useState,useContext } from "react";

import { Tooltip, Grow } from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  SignalCellularAlt,
  MoreHoriz,
} from "@mui/icons-material";

// import GeneralContext from "./GeneralContext";
import useStockStore from "../app/stockStore";
import { watchlist } from "../data/data";

const WatchList = () => {
  return (
    <aside className="border-r border-slate-200 bg-white h-screen flex flex-col">
      <div className="flex justify-between px-4 py-8 text-[11px] text-slate-500 border-b border-slate-200">
        <span>NIFTY 50</span> <span>0.00</span>
        <span>SENSEX</span> <span>0.00</span>
      </div>

      <div className="relative border-b border-slate-200">
        <input
          type="text"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="w-full px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
          {watchlist.length} /{watchlist.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[60%]">
        <ul className="text-sm divide-y divide-slate-100">
          {watchlist.map((stock, idx) => (
            <WatchListItem key={idx} stock={stock} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  };
  const handleMouseLeave = () => {
    setShowWatchListActions(false);
  };

  const colorClass = stock.isDown ? "text-red-500" : "text-emerald-600";

  return (
    <li
      className="relative grid grid-cols-[3fr_1fr_1fr] px-4 py-2 text-sm hover:cursor-pointer hover:bg-slate-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`font-medium flex items-center text-left ${colorClass}`}>
        {stock.name}
      </span>

      <span
        className={`flex items-center justify-center gap-1 pl-24 ${colorClass}`}
      >
        {stock.percent}
        {stock.isDown ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
      </span>

      <span
        className={`flex items-center justify-end font-medium ${colorClass}`}
      >
        {stock.price}
      </span>

      {showWatchListActions && (
        <div className="absolute right-[35%] top-1/2 -translate-y-1/2">
          <WatchListItemActions uid={stock.name}/>
        </div>
      )}
    </li>
  );
};

const WatchListItemActions = ({uid}) => {
  
  // const generalContext=useContext(GeneralContext);
  const setOpenBuyWindow=useStockStore((state)=>state.setOpenBuyWindow)
  const handleBuyClick=()=>{
    setOpenBuyWindow(uid);
    // generalContext.openBuyWindow(uid);
  };



  return (
    <>
      <div className="flex items-center gap-2">
        <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#2979FF] text-white font-bold hover:opacity-90 transition"
          onClick={handleBuyClick}>
            B
          </button>
        </Tooltip>

        <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FF5722] text-white font-bold hover:opacity-90 transition">
            S
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="w-8 h-8 flex items-center justify-center rounded-md border hover:bg-slate-100 transition">
            <SignalCellularAlt />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border hover:bg-slate-100 transition">
            <MoreHoriz />
          </button>
        </Tooltip>
      </div>
    </>
  );
};
