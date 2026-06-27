import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import  Header  from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Homepage from './pages/Homepage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductCard from './components/ProductCard.jsx'
import { Keyboards, Keycaps, Switches, Accessories } from  "./products/products.js"
import './App.css'
import ProductPage from './pages/ProductPage.jsx'
import { GeneralPolicy, ReturnPolicy } from './products/policies.js';
import Policy from './pages/PolicyPage.jsx'
import Keyboard3D from './pages/CustomPage.jsx'
import AboutMe from './pages/AboutMePage.jsx'



function App() {
  const allProducts = [Keyboards, Keycaps, Switches, Accessories]
  const policies = [...GeneralPolicy, ...ReturnPolicy]

  return (
    <>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          {/* Shops */}
          <Route 
          path="/shop-keyboards" 
          element={<ShopPage products={Keyboards} />}/>
          <Route 
          path="/shop-keycaps" 
          element={<ShopPage products={Keycaps} />}/>
          <Route 
          path="/shop-switches" 
          element={<ShopPage products={Switches} />}/>
          <Route 
          path="/shop-Accessories" 
          element={<ShopPage products={Accessories} />}/>
          {/* Products */}
          {allProducts.map((category) =>
            category.map((product) => (
              <Route
                key={product.id}
                path={product.link}
                element={<ProductPage product={product} />}
              />
            ))
          )}
          {/* Policies */}
          {/* {policies.map((policy)=>{
            return <Route 
              key={policy.id}
              path={policy.link}
              element={<Policy Policy={policy}></Policy>}
            />
          })} */}
          <Route 
          path="/policy"
          element={<Policy Policy={GeneralPolicy[0]} />} />

          <Route 
          path="/return-policy"
          element={<Policy Policy={ReturnPolicy[0]} />} />

          <Route
          path='/custom-keyboard-3D'
          element={<Keyboard3D />} />

          <Route 
          path="/my-story"
          element={<AboutMe />}/>

          <Route 
          path="/contacts"
          element={<AboutMe aboutMe="contacts"/>}/>
        </Routes>
            
      <Footer></Footer>
    </>
  )
}

export default App
