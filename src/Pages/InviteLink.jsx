import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import api from '../api';
import './Login.css';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import parseJwt from './parseJwt'
import Cookies from 'js-cookie'


/*
    Please note: this is an extremely 'hacky' and unconventional way of handling 
                 invitation codes. But deadline is coming and this works :))
*/


function InviteLink() {
  const navigate = useNavigate()
  let { parameter } = useParams();
  const [userId, setUserId] = useState()
  
  const joinCribMutation = useMutation({
    mutationFn: () => api.post(`/customer/${userId}/join/${parameter}`),
    onSuccess: (response) => {
        navigate("/mainmenu");
    },
    onError: (error) => {
        toast.error("Could not join crib! Try again.");
        console.error("Failed join: ", error);
    }
    });


    function joinCribWithInvite() {
        let token = Cookies.get('Token')
        const payload = parseJwt(token)

        if (!payload) {
            navigate("/")
            toast.error("Must be logged in to use link!")
        }
        else {
            let userId = payload.customerId
            setUserId(payload.customerId)
            joinCribMutation.mutate()
        }
    }
    
    useEffect(() => {
        joinCribWithInvite();
    }, []);

    return (<div></div>);
}

export default InviteLink;