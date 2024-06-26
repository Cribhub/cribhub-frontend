import React, { useState } from 'react';
import Input from '../Components/TextInput';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';
import { useMutation } from '@tanstack/react-query';
import CustomButton from '../Components/Button/CustomButton';
import { toast } from 'react-toastify';

function CreateAccount() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confrimPasswordValue, setConfrimPasswordValue] = useState('');

  const handleEmailChange = (newValue) => {
    setEmailValue(newValue);
  };

  const handleUsernameChange = (newValue) => {
    setUsernameValue(newValue);
  };

  const handlePasswordChange = (newValue) => {
    setPasswordValue(newValue);
  };

  const handleConfrimPasswordChange = (newValue) => {
    setConfrimPasswordValue(newValue)
}

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const createUserMutation = useMutation({
    mutationFn: (user) => api.post("/customer", user),
    onSuccess: (response) => {
      console.log(response);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.errors[0].message)
    }
});

  function createAccountButton() {
    if (!validateEmail(emailValue)) {
      toast.error('Please enter a valid email.');
      return;
    } else if (passwordValue.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    } else if (passwordValue !== confrimPasswordValue) {
      toast.error('Passwords do not match.');
      return;
    }

    let user = {
      userName: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    createUserMutation.mutate(user);
  }

  return (
    <div className={''}>
      <div className={'form'}>
        <p className={'text-wrapper-3'}> Create Account: </p>
        <NavLink to="/" activeClassName="active" className={'text-wrapper-3'}>
          Already have an account? Login
        </NavLink>

        <Input
          type="email"
          placeholder={'Email'}
          value={emailValue}
          onChange={handleEmailChange}
          size={'large'}
        />
        <Input
          type="text"
          placeholder={'Username'}
          value={usernameValue}
          onChange={handleUsernameChange}
          size={'large'}
        />
        <Input
          type="password"
          placeholder={'Password'}
          value={passwordValue}
          onChange={handlePasswordChange}
          size={'large'}
        />
        <Input
          type="password"
          placeholder={'Confirm Password'}
          value={confrimPasswordValue}
          onChange={handleConfrimPasswordChange}
          size={'large'}
        />


        <CustomButton text={'CREATE ACCOUNT'} onClick={createAccountButton} />
      </div>
    </div>
  );
}

export default CreateAccount;