import React from "react";

function Stats() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mx-auto mt-28 px-6 max-w-7xl  items-center ">
        <div className="p-4 md:pl-24 ">
          <h1 className="text-2xl md:text-2xl font-medium text-[#424242]">
            Trust with confidence
          </h1>
          <div className="mt-8">
            <h1 className="text-xl md:text-xl font-medium text-[#424242]">
              Customer-first always
            </h1>
            <p className="text-gray-700 text-base mt-2 leading-[1.8] max-w-xl">
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh
              crores of equity investments, making us India’s largest broker;
              contributing to 15% of daily retail exchange volumes in India.
            </p>
          </div>
          <div className="mt-8">
            <h1 className="text-xl md:text-xl font-medium text-[#424242]">
              No spam or gimmicks
            </h1>
            <p className="text-gray-700 mt-2 leading-[1.8] max-w-xl">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
            </p>
            <a href="#">Our philosophies.</a>
          </div>
          <div className="mt-8">
            <h1 className="text-xl md:text-xl font-medium text-[#424242]">
              The Zerodha universe
            </h1>
            <p className="text-gray-700 mt-2 leading-[1.8] max-w-xl">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your
              needs.
            </p>
          </div>
          <div className="mt-8">
            <h1 className="text-xl md:text-xl font-medium text-[#424242]">
              Do better with money
            </h1>
            <p className="text-gray-700 mt-2 leading-[1.8] max-w-xl">
              With initiatives like <a href="#">Nudge</a> and{" "}
              <a href="#">Kill Switch</a>, we don't just facilitate
              transactions, but actively help you do better with your money.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center  h-[100%] w-[100%] ">
          <img
            src="/media/images/ecosystem.png"
            alt="The Zerodha Universe"
            className="w-full max-w-2xl h-[90%] object-contain opacity-90"
          />

          <p className="mt-4 space-x-12">
            <a href="#">
              Explore our products <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#">
              Try Kite demo <i class="fa-solid fa-arrow-right"></i>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Stats;
