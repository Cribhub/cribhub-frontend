import './Login.css'

import Input from '../Components/TextInput'
import Button from '../Components/Button/Button'
import {useState} from "react";
import axios from "axios";
import ParseJwt from "./parseJwt";
import Cookies from "js-cookie";
import {NavLink, useNavigate} from "react-router-dom";



function JoinCrib() {

    const [cribIdValue, setCribIdValue] = useState('');
    let navigate = useNavigate();


    const handleCribIdChange = (newValue) => {
        setCribIdValue(newValue)
    }

    let token = Cookies.get("Token")
    const payload = ParseJwt(token);




    function joinCrib() {
        let userId = payload.customerId;
        axios.post(`http://localhost:8080/customer/${userId}/join/${cribIdValue}`)
            .then(response => {
                console.log('Successfully joined crib:', response.data);
                navigate("/mainmenu")

            })
            .catch(error => {
                console.log(userId)
                console.log(cribIdValue)
                console.error('Error joining crib:', error);
            });
    }


    return(
        <div className={""}>

            <div className={"form"}>
                <p className={"text-wrapper-3"}> Join Crib: </p>

                <Input
                    type= "number"
                    placeholder={"ENTER CRIB ID"}
                    value={cribIdValue}
                    onChange={handleCribIdChange}
                    size={"large"}
                />

                <Button text={"JOIN CRIB"} onClick={joinCrib}/>


                <NavLink to="/createCrib" activeClassName="active" className={"text-wrapper-3"}>Create New Crib</NavLink>

            </div>


        </div>
    )
}

export default JoinCrib