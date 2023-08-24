import { TodoProps } from 'pages/Todo';
import React from 'react';

interface TodoItemProps {
	todo: TodoProps;
	handleIsCompleted: () => void;
	handleIsEditing: () => void;
	handleDeleteTodo: () => void;
}

function TodoItem({ todo, handleIsCompleted, handleIsEditing, handleDeleteTodo }: TodoItemProps) {
	return (
		<>
			<div>
				<input type="checkbox" onChange={() => handleIsCompleted()} checked={todo.isCompleted} />
				<span>{todo.todo}</span>
			</div>
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
