import React, {useEffect, useState} from 'react';
import Title from '../components/Title';
import Movement from '../components/Movement';
import Cookies from 'universal-cookie';

const Lastmovements = (props) => {

    let cookies = new Cookies();

    function ajax(url, method, setState, bodyJSON) {
        const http = new XMLHttpRequest();
        http.open(method, url, true);
        if(method === "post"){
            http.setRequestHeader('Content-Type', 'application/json');
            http.send(bodyJSON);
            http.onreadystatechange = function () {
                if(this.status === 200 && this.readyState === 4){
                    let response = JSON.parse(this.responseText);
                } 
            }
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

    const [movements, setMovements] = useState("");
    useEffect(() => {
        ajax(`http://192.168.55.107:3003/api/movements/${cookies.get('id')}`, 'get', setMovements);
    }, [props.movements]);
    return (

        <div className="last-movements">
            <Title name="Last movements"/>
            { movements.length > 0 &&
                movements.data.map((movement)  => <Movement exit={props.exit} key={movement.id} {...movement} />)
            }
        </div>
    );
}

export default Lastmovements;
