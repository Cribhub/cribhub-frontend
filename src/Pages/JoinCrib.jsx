import './Login.css'

import Input from '../Components/TextInput'
import Button from '../Components/Button/Button'
import {useState} from "react";
import api from '../api';
import ParseJwt from "./parseJwt";
import Cookies from "js-cookie";
import {NavLink, useNavigate} from "react-router-dom";
import { useMutation } from '@tanstack/react-query';


function JoinCrib() {

    const [cribIdValue, setCribIdValue] = useState('');
    let navigate = useNavigate();


    const handleCribIdChange = (newValue) => {
        setCribIdValue(newValue) 
    }

    let token = Cookies.get("Token")
    const payload = ParseJwt(token);

    const joinCribMutation = useMutation({
        mutationFn: (userId) => api.post(`/customer/${userId}/join/${cribIdValue}`),
        onSuccess: (response) => {
            console.log('Successfully joined crib:', response.data);
            navigate("/mainmenu");
        },
        onError: (error) => {
            console.log(userId);
            console.log(cribIdValue);
            console.error('Error joining crib:', error);
        }
    });

    function joinCrib() {
        let userId = payload.customerId;

        if (!cribIdValue) {
            console.error("Please enter crib ID");
        } else {
            joinCribMutation.mutate(userId);
        }
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