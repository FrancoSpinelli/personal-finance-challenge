import React from 'react';
import DefaultImg from '../assets/img/users/default.jpg';
import Cookie from 'universal-cookie';

const Header = () => {
    const cookies = new Cookie();
    const imgProfile = require.context('../assets/img/icons', true);


    function singOutFunction() {
        cookies.remove('id');
        cookies.remove('first_name');
        cookies.remove('last_name');
        cookies.remove('mail');
        cookies.remove('permiso');
        cookies.remove('image');
        return window.location.href = '/';
    }
    return (
        <div className="header">
            <img className="logo" src={DefaultImg} alt="logo"/>
            <h1>Personal Finances</h1>
            { !cookies.get("mail") &&
                <button className="log-in">
                    <img src={DefaultImg} alt="log in"/>
                    <p>Sing In</p>
                </button>
            }
            { cookies.get("mail") &&
                <button className="log-in">
                    <img src={DefaultImg} alt="log in"/>
                    <p onClick={singOutFunction}>Sing out</p>
                </button>
            }
        </div>
    );
}

export default Header;
