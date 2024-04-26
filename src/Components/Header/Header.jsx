import React from 'react'
import { styled } from '@mui/material/styles'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    ListItemAvatar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Logo from '../../Logo_GreyBg.PNG'
import api from '../../api'
import Popover from '@mui/material/Popover'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import { Box, Drawer, Divider } from '@mui/material'
import List from '@mui/material/List'

import ListItem from '@mui/material/ListItem'
import { useQuery } from '@tanstack/react-query'
import parseJwt from '../../Pages/parseJwt'

const StyledAppBar = styled(AppBar)({
    flexGrow: 1,
})

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
})

const LeftContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
})

const RightContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
})

const StyledImage = styled('img')({
    width: 100,
    height: 100,
})

const Header = ({ userName, crib, cribname, userID }) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    let token = Cookies.get('Token')
    const payload = parseJwt(token)
    const openPopper = Boolean(anchorEl)
    const id = openPopper ? 'simple-popover' : undefined

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget)
        api.put(`customer/${userID}/notifications`)
        await queryClient.invalidateQueries({
            queryKey: [],
            refetchType: 'all',
        })
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const navigate = useNavigate()

    const { data } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => {
            return api.get(`customer/${payload.customerId}/notifications`)
        },
    })

    const leaveCribMutation = useMutation({
        mutationFn: () => api.post(`customer/${crib}/leave/${userID}`),
        onSuccess: (response) => {
            console.log('Left Crib: ', response)
            navigate('/joinCrib')
        },
        onError: (error) => {
            toast.error('Could not leave Crib!')
            console.error('Error leaving crib: ', error)
        },
    })

    const leaveCribOnclick = () => {
        leaveCribMutation.mutate()
    }

    const logout = () => {
        navigate('/')
        Cookies.remove('Token', '')
    }

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LeftContent>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <StyledImage src={Logo} alt="My Image" />
                    </IconButton>
                    <Box>
                        <Typography variant="h6">{cribname}</Typography>
                        <Typography>Crib Id: {crib}</Typography>
                    </Box>
                </LeftContent>
                <RightContent>
                    <Box display="flex" alignItems="center" gap={2}>
                        {data && (
                            <Badge
                                aria-describedby={id}
                                badgeContent={
                                    data.data.filter(
                                        (notification) => !notification.isRead
                                    ).length
                                }
                                onClick={handleClick}
                                color="error"
                            >
                                <MailIcon color="action" />
                            </Badge>
                        )}
                        <Popover
                            id={id}
                            open={openPopper}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            sx={{
                                maxHeight: '250px',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <List>
                                {data &&
                                    data.data
                                        .slice()
                                        .reverse()
                                        .map((notification) => (
                                            <>
                                                <ListItem key={notification.id}>
                                                    <Typography
                                                        color={
                                                            notification.isRead
                                                                ? 'grey'
                                                                : 'black'
                                                        }
                                                    >
                                                        {notification.name}
                                                    </Typography>
                                                    {notification.description !==
                                                        null && (
                                                        <Typography
                                                            color={
                                                                notification.isRead
                                                                    ? 'grey'
                                                                    : 'black'
                                                            }
                                                        >
                                                            -
                                                            {
                                                                notification.description
                                                            }
                                                        </Typography>
                                                    )}
                                                </ListItem>
                                                <Divider />
                                            </>
                                        ))}
                            </List>
                        </Popover>
                        <Avatar
                            onClick={toggleDrawer(true)}
                            sx={{ bgcolor: deepOrange[500] }}
                        >
                            MA
                        </Avatar>
                    </Box>
                </RightContent>
            </StyledToolbar>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 350,
                        height: '100%',
                        backgroundColor: '#f0fff0',
                    }}
                >
                    <List>
                        <ListItem>
                            <Typography variant="h4">Logged in as:</Typography>
                        </ListItem>
                        <ListItem>
                            <Box display="flex" gap={2} justifyContent="center">
                                <Typography variant="h4">{userName}</Typography>
                                <Avatar
                                    sx={{
                                        height: '50px',
                                        width: '50px',
                                        bgcolor: deepOrange[500],
                                    }}
                                >
                                    MA
                                </Avatar>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box display="flex" gap={2} justifyContent="center">
                                <Button
                                    onClick={logout}
                                    variant="contained"
                                    color="error"
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={leaveCribOnclick}
                                    variant="contained"
                                    color="error"
                                >
                                    Leave Crib
                                </Button>
                            </Box>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </StyledAppBar>
    )
}

export default Header
