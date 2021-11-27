import React, { useState, useRef } from 'react';
import NewMovement from './NewMovement';


const Movement = (props) => {
    let iconOptions = useRef();
    const iconCategory = require.context('../assets/img/icons', true);

    let date = new Date(props.date);
    date = `${date.getDate() + 1}/${date.getMonth() + 1}`;

    const [options, setOptions] = useState(false);
    function optionsFunction() {
        options === false ? setOptions(true) : setOptions(false);
    }

    function exitFunction() {
        props.exit();
        setOptions(false);
    }



    return (
        <React.Fragment>
            <section className="movement">
                <div>
                    <p id="date">{date}</p>
                    <img src={iconCategory(`./${props.category.image}`).default} alt="category"/>
                    <div className="detail">
                        <p id="concept">{props.concept}</p>
                        <p id="category">{props.category.name}</p>
                    </div>
                </div>
                {props.type === "receipt" &&
                    <p id="amount" className="green">{`${props.amount} US$`}</p> 
                }
                {props.type === "expense" &&
                    <p id="amount" className="red">{`- ${props.amount} US$`}</p> 
                }
                <i onClick={optionsFunction} ref={iconOptions} className="fas fa-pencil-alt"></i>
            </section>
            {   options === true &&
                <NewMovement exit={exitFunction} propsData={props} key={props.id} type="Edit" movement={props.type}/> 
            }
        </React.Fragment>
        
    );
}

export default Movement;
