import React from 'react';
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

const EditBtn = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.yellow};
			background-color: ${colors.white};
			border: 1px solid ${colors.yellow};
			padding: 4px 8px;
			border-radius: 50px;
			transition: all 0.2s;
			&:hover {
				background-color: ${colors.yellow};
				color: ${colors.white};
			}
		`;
	}}
`;

const DeleteBtn = styled.button`
	${({ theme }) => {
		const { colors } = theme;
		return css`
			color: ${colors.red};
			background-color: ${colors.white};
			border: 1px solid ${colors.red};
			padding: 4px 8px;
			border-radius: 50px;
			transition: all 0.2s;
			&:hover {
				background-color: ${colors.red};
				color: ${colors.white};
			}
		`;
	}}
`;

interface TodoItemProps {
	todo: TodoType;
	handleUpdateTodo: (id: number, todo: TodoType) => void;
	handleIsEditing: (id: number) => void;
	handleDeleteTodo: (id: number) => void;
}

function TodoItem({ todo, handleUpdateTodo, handleIsEditing, handleDeleteTodo }: TodoItemProps) {
	const handleIsCompleted = async () => {
		try {
			const comp = !todo.isCompleted;
			console.log('asdfasd', comp);
			const newTodo: Partial<TodoType> = {
				id: todo.id,
				todo: todo.todo,
				isCompleted: !todo.isCompleted,
				userId: todo.userId,
			};
			handleUpdateTodo(todo.id, newTodo as TodoType);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<label htmlFor="todo item">
				<Checkbox type="checkbox" onChange={handleIsCompleted} checked={todo.isCompleted} />
				<span>{todo.todo}</span>
			</label>
			<ButtonWrap>
				<EditBtn type="button" data-testid="modify-button" onClick={() => handleIsEditing(todo.id)}>
					수정
				</EditBtn>
				<DeleteBtn type="button" data-testid="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
					삭제
				</DeleteBtn>
			</ButtonWrap>
		</>
	);
}

export default TodoItem;
