import React from 'react';
import classes from './navigation.module.css';
import shoppingbag from '../../img/shopping bag.png';
import { Link } from 'react-router-dom';

const navigation = (props) => {
    // console.log(props.products);
    return (
        <nav>
            <div className={classes.companyName}>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <h3>KKP Store</h3>
                </Link>
            </div>
            {/** sign in, shopping, favorites */}
            <div className={classes.rightBtnsContainer}>
                <button>Sign In</button>
                <div className={classes.shoppingCartContainer}>
                    <img className={classes.shoppingCartImage} alt='shopping cart' src={shoppingbag} />
                    <div className={classes.shoppingAmountContainer}>
                        <span>1</span>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default navigation;