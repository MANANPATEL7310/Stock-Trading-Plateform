import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStockStore from "../app/stockStore";

const Orders = () => {
  const { orders, fetchOrders } = useStockStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        {/* Placeholder Icon */}
        <div className="text-6xl text-slate-300 mb-6">📘</div>

        <p className="text-sm text-slate-500 mb-4">
          You haven't placed any orders today
        </p>

        <Link
          to="/"
          className="rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
        >
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h3 className="text-lg font-medium text-slate-700 mb-4">Orders ({orders.length})</h3>

      <div className="overflow-x-auto border border-slate-200 rounded-md">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Instrument</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty.</th>
              <th className="px-4 py-3">Buy Price</th>
              <th className="px-4 py-3">Sell Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className={`px-4 py-3 font-medium ${order.mode === "BUY" ? "text-emerald-600" : "text-red-500"}`}>
                  {order.mode} {order.type && order.type !== "MARKET" && <span className="text-[10px] bg-slate-100 px-1 rounded ml-1 text-slate-500">{order.type}</span>}
                </td>
                <td className="px-4 py-3 text-slate-900 font-medium">{order.name}</td>
                <td className="px-4 py-3">CNC</td>
                <td className="px-4 py-3">{order.qty}</td>
                <td className="px-4 py-3 text-emerald-600">
                  {order.mode === "BUY" ? `₹${order.price.toFixed(2)}` : "-"}
                </td>
                <td className="px-4 py-3 text-red-500">
                  {order.mode === "SELL" ? `₹${order.price.toFixed(2)}` : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded
                    ${(order.status === "EXECUTED" || !order.status) ? "bg-emerald-100 text-emerald-800" : 
                      order.status === "PENDING" ? "bg-amber-100 text-amber-800" : 
                      "bg-red-100 text-red-800"
                    }
                  `}>
                    {order.status || "EXECUTED"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
