import React, {useState, useEffect, useRef} from 'react';
import classes from './banner.module.css';
import { urlFor } from '../../../client';

const FirstBanner = (props) => {
  /*   const [bannerNumber, setBannerNumber] = useState(1);
    console.log(props.banners)
    useInterval(() => {
        if (bannerNumber === 2) { //number of banners
            // setBannerNumber(1);
        } else {
            // setBannerNumber(bannerNumber + 1);
        }
    }, 3000); */

    const bannerUrl = urlFor(props.banners[1].picture.asset._ref);
    return (
        <div className={classes.mainBannersContainer}>
            <div className={classes.bannerContainer}>
                <img src={bannerUrl} alt="banner" />
            </div>
        </div>
    )
}
/* const useInterval = (callback, delay) => {
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
} */
export default FirstBanner;