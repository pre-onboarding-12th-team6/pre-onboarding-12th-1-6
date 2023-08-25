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
			if (inputText.trim().length !== 0) {
				const newTodo: Partial<TodoType> = {
					todo: inputText,
				};
				const response = await createTodo(newTodo as TodoType);
				if (response.status === 201) {
					handleAddTodo(response?.data);
				} else {
					throw new Error(`Todo 생성에 실패 했습니다`);
				}
			} else {
				throw new Error('Todo에 추가할 수 없습니다');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Error : ${error.message}`);
			} else {
				alert('unknown error occurred');
			}
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
