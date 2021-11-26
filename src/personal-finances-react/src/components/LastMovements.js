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

    const [more, setMore] = useState(false);
    function viewMoreFunction() {
        more === false ? setMore(true) : setMore(false)
    }
    return (

        <div className="last-movements">
            <Title name="Last movements"/>
            { movements.length > 0 &&
                movements.data.map((movement, i)  => {
                    if(more === false && i < 10){
                        return <Movement exit={props.exit} key={movement.id} {...movement}/>
                    } else if(more === true){
                        return <Movement exit={props.exit} key={movement.id} {...movement}/>
                    }
                })
            }
            { more === false && movements.length > 10 &&
                <span onClick={viewMoreFunction} className="view-more"><i class="far fa-caret-square-down"></i></span>
            }
            { more === true &&
                <span onClick={viewMoreFunction} className="view-more"><i class="far fa-caret-square-up"></i></span>
            }
        </div>
    );
}

export default Lastmovements;
