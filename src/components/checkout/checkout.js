import React from 'react';
import classes from './checkout.module.css';
import { Link } from 'react-router-dom';

const checkout = () => {
    return (
        <div className={classes.checkoutContainer}>
            <h2>Your purchase was completed</h2>
            <Link to='/' style={{ textDecoration: "none" }}>
                <button>Return to Homepage</button>
            </Link>
        </div>

    )
}

export default checkout;