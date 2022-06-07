import './App.css';
import React, { useState, useEffect, Suspense } from "react";
import { client } from './client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import Product from './components/productPage/product';
import SignIn from './components/signIn/signIn';
import { auth } from './firebase';
import { AppContext } from './context';
import Loading from './components/loading/loading';

const App = () => {
  //other features: stock avaliablity, banner carousel
  let components;
  const [products, setProducts] = useState(null);
  const [banners, setBanners] = useState(null);
  const [saleBanners, setSaleBanners] = useState(null);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [viewCart, setViewCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [displayNotification, setDisplayNotification] = useState(false);

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
  }, [user])
  //Add to cart
  const cartHandler = (product, viewCart) => {
    const productExist = cartProducts.map(el => {
      if (el._id === product._id) {
        return true;
      } else {
        return false;
      }
    })
    if (!(productExist.includes(true))) {
      const newProduct = {
        ...product,
        quantity: productQuantity
      }
      setCartProducts([...cartProducts, newProduct]);
    }
    setViewCart(viewCart);
    setDisplayNotification(true);
  }
  //remove from cart
  const removeProductHandler = (product) => {
    let newCart;
    if (cartProducts.length === 1) {
      setCartProducts([]);
      setViewCart(false);
    } else {
      newCart = cartProducts.filter(cartProduct => cartProduct !== product);
      setCartProducts(newCart);
    }
  }

  if (products !== null && banners !== null && saleBanners != null) {
    components = (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage products={products} banners={banners} setProduct={setProduct} saleBanners={saleBanners} />} />

          <Route path="/product/" element={<Product product={product} setProduct={setProduct} products={products} cartHandler={cartHandler} />} />

          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>

    )
  }
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <AppContext.Provider value={{ user, product, viewCart, setViewCart, cartProducts, setCartProducts, removeProductHandler, productQuantity, setProductQuantity, displayNotification, setDisplayNotification }}>
          {components}
        </AppContext.Provider>
      </Suspense>

    </div>

  );
}
export default App;
