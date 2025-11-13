import React from "react";
import { Link } from "react-router-dom";

const chargesDataLeft = [
  {
    title: "Securities/Commodities transaction tax",
    content: [
      "Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.",
      "When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.",
    ],
  },
  {
    title: "Transaction/Turnover Charges",
    content: [
      "Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.",
      "BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)",
      "BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.",
      "BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.",
      "BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.",
    ],
  },
  {
    title: "Call & trade",
    content: [
      "Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.",
    ],
  },
  {
    title: "Stamp charges",
    content: [
      "Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.",
    ],
  },
  {
    title: "NRI brokerage charges",
    list: [
      "For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).",
      "For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).",
      "₹500 + GST as yearly account maintenance charges (AMC) charges.",
    ],
  },
  {
    title: "Account with debit balance",
    content: [
      "If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.",
    ],
  },
  {
    title: "Charges for Investor's Protection Fund Trust (IPFT) by NSE",
    list: [
      "Equity and Futures - ₹10 per crore + GST of the traded value.",
      "Options - ₹50 per crore + GST traded value (premium value).",
      "Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.",
    ],
  },
  {
    title: "Margin Trading Facility (MTF)",
    list: [
      "MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.",
      "MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.",
      "MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.",
    ],
  },
];

const chargesDataRight = [
  {
    title: "GST",
    content: [
      "Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)",
    ],
  },
  {
    title: "SEBI Charges",
    content: [
      "Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.",
    ],
  },
  {
    title: "DP (Depository participant) charges",
    content: [
      "₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.",
      "Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.",
      "Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.",
    ],
  },
  {
    title: "Pledging charges",
    content: ["₹30 + GST per pledge request per ISIN."],
  },
  {
    title: "AMC (Account maintenance charges)",
    content: [
    <>
      For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000.{" "}
      To learn more about BSDA, <Link to="/bsda">Click here</Link>
    </>,
    <>
      For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days).{" "}
      To learn more about AMC, <Link to="/amc">Click here</Link>
    </>,
    ],
  },
  {
    title: "Corporate action order charges",
    content: [
      "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.",
    ],
  },
  {
    title: "Off-market transfer charges",
    content: ["₹25 per transaction."],
  },
  {
    title: "Physical CMR request",
    content: [
      "First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.",
    ],
  },
  {
    title: "Payment gateway charges",
    content: ["₹9 + GST (Not levied on transfers done via UPI)"],
  },
  {
    title: "Delayed Payment Charges",
    content: [
   <>
Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account.<br/> <Link to="/amc"> Learn more.</Link>
    </>,
    ],
  },
  {
    title: "Trading using 3-in-1 account with block functionality",
    list: [
      "Delivery & MTF Brokerage: 0.5% per executed order.",
      "Intraday Brokerage: 0.05% per executed order.",
    ],
  },
];

function ChargeExplained() {
  return (
    <>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto mt-24  max-w-7xl  items-center">
            <div className=" md:pl-24 ">
              <h1 className="text-xl md:text-2xl font-medium text-[#424242] ">Charges explained</h1>
            </div>
            <div></div>
          </div>






      <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto mt-12  max-w-7xl  items-center">
        <div className="flex flex-col gap-6  md:pl-24 ">
          {chargesDataLeft.map((item, i) => (
            <div key={i}>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>

              {/* Paragraphs */}
              {item.content &&
                item.content.map((para, j) => (
                  <p
                    key={j}
                    className="text-gray-600 text-xs leading-relaxed mb-2"
                  >
                    {para}
                  </p>
                ))}

              {/* Lists */}
              {item.list && (
                <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed">
                  {item.list.map((point, k) => (
                    <li key={k}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>


        
        <div className="flex flex-col  gap-6  md:pl-24 ">
          {chargesDataRight.map((item, i) => (
            <div key={i}>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>

              {/* Paragraphs */}
              {item.content &&
                item.content.map((para, j) => (
                  <p
                    key={j}
                    className="text-gray-600 text-xs leading-relaxed mb-2"
                  >
                    {para}
                  </p>
                ))}

              {/* Lists */}
              {item.list && (
                <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed">
                  {item.list.map((point, k) => (
                    <li key={k}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChargeExplained;
