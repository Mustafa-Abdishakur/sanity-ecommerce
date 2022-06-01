import React from 'react';
import classes from './banner.module.css';
import { urlFor } from '../../../client';

const banner = (props) => {
    return (
        <div className={classes.bannerContainer}>
        <img src={urlFor(props.saleBanners[0].picture.asset._ref)} alt="sale banner" />
    </div>
    )
}

export default banner;