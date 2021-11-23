import React, {useState, useRef} from 'react';
import Title from '../components/Title';
import ButtonType from '../components/Buttons/Type';

const NewMovement = (props) => {
    
    let dateInput = useRef();
    let amountInput = useRef();
    let conceptInput = useRef();
    let categoryInput = useRef();


    function ajax(url, method, setState, bodyJSON) {
        const http = new XMLHttpRequest();
        http.open(method, url);
        if(method === "post"){
            http.setRequestHeader('Content-Type', 'application/json')
            http.send(bodyJSON);
        }
        if(method === "get"){
            http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                        return setState(response);
                }
            }
            http.send();
        }
        
    }

    const [categories, setCategories] = useState([]);

    function onFocusFunction() {
        ajax('http://192.168.55.107:3003/api/categories', 'get', setCategories, "");
    }

    function bodyToJSON() {
        let amount = amountInput.current.value;
        // if (amount.includes(',')){
        //     amount = amount.replace(',','.');
        // }
        let body = {
            date: dateInput.current.value,
            amount: Number(amount),
            concept: conceptInput.current.value,
            category_id: Number(categoryInput.current.value),
            user_id: 1,
            type: props.movement,
        }
        return JSON.stringify(body);
    }
    
    function saveFunction(){
        let bodyJSON = bodyToJSON();
        ajax('http://192.168.55.107:3003/api/movements/add', 'post', "", bodyJSON );
        return props.exit();
    }

    function editFunction() {
        let bodyJSON = bodyToJSON();
        ajax(`http://192.168.55.107:3003/api/movements/edit/${props.propsData.id}`, 'post', "", bodyJSON );
        return window.location.reload();
        // return props.exit()
    }

    function deleteFunction() {
        let bodyJSON = bodyToJSON()
        ajax(`http://192.168.55.107:3003/api/movements/delete/${props.propsData.id}`, 'post', "", bodyJSON );
        return window.location.reload();
        // return props.exit()
    }

    let dateNow = new Date(Date.now());
    dateNow = `${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()+1}-${dateNow.getUTCDate()}`

    return (
        <div className="new-movement" onFocus={onFocusFunction}>
            <button onClick={props.exit} className="exit"><i className="far fa-times-circle"></i></button>
            <Title exit={props.exit} name={`${props.type} ${props.movement}`}/>
            <section className="input">
                <div>
                    <input type="date" name="date" defaultValue={props.propsData ? props.propsData.date : dateNow} ref={dateInput} max={dateNow} />
                    <span>
                        <input id="amount-input" type="text" ref={amountInput} placeholder="amount (US$)" defaultValue={props.propsData ? props.propsData.amount : null} autoComplete="off" autoFocus/>
                        <i className="fas fa-receipt"></i>
                    </span>
                </div>
                <div>
                    <input type="text" ref={conceptInput} placeholder="concept" defaultValue={props.propsData ? props.propsData.concept : null}/>
                    <select ref={categoryInput}>
                        { categories.length > 0 &&
                            categories.data.map((category)=> {
                                if (props.propsData && props.propsData.category_id === category.id){
                                    return <option selected key={category.name + category.id} value={category.id}>{category.name}</option>
                                }else {
                                    return <option  key={category.name + category.id} value={category.id}>{category.name}</option>
                                }
                            })
                        }
                    </select>
                </div>
                { !props.propsData && 
                    <div id="save">
                        <span onClick={saveFunction}><ButtonType type={props.movement} name="Save"/></span>
                    </div>
                }
                { props.propsData && 
                    <div>
                        <span onClick={editFunction}><ButtonType type="edit" name="Save"/></span>
                        <span onClick={deleteFunction}><ButtonType type="edit" name="Delete"/></span>
                    </div>
                }
            </section>
        </div>
    );
}

export default NewMovement;
