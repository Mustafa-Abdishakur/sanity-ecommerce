import React from 'react';
import classes from './Loading.module.css';
import loadingImg from '../../img/loading.png';

const loading = () => {
    return (
        <div className={classes.loading}>
            <h1>Loading</h1>
            <img src={loadingImg} alt='loading' />
        </div>
    )
}

export default loading;