import React, { useState, useEffect, useContext, useRef } from 'react';
import classes from './shoppingCart.module.css';
import leftArrow from '../../img/left-arrow.png';
import shoppingCartImg from '../../img/shopping bag.png';
import { AppContext } from '../../context';
import closeImg from '../../img/close.png';
import { urlFor } from '../../client';
import uniqid from 'uniqid';
import { db } from '../../firebase';
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

const ShoppingCart = () => {

    const [total, setTotal] = useState(0);
    const setViewCart = useContext(AppContext).setViewCart;
    const cartProducts = useContext(AppContext).cartProducts;
    const removeProductHandler = useContext(AppContext).removeProductHandler;
    const user = useContext(AppContext).user;
    const form = useRef(null);

    const PaymentClickHandler = async (e) => {
        e.preventDefault();
        try {
            const lineItems = cartProducts.map(product => {
                return ({
                    price: product.priceId,
                    quantity: product.quantity
                })
            })
            const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
                mode: "payment",
                line_items: lineItems,
                success_url:"http://localhost:3000/checkout",
                cancel_url: window.location.origin,
            });
            onSnapshot(doc(db, "customers", user.uid, "checkout_sessions", docRef.id), (snap) => {
                const { error, url } = snap.data();
                if (error) {
                    // Show an error to your customer and then inspect your function logs.
                    alert(`An error occured: ${error.message}`);
                    document.querySelectorAll('button').forEach((b) => (b.disabled = false));
                }
                if (url) {
                    window.location.assign(url);
                }
            });
        } catch (e) {
            console.error("Error adding document: " + e);
        }

    }
    let component;
    if (cartProducts.length === 0) {
        component = (
            <div className={classes.cartContainer}>
                <div className={classes.Imgcontainer}>
                    <img src={shoppingCartImg} alt='shopping cart' />
                </div>
                <h3>your shopping bag is empty</h3>
                <button onClick={() => setViewCart(false)}>CONTINUE SHOPPING</button>
            </div>
        )
    } else {
        component = (
            <form className={classes.productsContainer} onSubmit={PaymentClickHandler} ref={form}>
                {
                    cartProducts.map(product => (
                        <div className={classes.productContainer} key={uniqid()}>
                            <img src={urlFor(product.pictures[0].asset._ref)} alt='product' className={classes.productImg} />
                            <div className={classes.productInfoContainer}>
                                <div className={classes.productInfo}>
                                    <p>{product.name}</p>
                                    <p>{product.price} AED</p>
                                </div>
                                <div className={classes.productAmount}>
                                    <div className={classes.quantityContainer}>
                                        <p>Quantity: <b>{product.quantity}</b></p>
                                    </div>
                                    <img src={closeImg} alt='close' className={classes.closeBtn} onClick={() => removeProductHandler(product)} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className={classes.paymentContainer}>
                    <div className={classes.paymentInfo}>
                        <p>Subtotal:</p>
                        <p>{total} AED</p>
                    </div>
                    <button type='submit' className={classes.paymentBtn} >Continue To Payment</button>
                </div>
            </form>
        )
    }
    useEffect(() => {
        if (cartProducts.length === 0) {
            return;
        }
        const totalArr = cartProducts.map(el => parseInt(el.price) * parseInt(el.quantity));
        const total = totalArr.reduce(
            (previousValue, currentValue) => previousValue + currentValue);
        setTotal(total);
    }, [cartProducts]);

    return (
        <div className={classes.shoppingCartContainer}>
            <div className={classes.cartInfo} onClick={() => setViewCart(false)}>
                <img src={leftArrow} alt='close' />
                <span>Your Cart</span>
                <span>({cartProducts.length} items)</span>
            </div>
            <div className={classes.mainContainer}>
                {component}
            </div>
        </div>

    )
}

export default ShoppingCart;