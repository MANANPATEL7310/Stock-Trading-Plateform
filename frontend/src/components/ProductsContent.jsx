import React from "react";

function ProductsContent() {
  return (
    <div>
      {/* TOP: 4 icons grid */}
      <div className="grid grid-cols-4 gap-6 text-center border-b pb-8">
        <div className="flex flex-col items-center">
          <img
            src="/media/images/kite-logo.svg"
            alt="Kite"
            className="w-12 h-12 mb-2 object-contain"
          />
          <h3 className="font-medium text-sm">Kite</h3>
          <p className="text-xs text-gray-500">Trading platform</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/media/images/console.svg"
            alt="Console"
            className="w-12 h-12 mb-2 object-contain"
          />
          <h3 className="font-medium text-sm">Console</h3>
          <p className="text-xs text-gray-500">Backoffice</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/media/images/kite-connect.svg"
            alt="Kite Connect"
            className="w-12 h-12 mb-2 object-contain"
          />
          <h3 className="font-medium text-sm">Kite Connect</h3>
          <p className="text-xs text-gray-500">Trading APIs</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/media/images/coin.svg"
            alt="Coin"
            className="w-12 h-12 mb-2 object-contain"
          />
          <h3 className="font-medium text-sm">Coin</h3>
          <p className="text-xs text-gray-500">Mutual funds</p>
        </div>
      </div>

      {/* BOTTOM: 3 columns */}
      <div className="grid grid-cols-3 gap-6 mt-8 text-sm">
        <div>
          <h4 className="font-semibold mb-3">Utilities</h4>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Calculators
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Brokerage calculator
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Margin calculator
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            SIP calculator
          </button>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Updates</h4>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Z-Connect blog
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Circulars / Bulletin
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            IPOs
          </button>
          <button className="block text-left text-gray-700 hover:text-blue-600">
            Markets
          </button>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Education</h4>
          <div className="flex gap-12">
          <div className="inline-block">
            <img src="/media/images/varsity-drawer.png" />
            <button className="block text-left text-gray-700 hover:text-blue-600">
              Varsity
            </button>
          </div>

          <div className="inline-block">
            <img src="/media/images/tqna.png" />
            <button className="block text-left text-gray-700 hover:text-blue-600">
              Trading Q&amp;A
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsContent;
