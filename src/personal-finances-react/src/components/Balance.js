import React from 'react';
import DefaultImg from '../assets/img/users/franco.jpg'

const Balance = (props) => {
    return (
        <React.Fragment>
            {props.balance >= 0 && 
                <div className="balance green">
                    <img src={DefaultImg} alt='profile' />
                        <p>Balance: <span className="green">{props.balance} US$</span></p>
                </div>
            }
            {props.balance < 0 && 
                <div className="balance red">
                    <img src={DefaultImg} alt='profile' />
                        <p>Balance: <span className="red">{props.balance} US$</span></p>
                </div>
            }


</React.Fragment>
);
}

export default Balance;
