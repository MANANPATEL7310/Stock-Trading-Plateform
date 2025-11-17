import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Placeholder Icon (You can replace with img/icon later) */}
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
};

export default Orders;
