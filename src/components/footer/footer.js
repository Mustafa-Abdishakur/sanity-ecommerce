import React from 'react';
import classes from './footer.module.css';
import instagramPic from '../../img/instagram.png';
import twitterPic from '../../img/twitter.png';
const footer = () => {

    return (
        <div className={classes.footerContainer}>
        <p>2022 KKP Store All rights reserverd</p>
        <div className={classes.footerImagesContainer}>
            <img src={instagramPic} alt='Instagram' />
            <img src={twitterPic} alt='Twitter' />
        </div>
    </div>
    )
}

export default footer;
