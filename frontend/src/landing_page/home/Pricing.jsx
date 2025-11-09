import React from "react";

function Pricing() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mx-auto mt-24 px-6 max-w-7xl  items-center ">
        <div className="p-4 md:pl-24 ">
          <h1 className="text-xl md:text-xl font-medium text-[#424242]">
            Unbeatable pricing
          </h1>
          <p className="text-gray-700 text-base mt-8 leading-[1.8] max-w-xl">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <p className="mt-4">
            <a href="#">
              See pricing <i class="fa-solid fa-arrow-right"></i>
            </a>
          </p>
        </div>
        <div className="flex items-start">
          <div className="flex items-center p-4">
            <img src="/media/images/pricing0.svg" className="w-24 h-32" />
            <p className="text-xs mt-4 leading-tight -ml-4 text-[#666]">
              Free account <br /> opening
            </p>
          </div>
          <div className="flex items-center p-4">
            <img src="/media/images/pricingEquity.svg" className="w-24 h-32" />
            <p className="text-xs mt-4 leading-tight -ml-4 text-[#666]">
              Free equity delivery
              <br />
              and direct mutual funds
            </p>
          </div>
          <div className="flex items-center p-4">
            <img src="/media/images/pricingMF.svg" className="w-24 h-32" />
            <p className="text-xs mt-4 leading-tight  text-[#666]">
              Intraday and
              <br />
              F&O
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
