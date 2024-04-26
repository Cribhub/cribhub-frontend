import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '../../Logo_GreyBg.PNG';
import api from '../../api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const StyledAppBar = styled(AppBar)({
    flexGrow: 1,
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const LeftContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const RightContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const StyledTypography = styled(Typography)({
    marginLeft: '8px', // Add left margin for spacing between items
});

const StyledLogoutButton = styled(Button)({
    marginLeft: '8px', // Add left margin for spacing between items
});

const StyledLeaveCribButton = styled(Button)({
    marginLeft: '8px', // Add left margin for spacing between items
});

const StyledImage = styled('img')({
    width: 100,
    height: 100,
});

const Header = ({ userName, crib, cribname, userID }) => {
    const navigate = useNavigate();

    const leaveCribMutation = useMutation({
        mutationFn: () => api.post(`customer/${crib}/leave/${userID}`),
        onSuccess: (response) => {
            console.log("Left Crib: ", response)
            navigate('/joinCrib')
        },
        onError: (error) => {
            toast.error("Could not leave Crib!")
            console.error("Error leaving crib: ", error)
        }
    });

    const leaveCribOnclick = () => {
        leaveCribMutation.mutate();
    };

    const logout = () => {
        navigate('/');
        Cookies.remove('Token', '');
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LeftContent>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <StyledImage src={Logo} alt="My Image" />
                    </IconButton>
                    <Typography variant="h6">
                        Your crib: {crib}
                    </Typography>
                    <StyledLeaveCribButton color="inherit" onClick={leaveCribOnclick}>
                        Leave Crib
                    </StyledLeaveCribButton>
                </LeftContent>
                <RightContent>
                    <Typography variant="h6">
                        Logged in as: {userName}
                    </Typography>
                    <StyledTypography variant="h6">
                        Your crib name: {cribname}
                    </StyledTypography>
                    <StyledLogoutButton color="inherit" onClick={logout}>
                        Logout
                    </StyledLogoutButton>
                </RightContent>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;