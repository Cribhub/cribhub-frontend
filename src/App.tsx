import "./App.css";
import { Box, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "./components/todoList";
import LoginButton from "./components/auth0/loginButton";
import Profile from "./components/auth0/profile";
import LogoutButton from "./components/auth0/logoutButton";

const queryClient = new QueryClient();

const App = () => {

  return (
    // React query
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          p={4}
          width={'100%'}
        >
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
            <Typography m={4} variant="h3">Todo List</Typography>
            <TodoList />
          </Box>
        </Box>
      </header>
    </div>
    </QueryClientProvider>
  );
}

export default App;
