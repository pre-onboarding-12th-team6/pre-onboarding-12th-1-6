import { createTodo } from 'api/todoApi';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Todo as TodoType } from 'types/type';

interface TodoCreateFormProps {
	handleAddTodo: (newTodo: TodoType) => void;
}
function TodoCreateForm({ handleAddTodo }: TodoCreateFormProps) {
	const [inputText, setInputText] = useState('');

	const handleTodoInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const text = event.target.value;
		setInputText(text);
	}, []);

	const handleCreateTodo = useCallback(async (): Promise<void> => {
		try {
			const newTodo: Partial<TodoType> = {
				todo: inputText,
			};
			const response = await createTodo(newTodo as TodoType);
			handleAddTodo(response?.data);
		} catch (error) {
			alert(error);
		} finally {
			setInputText('');
		}
	}, [inputText]);

	return (
		<div>
			<input type="text" data-testid="new-todo-input" onChange={handleTodoInput} value={inputText} />
			<button type="button" data-testid="new-todo-add-button" onClick={handleCreateTodo}>
				추가
			</button>
		</div>
	);
}

export default TodoCreateForm;
