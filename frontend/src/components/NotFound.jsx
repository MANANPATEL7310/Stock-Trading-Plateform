import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="max-w-7xl text-center flex flex-col items-center mx-auto mt-32 ">
        <h1 className="text-4xl md:text-3xl font-medium  mt-8">
          404 Not Found
        </h1>
        
        <h3 className="text-xl text-[#424242] font-semibold mt-4">Sorry,the page are looking for does not exist.</h3>

        <Link to="/">
          <button className="mt-8 bg-[#387ed1] hover:bg-[#000] transition-all text-white py-3 px-8 rounded-md text-lg font-medium cursor-pointer">
            Back to Home<i class="fa-solid fa-arrow-right"></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
