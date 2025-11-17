const Positions = () => {
  return (
    <div className="px-2 py-6">
      <h3 className="text-sm font-medium text-slate-700 mb-3">Positions (2)</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700 border-collapse">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-right">Qty.</th>
              <th className="px-3 py-2 text-right">Avg.</th>
              <th className="px-3 py-2 text-right">LTP</th>
              <th className="px-3 py-2 text-right">P&amp;L</th>
              <th className="px-3 py-2 text-right">Chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* rows here */}
          </tbody>

          <tfoot className="border-t border-slate-200">
            <tr>
              <td colSpan="5"></td>
              <td className="px-3 py-2 text-right font-medium">Total</td>
              <td className="px-3 py-2 text-right font-medium">-49.94</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Positions;
