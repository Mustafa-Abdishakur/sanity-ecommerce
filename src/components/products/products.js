import React from 'react';
import classes from './products.module.css';
import { urlFor } from '../../client';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import SaleBanner from '../banners/saleBanner/banner';

const Products = (props) => {

    return (
        <main>
            <div className={classes.productsTitleContainer}>
                <h2>Best Seller Products</h2>
                <p>speaker There are many variations passages</p>
            </div>
            <div className={classes.productsContainer}>
                {
                    props.products.map(product => (
                        <Link
                            to={{
                                pathname: `/product/`,
                                hash: product._id
                            }}
                            style={{ textDecoration: "none" }}
                            key={uniqid()}
                        >
                            <div className={classes.productContainer} onClick={() => props.setProduct(product)}>
                                <div className={classes.productImgContainer}>
                                    <img src={urlFor(product.pictures[0].asset._ref)} alt="product" />
                                </div>
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                            </div>
                        </Link>

                    ))
                }
            </div>
            <SaleBanner saleBanners={props.saleBanners} />
            <Footer />
        </main>
        
    )
}

export default Products;