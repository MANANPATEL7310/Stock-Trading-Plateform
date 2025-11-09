import React from "react";

function Education() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 w-full mx-auto px-6 max-w-7xl mt-24  items ">
        <div className="flex justify-center mr-8">
          <img src="/media/images/education.svg" className="w-full max-w-lg" />
        </div>
        <div className="space-y-4 px-8">
          <h1 className="text-2xl md:text-3xl font-medium text-[#424242] mt-4">
            Free and open market education
          </h1>
          <p className="text-gray-700 text-base mt-8 leading-[1.8] max-w-xl mb-6">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#">
            <span className="text-lg">Varsity </span>{" "}
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <p className="text-gray-700 text-base mt-8 leading-[1.8] max-w-xl mb-6">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#">
            <span className="text-lg">TradingQ&amp;A  </span>{" "}
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Education;
