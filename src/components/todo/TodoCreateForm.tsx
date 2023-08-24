import { TodoProps } from 'pages/Todo';
import React, { ChangeEvent, useCallback, useState } from 'react';

interface TodoCreateFormProps {
	handleAddTodo: (newTodo: TodoProps) => void;
}
function TodoCreateForm({ handleAddTodo }: TodoCreateFormProps) {
	const [inputText, setInputText] = useState('');

	const handleTodoInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const text = event.target.value;
		setInputText(text);
	}, []);

	const handleCreateTodo = useCallback(async (): Promise<void> => {
		try {
			// 임시 테스트 response
			const response: TodoProps = {
				// id값을 임시로 선언
				id: Date.now(),
				todo: inputText,
				isCompleted: false,
				userId: 1,
			};
			handleAddTodo(response);
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
