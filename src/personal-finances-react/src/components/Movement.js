import React from 'react';
import DefaultImg from '../assets/img/users/default.jpg'

const Movement = () => {
    return (
        <div className="movement">
            <div>
                <p>Date</p>
                <img src={DefaultImg} alt="category"/>
                <div className="detail">
                    <p id="concept">Concept</p>
                    <p>Category</p>
                </div>
            </div>
            <p id="amount"> $$$$$$</p> 
            <i className="fas fa-ellipsis-v"></i>
        </div>
    );
}

export default Movement;
