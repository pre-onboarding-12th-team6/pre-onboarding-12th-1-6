import { Todo } from '../types/type';
import apiClient from './apiClient';

export const createTodo = (todo: Todo) => {
	try {
		return apiClient.post('/todos', todo);
	} catch (error) {
		const errorObj = error as Error;
		alert(`Todo 생성 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};

export const getTodos = () => {
	try {
		return apiClient.get('/todos');
	} catch (error) {
		const errorObj = error as Error;
		alert(`Todo 조회 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};

export const updateTodo = (id: number, todo: Todo) => {
	try {
		return apiClient.put(`/todos/${id}`, todo);
	} catch (error) {
		const errorObj = error as Error;
		alert(`Todo 업데이트 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};

export const deleteTodo = (id: number) => {
	try {
		return apiClient.delete(`/todos/${id}`);
	} catch (error) {
		const errorObj = error as Error;
		alert(`Todo 삭제 중 오류가 발생했습니다: ${errorObj.message}`);
		throw errorObj;
	}
};
