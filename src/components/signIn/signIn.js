import { React, useState, useEffect } from 'react';
import classes from './signIn.module.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig, auth } from '../../firebase';
import { signInAnonymously  } from "firebase/auth";

const SignIn = (props) => {
    const [widget, setWidget] = useState(null);

    useEffect(() => {
        if (uiConfig !== null) {
            setWidget(<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />);
        }
    }, []);
    const guestHandler = () => {
        signInAnonymously(auth)
        .then(() => {
          // Signed in..
        //   setUser(user); 
          if (window.location.pathname !== '/') {
            window.location = '/';
          };
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          window.location = '/';
        });
    }
    return (
        <div className={classes.signIn}>
            <h2>Welcome to KKP store</h2>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            {widget}
            <button className={classes.guestBtn} onClick={guestHandler}>Sign in as guest</button>
        </div>
    )
}

export default SignIn;