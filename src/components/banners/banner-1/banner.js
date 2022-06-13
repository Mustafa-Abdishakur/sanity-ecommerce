import React, { useState, useEffect, useRef } from 'react';
import classes from './banner.module.css';
import { urlFor } from '../../../client';

const FirstBanner = (props) => {
    const [bannerNumber, setBannerNumber] = useState(0);
    const [hightlightColor, setHighlightColor] = useState(0);
    

    const bannerUrl = urlFor(props.banners[bannerNumber].picture.asset._ref);
    //Banner carousel
    useInterval(() => {
        if (bannerNumber === 1) { //number of banners
            setBannerNumber(0);
        } else {
            setBannerNumber(bannerNumber + 1);
        }
    }, 4000);


    //banner dots
    useEffect(() => {
        switch (bannerNumber) {
            case 0:
                setHighlightColor(0);
                break;
            case 1:
                setHighlightColor(1);
                break;
            default:
                setHighlightColor(0);
                break;
        }
    }, [bannerNumber]);
    return (
        <div className={classes.mainBannersContainer}>
            <div className={classes.bannerContainer}>
                <img src={bannerUrl} alt="banner" />
                <div className={classes.dots}>
                    <button className={classes.btn_1} style={{ backgroundColor: `${hightlightColor === 0 ? '#f02d35' : 'rgb(206, 206, 206)'}` }} onClick={() => setBannerNumber(0)}></button>
                    <button className={classes.btn_2} style={{ backgroundColor: `${hightlightColor === 1 ? '#f02d35' : 'rgb(206, 206, 206)'}` }} onClick={() => setBannerNumber(1)}></button>
                </div>
            </div>
        </div>
    )
}
const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
export default FirstBanner;