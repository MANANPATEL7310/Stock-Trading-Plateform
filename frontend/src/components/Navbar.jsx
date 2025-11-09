import React, { useState } from "react";
import {Link} from 'react-router-dom';
import ProductsMegaPanelDesktop from "./ProductsMegaPanelDesktop";
import ProductsContent from "./ProductsContent";

function Navbar() {
  const [desktopOpen, setDesktopOpen] = useState(false); // ≥md mega panel
  const [mobileOpen, setMobileOpen] = useState(false);   // <md slide panel

  return (
    <>
      {/* NAVBAR */}
      <div className="grid grid-cols-2 gap-6 w-full h-[75px] px-6 py-8 max-w-7xl fixed left-1/2  -translate-x-1/2 z-50 bg-white items-center  rounded-md">
        <div className="ml-20">
          <Link to="/">
          <img src="/media/images/logo.svg" className="w-[25%] max-h-6" alt="Logo" /></Link>
        </div>

        {/* DESKTOP inline links + 3-bars */}
        <div className="mx-auto hidden md:block">
          <nav className="flex gap-10 items-center ">
            <Link to="/Signup" className="!no-underline !text-[#666] hover:!text-blue-600 transition-colors">Signup</Link>
            <Link to="/About" className="!no-underline !text-[#666] hover:!text-blue-600 transition-colors">About</Link>
            <Link to="/Products" className="!no-underline !text-[#666] hover:!text-blue-600 transition-colors">Products</Link>
            <Link to="/Pricing" className="!no-underline !text-[#666] hover:!text-blue-600 transition-colors">Pricing</Link>
            <Link to="/Support" className="!no-underline !text-[#666] hover:!text-blue-600 transition-colors">Support</Link>

            {/* 3-bars → toggles mega panel below navbar */}
            <button
              type="button"
              className="text-xl cursor-pointer hover:!text-blue-600 transition-colors hidden md:inline-flex"
              onClick={() => setDesktopOpen((v) => !v)}
              aria-expanded={desktopOpen}
              aria-label="Toggle products panel"
              title="Products"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </nav>
        </div>

        {/* MOBILE: Menu button */}
        <div className="flex justify-end md:hidden pr-2">
          <button
            type="button"
            className="text-base font-medium px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-panel"
          >
            Menu
          </button>
        </div>
      </div>

      {/* DESKTOP: MEGA PANEL (overlaying hero, not shifting layout) */}
      <div className="hidden md:block">
        <ProductsMegaPanelDesktop
          isOpen={desktopOpen}
          onClose={() => setDesktopOpen(false)}
        />
      </div>

      {/* MOBILE: LEFT SLIDE PANEL (unchanged) */}
      <div
        id="mobile-panel"
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="bg-white h-full w-[85%] max-w-[380px] shadow-xl p-6 pt-24 overflow-y-auto">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-4 text-gray-500 hover:text-gray-800 text-xl"
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Anchor links first (Option 1) */}
          <nav className="flex flex-col gap-4 mb-8 text-[15px]">
            <Link to="/Signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
            <Link to="/About" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/Products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link to="/Pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link to="/Support" className="text-gray-700 hover:text-blue-600">Support</Link>
          </nav>

          {/* Same products content inside mobile panel */}
          <ProductsContent />
        </div>
      </div>
    </>
  );
}

export default Navbar;
