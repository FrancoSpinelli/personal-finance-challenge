import React, {useState, useRef, useEffect} from 'react';
import Title from '../components/Title';
import ButtonType from '../components/Buttons/Type';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { ajaxGet, ajaxPost } from '../utils/ajaxFunction';


const NewMovement = (props) => {
    const cookies = new Cookies();

    let dateNow = new Date(Date.now());
    dateNow = `${dateNow.getUTCFullYear()}-${dateNow.getUTCMonth()+1}-${dateNow.getUTCDate()}`

    let dateInput = useRef();
    let amountInput = useRef();
    let conceptInput = useRef();
    let categoryInput = useRef();


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        ajaxGet('http://192.168.4.152:3003/api/categories', (response) => setCategories(response));
    }, []);
    

    function bodyToJSON() {
        let amount = amountInput.current.value;
        let body = {
            date: dateInput.current.value,
            amount: Number(amount),
            concept: conceptInput.current.value,
            category_id: Number(categoryInput.current.value),
            user_id: cookies.get('id'),
            type: props.movement,
        }
        return JSON.stringify(body);
    }

    function validationsFunction() {
        let error = document.querySelector('.error');
        let errors = false;
        if(amountInput.current.value === '' || conceptInput.current.value === ""){
            error.innerText = "Amount and concept cannot by empty."
            return errors = true;
        }
        if (isNaN(amountInput.current.value)) {
            error.innerText = "Amount is not a number."
            return errors = true;
        }
        if (errors === false) {
            error.innerText = "";
        }
        return errors
    }
    
    function saveFunction(){
        let errors = validationsFunction();
        if (errors === false){
            let bodyJSON = bodyToJSON();
            ajaxPost('http://192.168.4.152:3003/api/movements/add', bodyJSON, true, () => props.exit());
        }
        
    }

    function editFunction() {
        let errors = validationsFunction();
        if (errors === false){
            let bodyJSON = bodyToJSON();
            ajaxPost(`http://192.168.4.152:3003/api/movements/edit/${props.propsData.id}`, bodyJSON, true, () => props.exit());
        }
    }

    function deleteFunction() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
                let bodyJSON = bodyToJSON()
                ajaxPost(`http://192.168.4.152:3003/api/movements/delete/${props.propsData.id}`, bodyJSON, true, () => props.exit());
            }
        })
    }



    return (
        <div className="new-movement">
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
                <div className="errors">
                    <p className="error"></p>
                </div>
                {/* NEW MOVEMENTE */}
                { !props.propsData && 
                    <div id="save">
                        <span onClick={saveFunction}><ButtonType type={props.movement} name="Save"/></span>
                    </div>
                }
                {/* EDIT OR DELET MOVEMENTE */}
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
