import './App.css';
import React, { useState, useEffect } from "react";
import { client } from './client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import Product from './components/productPage/product';
const App = () => {
  //other faeture: stock avaliablity, banner carousel
  let components;
  const [products, setProducts] = useState(null);
  const [banners, setBanners] = useState(null);
  const [product, setProduct] = useState({});

  useEffect(() => {
    client
      .fetch(`*[_type == "products"]`)
      .then((data) => {
        setProducts(data);
      })
      .catch(console.error);
    client
      .fetch(`*[_type == "banners"]`)
      .then((data) => {
        setBanners(data);
      })
      .catch(console.error);
  }, []);
  if (products !== null && banners !== null) {
    components = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage products={products} banners={banners} setProduct={setProduct} />} />
          <Route path="/product" element={<Product product={product} setProduct={setProduct} products={products} />} />
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div className="App">
      {components}
    </div>

  );
}
export default App;
