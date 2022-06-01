import React, {useContext} from 'react';
import classes from './navigation.module.css';
import shoppingbag from '../../img/shopping bag.png';
import { Link } from 'react-router-dom';
import downArrow from '../../img/down-arrow.png';
import { auth } from '../../firebase';
import { AppContext } from '../../context';

const signOut = () => {
    auth.signOut().then(() => {
        window.location = '/';
    }).catch((error) => {
        alert('Sorry, something happened when trying to log out');
    });
}



const Navigation = () => {
    let component;

    const user = useContext(AppContext).user;

    if (user) {
        component = (
            <div className={classes.dropdown}>
                <div className={classes.profileContainer}>
                    <span>Welcome {user.displayName ? user.displayName : 'guest'}</span>
                    <img src={downArrow} alt='arrow' />
                </div>
                <div className={classes.dropdownContent}>
                    <p>Profile</p>
                    <p onClick={signOut}>Sign out</p>
                </div>
            </div>
        )
    } else {
        component = (
            <Link to='/signIn' style={{ textDecoration: "none" }}>
                <button>Sign In</button>
            </Link>
        )
    }
    return (
        <nav>
            <div className={classes.companyName}>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <h3>KKP Store</h3>
                </Link>
            </div>
            {/** sign in, shopping, favorites */}
            <div className={classes.rightBtnsContainer}>
                {component}
                <div className={classes.shoppingCartContainer}>
                    <img className={classes.shoppingCartImage} alt='shopping cart' src={shoppingbag} />
                    <div className={classes.shoppingAmountContainer}>
                        <span>1</span>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navigation;