import React, { ChangeEvent, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Todo as TodoType } from 'types/type';

const Checkbox = styled.input`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			border-color: ${colors.charcoal};
			margin-right: 5px;
			vertical-align: middle;
		`;
	}}
`;
const ButtonWrap = styled.div`
	display: flex;
	gap: 5px;
`;

const SubmitBtn = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.paleGreen};
			background-color: ${colors.white};
			border: 1px solid ${colors.paleGreen};
			padding: 4px 8px;
			border-radius: 50px;
			transition: all 0.2s;
			&:hover {
				background-color: ${colors.paleGreen};
				color: ${colors.white};
			}
		`;
	}}
`;

const CancelBtn = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.mediumGray};
			background-color: ${colors.white};
			border: 1px solid ${colors.mediumGray};
			padding: 4px 8px;
			border-radius: 50px;
			transition: all 0.2s;
			&:hover {
				background-color: ${colors.mediumGray};
				color: ${colors.white};
			}
		`;
	}}
`;

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
				<Checkbox type="checkbox" checked={modifyIsCompleted} onChange={handleModifyIsCompleted} />
				<input
					data-testid="modify-input"
					value={modifiedTodo}
					onChange={handleModifyTodo}
					style={{ padding: '2px 4px', border: '1px solid #999999' }}
				/>
			</label>
			<ButtonWrap>
				<SubmitBtn type="button" data-testid="submit-button" onClick={handleModifySubmit}>
					제출
				</SubmitBtn>
				<CancelBtn type="button" data-testid="cancel-button" onClick={() => handleIsEditing(todo.id)}>
					취소
				</CancelBtn>
			</ButtonWrap>
		</>
	);
}

export default TodoUpdateForm;
