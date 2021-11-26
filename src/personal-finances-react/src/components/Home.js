import React, {useState, useEffect}from 'react';
import Balance from '../components/Balance';
import ButtonType from '../components/Buttons/Type';
import Header from './Header';
import Lastmovements from './LastMovements';
import Login from './Login';
import NewMovement from './NewMovement';
import Cookie from 'universal-cookie';

const Home = () => {

    const cookies = new Cookie();
    const userID = cookies.get('id');

    function ajax(url, method, setState, bodyJSON) {
        const http = new XMLHttpRequest();
        http.open(method, url);
        if(method === "post"){
            http.setRequestHeader('Content-Type', 'application/json')
            http.send(bodyJSON);
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

    const [user, setUser] = useState([]);
    const [movements, setMovements] = useState([]);
    const [balance, setBalance] = useState("");

    const [change, setChange] = useState(false);
    useEffect(() => {
        ajax(`http://192.168.55.107:3003/api/users/${userID}`, 'get', setUser);
        ajax(`http://192.168.55.107:3003/api/movements/${userID}`, 'get', setMovements);
        ajax(`http://192.168.55.107:3003/api/movements/balance/${userID}`, 'get', setBalance);
        setChange(false)
    }, [change]);

    const [type, setType] = useState("");
    function onClickReceiptsFunction(e) {
        return setType("receipt")
    }
    function onClickExpensesFunction(e) {
        return setType("expense")
    }
    

    function exitFunction() {        
        setType("");
        setChange(true)
    }
    
    return (
        <React.Fragment>
            {!cookies.get('mail') && 
                <section className="session">
                    <Login/>
                </section>
            }
            {cookies.get('mail') && 
                <section className="home">
                <Header image={user.data ? user.data.image : ""}/>
                { balance.data &&  
                    <Balance exit={exitFunction} balance={balance.data.balance} />
                }
                { !balance.data &&  
                    <Balance exit={exitFunction} balance={0} />
                }
                
                <div className="buttons-type">
                    <span onClick={onClickReceiptsFunction}><ButtonType type="receipt" name="Receipt"/></span>
                    <span onClick={onClickExpensesFunction}><ButtonType type="expense" name="Expense"/></span>
                </div>
                { type !== "" && 
                    <div className="new-div">
                        <NewMovement type="New" exit={exitFunction} movement={type}/>
                    </div>
                }
                {movements.length > 0 &&
                    <Lastmovements exit={exitFunction} movements={movements}/>
                }
            </section>
            }
        </React.Fragment>
    );
}

export default Home;
