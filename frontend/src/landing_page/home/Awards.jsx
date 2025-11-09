import React from 'react';

function Awards(){
  return (
    <>
        <div className="grid grid-cols-2 gap-6 w-full mx-auto px-6 max-w-7xl items ">
        <div className='flex justify-center mr-8'>
          <img src='/media/images/largestBroker.svg' className='w-full max-w-lg'/>
        </div>
        <div className='space-y-4 px-8'>
          <h1 className='text-3xl md:text-4xl font-medium text-[#424242] mt-4'>Largest stock broker in India</h1>
          <p className='text-gray-700'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in india daily by trading and investing in:</p>
          <div className='grid grid-cols-2 mt-16'>
             <div>
               <ul className="list-inside list-disc space-y-4">
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
               </ul>
             </div>
             <div>
               <ul className="list-inside list-disc space-y-4">
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
               </ul>
             </div>
          </div>
          <img src='/media/images/pressLogos.png' className='mt-8'/>
        </div>
        </div>
     </>
  );
};

export default Awards;