import React from 'react';
import Hero from './Hero';
import LeftImage from  '../../components/LeftImage';
import RightImage from  '../../components/RightImage';
import Universe from './Universe';


const data1={image:"/media/images/products-console.png",heading:"Console",
  content:"The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations.",url:["Learn more"]}

  const data2={image:"/media/images/products-coin.png",heading:"Coin",
  content:"Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.",url:["Coin"]}

const data3={image:"/media/images/landing.svg",heading:"Kite Connect API",
  content:"Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.",url:["kite Connect"]}

    const data4={image:"/media/images/varsity-products.svg",heading:"Varsity mobile",
  content:"An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go.",url:[""]}

function ProductPage(){
  return (
    <>

        <Hero/>
        <RightImage data={data1}/>
        <LeftImage data={data2}/>
        <RightImage data={data3}/>
        <LeftImage data={data4}/>
        <Universe/>
        
     </>
  );
};

export default ProductPage;