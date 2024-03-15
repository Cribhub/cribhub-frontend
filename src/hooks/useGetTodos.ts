import { useQuery } from 'react-query';
import { getTodos } from '../lib/getTodos';

const useGetTodos = () => {
    return useQuery({ 
        queryKey: ['todos'], 
        queryFn: getTodos
    });
}

export default useGetTodos;