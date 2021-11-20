import React, {useState} from 'react';
import Title from '../components/Title';
import ButtonType from '../components/Buttons/Type';

const NewMovement = (props) => {
    
    function ajax(url, method, setState) {
        const http = new XMLHttpRequest();
        http.open(method, url);
        http.onreadystatechange = function () {
            if(this.status === 200 && this.readyState === 4){
                let response = JSON.parse(this.responseText);
                return setState(response);
            }
        }
        http.send();
    }

    const [categories, setCategories] = useState([]);

    function onFocusFunction() {
        ajax('http://192.168.4.152:3003/api/categories', 'get', setCategories);
    }


    return (
        <div className="new-movement" onFocus={onFocusFunction}>
            <button onClick={props.exit} className="exit"><i className="far fa-times-circle"></i></button>
            <Title exit={props.exit} name={`New ${props.movement}`}/>
            <section className="input">
                <div>
                    <input type="date" />
                    <span>
                        <input id="amount-input" type="text" placeholder="amount (us$)" autoFocus autoComplete="off" />
                        <i className="fas fa-receipt"></i>
                    </span>
                </div>
                <div>
                    <input type="text" placeholder="concept"/>
                    <select>
                    { categories.length > 0 &&
                        categories.data.map((category)=> <option key={category.name + category.id} value={category.id}>{category.name}</option>)
                    }
                    </select>
                </div>
                <div id="save">
                    <span><ButtonType type={props.movement} name="Save"/></span>
                </div>
            </section>
        </div>
    );
}

export default NewMovement;
