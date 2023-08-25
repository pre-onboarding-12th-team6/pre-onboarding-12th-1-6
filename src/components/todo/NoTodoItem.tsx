import React from 'react';

function NoItem() {
	return (
		<li>
			<label htmlFor="todo no item">
				<input type="checkbox" />
				<span>할 일을 추가해주세요</span>
			</label>
			<button type="button" data-testid="modify-button" disabled>
				수정
			</button>
			<button type="button" data-testid="delete-button" disabled>
				삭제
			</button>
		</li>
	);
}

export default NoItem;
