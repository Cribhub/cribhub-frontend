import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./auth0/loginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./auth0/logoutButton";

export default function ButtonAppBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cribhub
          </Typography>
          {isAuthenticated && (
            <a href="/profile">
              <img
                src={user?.picture}
                alt={user?.name}
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              />
            </a>
          )}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
