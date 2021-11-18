import React from 'react';
import Balance from '../components/Balance';
import ButtonType from '../components/Buttons/Type';
import NewMovement from './NewMovement';

const Home = () => {
    return (
        <section className="home">
            <Balance/>
            <div className="buttons-type">
                <ButtonType name="Receipts"/>
                <ButtonType name="Expenses"/>
            </div>
            <NewMovement movement="MOVIMIENTO"/>
        </section>
    );
}

export default Home;
