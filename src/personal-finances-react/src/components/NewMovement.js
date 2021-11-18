import React from 'react';
import Title from '../components/Title';
import ButtonType from '../components/Buttons/Type';

const NewMovement = (props) => {
    return (
        <div className="new-movement">
            <Title name={`New ${props.movement}`}/>
            <section className="input">
                <div>
                    <input type="date" defaultValue={Date.now()}/>
                    <span>
                        <input id="amount-input" type="text" placeholder="amount" />
                        <i class="fas fa-receipt"></i>
                    </span>
                </div>
                <div>
                    <input type="text" placeholder="concept"/>
                    <input type="text" placeholder="category"/>
                </div>
                <div id="save">
                    <ButtonType name="Save"/>
                </div>
            </section>
        </div>
    );
}

export default NewMovement;
