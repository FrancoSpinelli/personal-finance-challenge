import React from 'react';
import DefaultImg from '../assets/img/users/default.jpg'

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={DefaultImg} alt="logo"/>
            <h1>Personal Finances</h1>
            <button className="log-in">
                <img src={DefaultImg} alt="log in"/>
                <p>Log in</p>
            </button>
        </div>
    );
}

export default Header;
