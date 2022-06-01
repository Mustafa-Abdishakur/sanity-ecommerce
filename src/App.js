import './App.css';
import React, { useState, useEffect } from "react";
import { client } from './client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import Product from './components/productPage/product';
import SignIn from './components/signIn/signIn';
import { auth } from './firebase';
import { AppContext } from './context';

const App = () => {
  //other features: stock avaliablity, banner carousel
  let components;
  const [products, setProducts] = useState(null);
  const [banners, setBanners] = useState(null);
  const [saleBanners, setSaleBanners] = useState(null);
  const [product, setProduct] = useState({});
  const [user, setUser] = useState(null);

  
  //Get products data 
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
    client
      .fetch(`*[_type == "saleBanners"]`)
      .then((data) => {
        setSaleBanners(data);
      })
      .catch(console.error);

  }, []);
// window.history.back();
  //check if autheticated
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // console.log('user logged in', user);
        setUser(user); // "user" will be used for authentication
        if (window.location.pathname !== '/') {
          window.location = '/';
        };
      } else {
        // console.log('user logged out', user);
        // No user is signed in 
        setUser(null);
       
      }
    });
  }, user)


  if (products !== null && banners !== null && saleBanners != null) {
    components = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage products={products} banners={banners} setProduct={setProduct} saleBanners={saleBanners} />} />
          <Route path="/product" element={<Product product={product} setProduct={setProduct} products={products} />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div className="App">
      <AppContext.Provider value={ {user, setUser} } >
        {components}
      </AppContext.Provider>
    </div>

  );
}
export default App;
