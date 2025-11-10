import React from "react";

function Team() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-40 px-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 place-items-center">
          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Nikhil.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
           Nikhil Kamath
            </h3>
            <p className="text-gray-700 text-sm mt-1">Co-founder & CFO</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Kailash.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
             Dr. Kailash Nadh
            </h3>
            <p className="text-gray-700 text-sm mt-1">CTO</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Venu.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
              Venu Madhav
            </h3>
            <p className="text-gray-700 text-sm mt-1">COO</p>
          </div>
        </div>
      </div>



       <div className="max-w-7xl mx-auto mt-20 px-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 place-items-center">
          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Hanan.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
              Hanan Delvi
            </h3>
            <p className="text-gray-700 text-sm mt-1">CCO</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Seema.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
              Seema Patil
            </h3>
            <p className="text-gray-700 text-sm mt-1">Director</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/karthik.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
             Karthik Rangappa
            </h3>
            <p className="text-gray-700 text-sm mt-1">Chief of Education</p>
          </div>
        </div>
      </div>




      <div className="max-w-7xl mx-auto mt-20 px-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 place-items-center">
          <div className="flex flex-col items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200">
              <img src="/media/images/Austin.jpg" className="rounded-full" />
            </div>
            <h3 className="text-xl font-medium text-[#424242] mt-4">
              Austin Prakesh
            </h3>
            <p className="text-gray-700 text-sm mt-1">Director Strategy</p>
          </div>

          <div className="flex flex-col items-center">  
          </div>

          <div className="flex flex-col items-center">  
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
