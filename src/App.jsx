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

function App() {
  const allProducts = [Keyboards, Keycaps, Switches, Accessories]

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
        </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
