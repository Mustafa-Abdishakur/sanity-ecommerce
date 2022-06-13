import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './product.module.css';
import Navigation from '../navigation/navigation';
import { urlFor } from '../../client';
import starImg from '../../img/star.png';
import redStarImg from '../../img/red-star.png';
import uniqid from 'uniqid';
import Footer from '../footer/footer';
import leftArrow from '../../img/left-arrow.png';
import rightArrow from '../../img/right-arrow.png';
import { AppContext } from '../../context';
import { Link, useNavigate } from 'react-router-dom';

const Product = (props) => {
    const counter = useRef(null);
    const [imgNum, setImgNum] = useState(0);
    const productQuantity = useContext(AppContext).productQuantity;
    const setProductQuantity = useContext(AppContext).setProductQuantity;
    const user = useContext(AppContext).user;
    let navigate = useNavigate();

    const scrollBtnHandler = (val) => {
        if (val === '+') {
            counter.current.scrollLeft += 400;
        } else {
            counter.current.scrollLeft -= 400;
        }
    }
    const cartHandler = (product, val) => {
        if (user) {
            // user is signed in so add to cart 
            props.cartHandler(product, val);
        } else {
            navigate('/signIn', { replace: true });

        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.product])

    const ProductClickHandler = (product) => {
        props.setProduct(product);
        setImgNum(0);
        setProductQuantity(1);
    }
    const quantityHandler = (val) => {
        if (props.product.stock !== 0) {
            if (val === "+") {
                if (productQuantity >= props.product.stock) {
                    return;
                } else {
                    setProductQuantity(productQuantity + 1);
                }
            } else if (val === "-") {
                if (productQuantity === 1) {
                    return;
                } else {
                    setProductQuantity(productQuantity - 1);

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
                        <img src={urlFor(props.product.pictures[imgNum].asset._ref)} alt='main' />
                    </div>
                    <div className={classes.subImagesContainer}>
                        {
                            props.product.pictures.map((image, index) =>
                                <img key={uniqid()} src={urlFor(image.asset._ref)} alt='product' data-number={index} onMouseEnter={(el) => setImgNum(el.target.dataset.number)} />
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
                            {props.product.price} AED
                        </p>
                        <p className={classes.stockPrice}>
                            Avaliable stock: {props.product.stock === 0 ? 'Unavailable' : props.product.stock}
                        </p>
                        <div className={classes.quantityContainer}>
                            <span>Quantity:</span>
                            <div className={classes.operatorContainer}>
                                <button onClick={() => quantityHandler('+')}>+</button>
                                <span>{productQuantity}</span>
                                <button onClick={() => quantityHandler('-')}>-</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.btnsContainer}>
                        <button className={classes.cartBtn} onClick={() => cartHandler(props.product, false)}>Add to Cart</button>
                        <button className={classes.buyBtn} onClick={() => cartHandler(props.product, true)}>Buy Now</button>
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
                            <Link
                                to={{
                                    pathname: `/product/`,
                                    hash: product._id
                                }}
                                style={{ textDecoration: "none" }}
                                key={uniqid()}
                                onClick={() => ProductClickHandler(product)}
                            >
                                <div className={classes.product} key={uniqid()}>
                                    <img src={urlFor(product.pictures[0].asset._ref)} alt='product' />
                                    <p>{product.name}</p>
                                    <p>{product.price} Dhs</p>
                                </div>
                            </Link>

                        ))
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Product;