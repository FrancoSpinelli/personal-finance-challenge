import React from 'react';
import DefaultImg from '../assets/img/users/default.jpg'

const Balance = () => {
    return (
        <div className="balance">
            <img src={DefaultImg} alt='guest' />
            <p>Balance: </p>
        </div>
    );
}

export default Balance;
