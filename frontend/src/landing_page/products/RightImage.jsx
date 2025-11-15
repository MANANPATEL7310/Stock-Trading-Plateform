import React from 'react';
import {Link} from 'react-router-dom';

function RightImage({data}){
  return (
    <>
         <div className="max-w-5xl mx-auto pt-20 px-4">
      <div className="flex flex-col md:flex-row items-center gap-24">

        {/* LEFT TEXT (1/3 width) */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-3xl font-normal">{data.heading}</h2>

          <p className="text-gray-600 leading-relaxed">
            {data.content}
          </p>

          <Link to="#" className="text-blue-600 font-medium flex items-center gap-2">
            {data.url[0]} →
          </Link>
        </div>

        {/* RIGHT IMAGE (2/3 width) */}
        <div className="w-full md:w-2/3">
        <Link to="#">
          <img 
            src={data.image} 
            alt={data.heading} 
            className="w-full h-auto  hover:scale-105 transition-transform"
          />
          </Link>
        </div>

      </div>
    </div>

     </>
  );
};

export default RightImage;