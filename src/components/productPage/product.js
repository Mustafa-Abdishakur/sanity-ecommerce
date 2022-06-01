import React, { useState, useRef } from 'react';
import classes from './product.module.css';
import Navigation from '../navigation/navigation';
import { urlFor } from '../../client';
import starImg from '../../img/star.png';
import redStarImg from '../../img/red-star.png';
import uniqid from 'uniqid';
import Footer from '../footer/footer';
import leftArrow from '../../img/left-arrow.png';
import rightArrow from '../../img/right-arrow.png';

const Product = (props) => {
    const counter = useRef(null);
    const [imgUrl, setImgUrl] = useState(props.product.pictures[0].asset._ref);
    const [quantity, setQuantity] = useState(1);
    const scrollBtnHandler = (val) => {
        if (val === '+') {
            counter.current.scrollLeft += 400;
        } else {
            counter.current.scrollLeft -= 400;
        }
    }
    window.scrollTo(0, 0);

    const productClickHandler = (product) => {
        setImgUrl(product.pictures[0].asset._ref);
        props.setProduct(product);
    }
    const quantityHandler = (val) => {
        if(props.product.stock !== 0) {
            if (val === "+") {
                if(quantity >= props.product.stock) {
                    return;
                } else {
                    setQuantity(quantity + 1);
                }
            } else if (val === "-") {
                if (quantity === 1) {
                    return;
                } else {
                    setQuantity(quantity - 1);
    
                }
    
            }
        }
    }
    return (
        <div className={classes.productPageContainer}>
            <Navigation />
            <div className={classes.productContainer}>
                <div className={classes.productImagescontainer}>
                    <div className={classes.mainImageContainer}>
                        <img src={urlFor(imgUrl)} alt='main' />
                    </div>
                    <div className={classes.subImagesContainer}>
                        {
                            props.product.pictures.map(image =>
                                <img key={uniqid()} src={urlFor(image.asset._ref)} alt='product' onMouseEnter={() => setImgUrl(image.asset._ref)} />
                            )
                        }
                    </div>
                </div>
                <div className={classes.productInformation}>
                    <h1>{props.product.name}</h1>
                    <div className={classes.starsContainer}>
                        <img src={redStarImg} alt="star" />
                        <img src={redStarImg} alt="star" />
                        <img src={redStarImg} alt="star" />
                        <img src={redStarImg} alt="star" />
                        <img src={starImg} alt="star" />
                        <span>(20)</span>
                    </div>
                    <div className={classes.productDetailsContainer}>
                        <h4>Details:</h4>
                        <p className={classes.productDescription}>{props.product.description}</p>
                        <p className={classes.productPrice}>
                            {props.product.price} Dhs
                        </p>
                        <p className={classes.stockPrice}>
                            Avaliable stock: {props.product.stock === 0 ? 'Unavailable' : props.product.stock}
                        </p>
                        <div className={classes.quantityContainer}>
                            <span>Quantity:</span>
                            <div className={classes.operatorContainer}>
                                <button onClick={() => quantityHandler('+')}>+</button>
                                <span>{quantity}</span>
                                <button onClick={() => quantityHandler('-')}>-</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.btnsContainer}>
                        <button className={classes.cartBtn}>Add to Cart</button>
                        <button className={classes.buyBtn}>Buy Now</button>
                    </div>
                </div>

            </div>
            <div className={classes.slidingProductsContainer}>
                <h2>You may also like</h2>
                <div className={classes.arrowsContainer}>
                    <div className={classes.arrow1} onClick={() => scrollBtnHandler('-')} >
                        <img src={leftArrow} alt='' />
                    </div>
                    <div className={classes.arrow2} onClick={() => scrollBtnHandler('+')}>
                        <img src={rightArrow} alt='' />
                    </div>
                </div>
                <div className={classes.slidingProducts} ref={counter}>
                    {
                        props.products.map(product => (
                            <div className={classes.product} key={uniqid()} onClick={() => productClickHandler(product)}>
                                <img src={urlFor(product.pictures[0].asset._ref)} alt='product' />
                                <p>{product.name}</p>
                                <p>{product.price} Dhs</p>
                            </div>
                        ))
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Product;