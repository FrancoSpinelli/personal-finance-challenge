import React, {useEffect, useState} from 'react';
import Title from '../components/Title';
import Movement from '../components/Movement';
import Cookies from 'universal-cookie';
import { ajaxGet } from '../utils/ajaxFunction';

const Lastmovements = (props) => {
    let cookies = new Cookies();

    const [movements, setMovements] = useState([]);
    useEffect(() => {
        ajaxGet(`http://192.168.4.152:3003/api/movements/${cookies.get('id')}`, (response) => setMovements(response));
    }, [props.movements]);


    // CLICK ON BUTTON TO SEE MORE
    const [more, setMore] = useState(false);
    function viewMoreFunction() {
        more === false ? setMore(true) : setMore(false);
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
                <span onClick={viewMoreFunction} className="view-more"><i className="far fa-caret-square-down"></i></span>
            }
            { more === true &&
                <span onClick={viewMoreFunction} className="view-more"><i className="far fa-caret-square-up"></i></span>
            }
        </div>
    );
}

export default Lastmovements;
