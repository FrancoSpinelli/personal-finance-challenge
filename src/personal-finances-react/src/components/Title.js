import React from 'react';

const Title = (props) => {
    return (
        <div className="title">
            <h3>{props.name}</h3>
            {props.exit && 
                <button onClick={props.exit} className="exit"><i className="far fa-times-circle"></i></button>
            }
        </div>
    );
}

export default Title;
