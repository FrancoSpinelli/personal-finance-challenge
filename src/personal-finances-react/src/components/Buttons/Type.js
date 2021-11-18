import React from 'react';

const Type = (props) => {
    return (
        <React.Fragment>
            { props.name === "Receipts" &&
                <button className="type-button receipts">
                    <p>{props.name}</p>
                </button>
            }
            { props.name === "Expenses" &&
                <button className="type-button expenses">
                    <p>{props.name}</p>
                </button>
            }
            { props.name !== "Expenses" && props.name !== "Receipts" &&
                <button className="type-button">
                    <p>{props.name}</p>
                </button>
            }
        </React.Fragment>
    );
}

export default Type;
