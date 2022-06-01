import React from "react";
import Header from '../../components/header/header';
import Products from '../../components/products/products';

const HomePage = (props) => {
    return (
            <div>
                <Header banners={props.banners} />
                <Products products={props.products} banners={props.banners} setProduct={props.setProduct} saleBanners={props.saleBanners} />
            </div>
    )
}

export default HomePage;