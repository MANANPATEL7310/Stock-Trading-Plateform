const Holdings = () => {
  return (
    <div className="px-2 py-6">
      <h3 className="text-sm font-medium text-slate-700 mb-3">Holdings (13)</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700 border-collapse">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-right">Qty.</th>
              <th className="px-3 py-2 text-right">Avg. cost</th>
              <th className="px-3 py-2 text-right">LTP</th>
              <th className="px-3 py-2 text-right">Cur. val</th>
              <th className="px-3 py-2 text-right">P&amp;L</th>
              <th className="px-3 py-2 text-right">Net chg.</th>
              <th className="px-3 py-2 text-right">Day chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* rows go here */}
          </tbody>
        </table>
      </div>

      <div className="flex gap-12 mt-6 text-center">
        <div>
          <h5 className="text-xl font-light text-slate-800">29,875.<span className="text-sm">55</span></h5>
          <p className="text-xs text-slate-500">Total investment</p>
        </div>

        <div>
          <h5 className="text-xl font-light text-slate-800">31,428.<span className="text-sm">95</span></h5>
          <p className="text-xs text-slate-500">Current value</p>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
