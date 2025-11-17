const WatchList = () => {
  return (
    <aside className="border-r border-slate-200 bg-white">
      {/* Index Header */}
      <div className="flex justify-between px-4 py-8 text-[11px] text-slate-500 border-b border-slate-200">
        <span>NIFTY 50</span> <span>0.00</span>
        <span>SENSEX</span> <span>0.00</span>
      </div>

      {/* Search */}
      <div className="relative border-b border-slate-200">
        <input
          type="text"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="w-full px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
          9 / 50
        </span>
      </div>

      {/* Watchlist rows placeholder */}
      <ul className="text-sm divide-y divide-slate-100">
        <li className="px-4 py-2 flex justify-between">
          <span>INFY</span>
          <span className="text-red-500">1555.45</span>
        </li>
      </ul>
    </aside>
  );
};

export default WatchList;
