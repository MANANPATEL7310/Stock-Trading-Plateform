import React from "react";
import { Link } from "react-router-dom";

let data = [
  {
    image: "/media/images/pricing0.svg",
    h1: "Free equity delivery",
    p: "All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.",
  },
  {
    image: "/media/images/pricingMF.svg",
    h1: "Intraday and F&O trades",
    p: "Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.",
  },
  {
    image: "/media/images/pricing0.svg",
    h1: "Free direct MF",
    p: "All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.",
  },
];

function Hero() {
  return (
    <>
      <div className="min-h-[calc(95vh-120px)]">
        <div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-20 ">
          <h1 className="text-xl md:text-3xl font-[500] text-[#424242] ">
            Charges
          </h1>
          <h1 className="text-xs md:text-2xl font-base text-[#939393] ">
            List of all charges and taxes
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full mx-auto mt-50  max-w-7xl  items-start justify-items-center gap-2">
          {data.map((item, i) => {
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <img src={item.image} className="max-w-3xs max-h-[10rem]"/>
                <h1 className="text-xl md:text-2xl font-[500] text-[#424242] mt-4">{item.h1}</h1>
                <p className="text-[#808080] text-base font-[500] leading-[1.7] max-w-sm text-center mt-4">{item.p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Hero;
