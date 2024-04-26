import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import api from '../api';
import './Login.css';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import parseJwt from './parseJwt'
import Cookies from 'js-cookie'



function InviteLink() {
  const navigate = useNavigate()
  const location = useLocation();
  const [inviteId, setInviteId] = useState(null)
  
  const joinCribMutation = useMutation({
    mutationFn: () => api.post(`/customer/${userID}/join/${cribID}`),
    onSuccess: (response) => {
        navigate("/mainmenu");
        toast("Successfully join Crib!")
    },
    onError: (error) => {
        toast.error("Could not join crib");
        console.error("Failed join: ", error);
    }
    });

    function joinCribWithInvite() {
        // joinCribMutation.mutate()
    }
    
    useEffect(() => {
        const param = new URLSearchParams(location.search).get('inviteId');
        setInviteId(param);
    });

    return (
        <div>{inviteId ? <p>{ inviteId} </p>: <p>NO INVITE ID FOUND</p>} </div>
    );
}

export default InviteLink;