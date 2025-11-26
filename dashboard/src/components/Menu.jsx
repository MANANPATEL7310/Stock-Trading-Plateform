import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import useStockStore from "../app/stockStore";

const Menu = () => {
 const [open, setOpen] = useState(false);
 const { user, fetchUser } = useStockStore();
 const menuRef = useRef(null);

 useEffect(() => {
   if (!user) fetchUser();
 }, [fetchUser, user]);

 // Click outside handler
 useEffect(() => {
   function handleClickOutside(event) {
     if (menuRef.current && !menuRef.current.contains(event.target)) {
       setOpen(false);
     }
   }
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [menuRef]);

 const getInitials = (name) => {
   if (!name) return "U";
   return name.substring(0, 2).toUpperCase();
 };

  function navLinkClass({ isActive }) {
    return `!no-underline transition-colors ${
      isActive ? "!text-orange-600" : "!text-[#666] hover:!text-orange-500"
    }`;
  }


  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-3 text-sm mb-12">


        <img src="/logo.png" className="h-6 w-auto" alt="logo" />


        <nav className="hidden gap-6 text-slate-600 sm:flex ml-auto mr-12">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>
          <NavLink to="/holdings" className={navLinkClass}>
            Holdings
          </NavLink>
          <NavLink to="/positions" className={navLinkClass}>
            Positions
          </NavLink>
          <NavLink to="/funds" className={navLinkClass}>
            Funds
          </NavLink>
          <NavLink to="/apps" className={navLinkClass}>
            Apps
          </NavLink>
        </nav>



        <div className="relative" ref={menuRef}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-50"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-50 text-xs font-medium text-fuchsia-500">
            {getInitials(user?.username)}
          </div>
          <p className="text-xs font-medium">{user?.username || "USER"}</p>
        </button>
      )}

      {open && (
        <>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-50 text-xs font-medium text-fuchsia-500">
              {getInitials(user?.username)}
            </div>
            <p className="text-xs font-medium">{user?.username || "USER"}</p>
          </button>

          <div className="absolute right-0 top-12 z-50">
            <ProfileDropdown />
          </div>
        </>
      )}
    </div>
      </div>
    </header>
  );
};

export default Menu;
