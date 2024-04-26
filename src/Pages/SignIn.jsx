import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFlags, useFlagsmith } from 'flagsmith/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import myImage from '../Logo_GreyBg.PNG'
import simpleIcon from '../home.png'
import api from '../api'
import Cookies from 'js-cookie'
import parseJwt from './parseJwt'
import Copyright from '../Components/Copyright'
import theme from '../theme'

function SignIn() {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const flags = useFlags(['minimallogo'])
    const backgroundImage = flags.minimallogo?.enabled
        ? `url(${simpleIcon})`
        : `url(${myImage})`

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
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
        mutationFn: (loginData) => api.post('/login', loginData),
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
            toast.error('User not found')
        },
    })

    let loginData = {
        email: emailValue,
        password: passwordValue,
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        loginMutation.mutate(loginData)
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: backgroundImage,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundSize: '500px',
                }}
            />

            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={60}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                        <LockPersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" marginBottom={2}>
                        Sign in
                    </Typography>
                    <NavLink
                        to="/createaccount"
                        activeClassName="active"
                    >
                        New user? Create account
                    </NavLink>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={emailValue}
                            onChange={handleEmailChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={passwordValue}
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignIn
