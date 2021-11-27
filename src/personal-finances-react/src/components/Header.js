import React from 'react';
import DefaultImgLogo from '../assets/img/users/default-logo.jpg';
import DefaultImg from '../assets/img/users/default.jpg';
import Cookie from 'universal-cookie';

const Header = (props) => {
    const cookies = new Cookie();
    const imgProfile = require.context('../assets/img/users', true);

    function signOutFunction() {
        cookies.remove('id');
        cookies.remove('mail');
        return window.location.href = '/';
    }


    return (
        <div className="header">
            <img className="logo" src={DefaultImgLogo} alt="logo"/>
            <h1>Personal Finance</h1>
            { cookies.get("mail") &&
                <button className="log-in">
                    <img src={props.image ? imgProfile(`./${props.image}`).default : DefaultImg} alt="log in"/>
                    <p onClick={signOutFunction}>sign out</p>
                </button>
            }
            { !cookies.get("mail") &&
                <button className="log-in">
                    <img src={DefaultImg} alt="log in"/>
                </button>
            }
        </div>
    );
}

export default Header;
