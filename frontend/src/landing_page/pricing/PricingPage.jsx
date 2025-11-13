import React from "react";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import Hero from "./Hero";
import Equity from "../../components/Equity";
import Currency from "../../components/Currency";
import Commodity from "../../components/Commodity";

import Brokerage from "./Brokerage";

function PricingPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const activeTab = hash?.replace("#", "") || "equity";

  function getTabClass(tabName) {
    // These classes are always applied
    const baseClasses = "pb-3 border-b-2 transition-colors duration-200 ";

    // These are applied only if the tab is active
    const activeClasses = "border-blue-500 text-blue-600";

    // These are applied only if the tab is inactive
    const inactiveClasses =
      "border-transparent !text-gray-600 hover:text-blue-500 ";

    if (tabName === activeTab) {
      return `${baseClasses} ${activeClasses}`;
    } else {
      return `${baseClasses} ${inactiveClasses}`;
    }
  }

  return (
    <>
      <Hero />

      {/* Tabs Navigation */}
      <div className="max-w-6xl mx-auto mt-10 px-8">
        <div className="md:p-4">
          <div className=" border-b border-gray-300 flex gap-8 text-sm md:text-2xl font-medium text-gray-600">
            <NavLink to="#equity" className={getTabClass("equity")}>
              <button>Equity</button>
            </NavLink>

            <NavLink to="#currency" className={getTabClass("currency")}>
              <button>Currency</button>
            </NavLink>

            <NavLink to="#commodity" className={getTabClass("commodity")}>
              <button>Commodity</button>
            </NavLink>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "equity" && <Equity />}
          {activeTab === "currency" && <Currency />}
          {activeTab === "commodity" && <Commodity />}
        </div>
        <p className="text-lg md:text-xl text-center font-[400] text-[#424242] pt-4">
          <Link>
    
              Calculate your costs upfront
          </Link>
          {" "}using our brokerage calculator
        </p>
      </div>
      <Brokerage />
    </>
  );
}

export default PricingPage;
