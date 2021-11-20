import React from 'react';
import Title from '../components/Title';
import Movement from '../components/Movement';

const Lastmovements = (props) => {
    return (

        <div className="last-movements">
            <Title name="Last movements"/>
            { props.movements.length > 0 &&
                props.movements.data.map((movement)  => <Movement key={movement.id} {...movement} />)
            }
        </div>
    );
}

export default Lastmovements;
