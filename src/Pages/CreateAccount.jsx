import './Login.css'

import Input from '../Components/TextInput'
import Button from '../Components/Button/Button'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";



function CreateAccount() {

    const navigate = useNavigate();


    const [emailValue, setEmailValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confrimPasswordValue, setConfrimPasswordValue] = useState('');

    const handleEmailChange = (newValue) => {
        setEmailValue(newValue)
    }

    const handleUsernameChange = (newValue) => {
        setUsernameValue(newValue)
    }

    const handlePasswordChange = (newValue) => {
        setPasswordValue(newValue)
    }

    const handleConfrimPasswordChange = (newValue) => {
        setConfrimPasswordValue(newValue)
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }


    function createAccountButton(){
        if (emailValue === '' || passwordValue === '' || usernameValue === '' || confrimPasswordValue === ''){
            alert("Fill out all fields")
        } else if(!validateEmail(emailValue)){
            alert("Enter a valid email")
        } else if(passwordValue !== confrimPasswordValue){
            alert("password does no match")
        } else {
            let user = {
                "userName": usernameValue,
                "email": emailValue,
                "password": passwordValue}

            axios.post("http://localhost:8080/customer", user).then(response => {
                navigate("/" )
                console.log(response)
            }).catch(error => {
                console.error("Error creating user:", error);
            });


        }
    }

    return(
        <div className={""}>

            <div className={"form"}>
                <p className={"text-wrapper-3"}> Create Account: </p>
                <NavLink to="/" activeClassName="active" className={"text-wrapper-3"}>Already have an account? Login</NavLink>

                <Input
                    type= "email"
                    placeholder={"Email"}
                    value={emailValue}
                    onChange={handleEmailChange}
                    size={"large"}
                />
                <Input
                    type="text"
                    placeholder={"Username"}
                    value={usernameValue}
                    onChange={handleUsernameChange}
                    size={"large"}


                />
                <Input
                    type="password"
                    placeholder={"Password"}
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    size={"large"}

                />
                <Input
                    type= "password"
                    placeholder={"Confirm Password"}
                    value={confrimPasswordValue}
                    onChange={handleConfrimPasswordChange}
                    size={"large"}
                />

                <Button
                    text={"CREATE ACCOUNT"}
                    onClick={createAccountButton}
                />
            </div>


        </div>
    )
}

export default CreateAccount