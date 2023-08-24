import TodoItem from 'components/todo/TodoItem';
import React, { useCallback, useEffect, useState } from 'react';

export interface TodoProps {
	id: number;
	todo: string;
	isCompleted: boolean;
	userId: number;
}

function Todo() {
	// test data
	const [testData] = useState<TodoProps[]>([
		{
			id: 1,
			todo: 'todo2',
			isCompleted: false,
			userId: 1,
		},
		{
			id: 2,
			todo: 'todo3',
			isCompleted: false,
			userId: 1,
		},
		{
			id: 3,
			todo: 'todo3',
			isCompleted: false,
			userId: 1,
		},
	]);

	// 데이터 확인용
	useEffect(() => {
		console.log(testData);
	}, []);

	const handleIsCompleted = useCallback(() => {
		console.log('handle isCompleted');
	}, []);

	const handleIsEditing = useCallback(() => {
		console.log('handle isEditing');
	}, []);

	const handleDeleteTodo = useCallback(() => {
		console.log('handle deleteTodo');
	}, []);

	return (
		<div>
			{testData.map((item) => (
				<li key={item.id}>
					<TodoItem
						todo={item}
						handleIsCompleted={handleIsCompleted}
						handleIsEditing={handleIsEditing}
						handleDeleteTodo={handleDeleteTodo}
					/>
				</li>
			))}
		</div>
	);
}

export default Todo;
