import { holdings   } from "../data/data";





const Holdings = () => {
  return (
    <div className="px-2 py-6">
      <h3 className="text-sm font-medium text-slate-700 mb-3">Holdings ({holdings.length})</h3>

      <div className="overflow-x-auto">
        <div className="max-h-125 overflow-y-auto">
        <table className="w-full text-sm text-slate-700 border-collapse">
          <thead className="sticky top-0 bg-white border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-center">Qty.</th>
              <th className="px-3 py-2 text-center">Avg. cost</th>
              <th className="px-3 py-2 text-center">LTP</th>
              <th className="px-3 py-2 text-center">Cur. val</th>
              <th className="px-3 py-2 text-center">P&amp;L</th>
              <th className="px-3 py-2 text-center">Net chg.</th>
              <th className="px-3 py-2 text-center">Day chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            
         {holdings.map((stock,idx)=>{
            let currentVal= stock.price * stock.qty;
            let isProfit=(currentVal - (stock.avg * stock.qty))>=0;
            const profClass= isProfit ? "text-emerald-600" : "text-red-500";
            const dayClass= stock.isLoss ? "text-emerald-600" : "text-red-500";
            return (
              <tr key={idx}>
              <td className="px-3 py-2 text-left">{stock.name}</td>
              <td className="px-3 py-2 text-center">{stock.qty}</td>
              <td className="px-3 py-2 text-center">{stock.avg.toFixed(2)}</td>
              <td className="px-3 py-2 text-center">{stock.price.toFixed(2)}</td>
              <td className="px-3 py-2 text-center">{currentVal.toFixed(2)}</td>
              <td className={`px-3 py-2 text-center ${profClass}` }>{(currentVal - (stock.avg * stock.qty)).toFixed(2)}</td>
              <td className={`px-3 py-2 text-center ${profClass}` }>{stock.net}</td>
              <td className={`px-3 py-2 text-center ${dayClass}` }>{stock.day}</td>

              </tr>
            )
         }) }


          </tbody>
        </table>
        </div>
      </div>

      <div className="flex gap-12 mt-6 text-center mt-12" >
        <div>
          <h5 className="text-xl font-light text-slate-800">29,875.<span className="text-sm">55</span></h5>
          <p className="text-medium text-slate-500">Total investment</p>
        </div>

        <div>
          <h5 className="text-xl font-light text-slate-800">31,428.<span className="text-sm">95</span></h5>
          <p className="text-medium text-slate-500">Current value</p>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
