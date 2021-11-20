import React, {useState, useEffect} from 'react';
import Title from '../components/Title';
import Movement from '../components/Movement';


const Lastmovements = () => {

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

    const [movements, setMovements] = useState([]);


    useEffect(() => {
        ajax('http://192.168.4.152:3003/api/movements/1', 'get', setMovements);
        
    }, []);

    console.log(movements);
    return (

        <div className="last-movements">
            <Title name="Last movements"/>
            { movements.length > 0 &&
                movements.data.map(movement => <Movement key={movement.name + movement.id} {...movement} />)

            }
        </div>
    );
}

export default Lastmovements;
