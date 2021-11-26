import React, {useState, useEffect} from 'react';
import DefaultImg from '../assets/img/users/default.jpg'
import Cookies from 'universal-cookie';

const Balance = (props) => {
    const cookies = new Cookies();

    const imgProfile = require.context('../assets/img/users', true);

    const [change, setChange] = useState(false);

    function ajax(url, method, setState, body, callback) {
        const http = new XMLHttpRequest();
        http.open(method, url, true);
        if(method === "post"){
            http.send(body);
             http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                    if(response.data !== null){
                        // setState(response);
                        document.querySelector(".error-balance").innerText = ""
                    }
                    if(response.status === 204){
                        callback()
                    }
                } 
                
            }
        }
        if(method === "get"){
            http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                    if(response.status === 200){
                    setState(response);
                    }else{
                        callback()
                    }
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
        ajax(`http://192.168.55.107:3003/api/users/edit/${cookies.get('id')}`, 'post', "", formData, () => {
            document.querySelector(".error-balance").innerText = 'valid formats are ".jpg" and ".jpeg"'
        });
        // return window.location.href = "/"

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
