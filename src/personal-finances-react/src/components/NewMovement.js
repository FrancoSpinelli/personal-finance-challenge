import React from 'react';
import Title from '../components/Title';
import ButtonType from '../components/Buttons/Type';

const NewMovement = (props) => {
    return (
        <div className="new-movement">
            <Title name={`New ${props.movement}`}/>
            <section className="input">
                <div>
                    <input type="date"/>
                    <input id="amount" type="text"/>
                    <i class="fas fa-receipt"></i>
                </div>
                <div>
                    <input type="text"/>
                    <input type="text"/>
                </div>
                <ButtonType name="Save"/>
            </section>
        </div>
    );
}

export default NewMovement;
