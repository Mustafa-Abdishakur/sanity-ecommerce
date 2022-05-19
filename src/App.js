import './App.css';
import React, { useState, useEffect } from "react";
import { client } from './client';
import Header from './components/header/header';
import Products from './components/products/products';

const App = () => {
  let components;
  const [products, setProducts] = useState(null);
  const [banners, setBanners] = useState(null);

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
      <div>
        <Header banners={banners} />
        <Products products={products} banners={banners} />
      </div>
    )
  }
  return (
    <div className="App">
      {components}
    </div>
  );
}
export default App;
