import React from "react";
import {Link} from 'react-router-dom';

function Hero() {
  return (
    <>
    <div className="min-h-[calc(95vh-120px)]">
      <div className="max-w-7xl  flex flex-col items-center  mx-auto my-20 ">
        <h1 className="text-xl md:text-2xl font-medium text-[#424242] ">
          We pioneered the discount broking model in India.
        </h1>
        <h1 className="text-xl md:text-2xl font-medium text-[#424242] ">
          Now, we are breaking ground with our technology.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto mt-40  max-w-7xl  items-center">
        <div className="flex flex-col items-end gap-6  md:pl-24 ">
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier.
          </p>
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
        </div>

        <div className="flex flex-col items-start h-[100%] gap-6 md:pl-24 ">
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
           <Link to="#"> Rainmatter</Link>, our fintech fund and incubator, has invested in several
            fintech startups with the goal of growing the Indian capital
            markets.
          </p>
          <p className="text-gray-500 text-base font-[500] leading-[1.7] max-w-sm">
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our<Link to="#"> blog</Link> or see what the media is <Link to="#">saying about
            us</Link> or learn more about our business and product <Link to="#">philosophies.</Link>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Hero;
