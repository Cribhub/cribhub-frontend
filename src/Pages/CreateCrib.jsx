import './Login.css'

import Input from '../Components/TextInput'
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import api from '../api';
import Cookies from "js-cookie";
import ParseJwt from "./parseJwt";
import { useMutation } from '@tanstack/react-query';
import CustomButton from '../Components/Button/CustomButton';

function CreateCrib() {

    const navigate = useNavigate();


    const [cribNameValue, setCribNameValue] = useState('');

    const handleCribNameChange = (newValue) => {
        setCribNameValue(newValue)
    }


    let token = Cookies.get("Token")
    const payload = ParseJwt(token);

    const joinCribMutation = useMutation({
        mutationFn: (cribIdValue) => api.post(`/customer/${payload.customerId}/join/${cribIdValue}`),
        onSuccess: () => {
            console.log('Successfully joined crib:');
        },
        onError: (error) => {
            console.error('Error joining crib:', error);
        }
    });

    const createCribMutation = useMutation({
        mutationFn: () => api.post("/cribs", {"cribName":cribNameValue}),
        onSuccess: (response) => {
            console.log(response.data.cribId);
            let cribID = response.data.cribId;
            console.log("cribid" + cribID);
            
            joinCribMutation.mutate(cribID);
            navigate("/mainMenu");
        },
        onError: (error) => {
            console.error("Error creating crib:", error);
        }
    });

    function createCribButton(){
        createCribMutation.mutate();
    }

    return(
        <div className={""}>

            <div className={"form"}>
                <p className={"text-wrapper-3"}> Create Crib: </p>

                <Input
                    type= "text"
                    placeholder={"CRIB NAME"}
                    value={cribNameValue}
                    onChange={handleCribNameChange}
                    size={"large"}
                />

                <CustomButton
                    text={"CREATE CRIB"}
                    onClick={createCribButton}
                />
            </div>


        </div>
    )
}

export default CreateCrib