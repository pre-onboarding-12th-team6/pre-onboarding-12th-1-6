import { deleteTodo, getTodos, updateTodo } from 'api/todoApi';
import TodoCreateForm from 'components/todo/TodoCreateForm';
import TodoItem from 'components/todo/TodoItem';
import NoItem from 'components/todo/NoTodoItem';
import TodoUpdateForm from 'components/todo/TodoUpdateForm';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Todo as TodoType } from 'types/type';

const TodoWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

const TodoList = styled.li`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 4px 0;
`;

function Todo() {
	const [todoList, setTodoList] = useState<TodoType[]>([]);
	const [isModifyId, setIsModifyId] = useState<number>();

	useEffect(() => {
		const getTodoList = async () => {
			try {
				const response = await getTodos();
				if (response?.status === 200) {
					setTodoList(response?.data);
				} else {
					throw new Error('리스트를 불러오지 못했습니다');
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					alert(`Error : ${error.message}`);
				} else {
					alert('unknown error occurred');
				}
			}
		};

		getTodoList();
	}, []);

	const handleAddTodo = useCallback(
		(newTodo: TodoType) => {
			setTodoList([...todoList, newTodo]);
		},
		[todoList],
	);

	const handleIsEditing = useCallback(
		(todoId: number) => {
			if (!isModifyId) {
				setIsModifyId(todoId);
			} else if (isModifyId && todoId === isModifyId) {
				setIsModifyId(undefined);
			} else if (isModifyId && todoId !== isModifyId) {
				setIsModifyId(todoId);
			}
		},
		[isModifyId],
	);

	const handleUpdateTodo = async (id: number, todo: TodoType) => {
		try {
			const response = await updateTodo(id, todo);

			if (response.status === 200) {
				const updatedTodo = todoList.map((item) => (item.id === response?.data.id ? { ...response.data } : item));

				setTodoList(updatedTodo);
				setIsModifyId(undefined);
			} else {
				throw new Error('Todo update에 실패했습니다');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Error : ${error.message}`);
			} else {
				alert('unknown error occurred');
			}
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			const response = await deleteTodo(id);

			if (response.status === 204) {
				const deletedTodo = todoList.filter((item) => item.id !== id);
				setTodoList(deletedTodo);
			} else {
				throw new Error('Todo 삭제에 실패 했습니다');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Error : ${error.message}`);
			} else {
				alert(`unknown error occured`);
			}
		}
	};

	return (
		<TodoWrap>
			<TodoCreateForm handleAddTodo={handleAddTodo} />
			<ul>
				{todoList.length !== 0 ? (
					todoList.map((item) => (
						<TodoList key={item.id}>
							{isModifyId !== item.id ? (
								<TodoItem
									todo={item}
									handleUpdateTodo={handleUpdateTodo}
									handleIsEditing={handleIsEditing}
									handleDeleteTodo={handleDeleteTodo}
								/>
							) : (
								<TodoUpdateForm todo={item} handleIsEditing={handleIsEditing} handleUpdateTodo={handleUpdateTodo} />
							)}
						</TodoList>
					))
				) : (
					<NoItem />
				)}
			</ul>
		</TodoWrap>
	);
}

export default Todo;
