import React from 'react';
import Title from '../components/Title';
import Movement from '../components/Movement';


const Lastmovements = () => {
    return (
        <div className="last-movements">
            <Title name="Last movements"/>
            <Movement/>
            <Movement/>
            <Movement/>
            <Movement/>
        </div>
    );
}

export default Lastmovements;
