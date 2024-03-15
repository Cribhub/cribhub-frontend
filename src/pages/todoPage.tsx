import { Container, Box, Typography } from "@mui/material";
import TodoList from "../components/todoList";

export const TodoPage = () => {
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Typography m={4} variant="h3">
          Todo List
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
};
