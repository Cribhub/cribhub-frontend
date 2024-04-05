import './Login.css'

import Input from '../Components/TextInput'
import Button from '../Components/Button/Button'
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Cookies from "js-cookie";
import ParseJwt from "./parseJwt";



function CreateCrib() {

    const navigate = useNavigate();


    const [cribNameValue, setCribNameValue] = useState('');

    const handleCribNameChange = (newValue) => {
        setCribNameValue(newValue)
    }


    let token = Cookies.get("Token")
    const payload = ParseJwt(token);

    function joinCrib(cribIdValue) {
        let userId = payload.customerId;
        console.log(userId)
        axios.post(`http://localhost:8080/customer/${userId}/join/${cribIdValue}`)
            .then(response => {
                console.log('Successfully joined crib:', response.data);
                navigate("/mainmenu")

            })
            .catch(error => {
                console.log(userId)
                console.error('Error joining crib:', error);
            });
    }


    function createCribButton(){
            axios.post("http://localhost:8080/cribs", {"cribName":cribNameValue}).then(response => {
                console.log(response.data.cribId)
                let cribID = response.data.cribId
                console.log("cribid" + cribID)
                joinCrib(cribID)
                navigate("/mainMenu" )
            }).catch(error => {
                console.error("Error creating crib:", error);
            });
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

                <Button
                    text={"CREATE CRIB"}
                    onClick={createCribButton}
                />
            </div>


        </div>
    )
}

export default CreateCrib