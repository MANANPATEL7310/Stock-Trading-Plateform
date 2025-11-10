import React from "react";
import { Link } from "react-router-dom";

function Founder() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 w-full mx-auto px-6 max-w-7xl  items-center mb-16">
        <div className="flex justify-end "></div>
        <div className="space-y-4 px-8">
          <h1 className="text-2xl md:text-3xl font-medium text-[#424242] ">
            People
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full mx-auto px-6 max-w-7xl  items-center ">
        <div className="w-full  flex justify-end mr-4 ">
          <div className=" flex flex-col items-center">
            <img
              src="/media/images/nithinKamath.jpg"
              className=" max-w-xs rounded-full"
            />
            <h1 className="text-xl md:text-3xl mt-4 font-medium text-[#424242]  ">
              Nithin Kamath
            </h1>
            <p className="text-gray-700 text-[1.1rem] mt-4 leading-[1.6] max-w-xl">
              Founder, CEO
            </p>
          </div>
        </div>
        <div className="space-y-4 px-8 h-[100%] flex flex-col ">
          <p className="text-gray-700 text-[1.1rem] mt-12 leading-[1.6] max-w-xl mb-6 ">
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p className="text-gray-700 text-[1.1rem]  leading-[1.6] max-w-xl mb-6 ">
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p className="text-gray-700 text-[1.1rem]  leading-[1.6] max-w-xl mb-6 ">
            Playing basketball is his zen.
          </p>
          <p className="text-gray-700 text-[1.1rem]  leading-[1.6] max-w-xl mb-6 ">
            Connect on <Link to="#">Homepage</Link> / <Link to="#">TradingQnA</Link> / <Link to="#">Twitter</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Founder;
