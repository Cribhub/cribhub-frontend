import api from '../utils/api';

export const getTodos = async () => {
    const { data } = await api.get('/todos');
    return data;
}