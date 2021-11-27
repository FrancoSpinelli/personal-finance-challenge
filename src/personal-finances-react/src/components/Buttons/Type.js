import React from 'react';

const Type = (props) => {
    return (
        <React.Fragment>
            {/* RECEIPT */}
            { props.type === "receipt" &&
                <button className="type-button receipts">
                    <p>{props.name}</p>
                </button>
            }
            {/* EXPENSE */}
            { props.type === "expense" &&
                <button className="type-button expenses">
                    <p>{props.name}</p>
                </button>
            }
            {/* EDIT */}
            { (props.type === "edit" && props.name === "Save") &&
                <button className="type-button receipts">
                    <p>{props.name}</p>
                </button>
            } 
            {/* DELETE */}
            { (props.type === "edit" && props.name === "Delete") &&
                <button className="type-button expenses">
                    <p>{props.name}</p>
                </button>
            } 
        </React.Fragment>
    );
}

export default Type;
