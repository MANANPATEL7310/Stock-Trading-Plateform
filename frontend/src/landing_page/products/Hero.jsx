import React from 'react';
import { Link } from 'react-router-dom';
import LeftImage from  '../../components/LeftImage';


const data={image:"/media/images/kite.png",heading:"Kite",
  content:"Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.",url:["Try demo ","Learn more"]}



function Hero(){
  return (
    <>
       <div className="min-h-[calc(80vh-120px)]">
      
        <div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-16 ">
          <h1 className="text-xl md:text-3xl font-[500] text-[#424242] ">
           Zerodha Products
          </h1>
          <h2 className='text-xl md:text-lg font-[400] text-[#424242] opacity-90'>Sleek, modern, and intuitive trading platforms</h2>
          <p className='text-xl md:text-base text-[#424242]  '>Check out our{"  "}<Link to="/investments">investment offerings <i className="fa-solid fa-arrow-right-long"></i></Link></p>
        </div>
         <LeftImage data={data}/> 
       
      </div>

     </>
  );
};

export default Hero;