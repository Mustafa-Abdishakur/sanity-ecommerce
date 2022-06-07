import React, { useState, useEffect, useContext } from 'react';
import classes from './shoppingCart.module.css';
import leftArrow from '../../img/left-arrow.png';
import shoppingCartImg from '../../img/shopping bag.png';
import { AppContext } from '../../context';
import closeImg from '../../img/close.png';
import { urlFor } from '../../client';
import uniqid from 'uniqid';


const ShoppingCart = () => {
    const [total, setTotal] = useState(0);
    const setViewCart = useContext(AppContext).setViewCart;
    const cartProducts = useContext(AppContext).cartProducts;
    const removeProductHandler = useContext(AppContext).removeProductHandler;

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
            <div className={classes.productsContainer}>
                {
                    cartProducts.map(product => (
                        <div className={classes.productContainer} key={uniqid()}>
                            <img src={urlFor(product.pictures[0].asset._ref)} alt='product' className={classes.productImg} />
                            <div className={classes.productInfoContainer}>
                                <div className={classes.productInfo}>
                                    <p>{product.name}</p>
                                    <p>{product.price}Dhs</p>
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
                        <p>{total}Dhs</p>
                    </div>
                    <button className={classes.paymentBtn}>Continue To Payment</button>
                </div>
            </div>
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