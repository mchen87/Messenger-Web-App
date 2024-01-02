import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';



function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider);
    }

  return (
    <div className="login">
    <div className="upper-left-text">
        <h1>Messenger Application</h1>
        <p>Sign in With Google Authentication.</p>
    </div>  
    <Button onClick={signIn}>Sign In</Button>
</div>
  )
}

export default Login