import React, {useRef, useState} from 'react';
import ButtonType from '../components/Buttons/Type';
import Title from './Title';
import Cookie from 'universal-cookie';

const Login = () => {

    let inputMail = useRef();
    let inputPassword = useRef();

    const cookies = new Cookie();

    function ajax(url, method, setState, bodyJSON) {
        const http = new XMLHttpRequest();
        http.open(method, url);
        if(method === "post"){
            http.setRequestHeader('Content-Type', 'application/json');
            http.send(bodyJSON);
            http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                    if (response.data !== null) {
                        cookies.set('id', response.data.id, {path: "/",});
                        cookies.set('first_name', response.data.first_name, {path: "/"});
                        cookies.set('last_name', response.data.last_name, {path: "/"});
                        cookies.set('mail', response.data.mail, {path: "/"});
                        cookies.set('image', response.data.image, {path: "/"});
                        window.location.href = '/';
                    } 
                }
            }
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

    function loginFunction() {
        let body = {
            mail: inputMail.current.value,
            password: inputPassword.current.value,
        } 
        let bodyJSON = JSON.stringify(body);
        ajax(`http://192.168.55.107:3003/api/users/login`, 'post', "", bodyJSON );
    }
    
    const [register, setRegister] = useState(false);

    function registerFunction() {
        register === false ? setRegister(true) : setRegister(false);
    }

    return (
        <React.Fragment>

            { register === false && 
                <section className="login">
                    <Title name="Sign in"/>
                    <div className="info">
                        <input ref={inputMail} type="email" placeholder="Mail" autoComplete="email" autoFocus/>
                        <input ref={inputPassword} type="password" placeholder="Password"/>
                        <p id="forgot">Forgot password?</p>
                        <span onClick={loginFunction}><ButtonType type="receipt" name="Sign In"/></span>
                        <p id="register">First time here? <span onClick={registerFunction} className="link">Create an account.</span></p>
                    </div>
                </section>
            }

            { register === true &&
                <section className="register">
                    <Title name="Sign up"/>
                    <div className="info">
                        <input type="text" placeholder="First name" autoComplete="given-name"/>
                        <input type="text" placeholder="Last name" autoComplete="family-name"/>
                        <input type="email" placeholder="Mail" autoComplete="email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="file"/>
                        <ButtonType type="receipt" name="Sign up"/>
                        <p id="register"><span onClick={registerFunction} className="link">Already have an account?</span></p>
                    </div>
                </section>
            }

        </React.Fragment>
    );
}

export default Login;
