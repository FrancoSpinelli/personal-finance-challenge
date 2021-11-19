import React from 'react';

const Type = (props) => {
    return (
        <React.Fragment>
            { props.name === "Receipt" &&
                <button className="type-button receipts">
                    <p>{props.name}</p>
                </button>
            }
            { props.name === "Expense" &&
                <button className="type-button expenses">
                    <p>{props.name}</p>
                </button>
            }
            { props.name !== "Expense" && props.name !== "Receipt" &&
                <button className="type-button">
                    <p>{props.name}</p>
                </button>
            }
        </React.Fragment>
    );
}

export default Type;
