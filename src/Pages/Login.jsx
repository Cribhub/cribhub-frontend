import './Login.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Components/TextInput'
import Button from '../Components/Button/Button'
import myImage from '../Logo_GreyBg.PNG'
import simpleIcon from '../home.png'
import api from '../api'
import Cookies from 'js-cookie'
import { useFlags, useFlagsmith } from 'flagsmith/react'
import parseJwt from './parseJwt'
import { useMutation } from '@tanstack/react-query';

function Login() {
    let navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const flags = useFlags(['minimallogo'])

    const handleEmailChange = (newValue) => {
        setEmailValue(newValue)
    }

    const handlePasswordChange = (newValue) => {
        setPasswordValue(newValue)
    }

    let loginData = {
        email: emailValue,
        password: passwordValue,
    }

    async function checkIfCustomerHasCrib(userId) {
        try {
            const response = await api.get(`/customer/${userId}`)
            return response.data.cribId !== null
        } catch (error) {
            console.error('Error fetching customer:', error)
            return false
        }
    }


    const loginMutation = useMutation({
        mutationFn: (loginData) => api.post("/login", loginData),
        onSuccess: async (response) => {
            Cookies.set('Token', response.data.token)
            const payload = parseJwt(response.data.token)
            let userID = payload.customerId

            const hasCrib = await checkIfCustomerHasCrib(userID)

            if (hasCrib) {
                navigate('/mainmenu')
            } else {
                console.log(response.data.token)
                navigate('/joinCrib')
            }
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const loginButtonOnclick = () => {
        loginMutation.mutate(loginData);
    };

    return (
        <div className={'container'}>
            <div className={'logo'}>
                <div>
                    <img
                        src={flags.minimallogo?.enabled ? simpleIcon : myImage}
                        alt="My Image"
                        className={'my-image'}
                    />
                </div>
            </div>

            <div className="form">
                <div className="text-wrapper-3">LOG IN</div>
                <div className="span">
                    <div className="text-wrapper-4">
                        <NavLink
                            to="/createaccount"
                            activeClassName="active"
                            className="text-wrapper-3"
                        >
                            New user? Create account
                        </NavLink>
                    </div>
                </div>
                <Input
                    type="email"
                    placeholder="your email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    size={'large'}
                    shape={'square'}
                />
                <Input
                    type="password"
                    placeholder="your password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    size="large"
                    shape="square"
                />

                <Button text={'SUBMIT'} onClick={loginButtonOnclick} />
            </div>
        </div>
    )
}

export default Login

