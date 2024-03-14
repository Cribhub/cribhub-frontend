import "./App.css";
import { Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "./components/todoList";

const queryClient = new QueryClient();

const App = () => {

  return (
    // React query
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
        <Typography m={4} variant="h3">Todo List</Typography>
        <TodoList />
      </header>
    </div>
    </QueryClientProvider>
  );
}

export default App;
