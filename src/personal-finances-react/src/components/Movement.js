import React from 'react';


const Movement = (props) => {

    const iconCategory = require.context('../assets/img/icons', true);

    let date = new Date(props.date);
    date = `${date.getDate() + 1}/${date.getMonth() + 1}`;

    return (
        <div className="movement">
            <div>
                <p id="date">{date}</p>
                <img src={iconCategory(`./${props.category.image}`).default} alt="category"/>
                <div className="detail">
                    <p id="concept">{props.concept}</p>
                    <p>{props.category.name}</p>
                </div>
            </div>
            {props.type === "receipt" &&
                <p id="amount" className="green">{`${props.amount} US$`}</p> 
            }
            {props.type === "expense" &&
                <p id="amount" className="red">{`- ${props.amount} US$`}</p> 
            }
            <i className="fas fa-ellipsis-v"></i>
        </div>
    );
}

export default Movement;
