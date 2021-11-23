import React, {useRef, useState} from 'react';
import ButtonType from '../components/Buttons/Type';
import Title from './Title';
import Cookie from 'universal-cookie';

const Login = () => {

    let inputFirstName = useRef();
    let inputLastName = useRef();
    let inputMail = useRef();
    let inputPassword = useRef();
    let inputImage = useRef();

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

    function registerFunction() {
        let body = {
            first_name: inputFirstName.current.value,
            last_name: inputLastName.current.value,
            mail: inputMail.current.value,
            password: inputPassword.current.value,
            image: inputImage.current.value,
        } 
        let bodyJSON = JSON.stringify(body);
        ajax(`http://192.168.55.107:3003/api/users/register`, 'post', "", bodyJSON );
    }
    
    const [register, setRegister] = useState(false);

    function formChangeFunction() {
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
                        <p id="register">First time here? <span onClick={formChangeFunction} className="link">Create an account.</span></p>
                    </div>
                </section>
            }

            { register === true &&
                <section className="register">
                    <Title name="Sign up"/>
                    <div className="info">
                        <input ref={inputFirstName} type="text" placeholder="First name" autoComplete="given-name"/>
                        <input ref={inputLastName} type="text" placeholder="Last name" autoComplete="family-name"/>
                        <input ref={inputMail} type="email" placeholder="Mail" autoComplete="email"/>
                        <input ref={inputPassword} type="password" placeholder="Password"/>
                        <input ref={inputImage} type="file"/>
                        <span onClick={registerFunction} ><ButtonType type="receipt" name="Sign up"/></span>
                        <p id="register"><span onClick={formChangeFunction} className="link">Already have an account?</span></p>
                    </div>
                </section>
            }

        </React.Fragment>
    );
}

export default Login;
