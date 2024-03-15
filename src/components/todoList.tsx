import TodoItem from './todoItem';
import { Box, Button } from '@mui/material';
import useGetTodos from '../hooks/useGetTodos';
import { Todo } from '../types/Todo.interface';
import AddTodoButton from './addTodoButton';

const TodoList = () => {
  const { data: todos, isLoading, isError } = useGetTodos();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <Box display="flex" gap={2} flexDirection="column" width={300}>
      {todos.map((todo: Todo, index: number) => (
        <TodoItem key={index} title={todo.title} completed={todo.completed} />
      ))}
      <AddTodoButton/> 
    </Box>
  );
}

export default TodoList;