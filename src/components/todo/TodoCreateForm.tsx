import { createTodo } from 'api/todoApi';
import React, { ChangeEvent, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Todo as TodoType } from 'types/type';

const InputWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 400px;
	margin-bottom: 10px;
`;

const Input = styled.input`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			padding: 10px 8px;
			border: 1px solid ${colors.paleGreen};
			border-radius: 4px;
			width: 320px;
		`;
	}}
`;

const Button = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.white};
			background-color: ${colors.paleGreen};
			padding: 8px 15px;
			border-radius: 50px;
			transition: all 0.3s;
			&:hover {
				background-color: ${colors.charcoal};
				color: ${colors.white};
			}
		`;
	}}
`;
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
		<InputWrap>
			<Input type="text" data-testid="new-todo-input" onChange={handleTodoInput} value={inputText} />
			<Button type="button" data-testid="new-todo-add-button" onClick={handleCreateTodo}>
				추가
			</Button>
		</InputWrap>
	);
}

export default TodoCreateForm;
