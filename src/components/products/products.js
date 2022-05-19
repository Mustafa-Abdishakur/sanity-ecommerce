import React from 'react';
import classes from './products.module.css';
import { urlFor } from '../../client';
import uniqid from 'uniqid';
import instagramPic from '../../img/instagram.png';
import twitterPic from '../../img/twitter.png';
const products = (props) => {
    return (
        <main>
            <div className={classes.productsTitleContainer}>
                <h2>Best Seller Products</h2>
                <p>speaker There are many variations passages</p>
            </div>
            <div className={classes.productsContainer}>
                {
                    props.products.map(product => (
                            <div className={classes.productContainer} key={uniqid()}>
                                <div className={classes.productImgContainer}>
                                    <img src={urlFor(product.pictures[0].asset._ref)} alt="product image" />
                                </div>
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                            </div>
                    ))
                }
            </div>
                <div className={classes.bannerContainer}>
                    <img src={urlFor(props.banners[0].picture.asset._ref)} alt="sale banner" />
                </div>
                <div className={classes.footerContainer}>
                    <p>2022 KKP Store All rights reserverd</p>
                    <div className={classes.footerImagesContainer}>
                        <img src={instagramPic} alt='Instagram' />
                        <img src={twitterPic} alt='Twitter' />
                    </div>
                </div>
        </main>
    )
}

export default products;