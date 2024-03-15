import { useMutation, useQueryClient } from "react-query";
import { postTodo } from "../lib/postTodo";
import { Todo } from "../types/Todo.interface";
import { toast } from "react-toastify";

export const usePostTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (todo: Todo) => postTodo(todo),
        {
            onSuccess: () => {
                toast.success('Todo item added successfully')
                queryClient.invalidateQueries({ queryKey: ['todos']})
            },
            onError: () => {
                toast.error('An error occurred while adding the todo item')
            }
        }
    );
}