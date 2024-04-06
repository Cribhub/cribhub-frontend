import './Login.css'
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '../Components/TextInput'
import Button from "../Components/Button/Button";
import myImage from "../Logo_GreyBg.PNG"
import api from '../api';
import Cookies from 'js-cookie';


function Login() {
    let navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');


    const handleEmailChange = (newValue) => {
        setEmailValue(newValue)
    }

    const handlePasswordChange = (newValue) => {
        setPasswordValue(newValue)
    }

    let loginData = {
        "email": emailValue,
        "password": passwordValue
    }

    async function checkIfCustomerHasCrib(userId) {
        try {
            const response = await api.get(`/customer/${userId}`);
            return response.data.cribId !== null;
        } catch (error) {
            console.error('Error fetching customer:', error);
            return false;
        }
    }

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }


    async function loginButtonOnclick() {
        try {
            const response = await api.post("/login", loginData);
            Cookies.set('Token', response.data.token);
            const payload = parseJwt(response.data.token);
            let userID = payload.customerId;

            const hasCrib = await checkIfCustomerHasCrib(userID);

            if (hasCrib) {
                navigate("/mainmenu");
            } else {
                console.log(response.data.token);
                navigate('/joinCrib');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={"container"}>
            <div className={"logo"}>
                <div>
                    <img src={myImage} alt="My Image" className={"my-image"} />
                </div>
            </div>

            <div className="form">
                <div className="text-wrapper-3">LOG IN</div>
                <div className="span">
                    <div className="text-wrapper-4">
                        <NavLink to="/createaccount" activeClassName="active" className="text-wrapper-3">New user? Create account</NavLink>
                    </div>

                </div>
                <Input
                    type="email"
                    placeholder="your email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    size={"large"}
                    shape={"square"}
                />
                <Input
                    type="password"
                    placeholder="your password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    size="large"
                    shape="square"
                />

                <Button
                    text={"SUBMIT"}
                    onClick={loginButtonOnclick}
                />
            </div>
        </div>

    )
}

export default Login