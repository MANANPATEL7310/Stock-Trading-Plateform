import React from 'react';
import Hero from './Hero';
import Navbar from '../Navbar';
import LeftImage from './LeftImage';
import RightImage from './RightImage';
import Universe from './Universe';

function ProductPage(){
  return (
    <>
        <Navbar/>
        <Hero/>
        <LeftImage/>
        <RightImage/>
        <Universe/>
        <Footer/>
     </>
  );
};

export default ProductPage;