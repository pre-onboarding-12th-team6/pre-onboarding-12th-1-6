import React from 'react';
import { Todo } from 'types/type';

interface TodoItemProps {
	todo: Todo;
	handleIsCompleted: () => void;
	handleIsEditing: () => void;
	handleDeleteTodo: () => void;
}

function TodoItem({ todo, handleIsCompleted, handleIsEditing, handleDeleteTodo }: TodoItemProps) {
	return (
		<>
			<label htmlFor="todo item">
				<input type="checkbox" onChange={() => handleIsCompleted()} checked={todo.isCompleted} />
				<span>{todo.todo}</span>
			</label>
			<button type="button" data-testid="modify-button" onClick={() => handleIsEditing()}>
				수정
			</button>
			<button type="button" data-testid="delete-button" onClick={() => handleDeleteTodo()}>
				삭제
			</button>
		</>
	);
}

export default TodoItem;
