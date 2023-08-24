import { getTodos, updateTodo } from 'api/todoApi';
import TodoCreateForm from 'components/todo/TodoCreateForm';
import TodoItem from 'components/todo/TodoItem';
import TodoUpdateForm from 'components/todo/TodoUpdateForm';
import React, { useCallback, useEffect, useState } from 'react';
import { Todo as TodoType } from 'types/type';

function Todo() {
	const [todoList, setTodoList] = useState<TodoType[]>([]);
	const [isModifying, setIsModifying] = useState<number>();

	// 임시 인증 토큰
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhqa2xAaGprbC5oamtsIiwic3ViIjo5OTQ2LCJpYXQiOjE2OTI4MTY4MDMsImV4cCI6MTY5MzQyMTYwM30.OXEo2TovoPgLg9cApxL4A-lfnnB1PYdR2laNYtpZXiU';

	// 서버로 부터 데이터 요청후 state에 set
	useEffect(() => {
		const getTodoList = async () => {
			try {
				const response = await getTodos();
				setTodoList(response?.data);
			} catch (error) {
				alert(error);
			}
		};
		// 임시 인증
		const isTokenValid = localStorage.getItem('ACCESS_TOKEN');
		if (!isTokenValid) {
			localStorage.setItem('ACCESS_TOKEN', token);
			getTodoList();
		} else {
			getTodoList();
		}
	}, []);

	const handleAddTodo = useCallback(
		(newTodo: TodoType) => {
			setTodoList([...todoList, newTodo]);
		},
		[todoList],
	);

	const handleIsEditing = useCallback(
		(todoId: number) => {
			if (!isModifying) {
				setIsModifying(todoId);
			} else if (isModifying && todoId === isModifying) {
				setIsModifying(undefined);
			} else if (isModifying && todoId !== isModifying) {
				setIsModifying(todoId);
			}
		},
		[isModifying],
	);

	const handleUpdateTodo = async (id: number, todo: TodoType) => {
		try {
			const response = await updateTodo(id, todo);
			if (response.status === 200) {
				const updatedTodo = todoList.map((item) => (item.id === response?.data.id ? { ...response?.data } : item));
				setTodoList(updatedTodo);
				setIsModifying(undefined);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleDeleteTodo = useCallback(() => {
		console.log('handle deleteTodo');
	}, []);

	return (
		<div>
			<TodoCreateForm handleAddTodo={handleAddTodo} />
			<ul>
				{todoList.map((item) => (
					<li key={item.id}>
						{isModifying !== item.id ? (
							<TodoItem
								todo={item}
								handleUpdateTodo={handleUpdateTodo}
								handleIsEditing={handleIsEditing}
								handleDeleteTodo={handleDeleteTodo}
							/>
						) : (
							<TodoUpdateForm todo={item} handleIsEditing={handleIsEditing} handleUpdateTodo={handleUpdateTodo} />
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Todo;
