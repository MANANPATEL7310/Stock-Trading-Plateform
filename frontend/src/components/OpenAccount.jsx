import React from 'react';
import {Link} from 'react-router-dom';

function OpenAccount(){
  return (
    <>
       <div className='max-w-7xl text-center flex flex-col items-center mx-auto mt-24 '>
                 <h1 className="text-2xl md:text-3xl font-medium text-[#424242] mt-8">
       Open a Zerodha account
      </h1>

      <p className="text-lg mt-4 text-gray-600 leading-relaxed max-w-2xl">
      Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
      </p>
     
      <Link to="/signup">
      <button className="mt-8 bg-[#387ed1] hover:bg-[#000] transition-all text-white py-3 px-8 rounded-md text-lg font-medium cursor-pointer">
        Sign up for free
      </button>
      </Link>
       </div>
     </>
  );
};

export default OpenAccount;