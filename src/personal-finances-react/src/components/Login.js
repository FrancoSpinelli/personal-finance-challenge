import React from 'react';
import ButtonType from '../components/Buttons/Type';
import Title from './Title';

const Login = () => {
    return (
        <React.Fragment>
            <section className="login">
                <Title name="Sign in"/>
                <div className="info">
                    <input type="email" placeholder="Mail" autoComplete="email" autoFocus/>
                    <input type="password" placeholder="Password"/>
                    <p id="forgot">Forgot password?</p>
                    <ButtonType type="receipt" name="Sign In"/>
                    <p id="register">You are new? <span className="link">Create an account.</span></p>
                </div>
            </section>

            <section className="register">
                <Title name="Sign up"/>
                <div className="info">
                    <input type="text" placeholder="First name" autoComplete="given-name"/>
                    <input type="text" placeholder="Last name" autoComplete="family-name"/>
                    <input type="email" placeholder="Mail" autoComplete="email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="file"/>
                    <ButtonType type="receipt" name="Sign up"/>
                    <p id="register"><span className="link">Already have an account?</span></p>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Login;
