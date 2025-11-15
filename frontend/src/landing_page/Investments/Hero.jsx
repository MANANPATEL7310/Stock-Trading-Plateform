import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="min-h-[calc(80vh-120px)]">
        <div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-16 ">
          <h1 className="text-xl md:text-3xl font-[500] text-[#424242] ">
            Investments
          </h1>
          <h2 className="text-xl md:text-lg font-[400] text-[#424242] opacity-90">
            Everything from equities and derivatives to mutual funds and fixed
            income
          </h2>
          <p className="text-xl md:text-base text-[#424242]  ">
            Check out our{"  "}
            <Link to="/products">
              technology offerings{" "}
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </p>
        </div>
        <div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-16 ">
          <iframe
            width="700"
            height="400"
            src="https://www.youtube.com/embed/hpECGCr-oe8?autoplay=1&mute=1&loop=1&playlist=hpECGCr-oe8"
            title="The Zerodha Universe"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
       
      </div>
       
    </>
  );
}

export default Hero;
