import { Todo } from "../types/Todo.interface";
import api from "../utils/api";

export const postTodo = async (todo: Todo) => {
    const { data } = await api.post('/todo', todo);
    return data;
}