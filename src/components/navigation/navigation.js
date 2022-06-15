import React, { useContext, useEffect } from 'react';
import classes from './navigation.module.css';
import shoppingbag from '../../img/shopping bag.png';
import { Link } from 'react-router-dom';
import downArrow from '../../img/down-arrow.png';
import { auth } from '../../firebase';
import { AppContext } from '../../context';
import ShoppingCart from '../shoppingCart/shoppingCart';
import checkMarkImg from '../../img/checkmark.png';
import { useLocation } from 'react-router-dom';

const signOut = () => {
    auth.signOut().then(() => {
        window.location = '/';
    }).catch((error) => {
        alert('Sorry, something happened when trying to log out');
    });
}


const Navigation = () => {
    let component;
    const user = useContext(AppContext).user;
    const viewCart = useContext(AppContext).viewCart;
    const setViewCart = useContext(AppContext).setViewCart;
    const cartProducts = useContext(AppContext).cartProducts;
    const displayNotification = useContext(AppContext).displayNotification;
    const setDisplayNotification = useContext(AppContext).setDisplayNotification;

    const ResetProductNotification = () => {
        const location = useLocation();
        useEffect(() => {
            setDisplayNotification(false);
        }, [location])
    }

    if (user) {
        component = (
            <div className={classes.dropdown}>
                <div className={classes.profileContainer}>
                    <span>Welcome {user.displayName ? user.displayName : 'guest'}</span>
                    <img src={downArrow} alt='arrow' />
                </div>
                <div className={classes.dropdownContent}>
                    <p>Profile</p>
                    <p onClick={signOut}>Sign out</p>
                </div>
            </div>
        )
    } else {
        component = (
            <Link to='/signIn' style={{ textDecoration: "none" }}>
                <button>Sign In</button>
            </Link>
        )
    }
    ResetProductNotification();
    return (
        <nav>
            <div className={classes.companyName}>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <h3>KKP Store</h3>
                </Link>
            </div>
    
            <div className={classes.rightBtnsContainer}>
                {component}
                <div className={classes.shoppingCartContainer}>
                    <img className={classes.shoppingCartImage} alt='shopping cart' src={shoppingbag} onClick={() => setViewCart(true)} />
                    <div className={classes.shoppingAmountContainer}>
                        <span>{cartProducts.length}</span>
                    </div>
                </div>
            </div>

            {
                displayNotification ?
                    <div className={classes.notificationContainer}>
                        <img src={checkMarkImg} alt='checkmark' />
                        <p>Product was added to cart</p>
                    </div> : null
            }
            {viewCart ? <ShoppingCart /> : null}

        </nav>
    )
}

export default Navigation;