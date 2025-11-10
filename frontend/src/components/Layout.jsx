import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="relative top-[120px] mb-50">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
