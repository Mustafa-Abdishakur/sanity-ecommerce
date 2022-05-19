import React from 'react';
import shoppingbag from '../../img/shopping bag.png';
import classes from './header.module.css';
import { urlFor } from '../../client';

const header = (props) => {
    const bannerUrl = urlFor(props.banners[1].picture.asset._ref);

    return (
        <header>
            <nav>
                <div className={classes.companyName}>
                    <h3>KKP Store</h3>
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
            <div className={classes.mainBannersContainer}>
                <div className={classes.bannerContainer}>
                    <img src={bannerUrl} alt="banner" />
                </div>
            </div>
        </header>
    )

}

export default header;