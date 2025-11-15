import React from "react";
import Hero from "./Hero";
import LeftImage from "../../components/LeftImage";
import RightImage from "../../components/RightImage";
import OpenAccount from "../../components/OpenAccount";


const data1={image:"/media/images/investments-stocks.png",heading:"Stocks",
  content:"Trade stocks for delivery or intraday on over 5000 stocks listed on National Stock Exchange (NSE) and Bombay Stock exchange (BSE).",url:["Kite","StockREports+" ,"Console","Streak","Smallcase","Market overview"]}

  const data2={image:"/media/images/investments-mf.png",heading:"Direct mutual funds",
  content:"Invest in over 2000 direct mutual funds directly without a distributor. Save up to 1.5% in commissions every year.",url:["Coin"]}

const data3={image:"/media/images/investments-fo.png",heading:"Futures & Options",
  content:"Trade metals, oil, and agri commodities on MCX and stock and index futures and options on NSE.",url:["kite","Sensibull","Margin calculator","Streak"]}

    const data4={image:"/media/images/ipo-products.png",heading:"IPO",
  content:"Now apply online and invest in companies listing on the Indian exchanges with an IPO (Initial Public Offering) with your BHIM UPI app",url:["kite","Upcoming IPOs"]}


    const data5={image:"/media/images/gift-illustration.png",heading:"Gift stocks",
  content:"Introduce your friends and family to the habit of investing for the long term by gifting them stocks, ETFs, mutual funds and gold bonds. A gift that keeps on giving.",url:["Send a gift"]}


    const data6={image:"/media/images/investments-income.png",heading:"Fixed income",
  content:"Invest in bonds with yields better than bank FDs guaranteed by the Government of India.Invest in Gold electronically and gain market returns + fixed 2.5% per year on the invested amount, guaranteed by the Government of India.",url:["Govt. securities","Sovereign Gold Bonds(SGB)"]}






function InvestmentPage() {
  return (
    <>
      <Hero />
      <LeftImage data={data1}/>
      <RightImage data={data2}/>
      <LeftImage data={data3}/>
      <RightImage data={data4}/>
      <LeftImage data={data5}/>
      <RightImage data={data6}/>
      <OpenAccount/>
    </>
  );
}

export default InvestmentPage;
