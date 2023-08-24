import React, { useCallback } from 'react';
import { Todo as TodoType } from 'types/type';

interface TodoItemProps {
	todo: TodoType;
	handleUpdateTodo: (id: number, todo: TodoType) => void;
	handleIsEditing: (id: number) => void;
	handleDeleteTodo: () => void;
}

function TodoItem({ todo, handleUpdateTodo, handleIsEditing, handleDeleteTodo }: TodoItemProps) {
	const handleIsCompleted = useCallback(async () => {
		try {
			const newTodo: Partial<TodoType> = {
				todo: todo.todo,
				isCompleted: !todo.isCompleted,
			};
			handleUpdateTodo(todo.id, newTodo as TodoType);
		} catch (error) {
			alert(error);
		}
	}, []);

	return (
		<>
			<label htmlFor="todo item">
				<input type="checkbox" onChange={handleIsCompleted} checked={todo.isCompleted} />
				<span>{todo.todo}</span>
			</label>
			<button type="button" data-testid="modify-button" onClick={() => handleIsEditing(todo.id)}>
				수정
			</button>
			<button type="button" data-testid="delete-button" onClick={() => handleDeleteTodo()}>
				삭제
			</button>
		</>
	);
}

export default TodoItem;
