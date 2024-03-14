import { useQuery } from 'react-query';
import api from '../utils/api';

const getTodos = async () => {
    const { data } = await api.get('/todos');
    return data;
}

const useGetTodos = () => {
    return useQuery('todos', getTodos);
}

export default useGetTodos;