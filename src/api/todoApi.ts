import { Todo } from '../types/type';
import apiClient from './apiClient';

export const createTodo = (todo: Todo) => {
	return apiClient.post('/todos', todo);
};

export const getTodos = () => {
	return apiClient.get('/todos');
};

export const updateTodo = (id: number, todo: Todo) => {
	return apiClient.put(`/todos/${id}`, todo);
};

export const deleteTodo = (id: number) => {
	return apiClient.delete(`/todos/${id}`);
};
