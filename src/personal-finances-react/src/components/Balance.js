import React, {useState, useEffect} from 'react';
import DefaultImg from '../assets/img/users/default.jpg'
import Cookies from 'universal-cookie';

const Balance = (props) => {
    const cookies = new Cookies();

    const imgProfile = require.context('../assets/img/users', true);

    const [change, setChange] = useState(false);

    function ajax(url, method, setState, body) {
        const http = new XMLHttpRequest();
        http.open(method, url, true);
        if(method === "post"){
            http.send(body);
        }
        if(method === "get"){
            http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                        return setState(response);
                }
            }
            http.send();
        }
    }

    const [balance, setBalance] = useState("");
    useEffect(() => {
        ajax(`http://192.168.55.107:3003/api/movements/balance/${cookies.get('id')}`, 'get', setBalance);
    }, [props.balance]);
    
    
    function imageFunction() {
        let formData = new FormData(document.querySelector("#form"))        
        ajax(`http://192.168.55.107:3003/api/users/edit/${cookies.get('id')}`, 'post', "", formData);
        return window.location.href = "/"

    }
    
    const [user, setUser] = useState("");
    useEffect(() => {
        setTimeout(() => {
            ajax(`http://192.168.55.107:3003/api/users/${cookies.get('id')}`, 'get', setUser);
            return setChange(false);
        }, 1000);
    }, [change]);
    
    return (
        <React.Fragment>
                <div className="balance green">
                    <label htmlFor='image-profile'>
                        {user && 
                            <img src={user.data.image ? imgProfile(`./${user.data.image}`).default: DefaultImg} alt='profile'/>
                        }
                    </label>
                    <form id="form" encType="multipart/form-data">
                        <input onChange={imageFunction} type="file" name="image" id="image-profile"/>
                    </form>
                    {((balance && balance.data.balance >= 0 )|| props.balance === 0) && 
                        <p>Balance: <span className="green">{balance ? balance.data.balance : props.balance} US$</span></p>
                    }
                    {balance && balance.data.balance < 0 && 
                        <p>Balance: <span className="red">{balance.data.balance} US$</span></p>
                    }
                </div>
        </React.Fragment>
);
}

export default Balance;
