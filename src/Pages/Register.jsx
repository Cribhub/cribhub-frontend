import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../api'
import Copyright from '../Components/Copyright'
import { useEffect, useState } from 'react'

function Register() {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPasswordValue(event.target.value)
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    const registerMutation = useMutation({
        mutationFn: (user) => api.post('/customer', user),
        onSuccess: (response) => {
            console.log(response)
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.response.data.errors[0].message)
        },
    })

    let userData = {
        userName: usernameValue,
        email: emailValue,
        password: passwordValue,
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!validateEmail(emailValue)) {
            toast.error('Please enter a valid email.')
            return
        } else if (passwordValue.length < 8) {
            toast.error('Password must be at least 8 characters long.')
            return
        } else if (passwordValue !== confirmPasswordValue) {
            toast.error('Passwords do not match.')
            return
        }
        registerMutation.mutate(userData)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3, backgroundColor: 'honeydew', padding: 2}}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={emailValue}
                                onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                type="text"
                                name="username"
                                autoComplete="username"
                                value={usernameValue}
                                onChange={handleUsernameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={passwordValue}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="confirm-password"
                                value={confirmPasswordValue}
                                onChange={handleConfirmPasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <NavLink to="/" >
                                Already have an account? Sign in
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            
        </Container>
    )
}

export default Register
