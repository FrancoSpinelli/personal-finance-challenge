import React from 'react';
import ButtonType from '../components/Buttons/Type';
import Title from './Title';

const Login = () => {
    return (
        <div className="login">
            <Title name="Sign in"/>
            <div className="info">
                <input type="email" placeholder="Mail" autoComplete="email" autoFocus/>
                <input type="password" placeholder="Password"/>
                <p id="forgot">Forgot password?</p>
                <ButtonType type="receipt" name="Sign In"/>
                <p id="register">You are new? <span className="link">Create an account.</span></p>
            </div>
        </div>
    );
}

export default Login;
