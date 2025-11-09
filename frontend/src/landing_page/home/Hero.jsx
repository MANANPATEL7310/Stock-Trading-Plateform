import React from "react";
import {Link} from 'react-router-dom';

function Hero() {
  return (
    <>
      <div className="w-full min-h-screen bg-white">
        {/* HERO */}
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 ">
          <div className="max-w-7xl mt-32 text-center flex flex-col items-center ">
            <img
              src="/media/images/homeHero.svg"
              alt="Hero"
              className="w-[80%] max-w-[90vw] mb-10 mx-auto object-contain"
            />

            <h1 className="text-2xl md:text-3xl font-medium text-[#424242] mt-8">
              Invest in everything
            </h1>

            <p className="text-lg mt-4 text-gray-600 leading-relaxed max-w-2xl">
              Online platform to invest in stocks, derivatives, mutual funds,
              ETFs, bonds, and more.
            </p>
             
            <Link to="/signup">
            <button className="mt-8 bg-[#387ed1] hover:bg-[#000] transition-all text-white py-3 px-8 rounded-md text-lg font-medium cursor-pointer">
              Sign up for free
            </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
