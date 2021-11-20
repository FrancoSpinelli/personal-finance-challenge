import React from 'react';

const Type = (props) => {
    return (
        <React.Fragment>
            { (props.name === "Receipt" || props.type ==='receipt') &&
                <button className="type-button receipts">
                    <p>{props.name}</p>
                </button>
            }
            { (props.name === "Expense" ||  props.type === "expense") &&
                <button className="type-button expenses">
                    <p>{props.name}</p>
                </button>
            }
            {/* { props.name !== "Expense" && props.name !== "Receipt" &&
                <button className="type-button">
                    <p>{props.name}</p>
                </button>
            } */}
        </React.Fragment>
    );
}

export default Type;
