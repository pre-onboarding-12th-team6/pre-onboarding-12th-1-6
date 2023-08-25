import React from 'react';
import styled, { css } from 'styled-components';

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
function NoItem() {
	return (
		<li>
			<Checkbox id="todoNoItem" type="checkbox" />
			<span>할 일을 추가해주세요</span>
			<ButtonWrap>
				<EditBtn type="button" data-testid="modify-button" disabled>
					수정
				</EditBtn>
				<DeleteBtn type="button" data-testid="delete-button" disabled>
					삭제
				</DeleteBtn>
			</ButtonWrap>
		</li>
	);
}

export default NoItem;
