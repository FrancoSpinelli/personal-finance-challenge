import React, {useState, useEffect} from 'react';
import DefaultImg from '../assets/img/users/default.jpg'
import Cookies from 'universal-cookie';
import { ajaxGet, ajaxPost } from '../utils/ajaxFunction';

const Balance = (props) => {
    const cookies = new Cookies();

    const imgProfile = require.context('../assets/img/users', true);
    const [change, setChange] = useState(false);

    const [balance, setBalance] = useState("");
    useEffect(() => {
        ajaxGet(`/api/movements/balance/${cookies.get('id')}`, (response) => setBalance(response));
    }, [props.balance]);
    
    
    function imageFunction() {
        let formData = new FormData(document.querySelector("#form"))        
        ajaxPost(`/api/users/edit/${cookies.get('id')}`, formData, false,
        () => document.querySelector(".error-balance").innerText = "",
        () => {
            document.querySelector(".error-balance").innerText = 'valid formats are ".jpg" and ".jpeg"'
        });
    }
    
    const [user, setUser] = useState("");
    useEffect(() => {
        setTimeout(() => {
            ajaxGet(`/api/users/${cookies.get('id')}`, (response) => setUser(response));
            return setChange(false);
        }, 1000);
    }, [change]);
    


    return (
        <React.Fragment>
            {/* NEGATIVE BALANCE */}
            {balance && balance.data.balance < 0 && 
                <div className="balance red">
                    <div className="info">
                        <label htmlFor='image-profile'>
                            {user && 
                                <img src={user.data.image ? imgProfile(`./${user.data.image}`).default: DefaultImg} alt='profile'/>
                            }
                        </label>
                        <form id="form" encType="multipart/form-data">
                            <input onChange={imageFunction} type="file" name="image" id="image-profile"/>
                        </form>
                        <p>Balance: <span className="red">{balance.data.balance} US$</span></p>
                    </div>
                    <div className="errors">
                        <p className="error-balance"></p>
                    </div>
                </div>
            }

            {/* POSITIVE BALANCE */}
            {((balance && balance.data.balance >= 0 )|| props.balance === 0) && 
                <div className="balance green">
                    <div className="info">
                        <label htmlFor='image-profile'>
                            {user && 
                                <div>
                                    <img src={user.data.image ? imgProfile(`./${user.data.image}`).default: DefaultImg} alt='profile'/>
                                </div>
                            }
                        </label>
                        <form id="form" encType="multipart/form-data">
                            <input onChange={imageFunction} type="file" name="image" id="image-profile"/>
                        </form>
                            <p>Balance: <span className="green">{balance ? balance.data.balance : props.balance} US$</span></p>
                    </div>
                    <div className="errors">
                        <p className="error-balance"></p>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default Balance;
