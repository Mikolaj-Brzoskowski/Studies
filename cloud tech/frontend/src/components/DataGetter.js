import { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

const DataGetter = () => {

    const {state} = useLocation();
    const {token} = state;
    const navigate =  useNavigate()

    const [data, setData] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:5000/data', {
            headers: {
            'Authorization': `Basic ${token}`
            }
        })
        .then((res) => {
            if (res.status === 200 ) {
                setData(res.data)
            }
        })
        .catch((error) => {
        console.error(error)
        navigate('/acc_den')
        })
    });

    const handleNavigate = () => {
        navigate(
            '/add',
            {state: {token: token}}
        )
    }

    return (
        <div className="DataGetter"> 
            {data.map((el ) => 
            <div key={el}>
                <ListGroup>
                    <ListGroup.Item >
                        {el}
                    </ListGroup.Item>
                </ListGroup>
            </div>)}
            <Button onClick={handleNavigate}>Add item</Button>
        </div>
    )

}

export default DataGetter;