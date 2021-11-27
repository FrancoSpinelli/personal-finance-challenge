import React, {useState, useEffect}from 'react';
import Balance from '../components/Balance';
import ButtonType from '../components/Buttons/Type';
import Header from './Header';
import Lastmovements from './LastMovements';
import Login from './Login';
import NewMovement from './NewMovement';
import Cookie from 'universal-cookie';
import { ajaxGet } from '../utils/ajaxFunction';

const Home = () => {

    const cookies = new Cookie();
    const userID = cookies.get('id');

    const [user, setUser] = useState([]);
    const [movements, setMovements] = useState([]);
    const [balance, setBalance] = useState(0);

    const [change, setChange] = useState(false);
    useEffect(() => {
        ajaxGet(`/api/users/${userID}`, (response) => setUser(response));
        ajaxGet(`/api/movements/${userID}`, (response) => setMovements(response));
        ajaxGet(`/api/movements/balance/${userID}`, (response) => setBalance(response));
        setChange(false)
    }, [change]);

    // CLICK BUTTONS
    const [type, setType] = useState("");
    function onClickReceiptsFunction(e) {
        return setType("receipt");
    }
    function onClickExpensesFunction(e) {
        return setType("expense");
    }
    

    function exitFunction() {        
        setType("");
        setChange(true);
    }
    
    return (
        <React.Fragment>
            {/* USER IS NOT LOGGED */}
            {!cookies.get('mail') && 
                <div className="session-div">
                    <Header image={user.data ? user.data.image : ""}/>
                    <section className="session">
                        <Login/>
                    </section>
                </div>
            }

            {/* USER IS LOGGED */}
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
