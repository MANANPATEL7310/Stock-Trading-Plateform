import './App.css'
import {Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage'
import Signup  from './landing_page/signup/Signup'
import About  from './landing_page/about/AboutPage'
import Products  from './landing_page/products/ProductPage'
import Pricing  from './landing_page/pricing/PricingPage'
import Support  from './landing_page/support/SupportPage'
import NotFound from './components/NotFound';
import Layout from './components/Layout'; 

function App() {


  return (
    <>
   <Routes>
    <Route element={<Layout />}>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/support" element={<Support/>}/>
    </Route>

    <Route path="*" element={<NotFound/>}/>
   </Routes>
    </>
  )
}

export default App
