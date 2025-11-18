
import { positions } from "../data/data";


const Positions = () => {
  return (
    <div className="px-2 py-6">
      <h3 className="text-sm font-medium text-slate-700 mb-3">Positions ({positions.length})</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700 border-collapse">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Product</th>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-center">Qty.</th>
              <th className="px-3 py-2 text-center">Avg.</th>
              <th className="px-3 py-2 text-center">LTP</th>
              <th className="px-3 py-2 text-center">P&amp;L</th>
              <th className="px-3 py-2 text-center">Chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
           {positions.map((stock,idx)=>{
                      let currentVal= stock.price * stock.qty;
                      let isProfit=(currentVal - (stock.avg * stock.qty))>=0;
                      const profClass= isProfit ? "text-emerald-600" : "text-red-500";
                      const dayClass= stock.isLoss ? "text-red-500" : "text-emerald-600";
                      return (
                        <tr key={idx}>
                        <td className="px-3 py-2 text-left">{stock.product}</td>
                        <td className="px-3 py-2 text-left">{stock.name}</td>
                        <td className="px-3 py-2 text-center">{stock.qty}</td>
                        <td className="px-3 py-2 text-center">{stock.avg.toFixed(2)}</td>
                        <td className="px-3 py-2 text-center">{stock.price.toFixed(2)}</td>
                        <td className={`px-3 py-2 text-center ${profClass}` }>{(currentVal - (stock.avg * stock.qty)).toFixed(2)}</td>
                        <td className={`px-3 py-2 text-center ${dayClass}` }>{stock.day}</td>
          
                        </tr>
                      )
                   }) }
          

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
