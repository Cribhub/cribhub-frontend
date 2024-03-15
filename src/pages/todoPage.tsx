import { Container, Box, Typography } from "@mui/material";
import LoginButton from "../components/auth0/loginButton";
import LogoutButton from "../components/auth0/logoutButton";
import Profile from "../components/auth0/profile";
import TodoList from "../components/todoList";

export const TodoPage = () => {
  return (
    <Container>
      <Box>
        <Profile />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={4}
        >
          <LoginButton />
          <LogoutButton />
        </Box>
      </Box>
      <Box>
        <Typography m={4} variant="h3">
          Todo List
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
};
