import React, {useState}from 'react';
import Balance from '../components/Balance';
import ButtonType from '../components/Buttons/Type';
import Lastmovements from './LastMovements';
import NewMovement from './NewMovement';

const Home = () => {

    const [type, setType] = useState("");
    function onClickReceiptsFunction(e) {
        return setType("receipt")
    }
    function onClickExpensesFunction(e) {
        return setType("expense")
    }

    function exitFunction() {
        return setType("");
    }
    
    return (
        <section className="home">
            <Balance/>
            <div className="buttons-type">
                <span onClick={onClickReceiptsFunction}><ButtonType name="Receipt"/></span>
                <span onClick={onClickExpensesFunction}><ButtonType name="Expense"/></span>
            </div>
            { type !== "" &&
                <NewMovement exit={exitFunction} movement={type}/>
            }
            <Lastmovements/>
        </section>
    );
}

export default Home;
