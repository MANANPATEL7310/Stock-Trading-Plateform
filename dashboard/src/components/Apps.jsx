import React from "react";

const products = [
  {
    name: "Kite",
    image: "/images/kite-logo.svg",
    description: "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more.",
    link: "https://kite.zerodha.com",
  },
  {
    name: "Console",
    image: "/images/console.svg",
    description: "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations.",
    link: "https://console.zerodha.com",
  },
  {
    name: "Coin",
    image: "/images/coin.svg",
    description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",
    link: "https://coin.zerodha.com",
  },
  {
    name: "Kite Connect API",
    image: "/images/kite-connect.svg",
    description: "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our client base.",
    link: "https://kite.trade",
  },
  {
    name: "Varsity mobile",
    image: "/images/varsity-drawer.png",
    description: "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.",
    link: "https://zerodha.com/varsity",
  },
];

const Apps = () => {
  return (
    <div className="p-8 bg-white min-h-screen animate-fade-in">
      <h2 className="text-2xl font-medium text-slate-700 mb-8 text-center">
        Explore our products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-transparent hover:border-slate-100"
          >
            <div className="h-48 flex items-center justify-center mb-6 w-full">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {product.description}
            </p>

            <a 
              href={product.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Try now <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Apps;
