import { deleteTodo, getTodos, updateTodo } from 'api/todoApi';
import TodoCreateForm from 'components/todo/TodoCreateForm';
import TodoItem from 'components/todo/TodoItem';
import TodoUpdateForm from 'components/todo/TodoUpdateForm';
import React, { useCallback, useEffect, useState } from 'react';
import { Todo as TodoType } from 'types/type';

function Todo() {
	const [todoList, setTodoList] = useState<TodoType[]>([]);
	const [isModifyId, setIsModifyId] = useState<number>();

	// 임시 인증 토큰
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhqa2xAaGprbC5oamtsIiwic3ViIjo5OTQ2LCJpYXQiOjE2OTI4MTY4MDMsImV4cCI6MTY5MzQyMTYwM30.OXEo2TovoPgLg9cApxL4A-lfnnB1PYdR2laNYtpZXiU';

	// 서버로 부터 데이터 요청후 state에 set
	// CRUD: Read
	// 서버 요청을 최소화 하기 위해서 렌더링시 한번만 시행
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

	// 페이지에서 관리되는 TodoList에 생성된 Todo 추가하여 TodoList를 최신화
	const handleAddTodo = useCallback(
		(newTodo: TodoType) => {
			setTodoList([...todoList, newTodo]);
		},
		[todoList],
	);

	// 페이지 내 state관리
	// 수정할 Todo를 id로 판별
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

	// CRUD: Update
	// Update 후 Read 기능을 수행하지 않고
	// response를 이용하여 state를 변경
	const handleUpdateTodo = async (id: number, todo: TodoType) => {
		try {
			const response = await updateTodo(id, todo);
			if (response.status === 200) {
				const updatedTodo = todoList.map((item) => (item.id === response?.data.id ? { ...response?.data } : item));
				setTodoList(updatedTodo);
				setIsModifyId(undefined);
			}
		} catch (error) {
			alert(error);
		}
	};

	// CRUD: Delete
	// Delete 후 Read 기능을 수행하지 않고
	// 기존 state를 변경해서 set
	const handleDeleteTodo = async (id: number) => {
		try {
			await deleteTodo(id);
			const deletedTodo = todoList.filter((item) => item.id !== id);
			setTodoList(deletedTodo);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<TodoCreateForm handleAddTodo={handleAddTodo} />
			<ul>
				{todoList.map((item) => (
					<li key={item.id}>
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
					</li>
				))}
			</ul>
		</div>
	);
}

export default Todo;
