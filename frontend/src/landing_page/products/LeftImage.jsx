import React from 'react';
import {Link} from 'react-router-dom';


function LeftImage({data}){
  return (
    <>
        <div className="max-w-5xl mx-auto pt-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-24">
        
        {/* LEFT IMAGE (2/3 width) */}
        <div className="w-full md:w-2/3">
        <Link to="#">
          <img src={data.image} alt="Kite App" className="w-full h-auto  hover:scale-105 transition-transform" />
          </Link>
        </div>

        {/* RIGHT TEXT (1/3 width) */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-3xl font-normal">{data.heading}</h2>
          <p className="text-gray-600 leading-relaxed">
            {data.content}
          </p>

          <div className="flex items-center gap-5">
            <Link to="#" className="text-blue-600 font-medium flex items-center gap-2">
              {data.url[0]} {data.url[0]? "→" : ""} 
            </Link>
            <Link to="#" className="text-blue-600 font-medium flex items-center gap-2">
              {data.url[1]} {data.url[1]? "→" : ""}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="#">
            <img
              src="/media/images/googlePlayBadge.svg"
              className="h-10 hover:scale-105 transition-transform hover:opacity-50"
              alt="Google Play"
            />
            </Link>
            <Link to="#">
            <img
              src="/media/images/appstoreBadge.svg"
              className="h-10 hover:scale-105 transition-transform hover:opacity-50"
              alt="App Store"
            />
            </Link>
          </div>
        </div>

      </div>
    </div>
     </>
  );
};

export default LeftImage;