import React, { ChangeEvent, useCallback, useState } from 'react';
import { Todo as TodoType } from 'types/type';

interface TodoUpdateFormProps {
	todo: TodoType;
	handleIsEditing: (todoId: number) => void;
	handleUpdateTodo: (id: number, todo: TodoType) => void;
}

function TodoUpdateForm({ todo, handleIsEditing, handleUpdateTodo }: TodoUpdateFormProps) {
	const [modifyIsCompleted, setModifyIsCompleted] = useState(todo.isCompleted);
	const [modifiedTodo, setModifiedTodo] = useState(todo.todo);

	const handleModifyTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const editedTodo = e.target.value;
		setModifiedTodo(editedTodo);
	}, []);

	const handleModifyIsCompleted = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const editedIsCompleted = e.target.checked;
		setModifyIsCompleted(editedIsCompleted);
	}, []);

	const handleModifySubmit = useCallback(async () => {
		try {
			const newTodo: Partial<TodoType> = {
				todo: modifiedTodo,
				isCompleted: modifyIsCompleted,
			};
			await handleUpdateTodo(todo.id, newTodo as TodoType);
		} catch (error) {
			alert(error);
		}
	}, [modifiedTodo, modifyIsCompleted, todo, handleUpdateTodo]);

	return (
		<>
			<label htmlFor="todo-modify">
				<input type="checkbox" checked={modifyIsCompleted} onChange={handleModifyIsCompleted} />
				<input data-testid="modify-input" value={modifiedTodo} onChange={handleModifyTodo} />
			</label>
			<button type="button" data-testid="submit-button" onClick={handleModifySubmit}>
				제출
			</button>
			<button type="button" data-testid="cancel-button" onClick={() => handleIsEditing(todo.id)}>
				취소
			</button>
		</>
	);
}

export default TodoUpdateForm;
