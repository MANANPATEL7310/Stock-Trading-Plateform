import React from "react";
import axios from "axios";
import useStockStore from "../app/stockStore";

function ProfileDropdown() {
  const { user } = useStockStore();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = `${import.meta.env.VITE_FRONTEND_URL}`;
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="w-64 rounded-md border border-slate-200 bg-white shadow-md text-sm">
        {/* Header */}
        <div className="p-4 border-b border-slate-100">
          <p className="font-medium text-slate-800">{user?.username || "User"}</p>
          <p className="text-xs text-slate-500">{user?.email || "user@example.com"}</p>
        </div>

        {/* Section 1 */}
        <div className="border-b border-slate-100">
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-regular fa-user text-slate-400"></i>
            <span>My profile / Settings</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-slate-100">
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-solid fa-desktop text-slate-400"></i>
            <span>Console</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-regular fa-circle text-slate-400"></i>
            <span>Coin</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-regular fa-life-ring text-slate-400"></i>
            <span>Support</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-solid fa-users text-slate-400"></i>
            <span>Invite friends</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-b border-slate-100">
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-solid fa-route text-slate-400"></i>
            <span>Tour Kite</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-solid fa-keyboard text-slate-400"></i>
            <span>Keyboard shortcuts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-slate-700">
            <i className="fa-solid fa-circle-question text-slate-400"></i>
            <span>Help</span>
          </div>
        </div>

        {/* Logout (link) */}
        <div
          className="px-4 py-2 hover:bg-slate-50 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-2 text-red-500 font-medium">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDropdown;