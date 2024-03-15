import { Container } from "@mui/material"
import LogoutButton from "../components/auth0/logoutButton"
import Profile from "../components/auth0/profile"

export const ProfilePage = () => {
    return (
        <Container>
            <h1>Profile</h1>
            <Profile />
            <LogoutButton />
        </Container>
    )
}