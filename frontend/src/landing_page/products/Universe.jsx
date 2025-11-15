import React from "react";
import { Link } from "react-router-dom";

let data1 = [
  {
    image: "/media/images/zerodhaFundhouse.png",
    p: [
      "Our asset management venture ",
      "that is creating simple and transparent index ",
      "funds to help you save for your goals.",
    ],
  },
  {
    image: "/media/images/sensibullLogo.svg",
    p: [
      "Options trading platform that lets you ",
      "create strategies, analyze positions, and examine ",
      "data points like open interest, FII/DII, and more.",
    ],
  },
  {
    image: "/media/images/tijori.svg",
    p: [
      "Investment research platform ",
      "that offers detailed insights on stocks, ",
      "sectors, supply chains, and more.",
    ],
  },
];

let data2 = [
  {
    image: "/media/images/streakLogo.png",
    p: [
      "Systematic trading platform  ",
      "that allows you to create and backtest  ",
      "strategies without coding.",
    ],
  },
  {
    image: "/media/images/smallcaseLogo.png",
    p: [
      "Thematic investing platform  ",
      "that helps you invest in diversified  ",
      "baskets of stocks on ETFs.",
    ],
  },
  {
    image: "/media/images/dittoLogo.png",
    p: [
      "Personalized advice on life  ",
      "and health insurance. No spam  ",
      "and no mis-selling.",
    ],
  },
];



function Universe() {
  return (
    <>
      <div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-16 ">
        <h1 className="text-xl md:text-xl font-[400] text-[#424242] ">
          Want to know more about our technology stack? Check out the{" "}
          <Link> Zerodha.tech </Link> blog.
        </h1>

        <h1 className="text-xl md:text-2xl font-[500] text-[#424242] mt-24">
          The Zerodha Universe
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>

<div className="grid grid-cols-1 md:grid-cols-3 w-full mx-auto max-w-5xl gap-4 mt-16">

  {data1.map((item, i) => {
    return (
      <div key={i} className="flex flex-col items-center text-center">

        {/* IMAGE BOX WITH EQUAL SIZE */}
        <div className="w-40 h-40 flex items-center justify-center">
          <img 
            src={item.image} 
            className="w-full h-full object-contain  hover:scale-105 transition-transform hover:opacity-50"
            alt=""
          />
        </div>

        {/* TEXT BELOW IMAGE */}
        <div className="space-y-1">
          {item.p.map((text, idx) => (
            <p 
              key={idx} 
              className="text-[#808080] text-base font-[400] max-w-sm mx-auto "
            >
              {text}
            </p>
          ))}
        </div>

      </div>
    );
  })}

</div>








<div className="grid grid-cols-1 md:grid-cols-3 w-full mx-auto max-w-5xl gap-4 mt-4">

  {data2.map((item, i) => {
    return (
      <div key={i} className="flex flex-col items-center text-center">

        {/* IMAGE BOX WITH EQUAL SIZE */}
        <div className="w-40 h-40 flex items-center justify-center">
          <img 
            src={item.image} 
            className="w-full h-full object-contain  hover:scale-105 transition-transform hover:opacity-50"
            alt=""
          />
        </div>

        {/* TEXT BELOW IMAGE */}
        <div className="space-y-1">
          {item.p.map((text, idx) => (
            <p 
              key={idx} 
              className="text-[#808080] text-base font-[400] max-w-sm mx-auto "
            >
              {text}
            </p>
          ))}
        </div>

      </div>
    );
  })}


</div>

<div className="max-w-7xl  flex flex-col items-center gap-2 mx-auto mt-16 ">
   <Link to="/signup">
      <button className="mt-8 bg-[#387ed1] hover:bg-[#000] transition-all text-white py-3 px-8 rounded-md text-lg font-medium cursor-pointer">
        Sign up for free
      </button>
      </Link>
</div>







    </>
  );
}

export default Universe;
